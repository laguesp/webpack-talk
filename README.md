# Webpack
### Improving Nearshore - Luis Espinosa

> This is just a talk about how webpack works for the JS Academy crew at Improving Nearshore.


## Setting up a React project from scratch

### Packages that you'll need

You'll have to install the following packages in order to use `webpack`.

```shell
  npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

And you'll have to install the following packages in order to use `babel` and `JSX` with webpack.

```shell
  npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

### Configuring webpack and babel

Now you have to add the following to your `webpack config file` in order to use babel with webpack.


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

That will let webpack know that any file that ends with `.js` or `.jsx`, outside of `node_modules`, should be handled by babel. 

Now it's up to you to configure babel as needed. The minimum configuration that you'll need is:

```js
  // babel.config.js or any name you gave it

  module.exports = {
    presets: ['@babel/preset-env'],
    ['@babel/preset-react', { runtime: "automatic" }]
  }
```

You can now build your sample app by running webpack, for convenience, you can add the following scripts to your `package.json` file to simplify this task:

```json
  {
    "scripts": {
      "build": "webpack",
      "build:watch": "webpack --watch"
    }
  }
```

### Configuring your local environment for development

You can start creating some cool React apps already. Our webpack configuration is not perfect yet, but we'll add capabilities to it as needed.

The first step to upgrade our webpack tooling is to configure our local dev environment. To do this, we'll use the `webpack-dev-server` package that we installed. Add the following entry to your `package.json` scripts.

```json
  "start": "webpack serve"
```

Now, we have to add the following settings to our `webpack.config.js` file. Remember that this is just a basic configuration, you can extend or modify it as needed.

```diff
  // webpack.config.js or any name you gave it

+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
+   mode: 'development',
+   devServer: {
+     port: 3000,
+     open: true
+   },
+   devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        }
      ]
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       template: './src/index.html'
+     }),
+   ],
    resolve: {
      extensions: [ '.js', '.jsx']
    }
  }
```

These changes will allow you to:
- Set the build mode to "development", meaning that it'll be optimized for development tasks. The other allowed value for the `module` prop is `production`.
- Run the `webpack-dev-server` package to effectively create a local development environment. With this config, the app will run at port `3000` and it'll automatically open a new tab your browser. Other defaults (like HMR) will also be included.
- Create `source map` files for your build, so that you can easily debug any error on the app.
- And finally, the `HtmlWebpackPlugin` plugin will generate an HTML file automatically with all the bundles injected. Optionally, you can pass a template file that the plugin will use. In this case, we have to create an `index.html` file on our src folder as configured in the plugin.