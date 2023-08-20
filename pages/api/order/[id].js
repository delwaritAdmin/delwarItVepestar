import { createRouter } from "next-connect";
import db from "utils/db";
import Order from "models/Order";

const router = createRouter();

router
  .put(async (req, res) => {
    // await db.conectDb();

    try {
      const id = req.query.id;
      const { status } = req.body;

      const updateStatus = await Order.findOneAndUpdate(
        { _id: id },
        { $set: { orderStatus: status } },
        { new: true }
      );

      res.status(200).json({
        ok: true,
        message: "order created successfully!",
        data: updateStatus,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: "order not instered!",
        error: err.message,
      });
    }
  })
  .delete(async (req, res) => {
    // await db.conectDb();

    try {
      const id = req.query.id;

      const deletetedData = await Order.deleteOne({_id:id});

      res.status(200).json({
        ok: true,
        message: "order created successfully!",
        data: deletetedData,
      });

    } catch (err) {

      res.status(500).json({
        ok: false,
        message: "order not instered!",
        error: err.message,
      });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
