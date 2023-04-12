const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/:carrousel_id", async (req, res) => {
  try {
    const { carrousel_id } = req.params;
    res.status(200).json(await controller.getCarrousel(carrousel_id));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
