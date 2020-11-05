# API Boilerplate

# Features

-   Fastify framewrok
-   `fluent-schema` for parameter validation
-   Mongoose for db modeling
-   JWT for Authentication
-   CORS Support
-   ETag Support
-   Auto deploy to AWS via GitLab [docs](https://medium.com/@adhasmana/how-to-deploy-node-js-app-on-aws-with-gitlab-24fabde1088d)

## Dependencies

1. Node.js: v12.19.0
2. Install yarn package manager for node https://yarnpkg.com/lang/en/docs/install/#debian-stable
3. PM2, process monitor for node, install using `yarn global add pm2`

## Install

### install necessary dependencies

-   Run `git clone git@github.com:quizzedat/api-boilerplate.git api`
-   Run `cd api`
-   Run `nvm install v12.19.0 && nvm use`
-   Run `yarn`

### Set up environment variables

-   `cp env.sample .env`, and modify as required

### If you have pm2 installed

-   You can use `pm2 start ./src/server.js`

### Or manually (dev mode)

-   Run `yarn run dev`

## Swagger UI

Swagger is available at http://HOST:PORT/docs

## Structure

```
.
├── LICENSE
├── README.md
├── deploy
│   ├── deploy.sh
│   ├── disableHostKeyChecking.sh
│   └── updateAndRestart.sh
├── env.sample
├── package.json
├── pm2.json
├── src
│   ├── app.js
│   ├── server.js
│   ├── config
│   │   └── swagger.js
│   ├── models
│   │   └── userModel.js
│   ├── plugins
│   │   ├── README.md
│   │   ├── authJwt.js
│   │   ├── mongo.js
│   │   └── responseApi.js
│   ├── schema
│   │   └── userSchema.js
│   ├── services
│   │   └── auth.js
│   └── utils
│       ├── generatorResponse.js
│       └── index.js
└── yarn.lock
```
