import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Database/Database.js";
import authRouter from "./Router/authRouter.js";
import chatRouter from "./Router/ChatRouter.js";
import messageRouter from "./Router/messageRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.get("/", (req, res) => {
  res.send("server is Working");
});

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  ConnectDB();
  console.log(`Server is running on port ${PORT}`);
});
