import * as bookingService from "../services/bookings";
import { Request, Response } from "express";

export async function createBooking(req: Request, res: Response) {
  const { availabilityId, tenantID, propertyId }: bookingService.Booking =
    req.body.newBooking;

  if (!availabilityId || !tenantID || !propertyId)
    //TODO add more refined error handling so user knows whats missing
    return res.status(400).json({ error: "Fields are missing" });

  //TODO add data checks
  await bookingService.createBooking({
    availabilityId,
    tenantID,
    propertyId,
  });

  res.json({ message: "Booking saved" });

  try {
  } catch (err) {
    console.error("createBooking - ", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getTenantBookings(req: Request, res: Response) {
  const id: number = Number(req.params.id);

  if (!id)
    return res.status(400).json({ error: "Missing Property Manager ID" });

  try {
    const bookings = await bookingService.getUserBookings(id);
    res.json({
      message: "Retrieval of bookings successful",
      bookings,
    });
  } catch (err) {
    console.error("getTenantBookings - ", err);
    res.status(500).json({ error: "Server error" });
  }
}
