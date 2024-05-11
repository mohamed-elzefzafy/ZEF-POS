import express from "express";
import { verifyIsLoggedIn } from "../middlewares/authMiddleware.js";
import { createBill, getAllBills, getOneBill } from "../controllers/billController.js";
const router = express.Router();





router.use(verifyIsLoggedIn);
router.route("/").get(getAllBills);
router.route("/create-bill").post(createBill);
router.route("/get-one-bill/:id").get(getOneBill);





export default router;