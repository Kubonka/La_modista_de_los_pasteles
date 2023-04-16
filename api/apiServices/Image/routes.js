const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.put("/", async (req, res) => {
  try {
    const { image_id, cake_id } = req.query;
    if (image_id && cake_id) {
      res
        .status(200)
        .json({ status: await controller.setMainImage(image_id, cake_id) });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/:image_id", async (req, res) => {
  try {
    const { image_id } = req.params;
    if (image_id) {
      res.status(200).json({ status: await controller.deleteImage(image_id) });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
