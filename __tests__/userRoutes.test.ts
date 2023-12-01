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
  describe("POST /api/users/register", () => {
    it("should register a user", async () => {
      const mockNewUserData = {
        firstName: "John",
        lastName: "Doh",
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

  describe("POST /api/users/login", () => {
    it("should login a user", async () => {
      const mockUserData = {
        email: "john@test.com",
        password: "testpassword",
      };

      const res = await request(app)
        .post("/api/users/login")
        .send(mockUserData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("email");
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get a specific user", async () => {
      // Create a user first
      const newUser = {
        firstName: "Test",
        lastName: "User",
        email: "testuser@test.com",
        password: "password123",
      };
      let createUserResponse = await request(app)
        .post("/api/users/register")
        .send(newUser);

      const userId = createUserResponse.body._id;

      // Now get the created user by ID
      const res = await request(app).get(`/api/users/${userId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("email");
      expect(res.body.email).toEqual(newUser.email);

      await request(app).delete(`/api/users/${newUser.email}`);
    });
  });

  describe("DELETE /api/users/:email", () => {
    it("should delete a specific user by email", async () => {
      const email = "john@test.com";

      const res = await request(app).delete(`/api/users/${email}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.msg).toEqual("User successfully deleted!");
    });
  });
});
