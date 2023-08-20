import db from "utils/db";
import fs from "fs";
import cloudinary from "cloudinary";
import Product from "models/Product";

cloudinary.config({
  cloud_name: "dlg56csae",
  api_key: "687679453475659",
  api_secret: "Qkm3JvSzC5o6ROmKsUAu4R1OJ8o",
});

export const uploadProducts = async (req, res) => {
  await db.conectDb();

  let images = [];

  try {

    let files = Object.values(req.files).flat();

    const data = JSON.parse(req.body.data);

    for (const file of files) {
      const result = await uploadToCloudinary(file.path);
      images.push(result);
    }

    const product = await Product({
      ...data,
      category: data.category,
      imgUrl: images[0].url,
    });

    const result = await product.save();

     console.log(result);

    fs.unlinkSync(files[0].path);
    // upload product
    res.status(200).json({
      ok: true,
      message: "product inserted successfully!",
      data: result,
    });
  } catch (err) {
    // await cloudinary.v2.uploader.destroy(images[0].public_url);
    res.status(500).json({ ok: false, message: err.message });
  }
};

// const removeTmp = (path) => {
//   fs.unlink(path, (err) => {
//     if (err) throw err;
//   });
// };

export const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: "products",
      },
      (error, result) => {
        if (error) {
          fs.unlinkSync(file);
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_url: result.public_id,
          });
        }
      }
    );
  });
};
