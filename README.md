# API Boilerplate

## Features

- Fastify framework
- `fluent-schema` for payload validation
- Mongoose for db modelling
- JWT for Authentication
- CORS Support
- ETag Support
- Auto deploy to AWS-EC2 via GitLab [docs](https://medium.com/@adhasmana/how-to-deploy-node-js-app-on-aws-with-gitlab-24fabde1088d)
- Auto deploy to AWS-EC2 via GitHub Actions

## Dependencies

1. Node.js: v16
2. Install yarn package manager for node https://yarnpkg.com/lang/en/docs/install/#debian-stable
3. PM2, process monitor for node, install using `yarn global add pm2`

## Install

### install necessary dependencies

- Run `git clone git@github.com:lightrainstech/api-boilerplate.git`
- Run `cd api-boilerplate`
- Run `nvm use`
- Run `yarn`

### Set up environment variables

- `cp env.sample .env`, and modify as required

### If you have pm2 installed

- You can use `pm2 start ./src/server.js`

### Or manually (dev mode)

- Run `yarn run dev`

## Swagger UI

Swagger is available at http://HOST:PORT/docs

## File Structure

```
.
├── .github
│   └── workflows
│       └── deploy-master.yml
├── .gitignore
├── .gitlab-ci.yml
├── .nvmrc
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
│   ├── server.js
│   ├── services
│   │   └── auth.js
│   └── utils
│       ├── generatorResponse.js
│       └── index.js
└── yarn.lock
```
