const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllProperties() {
  const response = await fetch(`${VITE_BACKEND_URL}/api/properties`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error retrieving properties");
  }

  return response.json();
}

export async function getManagedProperties(id: number) {
  const response = await fetch(
    `${VITE_BACKEND_URL}/api/managedProperties/${id}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error retrieving managed properties");
  }

  return response.json();
}
