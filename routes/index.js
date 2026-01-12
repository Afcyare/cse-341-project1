const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("asc");
});

router.use('/users', require('./users'))


module.exports = router;
