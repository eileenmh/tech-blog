const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", {
    logged_in: req.session.logged_in,
  });
});

router.get("/article/:id", (req, res) => {
  res.render("article", {
    logged_in: req.session.logged_in,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    logged_in: req.session.logged_in,
  });
});

router.get("/new-post", (req, res) => {
  res.render("new-post", {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
