import { createRouter } from "next-connect";
import db from "utils/db";
import Cate from "models/Cate";

const router = createRouter();

router
  .get(async (req, res) => {
    await db.conectDb();

    try {
      const categorys = await Cate.find();

      res.status(200).json({
        ok: true,
        message: "Cetegory Find Successfully!",
        data: categorys,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Data not instered!",
        error: err.message,
      });
    }
  })
  .post(async (req, res) => {
    await db.conectDb();
    try {
      res.status(200).json({
        ok: true,
        message: "product inserted successfully!",
        data: "hello",
      });
    } catch (err) {
      // await cloudinary.v2.uploader.destroy(images[0].public_url);
      res.status(500).json({ ok: false, message: err.message });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
