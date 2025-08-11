import express from "express";
import { loginUser } from "../services/authServices";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });

  try {
    const user = await loginUser(username, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // For POC: just return user info (no real token)
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("auth.ts -login - ", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
