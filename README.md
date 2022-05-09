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
  npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
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

### Adding typescript to your setup

Adding typescript is just as simple as what we've done so far. You'll have to install a couple of packages to add typescript capabilities and some type definitions needed for react.

```shell
  npm i -D typescript @types/react @types/react-dom
```

Now, you have to add a configuration file to set your typescript tooling up. You can simply run the following command which will create a default config file that we can later modify to fit our needs.

```shell
  npx tsc --init
```

It's time to change the file types of our .js files to .ts and the .jsx files to .tsx. We'll also add the typescript presets to babel so that it can handle transpiling typescript to javascript. Make sure that `any file using JSX is set as .tsx` as typescript will complain if it's not the case.

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
-         test: /\.(js|jsx)$/,
+         test: /\.(js|jsx|ts|tsx)$/,
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
-     extensions: [ '.js', '.jsx']
+     extensions: [ '.js', '.jsx', '.ts', '.tsx']
    }
  }
```

```diff
  // babel.config.js or any name you gave it

  module.exports = {
    presets: ['@babel/preset-env'],
    ['@babel/preset-react', { runtime: "automatic" }],
    '@babel/preset-typescript'
  }
```

Now, when you build your app, webpack will pass the .ts and .tsx files to babel and babel will use the presets to remove all the typescript code. Babel won't type check your code, so you'll have to introduce that in another step or you can use the `ts-loader` loader instead of `babel-loader`. It's usually a good idea to separate the concerns, tho. Babel will transform the code, while you'll run the `tsc` command to type check your code at another step.

You can apply the following to the `tsconfig.json` file to let typescript do that.

```json
  {
    "compilerOptions": {
      "allowJs": false,
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true,
      "isolatedModules": true,
      "jsx": "react-jsx", // Allows typescript to work with JSX
      "moduleResolution": "node",
      "noEmit": true, // We'll use babel to generate our final JS code, so we disable typescript's code generation capabilities
      "skipLibCheck": true,
      "strict": true,
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules/**/*"]
  }
```

The following will let your build script check your code for any type errors before building the app. You can create any script you need to run the type checking at any time of your development process. It can be after you commit changes, or at the middle of your CI/CD pipeline. It's up to you!

```diff
  // package.json > scripts

- "build": "webpack",
+ "build": "tsc && webpack",
```