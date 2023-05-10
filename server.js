const express = require("express");
const app = express();

const { engine } = require("express-handlebars");
const routes = require("./controllers");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(routes);

app.listen(3000);
