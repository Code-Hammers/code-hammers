import path from "path";
import express, { Request, Response, Application, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";
import authRoutes from "./routes/authRoutes";
import imageRoutes from "./routes/imageRoutes";
import alumniRoutes from "./routes/alumniRoutes";
import forumRoutes from "./routes/forumRoutes";
import devRoutes from "./routes/devRoutes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./controllers/errorControllers";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/devRoutes", devRoutes);

console.log(`ENV BEFORE CHECK: ${process.env.NODE_ENV}`);
console.log("TEST");
console.log(path.join(__dirname, "../../client/build"));
console.log(path.resolve(__dirname, "../../client/build/index.html"));

if (process.env.NODE_ENV === "production") {
  console.log(`SERVER STARTED IN PRODUCTION`);
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "../../client/build/index.html"))
  );
} else {
  console.log("SERVER STARTED IN DEV");
  app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "API Running - Hazzah!" });
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 3000;

export const startServer = () => {
  return app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
};

if (require.main === module) {
  startServer();
}

export default app;
