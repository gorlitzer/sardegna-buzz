## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), then **ejected**. This way it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

I'm bootstraping the app with CRA for fast prototyping, but the **CRA** library develops a bare project with a `"@babel/core"` dependency conflict. In order to work-around this issue it is needed to change, in `the package.json`'s, version to `"@babel/core": "^7.13.0"`

### [eslint CRA configuration](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config)

```
// custom linting configuration (in package.json◊)

  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "sourceType": "module",
      "allowImportExportEverywhere": true
    },
    "rules": {
      "comma-dangle": ["error", "always-multiline"],
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": 0,
      "no-console": 0
    }
  },
```

- `npm run lint` -> runs the eslinter to check and fix linting errors;

### V1 npm packages - external necessary libraries

```
node-sass // SCSS compiler for webpack bundle
sass
react-router-dom
```