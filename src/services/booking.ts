const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type Booking = {
  availabilityId: number;
  tenantID: number;
  propertyId: number;
};

export async function createBooking(newBooking: Booking) {
  const response = await fetch(`${VITE_BACKEND_URL}/api/createBooking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newBooking }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "createBooking failed");
  }

  return response.json();
}

export async function getTenantBookings(id: number) {
  const response = await fetch(`${VITE_BACKEND_URL}/api/tenantBookings/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error retrieving managed availabilities");
  }

  return response.json();
}
