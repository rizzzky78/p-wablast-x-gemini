const { client } = require("@database/connection");

const {
  mongoConfig: { databaseName, collection },
} = require("@config");

const Database = client.db(databaseName);

/**
 * @type { import("./schema").Router }
 */
const collections = {
  user: Database.collection(collection.user),
};

module.exports = { collections };
