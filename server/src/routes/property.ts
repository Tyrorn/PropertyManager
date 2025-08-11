import { Router } from "express";

import * as propertyController from "../controllers/property";

const router = Router();

router.get("/api/properties", propertyController.getAllProperties);
router.get(
  "/api/managedProperties/:id",
  propertyController.getPropertyManagersProperties
);

export default router;
