import { useState } from "react";
import type { Property } from "../Types/Property";
import type { TimeSlot } from "../Types/TimeSlots";
import {
  getPMAvailabilities,
  type Availability,
  createAvailabilitiy,
} from "../services/availability";
import { getManagedProperties } from "../services/propertyService";
import type { User } from "../Types/User";

export function useAvailabilityModal(user: User) {
  const [availabilities, setAvailabilities] = useState<Array<TimeSlot>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [properties, setProperties] = useState<Array<Property>>([]);

  async function fetchData() {
    try {
      const propertiesResponse = await getManagedProperties(user.id);
      const availabilityResponse = await getPMAvailabilities(user.id);

      setProperties(propertiesResponse.properties);
      setAvailabilities(availabilityResponse.availabilities);
    } catch (err) {
      console.error("Error fetching Data-", err);
    }
  }

  function _sortTimeSlots(timeSlots: TimeSlot[]): TimeSlot[] {
    return [...timeSlots].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime(); // ascending
    });
  }

  async function handleNewAvailability(timeSlot: TimeSlot) {
    const availability: Availability = {
      propertyManagerId: user.id,
      date: timeSlot.date,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
    }; //TODO can clean up by adding a function to transform data, may be useful

    try {
      await createAvailabilitiy(availability);
      const sortedTimeSlots = _sortTimeSlots([timeSlot, ...availabilities]);
      setAvailabilities(sortedTimeSlots);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    availabilities,
    modalOpen,
    properties,
    setModalOpen,
    handleNewAvailability,
    fetchData,
  };
}
