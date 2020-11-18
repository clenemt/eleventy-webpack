const fs = require('fs');
const path = require('path');
const { outdent } = require('outdent');
const Image = require('@11ty/eleventy-img');
const markdown = require('./markdown');

const defaultSizes = '90vw, (min-width: 1280px) 1152px';
const defaultImagesSizes = [1920, 1280, 640, 320];

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
        resolve(err ? `/assets/${name}` : JSON.parse(data)[name])
      );
    }),

  // Allow embedding svg icon
  // {% icon "github.svg", "my-class" %}
  icon: (name, className = '') =>
    `<svg class="icon icon--${name} ${className}" role="img" aria-hidden="true">
      <use xlink:href="/assets/images/sprite.svg#${name}"></use>
    </svg>`,

  // Allow embedding responsive images
  // {% image "mountains.jpeg", "Picture of someone on top of a mountain", "My image caption", "my-class" %}
  image: async (
    src,
    alt,
    title,
    className,
    lazy = true,
    sizes = defaultSizes
  ) => {
    const extension = path.extname(src).slice(1).toLowerCase();
    const fullSrc = isFullUrl(src) ? src : `./src/assets/images/${src}`;

    let stats;
    try {
      stats = await Image(fullSrc, {
        widths: defaultImagesSizes,
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
    const picture = `<picture>
      ${Object.values(stats)
        .map(
          (image) =>
            `<source type="image/${image[0].format}" srcset="${image
              .map((entry) => `${entry.url} ${entry.width}w`)
              .join(', ')}" sizes="${sizes}">`
        )
        .join('\n')}
      <img
        class="${className || ''}"
        loading="${lazy ? 'lazy' : 'eager'}"
        src="${fallback.url}"
        width="${fallback.width}"
        height="${fallback.height}" alt="${alt}">
    </picture>`;
    return title
      ? `<figure>
          ${picture}
          <figcaption>${markdown.renderInline(title)}</figcaption>
        </figure>`
      : picture;
  }
};
