import type { User } from "./User";

export type TimeSlot = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  username?: User["username"];
  contactNumber?: number;
  status?: string;
  propertyAddress?: string;
};
