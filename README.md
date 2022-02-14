<p align="center">
  <h1>
    Consumed Content
  </h1>
</p>

<p align="center">
  Categorize and review your favorite shows and movies.
<p>

<p align="center">
  <a href="#">Live Site</a>
  ·
  <a href="https://github.com/andyruwruw">Andrew Young</a>
  ·
  <a href="https://github.com/LosM-ro">Carlos Muro</a>
</p>

Consumed Content was made for CS 340 at Oregon State University.

The website allows users to save their favorite movies, make custom categories, and write their own reviews.

# Table of Contents

- [Usage](#usage)
- [Data](#data)

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
# Data

- Movies and Shows
  - [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)
