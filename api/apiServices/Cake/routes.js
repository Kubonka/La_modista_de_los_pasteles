const { Router } = require("express");
const controller = require("./controller");

const router = Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//TODO VER CLOUDINARY

//$ El usuario hace CLICK en "Agregar una torta" -> se hace un request POST para crear la torta ->
//$ -> se crea una torta vacia y se retorna el cake_id -> con ese cake_id se pasa
//$ al componente de modificacion y se trabaja normalmente

router.post("/", async (req, res) => {
  try {
    res.status(200).json({ cake_id: await controller.createCake() });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ UPDATE Cake -> Entra un objeto por body de la forma {cake_id:1, name:"Torta Mili", description:"noseque", createdBy:"veronica", public:false, tags:[] ,images : [image1,image2,...]}
//$ me quedo con name y description y lo agrego al modelo y el arr de imagenes ver con cloudinary
router.put("/", upload.any(), async (req, res) => {
  try {
    req.body.Tags = JSON.parse(req.body.tags);
    console.log("update ENTRA + req.files", req.files, ",", req.body);
    if (req.files.length > 0) {
      const body = req.body;
      body.images = [];
      //? PRIMERA IMAGEN
      let imageUrl = await controller.uploadImage(req.files[0]);
      if (imageUrl) {
        body.images.push({ name: imageUrl, mainImage: true });
      }
      if (req.files.length > 1) {
        //? LAS QUE SIGUEN
        for (let i = 1; i < req.files.length; i++) {
          const imageUrl = await controller.uploadImage(req.files[i]);
          body.images.push({ name: imageUrl, mainImage: false });
        }
      }
      res.status(200).json({ status: await controller.updateCake(body) });
    } else {
      //todo modificar normal sin files
      console.log("else");
      res.status(200).json({ status: await controller.updateCake(req.body) });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// router.post("/", upload.any(), async (req, res) => {
//   try {
//     //todo desarmar el body y res(200)
//     if (req.files) {
//       const body = req.body;
//       body.images = [];
//       //? PRIMERA IMAGEN
//       let imageUrl = await controller.uploadImage(req.files[0]);
//       if (imageUrl) {
//         body.images.push({ name: imageUrl, mainImage: true });
//       }
//       if (req.files.length > 1) {
//         //? LAS QUE SIGUEN
//         for (let i = 1; i < req.files.length; i++) {
//           const imageUrl = await controller.uploadImage(req.files[i]);
//           body.images.push({ name: imageUrl, mainImage: false });
//         }
//       }
//       res.status(200).json({ status: await controller.createCake(body) });
//     } else {
//       res.status(400).send("NO FILES DETECTED");
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

//$ GET cake
router.get("/:cake_id", async (req, res) => {
  console.log("entra");
  try {
    const { cake_id } = req.params;
    console.log(cake_id);
    res.status(200).json(await controller.getCake(cake_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ GET all cakes
router.get("/", (req, res) => {});

//$ DELETE cake
router.delete("/:cake_id", (req, res) => {});

module.exports = router;
