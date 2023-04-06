const { Router } = require("express");
const controller = require("./controller");

const router = Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//! desde el front tienen que entrar una propiedad imgCount que tenga la cantidad de imagenes que hay en el array de files
//!
router.post("/", upload.array("file"), async (req, res) => {
  try {
    console.log("req.files", req.files);
    if (req.files) {
      const files = req.files;
      const urls = [];
      for (const f of files) {
        console.log("f");
        const response = await controller.uploadImage(f);
        urls.push(response);
        console.log("response", response);
      }
      //const newBody = await controller.uploadImage(req.body, req.files);
      res.status(200).send("newBody");
    } else {
      res.status(201).send("no file");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
