import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/new", userController.newForm);
router.post("/", userController.create);

export default router;