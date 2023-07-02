const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Sequelize } = require("sequelize");
const { Article, User } = require("../models");

// Homepage
router.get("/", async (req, res) => {
  let articleData = await Article.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  const articles = articleData.map((article) => article.get({ plain: true }));

  res.render("home", {
    articles,
    logged_in: req.session.logged_in,
  });
});

// load one article
router.get("/article/:id", async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "createdAt"],
        },
      ],
    });
    const article = articleData.get({ plain: true });
    console.log(article);

    const createdByUser = article.userId === req.session.user_id;

    res.render("article", {
      logged_in: req.session.logged_in,
      article,
      createdByUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// edit one article
router.get("/article/:id/edit", async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "createdAt"],
        },
      ],
    });
    const article = articleData.get({ plain: true });
    console.log(article);

    res.render("edit-post", {
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

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    let articleData = await Article.findAll({
      where: { userId: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const articles = articleData.map((article) => article.get({ plain: true }));

    res.render("dashboard", {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/new-post", (req, res) => {
  res.render("new-post", {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
