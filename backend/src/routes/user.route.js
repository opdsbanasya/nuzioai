import express from "express";
import { savePreferences } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/preferences", savePreferences);

export default userRouter;
