const { Router } = require("express");
const router = Router();
const testUpload = require("../apiServices/testUpload/routes.js");
const cake = require("../apiServices/Cake/routes.js");
const tag = require("../apiServices/Tag/routes.js");
//const products = require("../apiServices/product/routes.js");

router.use("/testupload", testUpload);
router.use("/cake", cake);
router.use("/tag", tag);
//router.use(generateTestUsername);
//router.use("/refresh", refresh);

module.exports = router;
