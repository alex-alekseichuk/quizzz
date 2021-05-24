module.exports = {
  "type": "postgres",
  "localhost": "localhost",
  "port": 5432,
  "database": "quizzz",
  "username": "admin",
  "password": "admin",
  "entities": ["dist/**/*.entity.js", ],
  "synchronize": false,
  "migrationsTableName": "migrations",
  "migrations": ["dist/db/migrations/*.js"],
  "cli": {
    "migrationsDir": "src/db/migrations"
  },
  logging: true
};