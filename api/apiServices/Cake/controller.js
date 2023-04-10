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

async function updateCake(body) {
  try {
    console.log("body", body);
    const { cake_id, name, description, public, images, Tags } = body;
    console.log("cake_id", cake_id);
    const [rows, [cake]] = await Cake.update(
      { name, description, public },
      { where: { cake_id }, returning: true }
    );
    console.log("pasa el primer update");
    if (images) {
      for (const image of images) {
        console.log("image.name", image.name);
        console.log("image.name.url", image.name.url);
        await cake.createImage({
          name: image.name.url,
          mainImage: image.mainImage,
        });
      }
    }
    if (Tags.length > 0) {
      await cake.setTags(Tags);
    }
    console.log("pasa el SET update");
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
    console.log(error);
    throw new Error(error.message);
  }
}

//! DEVELOMPENT
async function updateCakeOffline(body) {
  try {
    console.log("body", body);
    const { cake_id, name, description, public, images, Tags } = body;
    console.log("cake_id", cake_id);
    const [rows, [cake]] = await Cake.update(
      { name, description, public },
      { where: { cake_id }, returning: true }
    );
    console.log("pasa el primer update");
    if (images) {
      for (const image of images) {
        console.log("image.name", image.name);
        console.log("image.name.url", image.name.url);
        await cake.createImage({
          name: image.name,
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

async function uploadImageOffline(file) {
  return file.path;
}

module.exports = {
  uploadImage,
  createCake,
  getCake,
  updateCake,
  updateCakeOffline,
  uploadImageOffline,
};
