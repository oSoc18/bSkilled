# bSkilled

Open Badges Project for VDAB, Poolstok, CogniZone, ComPas Project, The Learning Hub & Cronos.

This README will be technical documentation.
Website (with some explanation): [bSkilled.today](https://bSkilled.today)

## Overview

The platform is split into an [API server](./API) and a [frontend](./frontend).

The frontend is a single page application written in JavaScript with Vue as a framework. To serve it you only need to serve the build files (HTML, CSS, and JS) with some file server, see the [frontend](#Frontend) section for that.

The API is a simple JavaScript (Node) webserver using the Express.js library. It exposes few endpoints, and only acts as a simple datastore (getting badge classes, posting and getting badges, ...).

Front- and back-end talk to each other over HTTP with the specific endpoints and format documented in [api.yaml](api.yaml), which is an Open API specification. You can use an online editor like [Swagger](https://editor.swagger.io/) to have a nice view of the spec. All communication is in JSON.

## Frontend

``` bash
# Install dependencies
yarn install

# Serve development server with hot reload at localhost:8080
yarn run dev

# Build for production with minification
yarn run build
```

For production, configure the `webpack\webpack.config.prod.js` environment variables (`LOCATION`, `API`) with the correct URLs (check the dev config for reference).

The frontend is a SPA written with [Vue](https://vuejs.org/), it makes use of [Vuex](https://vuex.vuejs.org/) and [Vue Router](https://router.vuejs.org/) for state management and user flow. Almost all of the actual logic (signing, baking) is defined in the Vuex actions (`src/store/index.js`), which are then dispatched throughout the Vue components. The step navigation for the flow is defined in the 'stepFlow' action. Vue-router navigational guards play a large role in making the browsers history function not brake everything (`src/router/index.js`).

Components are separated into actual reusable components (`src/components`) and actual pages/views (`src/views`). The difference is that every View should be used only once, and should have it's own URL, or at least represent a step in the user interaction (eg. sharing the link page, uploading key, signing badge).

## API

The API server really is a shim and served little more purpose then allowing rapid development during Open Summer of Code. For a production environment, one should at least to input validation and use a decent database. For now, every JSON posted will just be accepted, and saved in a JSON database with [lowdb](https://github.com/typicode/lowdb).

It also serves as proxy to fetch external images trough (defined in the Badge Classes) to avoid CORS issues.

**Important: the endpoints will be prefixed with /api.**

Note:

```bash
# Install dependencies
yarn install

# Serve at localhost:8081/api
yarn run dev

# or
yarn start
```

## Key libraries

* [jws](https://www.npmjs.com/package/jws) for signing
* [node-forge](https://www.npmjs.com/package/node-forge) for key unloading, unlocking, and fingerprinting.
* [png-chunk-text](https://www.npmjs.com/package/png-chunk-text), [png-chunk-encode](https://www.npmjs.com/package/png-chunk-encode), [png-chunk-extract](https://www.npmjs.com/package/png-chunk-extract) for baking
* [shortid](https://www.npmjs.com/package/shortid) for generating id's for badges.
* Vue and vue ecosystem libraries for design and app management.
* Webpack and babel for building and developing

## Work To Do

* Better error management (both front and backend)
* Abstract API calls away from Component code
* Consistent naming and style
* Following the Vue style guide
* General wording and explanations
* Code documentation (specifically the Vuex actions)
* This project is already starting to get large enough to migrate to TypeScript or Flow
* Multiple todo's can also be found in the code itself