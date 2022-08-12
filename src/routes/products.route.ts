import { Router } from "express";
import * as controller from "../controllers/product.controller";
import { authGuard } from "../middlewares/auth.middleware";
import { productCheckEntries } from "../middlewares/products.middleware";

const router = Router();

router.get("/", controller.productControllerIndex);
router.get("/:id", controller.productControllerShow);
router.post(
  "/create",
  [authGuard, productCheckEntries],
  controller.productControllerCreate
);
router.get("/category/:category", controller.productControllerByCategory);

export default router;
