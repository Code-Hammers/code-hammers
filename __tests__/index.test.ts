import request from "supertest";
import app from "../server/index";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(done);
});

import mongoose from "mongoose";

afterAll(async () => {
  if (server && server.close) {
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  }

  await mongoose.connection.close();
});

describe("API Endpoints", () => {
  it("should get the API Running message", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "API Running - Hazzah!");
  });
});
