import { createRouter } from "next-connect";
// import { imgMiddleware } from "middleware/imgMiddleware";
import Product from "models/Product";
import db from "utils/db";
import upload from "utils/multer";
import { uploadProducts } from "../controller/uploadProducts";

const uploadMiddleware = upload.array("files");

// prevetn default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

router
  .use(uploadMiddleware)
  // .use(
  //   fileUpload({
  //     useTempFiles: true,
  //   })
  // )
  // .use(imgMiddleware)

  .get(async (req, res) => {
    await db.conectDb();

    try {
      const products = await Product.find().populate("category");

      // upload product
      res.status(200).json({
        status: "success",
        message: "product inserted successfully!",
        data: products,
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: err.message });
    }
  })

  .post(uploadProducts);

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
