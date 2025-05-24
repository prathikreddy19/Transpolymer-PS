import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoute.js";
import searchHistoryRoute from "./routes/searchHistoryRoute.js";
import resetRequestRoute from "./routes/resetRequestRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import connectDB from "./db/connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;  // Default to 4000 to avoid React conflict

connectDB();

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend to connect
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/search-history", searchHistoryRoute);
app.use("/api/reset-request", resetRequestRoute);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("Welcome to Transpolymer API"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
