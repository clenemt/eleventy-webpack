const fs = require('fs');
const path = require('path');
const { outdent } = require('outdent');
const Image = require('@11ty/eleventy-img');
const markdown = require('./markdown');

const defaultSize = '90vw, (min-width: 1280px) 1152px';

const isFullUrl = (url) => {
  try {
    return !!new URL(url);
  } catch {
    return false;
  }
};

const manifestPath = path.resolve(__dirname, '../_site/assets/manifest.json');

module.exports = {
  // Allow embedding markdown in `.njk` files
  // {% markdown %}
  // # Heading
  // {% endmarkdown %}
  markdown: (content) => markdown.render(outdent.string(content)),

  // Allow embedding webpack assets pulled out from `manifest.json`
  // {% webpack "main.css" %}
  webpack: async (name) =>
    new Promise((resolve) => {
      fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) =>
        resolve(err ? {} : JSON.parse(data)[name])
      );
    }),

  // Allow embedding svg icon
  // {% icon "github.svg", "my-class" %}
  icon: (name, className = '') =>
    `<svg class="icon icon--${name} ${className}" role="img" aria-hidden="true">
      <use xlink:href="/assets/images/sprite.svg#${name}"></use>
    </svg>`,

  // Allow embedding responsive images
  // {% image "mountains.jpeg", "Picture of someone on top of a mountain", "90vw" %}
  image: async (src, alt, sizes = defaultSize, lazy = true) => {
    const extension = path.extname(src).slice(1).toLowerCase();
    const fullSrc = isFullUrl(src) ? src : `./src/assets/images/${src}`;

    let stats;
    try {
      stats = await Image(fullSrc, {
        widths: [1920, 1280, 640, 320],
        formats: extension === 'webp' ? ['webp', 'jpeg'] : ['webp', extension],
        urlPath: '/assets/images/',
        outputDir: '_site/assets/images/'
      });
    } catch (e) {
      console.log('\n\x1b[31mERROR\x1b[0m creating image:');
      console.log(`> (${fullSrc})`);
      console.log(`  ${e}\n`);
      return '';
    }
    const fallback = stats[extension].reverse()[0];
    return `<picture>
      ${Object.values(stats)
        .map(
          (image) =>
            `<source type="image/${image[0].format}" srcset="${image
              .map((entry) => `${entry.url} ${entry.width}w`)
              .join(', ')}" sizes="${sizes}">`
        )
        .join('\n')}
      <img
        loading="${lazy ? 'lazy' : 'eager'}"
        src="${fallback.url}"
        width="${fallback.width}"
        height="${fallback.height}" alt="${alt}">
    </picture>`;
  }
};
