import * as propertyService from "../services/property";
import { Request, Response } from "express";

export async function getAllProperties(req: Request, res: Response) {
  try {
    const properties = await propertyService.getAllProperties();
    res.json({ message: "Retrieval of availabilities successful", properties });
  } catch (err) {
    console.error("getAllProperties - ", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getPropertyManagersProperties(
  req: Request,
  res: Response
) {
  const id: number = Number(req.params.id);

  if (!id)
    return res.status(400).json({ error: "Missing Property Manager ID" });

  try {
    const properties = await propertyService.getPropertyManagersProperties(id);
    res.json({ message: "Retrieval of propertiess successful", properties });
  } catch (err) {
    console.error("getPropertyManagersProperties - ", err);
    res.status(500).json({ error: "Server error" });
  }
}
