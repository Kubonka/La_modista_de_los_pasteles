const { Router } = require("express");
const router = Router();
const testUpload = require("../apiServices/testUpload/routes.js");
//const products = require("../apiServices/product/routes.js");

router.use("/testupload", testUpload);
//router.use(generateTestUsername);
//router.use("/refresh", refresh);

//router.use("/verify", verify);

module.exports = router;
