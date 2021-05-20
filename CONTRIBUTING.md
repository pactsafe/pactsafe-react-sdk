# Contributing

## Prerequisites

[Node.js](http://nodejs.org/) >= 10 must be installed.

## Installation

- Running `npm install` in the component's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report

- `npm run test:watch` will run the tests on every change.

- `npm run test:coverage-watch` will run tests on every change and produce a coverage report

## Building

- `npm run build` will build the component for publishing to npm (generating \lib, \es, and \umd directories) and also bundle the demo app.

- `npm run clean` will delete built resources.
