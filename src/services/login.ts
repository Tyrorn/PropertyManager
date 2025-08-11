const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function loginUser(
  username: string,
  password: string | undefined
) {
  const response = await fetch(`${VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  return response.json();
}
