const router = require("express").Router();
const { Article, Comment } = require("../../models");

router.post("/create", async (req, res) => {
  try {
    articleData = await Article.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user_id,
    });

    res.status(200);
  } catch (err) {
    console.log("err: ", err);
    res.status(400).json(err);
  }
});

router.post("/comment", async (req, res) => {
  try {
    Comment.create({
      content: req.body.comment,
      articleId: req.body.articleId,
      userId: req.session.user_id,
    });
  } catch (err) {
    console.log("err: ", err);
    res.status(400).json(err);
  }
});

module.exports = router;
