import { Router } from "express";
import userRegisterDTO from "../dto/user-register.dto";
import userLoginDTO from "../dto/user-login.dto";
import updateDataDTO from "../dto/user-update-data.dto";
import updateEmailDTO from "../dto/user-update-email.dto";
import updatePasswordDTO from "../dto/user-update-password.dto";
import userUnRegisterDTO from "../dto/user-unregister.dto";
import userJWTDTO from "../dto/user-jwt.dto";
import userRegisterController from "../controllers/user-register.controller";
import { userLoginController } from "../controllers/user-login.controller";
import userProfileController from "../controllers/user-profile.controller";
import userUpdateDataController from "../controllers/user-UpdateData.controller";
import userUpdateEmailController from "../controllers/user-UpdateData.controller";
import userUpdatePasswordController from "../controllers/user-UpdateData.controller";
import userUnregisterController from "../controllers/user-Unregister.controller";
import checkUser from "../controllers/check-user";


const userRouter = Router();

userRouter.post("/register", userRegisterDTO, userRegisterController)
 userRouter.post("/login", userLoginDTO,  userLoginController);
 userRouter.get("/profile", userJWTDTO, userProfileController);
 userRouter.patch("/update-data", userJWTDTO, updateDataDTO,  userUpdateDataController);
 userRouter.patch("/update-email", userJWTDTO,updateEmailDTO, userUpdateEmailController );
 userRouter.patch("/update-password", userJWTDTO, updatePasswordDTO, userUpdatePasswordController  );
 userRouter.delete("/unregister", userJWTDTO, userUnRegisterDTO, userUnregisterController );
 userRouter.post("/check", checkUser )

export default userRouter;