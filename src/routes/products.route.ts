import { Router } from "express";
import * as controller from "../controllers/product.controller";

const router = Router();

router.get("/", controller.productControllerIndex);
router.get("/:id", controller.productControllerShow);
// TODO: auth required
router.post("/create", controller.productControllerCreate);
router.get("/top_five", controller.productControllerTopFive);
router.get("/top_five/:category", controller.productControllerByCategory);

export default router;
