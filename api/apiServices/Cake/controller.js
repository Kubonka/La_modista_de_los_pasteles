const { Cake, Tag, Image } = require("../../services/db/db");
const cloudinary = require("../../services/cloudinary");
//https://res.cloudinary.com/dlj3kr7pb/image/upload/v1680740485/LaModistaDeLosPasteles/k2ra7eoop354bmh1w2e8.png

async function createCake() {
  try {
    const cake = await Cake.create({});
    return cake.cake_id;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllCakes() {
  try {
    const allCakes = await Cake.findAll({
      include: [{ model: Image }, { model: Tag }],
      order: [["cake_id", "ASC"]],
    });
    console.log("allCakes", allCakes);
    return allCakes;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateCake(body) {
  try {
    const { cake_id, name, description, public, images, Tags } = body;
    const [rows, [cake]] = await Cake.update(
      { name, description, public },
      { where: { cake_id }, returning: true }
    );
    if (images) {
      for (const image of images) {
        await cake.createImage({
          name: image.name.url,
          mainImage: image.mainImage,
        });
      }
    }
    if (Tags.length > 0) {
      await cake.setTags(Tags);
    }
    return "SUCCESS";
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

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
          resolve({ url: result.url });
        }
      );
      stream.end(file.buffer);
    } catch (error) {
      reject(new Error({ error: error.message }));
    }
  });
}

async function getCake(cake_id) {
  try {
    const cake = await Cake.findOne({
      where: { cake_id },
      include: [{ model: Tag }, { model: Image }],
    });
    return cake;
  } catch (error) {
    return "FAIL";
    //throw new Error(error.message);
  }
}

async function deleteCake(cake_id) {
  try {
    const deletedCake = await Cake.destroy({ where: { cake_id } });
    if (deletedCake) return "SUCCESS";
    return "FAIL";
  } catch (error) {
    throw new Error(error.message);
  }
}

//! DEVELOMPENT
async function updateCakeOffline(body) {
  try {
    const { cake_id, description, public, Images, Tags } = body;
    const [rows, [cake]] = await Cake.update(
      { description, public },
      { where: { cake_id }, returning: true }
    );
    if (Object.keys(Images).length > 0) {
      for (const image of Images) {
        if (image.deleted) {
          const imagesFound = await cake.getImages();
          for (let i = 0; i < imagesFound.length; i++) {
            const imgFound = imagesFound[i];
            if (imgFound.image_id === image.image_id) {
              imgFound.destroy();
            }
          }
        } else if (image.uploaded) {
          await cake.createImage({
            name: image.name,
            mainImage: image.mainImage || false,
          });
        }
      }
    }
    const tagsIds = Tags.map((tag) => tag.tag_id);
    await cake.setTags(tagsIds);
    return "SUCCESS";
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

async function uploadImageOffline(file) {
  console.log("file -> ", file);
  return "http://localhost:3001/uploads/" + file.filename;
}

module.exports = {
  uploadImage,
  createCake,
  getAllCakes,
  getCake,
  updateCake,
  updateCakeOffline,
  uploadImageOffline,
  deleteCake,
};
