import path from "path";
import express, { Request, Response, Application, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./controllers/errorControllers";

dotenv.config();

const app: Application = express();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

console.log(`ENV BEFORE CHECK: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === "test") {
  console.log(`SERVER STARTED IN PRODUCTION`);
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
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
