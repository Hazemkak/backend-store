import { Router } from "express";
import * as controller from "../controllers/order.controller";

const router = Router();

// TODO: auth is required
router.get("/active/:user_id", controller.orderControllerActive);
router.get("/complete/:user_id", controller.orderControllerComplete);

export default router;
