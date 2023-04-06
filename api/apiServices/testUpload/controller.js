const cloudinary = require("../../services/cloudinary");
//https://res.cloudinary.com/dlj3kr7pb/image/upload/v1680740485/LaModistaDeLosPasteles/k2ra7eoop354bmh1w2e8.png
async function uploadImage(file) {
  //TODO hacer un await de uno solo y despues un promise all de los que restan
  return new Promise((resolve, reject) => {
    try {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "LaModistaDeLosPasteles",
          format: "png",
        },
        function (error, result) {
          if (error) {
            reject(new Error(error.message));
          }
          //image: result.url,
          console.log(result);
          resolve({ url: result.url });
        }
      );
      stream.end(file.buffer);
    } catch (error) {
      reject(new Error({ error: error.message }));
    }
  });
}
// async function uploadImage(body, file) {
//   //TODO hacer un await de uno solo y despues un promise all de los que restan
//   return new Promise((resolve, reject) => {
//     try {
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "image",
//           folder: "LaModistaDeLosPasteles",
//           format: "png",
//         },
//         function (error, result) {
//           if (error) {
//             reject(new Error(error.message));
//           }
//           body = {
//             ...body,
//             price: parseInt(body.price),
//             stock: parseInt(body.stock),
//             image: result.url,
//           };
//           resolve(body);
//         }
//       );
//       stream.end(file.buffer);
//     } catch (error) {
//       reject(new Error({ error: error.message }));
//     }
//   });
// }

/*    const cloudinaryImageUploadMethod = async file => {
      return new Promise(resolve => {
          cloudinary.uploader.upload( file , (err, res) => {
            if (err) return res.status(500).send("upload image error")
              resolve({
                res: res.secure_url
              }) 
            }
          ) 
      })
    }
    
    router.post("/", upload.array("img", 3 ), async (req, res) => {

        const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethod(path);
          urls.push(newPath);
        }
        
        const product = new Product({ 
          name: req.body.name,
          productImages: urls.map( url => url.res ),
        });

     }*/
module.exports = { uploadImage };
