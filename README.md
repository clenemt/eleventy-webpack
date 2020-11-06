# eleventy-webpack :balloon:

A barebone [eleventy](https://www.11ty.dev/) and [webpack](https://webpack.js.org/) template. Fork and go.

[![Netlify Status](https://api.netlify.com/api/v1/badges/c952af3b-547a-40a6-a999-a7966a846b2c/deploy-status)](https://app.netlify.com/sites/eleventy-webpack/deploys)

![](https://user-images.githubusercontent.com/447956/82975961-e47f6680-9fab-11ea-9c5c-cdfb6ef2932c.png)

## Features

- :fire: Barebone [11ty](https://www.11ty.dev/) (literally :scream:)
- :zap: Fast build with per env configs ([babel-env](https://babeljs.io/docs/en/babel-preset-env), [postcss-preset-env](https://github.com/csstools/postcss-preset-env), [webpack](https://webpack.js.org/configuration/#use-different-configuration-file)...)
- `.js` (ES6, Babel, Polyfills)
- `.css` (Sass, PostCSS, Autoprefixer)
- :white_check_mark: Optimized for production (source maps, headers, minified code...)
- :robot: SEO metadata and Open Graph tags
- :camera_flash: Serve remote images locally ([eleventy-plugin-local-images](https://github.com/robb0wen/eleventy-plugin-local-images))
- :art: [Prettier](https://prettier.io/) for formatting
- :memo: Useful shortcodes and filters (date, markdown, svg sprite)
- :package: SVG icon sprite generation
- :shipit: Neat error overlay ([eleventy-plugin-error-overlay](https://github.com/stevenpetryk/eleventy-plugin-error-overlay))

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

That's it.

## eli5 (explain like i'm 5)

Webpack is used when:

1. Any changes to `assets/scripts` or `assets/styles` is watched and rebuilt by webpack.
1. The new files are appended to the ignored file `_includes/webpack.njk` thanks to [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
1. Eleventy sees the new `_includes/webpack.njk` and rebuild.

Any other changes is picked up normally by Eleventy (see [.eleventy.js](.eleventy.js))

## Shortcodes

<details>
<summary><strong><code>icon</code> shortcode</strong></summary>
<br>

Any SVG added to `src/assets/icons` is bundled into a symbol sprite file and made available through this shortcode.

```html
<!--  Assuming `src/assets/icons/github.svg` exist -->
<p>{% icon "github" %} Github icon</p>
```
___
</details>

<details>
<summary><strong><code>markdown</code> paired shortcode</strong></summary>
<br>

Embed markdown inside your Nunjucks templates.

```html
{% markdown %}
Let's you use **Markdown** like _this_.
Or with includes {%- include 'content.md' -%}.
{% endmarkdown %}
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
