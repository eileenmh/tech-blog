const router = require("express").Router();
const { User } = require("../../models");

router.post("/username", async (req, res) => {
  try {
    usernameExists = await User.findOne({
      where: { username: req.body.username },
    });

    if (usernameExists) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ message: "You are now logged in!" });
    });
  } catch (err) {
    console.log("err: ", err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username, password: req.body.password },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;