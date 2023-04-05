const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

//$ Crear TAG (infantil,casamiento,disney,deportes,etc)
//$ ej : entra un objeto por body de la forma {name : "infantil", color:"#FF00FFF" (tal vez) , ...}
router.post("/", async (req, res) => {
  try {
    res.status(200).json({ status: await controller.createTag(req.body) });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Obtiene una o todas las TAGS dependiendo si existe o no query (el query puede ser de cualquier tipo mientras que sea "unique", tag_id,name por lo pronto)
//$ si existe query devuelve un objeto con la TAG y todos los campos de esa TAG
//$ si no existe query devuelve un objeto con todas las TAGS con todos los campos de esas TAGS
//$ (con query) ej : GET /tag?name="infantil" -> {tag_id:1,name:"infantil",color:"#FF00FF",...}
//$ (sin query) ej : GET /tag                -> {{tag_id:1,name:"infantil,color:"#FF00FF"},{tag_id:2,name:"bodas",color:"#FF0000"},...}
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      res.status(200).json(await controller.getTag(req.query));
    } else {
      res.status(200).json(await controller.getAllTags());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Actualiza una TAG ("infantiles","bodas",etc)
//$ ej : entra un objeto por body de la forma { tag_id:1, name:"infantil" , color:"#FFFFFF"}
router.put("/", async (req, res) => {
  try {
    res.status(200).json({ status: await controller.updateTag(req.body) });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Borra una TAG ("infantiles","bodas") -> ESTA PARTE PUEDE SER EN CASCADA SI ESE ES EL PROPOSITO
//$ ej : entra un objeto por body de la forma { category : "color", id : 1} ó {category : "ageGroup", id : 1}
router.delete("/", async (req, res) => {
  try {
    res.status(200).json({ status: await controller.deleteTag(req.body) });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
