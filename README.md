# Consumed Content

# Usage

We're running a Vue.js project with Vercel serverless functions.

To run the repository with the backend you'll need to install [Vercel CLI](https://vercel.com/cli):

```
$ npm i -g vercel
```

That will let you run the backend as well as the frontend.

From here, you'll need to install the repository's dependencies:

```
$ npm i
```

To run the frontend and backend locally:

```
$ npm run serve
```

To run just the frontend you can use:

```
$ npm run serve:client
```

The repository is linted using airbnb config:

```
$ npm run lint
```

You can also have eslint automatically fix minor violations:

```
$ npm run lint --fix
```

To build for production:

```
$ npm run build
```
