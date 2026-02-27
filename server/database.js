const path = require("path");
const Datastore = require("nedb-promises");

const tasks = Datastore.create({
  filename: path.join(__dirname, "data", "tasks.db"),
  autoload: true,
  timestampData: true,
});

module.exports = { tasks };