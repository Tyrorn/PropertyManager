import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import property from "./routes/property";
import availabilities from "./routes/availabilities";
import booking from "./routes/booking";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", property);
app.use("/", availabilities);
app.use("/", booking);

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
