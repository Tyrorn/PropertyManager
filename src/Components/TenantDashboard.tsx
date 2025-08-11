import { useEffect, useState } from "react";
import type { User } from "../Types/User";
import BookingTable from "./BookingTable";
import { getAllProperties } from "../services/propertyService";
import type { Property as PropertyType } from "../Types/Property";
import ManagedProperties from "./ManagedProperties";
import { getPropertyAvailabilities } from "../services/availability";
import type { TimeSlot as TimeSlotType } from "../Types/TimeSlots";
import {
  createBooking,
  getTenantBookings,
  type Booking as BookingType,
} from "../services/booking";

type TenantDashboardProps = {
  user: User | null;
};

export default function TenantDashboard({ user }: TenantDashboardProps) {
  const [properties, setProperties] = useState<Array<PropertyType>>([]);
  const [availabilities, setAvailabilities] = useState<Array<TimeSlotType>>([]);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyType["id"]>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const propertiesResponse = await getAllProperties();
        setProperties(propertiesResponse.properties);
      } catch (err) {
        console.error("Error fetching Data-", err);
      }
    }
    fetchData();
  }, [user]);

  async function handleOnSelect(id: PropertyType["id"]) {
    setSelectedProperty(id);
  }

  useEffect(() => {
    try {
      _resetAvailabilitiesTable();
    } catch (err) {
      console.error("Error getting availabilities", err);
      setAvailabilities([]);
    }
  }, [selectedProperty, user]);

  async function _resetAvailabilitiesTable() {
    let availabilities = [];
    if (selectedProperty) {
      const availabilitiesResponse = await getPropertyAvailabilities(
        selectedProperty
      );
      availabilities = availabilitiesResponse.availabilities;
    }
    const bookingResponse = await getTenantBookings(user!.id);

    const timeSlots = bookingResponse.bookings.concat(availabilities);

    setAvailabilities(timeSlots);
  }

  async function onClickBookNow(id: TimeSlotType["id"]) {
    const newBooking: BookingType = {
      availabilityId: id,
      tenantID: user!.id,
      propertyId: selectedProperty,
    };
    console.log("booking -", id);
    try {
      await createBooking(newBooking);
      //if Successful update and bookings
      _resetAvailabilitiesTable();
    } catch (err) {
      console.error("Erroring creating a new booking", err);
    }
  }

  return (
    <main className="flex flex-1 gap-4 overflow-auto p-4">
      <aside className="w-1/5 h-full">
        <ManagedProperties
          propertyList={properties}
          onSelect={handleOnSelect}
        />
      </aside>
      <section className="flex-1 overflow-auto">
        <BookingTable data={availabilities} onClick={onClickBookNow} />
      </section>
    </main>
  );
}
