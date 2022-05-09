# Webpack
### Improving Nearshore - Luis Espinosa

> This is just a talk about how webpack works for the JS Academy crew at Improving Nearshore.


## Webpack: Getting started
You'll have to install the following packages in order to use webpack.

```shell
  npm install -D webpack webpack-cli
```


## Babel
You'll have to install the following packages in order to use babel.

```shell
  npm install -D @babel/core @babel/preset-env
```

You'll also need these in order to use babel with webpack.

```shell
  npm install -D babel-loader
```

Now you have to add the following to your webpack config file in order to use babel with webpack. (Add it to `modules.rules`).


```js
  // webpack.config.js or any name you gave it

  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' }
  }
```

That will let webpack know that any file that ends with .js, outside of node_modules, should be handled by babel. Now it's up to you to configure babel as needed.
The minimum configuration that you'll need is:

```js
  // babel.config.js or .babelrc

  module.exports = {
    presets: ['@babel/preset-env']
  }
```

## Typescript
You'll have to install the following packages in order to use typescript.

```shell
  npm install -D webpack webpack-cli
```