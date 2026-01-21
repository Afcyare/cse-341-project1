const router = require("express").Router();
router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  //#swagger.tags=['asc']
  res.send("asc");
});

router.use("/users", require("./users"));

module.exports = router;
