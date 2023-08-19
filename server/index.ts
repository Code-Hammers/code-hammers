import path from "path";
import express, { Request, Response, Application, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMIddleWare";

dotenv.config();

const app: Application = express();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "API Running - Hazzah!" });
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 3000;

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
}

export default app;
