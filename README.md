[![Join the chat at https://gitter.im/astrocite/Lobby](https://badges.gitter.im/astrocite/Lobby.svg)](https://gitter.im/astrocite/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/dsifford/astrocite.svg?branch=master)](https://travis-ci.org/dsifford/astrocite) [![codecov](https://codecov.io/gh/dsifford/astrocite/branch/master/graph/badge.svg)](https://codecov.io/gh/dsifford/astrocite)

# astrocite

> Bibliography Format => AST => CSL JSON

**Mission:** The goal of this project is to create a single location where high-quality, safe, and efficient `X => CSL JSON` parsers can be found.

**What this project solves:** Currently there exists a wide range of CSL JSON parsers for a variety of reference types. However, most of these parsers rely on unsafe or inefficent methods of parsing input files (generally using complex regular expressions with lookbehinds, or inefficiently looping over the same input text several times). This project abandons that strategy by first parsing input files into  Abstract Syntax Trees and then parsing CSL JSON from the tree structure. The result of this is a safer, faster, and more predictable experience for developers.

**NOTE:** This project is currently a work in progress. The API is subject to change drastically and without warning. Any use of this library is at your own risk until either this message disappears or version `^1.x.x` is released.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
$ npm install astrocite
```

## Usage

### Modular (smaller bundles)

```js
import { parse } from 'astrocite-bibtex';
// or
const parse = require('astrocite-bibtex').parse;

const cslJson = parse(`
@article{my_article,
    title = {Hello world},
    journal = "Some Journal"
}
`);
```

### Classic

```js
import * as astrocite from 'astrocite';
// or
const astrocite = require('astrocite');

const cslJson = astrocite.bibtex.parse(`
@article{my_article,
    title = {Hello world},
    journal = "Some Journal"
}
`);
```

**ASTs are also available if needed.**

```js
import { AST } from 'astrocite-bibtex';
// or
// import { AST } from 'astrocite-ris';
// ....etc

const bibtexAST = AST.parse(`
@article{my_article,
    title = {Hello world},
    journal = "Some Journal"
}
`);
```

> **Note:** Examples for each individual AST can be found in the README file of each subdirectory.

## Contributing

PRs accepted. Please see our [Roadmap](./.github/ROADMAP.md) and [Contributing Guidelines](./.github/CONTRIBUTING.md) for more details.

## License

MIT © 2017 Derek P Sifford
