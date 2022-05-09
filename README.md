# Webpack
### Improving Nearshore - Luis Espinosa

> This is just a talk about how webpack works for the JS Academy crew at Improving Nearshore.


## Setting up a React project from scratch

### Packages that you'll need

You'll have to install the following packages in order to use webpack.

```shell
  npm install -D webpack webpack-cli webpack-dev-server
```

And you'll have to install the following packages in order to use babel and JSX with webpack.

```shell
  npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

### Configuring webpack and babel

Now you have to add the following to your webpack config file in order to use babel with webpack.


```js
  // webpack.config.js or any name you gave it

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx']
  }
}
```

That will let webpack know that any file that ends with .js or .jsx, outside of node_modules, should be handled by babel. Now it's up to you to configure babel as needed.

The minimum configuration that you'll need is:

```js
  // babel.config.js or any name you gave it

  module.exports = {
    presets: ['@babel/preset-env'],
    ['@babel/preset-react', { runtime: "automatic" }]
  }
```
