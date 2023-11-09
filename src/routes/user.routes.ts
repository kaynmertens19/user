import { Router } from "express";
import userRegisterDTO from "../dto/user-register.dto";
import { Request, Response } from "express";
import userLoginDTO from "../dto/user-login.dto";
import updateDataDTO from "../dto/user-update-data.dto";
import updateEmailDTO from "../dto/user-update-email.dto";
import updatePasswordDTO from "../dto/user-update-password.dto";
import userUnRegisterDTO from "../dto/user-unregister.dto";
import userJWTDTO from "../dto/user-jwt.dto";

const userRouter = Router();

userRouter.post("/register", userRegisterDTO)
userRouter.post("/login",userLoginDTO );
userRouter.get("/profile", userJWTDTO);
userRouter.patch("/update-data", userJWTDTO, updateDataDTO );
userRouter.patch("/update-email", userJWTDTO,updateEmailDTO );
userRouter.patch("/update-password", userJWTDTO, updatePasswordDTO );
userRouter.delete("/unregister", userJWTDTO, userUnRegisterDTO );

export default userRouter;