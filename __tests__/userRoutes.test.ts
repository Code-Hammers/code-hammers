import request from "supertest";
import app from "../server/index";
import { Server } from "http";
import mongoose from "mongoose";
let server: Server;

beforeAll((done) => {
  server = app.listen(done);
});

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

describe("User Routes", () => {
  describe("POST /api/users/login", () => {
    it("should login a user", async () => {
      const mockUserData = {
        email: "sean@test.mail",
        password: "123456",
      };

      const res = await request(app)
        .post("/api/users/login")
        .send(mockUserData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("email");
    });
  });

  describe("POST /api/users/register", () => {
    it("should register a user", async () => {
      const mockNewUserData = {
        name: "John Doe",
        email: "john@test.com",
        password: "testpassword",
      };

      const res = await request(app)
        .post("/api/users/register")
        .send(mockNewUserData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("email");
    });
  });
});
