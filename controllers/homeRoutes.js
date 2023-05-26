const router = require("express").Router();
const { Sequelize } = require("sequelize");
const { Article, User } = require("../models");

// Homepage
router.get("/", async (req, res) => {
  let articleData = await Article.findAll({
    raw: true,
    include: {
      model: User,
    },
  });

  res.render("home", {
    articles: articleData,
    logged_in: req.session.logged_in,
  });
});

// load one article
router.get("/article/:id", async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id);
    const article = articleData.get({ plain: true });

    res.render("article", {
      logged_in: req.session.logged_in,
      article,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
