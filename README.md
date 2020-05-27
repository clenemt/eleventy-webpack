# eleventy-webpack :balloon:

A barebone [eleventy](https://www.11ty.dev/) and [webpack](https://webpack.js.org/) template. Fork and go.

![](https://user-images.githubusercontent.com/447956/82975961-e47f6680-9fab-11ea-9c5c-cdfb6ef2932c.png)

## Included

- Barebone eleventy (literally :scream:)
- Fast build with per env configs ([babel-env](https://babeljs.io/docs/en/babel-preset-env), [postcss-preset-env](https://github.com/csstools/postcss-preset-env), [webpack](https://webpack.js.org/configuration/#use-different-configuration-file)...)
- `.js` (ES6, Babel and its polyfills)
- `.css` (Sass, Autoprefixer)
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
| **`npm run build`**   | Build your production website inside `/dist` |
| **`npm run format`**  | Run prettier on all filles except `/dist`    |
| **`npm run analyze`** | Output info on your bundle size              |

That's it.

## eli5 (explain like i'm 5)

Webpack is used when:

1. Any changes to `assets/scripts` or `assets/styles` is watched and rebuilt by webpack.
1. The new files are appended to the ignored file `_includes/webpack.njk` thanks to [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
1. Eleventy sees the new `_includes/webpack.njk` and rebuild.

Any other changes is picked up normally by Eleventy (see [.eleventy.js](.eleventy.js))

## Thanks

- https://github.com/maxboeck/mxb
- https://github.com/ianrose/deventy
- https://github.com/planetoftheweb/seven
- https://github.com/scottwater/eleventy-origin
