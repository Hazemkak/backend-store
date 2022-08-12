import { Router } from "express";
import * as controller from "../controllers/order.controller";
import { authGuard } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", [authGuard], controller.orderControllerCreate);
router.get("/active/:user_id", [authGuard], controller.orderControllerActive);
router.get(
  "/complete/:user_id",
  [authGuard],
  controller.orderControllerComplete
);

export default router;
