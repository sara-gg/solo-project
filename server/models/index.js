"use strict";

require("dotenv").config();
const path = require("path");

const fs = require("fs");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// const DBNAME = process.env.DB_TEST_DBNAME;
// const USER = process.env.DB_TEST_USER;
// const PASSWORD = process.env.DB_TEST_PASSWORD;

const db = {};

const sequelize = new Sequelize("solo_db_test", "postgres", "1234", {
  dialect: "postgres",
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
