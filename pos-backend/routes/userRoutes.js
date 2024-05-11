import express from "express";
import { deleteUser, getAllUsers, getLoggedUserProfile, getOneUserByAdmin, login, logout, register, toggleupdateUserVerifiedStatusByAdmin, updateUserProfile } from "../controllers/userController.js";
import photoUpload from './../middlewares/photoUploadMiddleWare.js';
import { verifyIsLoggedIn, verifyIsSuperAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/register").post( photoUpload.single("profilePhoto") , register);
router.route("/login").post( login);
router.route("/logout").post(logout);

router.use(verifyIsLoggedIn);
router.route("/loggedUser").get(getLoggedUserProfile);
router.route("/profile").put( photoUpload.single("profilePhoto") , updateUserProfile);
router.use(verifyIsSuperAdmin);
router.route("/").get(getAllUsers);
router.route("/get-one-user/:id").get(getOneUserByAdmin);
router.route("/toggle-update-user-status-verified/:id").put(toggleupdateUserVerifiedStatusByAdmin);
router.route("/delete-user/:id").delete(deleteUser);

export default router;