import e from "express";
import { userDataValidationMiddleware } from "../middlewares/userDataValidation.js";
import { loginController, registerController } from "../controllers/auth.controller.js";



const authRouter = e.Router();

authRouter.post("/users/register", userDataValidationMiddleware, registerController);
authRouter.post("/users/login", loginController);

export default authRouter;