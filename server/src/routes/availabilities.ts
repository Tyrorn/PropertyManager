import { Router } from "express";

import * as availabilityController from "../controllers/availabilities";

const router = Router();

router.post(
  "/api/createAvailability",
  availabilityController.createAvailibility
);
router.post(
  "/api/deleteAvailability",
  availabilityController.deleteAvailibility
);
router.get("/api/availabilities", availabilityController.getAllAvailabilities);
router.get(
  "/api/pmAvailabilities/:id",
  availabilityController.getPropertyManagersAvailabilities
);
router.get(
  "/api/propertyAvailabilities/:id",
  availabilityController.getPropertyAvailabilities
);

export default router;
