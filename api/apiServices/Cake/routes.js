const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//TODO VER CLOUDINARY

//$ POST Cake -> Entra un objeto por body de la forma {name:"Torta Mili", description:"noseque" , image : [image1,image2,...]}
//$ me quedo con name y description y lo agrego al modelo y el arr de imagenes ver con cloudinary
router.post("/", (req, res) => {
  try {
    //todo desarmar el body y res(200)
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ GET cake
router.get("/:cake_id", (req, res) => {});

//$ GET all cakes
router.get("/", (req, res) => {});

//$ UPDATE cake
router.put("/:cake_id", (req, res) => {});

//$ DELETE cake
router.delete("/:cake_id", (req, res) => {});

module.exports = router;
