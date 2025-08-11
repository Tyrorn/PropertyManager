import { Router } from "express";

import * as BookingController from "../controllers/booking";

const router = Router();
router.post("/api/createBooking", BookingController.createBooking);
router.get("/api/tenantBookings/:id", BookingController.getTenantBookings);

export default router;
