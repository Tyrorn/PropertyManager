const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type Availability = {
  propertyManagerId: number;
  date: string;
  startTime: string;
  endTime: string;
};

export async function createAvailabilitiy(availability: Availability) {
  const response = await fetch(`${VITE_BACKEND_URL}/api/createAvailability`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ availability }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "createAvailabilitiy failed");
  }

  return response.json();
}

export async function getPMAvailabilities(id: number) {
  const response = await fetch(
    `${VITE_BACKEND_URL}/api/pmAvailabilities/${id}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error retrieving managed availabilities");
  }

  return response.json();
}

export async function getPropertyAvailabilities(id: number) {
  const response = await fetch(
    `${VITE_BACKEND_URL}/api/propertyAvailabilities/${id}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error retrieving property availabilities");
  }

  return response.json();
}
