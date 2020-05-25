# eleventy-webpack :balloon:

A no crust Eleventy and Webpack template. Fork and go.

![](https://user-images.githubusercontent.com/447956/82833092-1220be80-9e8b-11ea-8fd4-7c33f74530f2.png)

## Included

* Barebone [Eleventy](https://www.11ty.dev/) (literally :scream:)
* [Live reload](https://www.browsersync.io/docs)
* Fast build with per env configs ([babel-env](https://babeljs.io/docs/en/babel-preset-env), [postcss-preset-env](https://github.com/csstools/postcss-preset-env), [webpack](https://webpack.js.org/configuration/#use-different-configuration-file))
* `.js` with sourcemaps and ES2020 syntax
* `.s?css` with sourcemaps and autoprefixer
* [Babel polyfills](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) (production only)
* [Prettier](https://prettier.io/)

## eli5 (explain like i'm 5)

Webpack is used when:

1. Any changes to `/scripts` or `/styles` is rebuilt by webpack.
1. The new files are linked inside the ignored file `_includes/webpack.njk` thanks to [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
1. Eleventy sees the new `_includes/webpack.njk` and rebuild.
1. Browsersync sees the changes and refresh.

Any other changes is picked up normally by Eleventy.

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
| **`npm run format`**  | Run prettier on `scripts/*` `and styles/*`   |
| **`npm run analyze`** | Output info on your bundle size              |

That's it.

## Thanks

- https://github.com/ianrose/deventy
- https://github.com/planetoftheweb/seven
- https://github.com/scottwater/eleventy-origin
