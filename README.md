# eleventy-webpack :balloon:

A barebone [eleventy](https://www.11ty.dev/) and [webpack](https://webpack.js.org/) template. Fork and go.

![](https://user-images.githubusercontent.com/447956/82975961-e47f6680-9fab-11ea-9c5c-cdfb6ef2932c.png)

## Included

- Barebone [11ty](https://www.11ty.dev/) (literally :scream:)
- Fast build with per env configs ([babel-env](https://babeljs.io/docs/en/babel-preset-env), [postcss-preset-env](https://github.com/csstools/postcss-preset-env), [webpack](https://webpack.js.org/configuration/#use-different-configuration-file)...)
- `.js` (ES6, Babel, Polyfills)
- `.css` (Sass, PostCSS, Autoprefixer)
- Optimized for production (source maps and minified code)
- SEO metadata and Open Graph tags
- [Prettier](https://prettier.io/) for formatting

Live demo https://eleventy-webpack.netlify.app

## Usage

First install the dependencies:

```sh
npm install
```

Then you can:

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| **`npm run start`**   | Run your website on http://localhost:8080    |
| **`npm run build`**   | Build your production website inside `/_site` |
| **`npm run format`**  | Run prettier on all filles except `/_site`    |
| **`npm run analyze`** | Output info on your bundle size              |

That's it.

## eli5 (explain like i'm 5)

Webpack is used when:

1. Any changes to `assets/scripts` or `assets/styles` is watched and rebuilt by webpack.
1. The new files are appended to the ignored file `_includes/webpack.njk` thanks to [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
1. Eleventy sees the new `_includes/webpack.njk` and rebuild.

Any other changes is picked up normally by Eleventy (see [.eleventy.js](.eleventy.js))

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Thanks

- https://github.com/maxboeck/mxb
- https://github.com/ianrose/deventy
- https://github.com/planetoftheweb/seven
- https://github.com/scottwater/eleventy-origin
- https://github.com/surjithctly/neat-starter
- https://github.com/ixartz/Eleventy-Starter-Boilerplate
- https://github.com/google/eleventy-high-performance-blog
- https://github.com/danurbanowicz/eleventy-netlify-boilerplate
