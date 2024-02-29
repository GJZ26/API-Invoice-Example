import express from "express";
import { accessController } from "./dependecies";

const userRouter = express.Router();

userRouter.post("/access", accessController.run.bind(accessController));

export default userRouter;
