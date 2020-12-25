# Cookie-Parse

[![NPM](https://img.shields.io/npm/v/@iamsquare/cookie-parse.svg?style=flat-square)](https://www.npmjs.com/package/@iamsquare/cookie-parse) [![GitHub issues](https://img.shields.io/github/issues-raw/iamsquare/cookie-parse.svg?style=flat-square)](https://github.com/iamsquare/complex.js/issues) [![GitHub License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/iamsquare/cookie-parse/blob/master/LICENSE) [![NPM](https://nodei.co/npm/@iamsquare/cookie-parse.png?mini=true)](https://nodei.co/npm/@iamsquare/cookie-parse)

> Basic cookie string/file parse utilities.

## Getting started

Cookie-Parse utilities can be used in both browsers and Node.js:

Install Cookie-Parse by using [npm](https://www.npmjs.com/package/@iamsquare/cookie-parse):

```shell
npm i @iamsquare/cookie-parse
```

> Since this library is compiled from Typescript, type definition files are provided by default. No additional @types installation required!

## Documentation

You can check the documentation [here](http://iamsquare.it/cookie-parse)

## Building

Just clone this repo and build the library:

```shell
git clone --depth=0 https://github.com/iamsquare/cookie-parse
cd cookie-parse/
npm i
npm run prod
```

`npm run prod` will run Jest and build the library only if it passes all tests. To build without testing:

```shell
npm run build
```

## TODO

- [x] ~~Documentation~~.
- [ ] Check edge cases.
- [ ] Add examples.
- [ ] Migrate tests to typescript when I resolve some issues with typescript and custom jest matchers.

## Built With

- [Typescript](https://www.typescriptlang.org/) - Main language.
- [Ramda](https://ramdajs.com/), [Ramda-Adjunct](https://char0n.github.io/ramda-adjunct), [Ramda-Extension](https://ramda-extension.firebaseapp.com/docs/) - Functional programming library.
- [Jest](https://jestjs.io/) - Testing framework.

## Licensing

The code in this project is licensed under MIT License.
