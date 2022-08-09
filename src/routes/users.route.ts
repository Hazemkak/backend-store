import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { userCheckEntries } from "../middlewares/users.middleware";

const router = Router();

router.get("/", controller.userControllerIndex);
router.get("/:id", controller.userControllerShow);
router.post("/create", [userCheckEntries], controller.userControllerCreate);
router.post("/login", [userCheckEntries], controller.userControllerLogin);

export default router;
