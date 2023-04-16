const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

//$ entra por body un username y un password
router.post("/", async (req, res) => {
  try {
    {
      const { username, password } = req.body;
      if (username && password) {
        res
          .status(200)
          .json({ status: await controller.createUser(username, password) });
      } else {
        res.status(200).json({ status: "FAIL" });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    if (user_id) res.status(200).json(await controller.getUserById(user_id));
    else res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    if (user_id)
      res.status(200).json({ status: await controller.deleteUser(user_id) });
    else res.sendStatus(400);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
