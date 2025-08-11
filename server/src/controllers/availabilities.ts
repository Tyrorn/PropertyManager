import * as availabilityService from "../services/availabilities";
import { Request, Response } from "express";

export async function getAllAvailabilities(req: Request, res: Response) {
  try {
    const availabilities = await availabilityService.getAllAvailabilities();
    res.json(availabilities);
  } catch (err) {
    console.error("getAllAvailabilities - ", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getPropertyManagersAvailabilities(
  req: Request,
  res: Response
) {
  const id: number = Number(req.params.id);

  if (!id)
    return res.status(400).json({ error: "Missing Property Manager ID" });

  try {
    const availabilities = await availabilityService.getPMAvailabilities(id);
    res.json({
      message: "Retrieval of availabilities successful",
      availabilities,
    });
  } catch (err) {
    console.error("getPropertyManagersAvailabilities - ", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteAvailibility(req: Request, res: Response) {
  const { availabilityId } = req.body;

  if (!availabilityId)
    return res.status(400).json({ error: "No Availability ID provided" });

  await availabilityService.deleteAvailibility(availabilityId);

  res.json({ message: "Availability deleted" });

  try {
  } catch (err) {
    console.error("deleteAvailibility - ", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createAvailibility(req: Request, res: Response) {
  const {
    propertyManagerId,
    date,
    startTime,
    endTime,
  }: availabilityService.Availability = req.body.availability;

  if (!propertyManagerId || !startTime || !endTime || !date)
    //TODO add more refined error handling so user knows whats missing
    return res.status(400).json({ error: "Fields are missing" });

  //TODO clean data and add data checks

  await availabilityService.createAvailabilitiy({
    propertyManagerId,
    date,
    startTime,
    endTime,
  });

  res.json({ message: "Availability saved" });

  try {
  } catch (err) {
    console.error("createAvailibility - ", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getPropertyAvailabilities(req: Request, res: Response) {
  const id: number = Number(req.params.id);

  if (!id) return res.status(400).json({ error: "Missing Property ID" });

  try {
    const availabilities =
      await availabilityService.getUnbookedAvailabilitiesByProperty(id);
    res.json({
      message: "Retrieval of availabilities successful",
      availabilities,
    });
  } catch (err) {
    console.error("getPropertyAvailabilities - ", err);
    res.status(500).json({ error: "Server error" });
  }
}
