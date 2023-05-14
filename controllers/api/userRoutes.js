const router = require("express").Router();
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log("err: ", err);
    res.status(400).json(err);
  }
});

module.exports = router;
