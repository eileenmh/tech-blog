const path = require("path");
const sequelize = require("./config/connection");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// const models = require("./models");

const { engine } = require("express-handlebars");
const routes = require("./controllers");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Now listening at http://localhost:${PORT}/`)
    );
  })
  .catch((err) => console.error("Unable to create table: ", err));
