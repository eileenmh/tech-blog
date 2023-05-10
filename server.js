import express from "express";
const app = express();

import { engine } from "express-handlebars";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000);
