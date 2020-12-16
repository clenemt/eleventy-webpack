# eleventy-webpack :balloon:

A barebone [eleventy](https://www.11ty.dev/) and [webpack](https://webpack.js.org/) template. Fork and go.

[![Netlify Status](https://api.netlify.com/api/v1/badges/c952af3b-547a-40a6-a999-a7966a846b2c/deploy-status)](https://app.netlify.com/sites/eleventy-webpack/deploys)

[![](https://user-images.githubusercontent.com/447956/82975961-e47f6680-9fab-11ea-9c5c-cdfb6ef2932c.png)](https://eleventy-webpack.netlify.app)

## Features

- :fire: Barebone [11ty](https://www.11ty.dev/) (literally :scream:)
- :zap: Fast build with per env configs ([babel-env](https://babeljs.io/docs/en/babel-preset-env), [postcss-preset-env](https://github.com/csstools/postcss-preset-env), [webpack](https://webpack.js.org/configuration/#use-different-configuration-file)...)
- `.js` (ES6, Babel, Polyfills)
- `.css` (Sass, PostCSS, Autoprefixer)
- :white_check_mark: Optimized for production (source maps, headers, minified code...)
- :camera_flash: Responsive images and cached remote images ([@11ty/eleventy-img](https://github.com/11ty/eleventy-img))
- :package: SVG icon sprite generation
- :robot: SEO metadata and Open Graph tags
- :link: Safe external links (`noopener` and `noreferrer`)
- :memo: Useful shortcodes and filters (date, markdown, sprite icons, responsive images...)
- :shipit: Neat error overlay ([eleventy-plugin-error-overlay](https://github.com/stevenpetryk/eleventy-plugin-error-overlay))
- :art: [Prettier](https://prettier.io/) for formatting

Live demo https://eleventy-webpack.netlify.app

## Usage

First install the dependencies:

```sh
npm install
```

Then you can:

| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| **`npm run start`**   | Run your website on http://localhost:8080     |
| **`npm run build`**   | Build your production website inside `/_site` |
| **`npm run format`**  | Run prettier on all filles except `/_site`    |
| **`npm run analyze`** | Output info on your bundle size               |

Make sure you use the correct node.js version:

```sh
# with bash nvm 
nvm use `cat .nvmrc`
# with windows nvm
nvm use $(cat .nvmrc)
# or just install the version specified inside `.nvmrc`
```

## Webpack

A very simple `webpack.config.js` is included. Feel free to change it.

## Shortcodes

All shortcodes can be used inside `.md` or `.njk` files.

<details>
<summary><strong><code>icon</code></strong></summary>
<br>

Any SVG added to `src/assets/icons` is bundled into a symbol sprite file and made available through this shortcode.
```html
<!-- Assuming `src/assets/icons/github.svg` exist -->
{% icon "github" %} Github icon
<!-- Will be rendered as -->
<svg class="icon icon--github" role="img" aria-hidden="true">
  <use xlink:href="/assets/images/sprite.svg#github"></use>
</svg>
```
___
</details>

<details>
<summary><strong><code>image</code></strong></summary>
<br>

Creates a WebP version of the image and the corresponding optimized JPEG / PNG. Images will be created in multiple sizes. See `utils/shortcodes.js` for default values.

```html
<!-- Assuming `src/assets/images/image.jpeg` of width 330px exist -->
{% image "image.jpeg", "Image alt" %}
<!-- Will be rendered as -->
<picture>
  <source type="image/webp" srcset="/assets/images/678868de-320.webp 320w, /assets/images/678868de.webp 330w" sizes="90vw">
  <source type="image/png" srcset="/assets/images/678868de-320.png 320w, /assets/images/678868de.png 330w" sizes="90vw">
  <img loading="lazy" src="/assets/images/678868de.png" alt="Image alt" width="330" height="580">
</picture>

<!-- If a title is passed the shortcode will output a <figure> with <figcaption> -->
{% image "image.jpeg", "Image alt", "Image title" %}
<!-- Will be rendered as -->
<figure>
  <picture>
    <source type="image/webp" srcset="/assets/images/678868de-320.webp 320w, /assets/images/678868de.webp 330w" sizes="90vw">
    <source type="image/png" srcset="/assets/images/678868de-320.png 320w, /assets/images/678868de.png 330w" sizes="90vw">
    <img loading="lazy" src="/assets/images/678868de.png" alt="Image alt" width="330" height="580">
  </picture>
  <figcaption>Image title</figcaption>
</figure>

<!-- Additional options -->
{% image [100,100], "image.jpeg", "Image alt", "Image title", "my-class", false, "90vw" %}
<!-- Will be rendered as -->
<figure class="fig-my-class">
  <picture>
    <source type="image/webp" srcset="..." sizes="90vw">
    <source type="image/png" srcset="..." sizes="90vw">
    <img class="img-my-class" loading="eager" src="..." alt="Image alt" width="100" height="100">
  </picture>
  <figcaption>Image title</figcaption>
</figure>
```
___
</details>

<details>
<summary><strong><code>markdown</code></strong></summary>
<br>

Embed markdown easily.

```html
{% markdown %}
Let's you use **Markdown** like _this_.
Or with includes {%- include 'content.md' -%}.
{% endmarkdown %}
```
___
</details>

## Filters

All filters can be used inside `.md` or `.njk` files.

<details>
<summary><strong><code>format</code></strong></summary>
<br>

Format the passed date with [date-fns](https://date-fns.org/v2.16.1/docs/format):

```html
<!-- Assuming page.date is a javascript date -->
{{ page.date | format("yyyy") }}
<!-- Will be rendered as -->
2020
```
___
</details>

<details>
<summary><strong><code>formatISO</code></strong></summary>
<br>

Format the passed date according to [ISO format](https://date-fns.org/v2.16.1/docs/formatISO):

```html
<!-- Assuming page.date is a javascript date -->
{{ page.date | formatISO }}
<!-- Will be rendered as -->
2020-09-18T19:00:52Z
```
___
</details>

<details>
<summary><strong><code>markdown</code></strong></summary>
<br>

Parse the passed string with markdown:

```html
<!-- Assuming page.title is `# My header` -->
{{ page.title | markdown }}
<!-- Will be rendered as -->
<h1>My header</h1>
```
___
</details>

## Thanks

- https://github.com/gregives/twelvety
- https://github.com/hankchizljaw/hylia
- https://github.com/MadeByMike/supermaya
- https://github.com/jeromecoupe/webstoemp
- https://github.com/maxboeck/eleventastic
- https://github.com/deviousdodo/elevenpack
- https://github.com/ixartz/Eleventy-Starter-Boilerplate
- https://github.com/google/eleventy-high-performance-blog
- https://github.com/danurbanowicz/eleventy-netlify-boilerplate
