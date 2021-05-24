# HTTP API of Quizzz application.

It's based on nest.js + AdminBro for admin panel.
There is a postgresql db.
http://localhost:3000/admin for admin panel.
Use admin panel to setup the course and the questions for it.


## Installation

It needs docker/docker-compose to run postgres.

### Running the db

```
cd api
docker-compose up -d
```

### Build the client app.

```bash
cd web
yarn
yarn build
```

### Build the server

```bash
cd api
npm i
npm run build
npm run migration:run
```


## Running the app

```bash
# production mode
npm run start:prod
```

Go to `http://localhost:3000`


## Misc

```bash
# development
npm run start

# watch mode
npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Entities

- Course
    - id
    - title
    - description
- Question
    - id
    - title
    - description
    - details
        - options
        - correct

### Questions details/options

{"type":"select","options":["4", "5", "6", "7", "23"],"correct":1}
{"type":"select","options":["50", "5", "0", "1", "Division by zero is incorrect"],"correct":4}
{"type":"select","options":["5", "222", "23", "33"],"correct":2}
{"type":"select","options":["Ember", "Marionette", "Redux", "Flask", "Meteor"],"correct":3}
{"type":"select","options":["Mobile", "Web Server", "Web Client Application", "TCP/IP Server", "All of them"],"correct":4}


## TODO:

- bootstrap
- react native mobile client
- auth
- more question types: select, selectMany, match
- swagger



## License

Nest is [MIT licensed](LICENSE).
