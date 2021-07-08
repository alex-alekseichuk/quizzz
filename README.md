# Quizzz application.

There is server side + admin panel in `api` subdir.
It's based on nest.js + AdminBro for admin panel.
There are TypeORM and migrations to use postgres db.
AdminBro is auto generated web panel to manage data based on TypeORM entities/models.
Use admin panel to setup the course and the questions for it.

http://localhost:3000 for client app.
http://localhost:3000/admin for admin panel.

There is client web app in `web` subdir.
It's a react app with react-router and axios for http client layer.
It's implemented by react hooks.
It can be started in development mode to run against separated api server
or built into `api/client` and served as static part from the same http server.

## TODO:

- bootstrap
- mobile client react native
- auth and users
- more question types: select, selectMany, match
- swagger




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


## Running the app locally

```bash
# production mode
npm run start:prod
```

Go to `http://localhost:3000`



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


## License

Nest is [MIT licensed](LICENSE).
