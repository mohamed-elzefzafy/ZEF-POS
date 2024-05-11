import express from "express";
import { addItem, deleteItem, getItems, getOneItem, updateItem } from "../controllers/itemsController.js";
import photoUpload from './../middlewares/photoUploadMiddleWare.js';
const router = express.Router();



router.route("/").get(getItems);
router.route("/create-item").post(photoUpload.single("image") ,  addItem);
router.route("/delete-items/:id").delete(deleteItem);
router.route("/update-item/:id").put(photoUpload.single("image") ,  updateItem);
router.route("/get-one-item/:id").get(getOneItem);





export default router;