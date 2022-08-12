import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { authGuard } from "../middlewares/auth.middleware";
import { userCheckEntries } from "../middlewares/users.middleware";

const router = Router();

router.get("/", [authGuard], controller.userControllerIndex);
router.get("/:id", [authGuard], controller.userControllerShow);
router.post("/create", [userCheckEntries], controller.userControllerCreate);
router.post("/login", controller.userControllerLogin);

export default router;
