const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

//$ Crear CATEGORIA (ageGroup,cover,decoration,floorCount,color)
//$ ej : entra un objeto por body de la forma { category : "color", data:{name:"Verde",code:"#24FF20"}} ó {category:"ageGroup",data:{name:"Infantil"}}
router.post("/", async (req, res) => {
  try {
    res.status(200).json({ status: await controller.createCategory(req.body) });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Obtiene una o todas las categorias dependiendo si existe o no query
//$ si existe query devuelve un objeto con el nombre de la categoria y todos los campos de esa categoria
//$ si no existe query devuelve un objeto con todas las categorias con todos los campos
//$ (con query) ej : GET /category?category="color" -> {color :{{color_id:1,name:"Verde",code:"#10FF10"},{color_id:2,name:"Rojo",code:"#FF1515"}}}
//$ (sin query) ej : GET /category                  -> {color :{...} , ageGroup : {...} , decoration :{...} , ...}
router.get("/", async (req, res) => {
  try {
    if (req.query) {
      res.status(200).json(await controller.getCategory(req.query));
    } else {
      res.status(200).json(await controller.getAllCategories());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Actualiza una CATEGORIA (ageGroup,cover,decoration,floorCount,color)
//$ ej : entra un objeto por body de la forma { category:"color",data:{color_id:1, name:"Verde", code:"10FF10"}} ó {category:"ageGroup",data:{ageGroup_id:1 ,name:"Infantiles"}}
router.put("/", async (req, res) => {
  try {
    res.status(200).json({ status: await controller.updateCategory(req.body) });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//$ Borra una CATEGORIA (ageGroup,cover,decoration,floorCount,color)
//$ ej : entra un objeto por body de la forma { category : "color", id : 1} ó {category : "ageGroup", id : 1}
router.delete("/", async (req, res) => {
  try {
    res.status(200).json({ status: await controller.deleteCategory(req.body) });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
