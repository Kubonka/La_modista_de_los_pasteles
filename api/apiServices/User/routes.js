const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

//$ entra por body un username y un password
router.post("/", (req, res) => {
  try {
    {
      const { username, password } = req.body;
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/:user_id", (req, res) => {});
router.get("/", (req, res) => {});
router.delete("/:user_id", (req, res) => {});
router.put(":/user_id", (req, res) => {});
module.exports = router;
