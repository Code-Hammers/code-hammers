import mongoose from "mongoose";
import GraduateInvitation from "../../server/models/graduateInvitationModel";
import crypto from "crypto";

const alumniList = [
  { email: "jane@codehammers.com", firstName: "Jane", lastName: "Doh" },
  { email: "john@codehammers.com", firstName: "John", lastName: "Doh" },
];

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

export const seedDatabase = async () => {
  await GraduateInvitation.deleteMany();

  const invitations = alumniList.map((alumnus) => ({
    email: alumnus.email,
    token: generateToken(),
    tokenExpiry: new Date(Date.now() + 48 * 60 * 60 * 1000),
    isRegistered: false,
    createdAt: new Date(),
    firstName: alumnus.firstName,
    lastName: alumnus.lastName,
    lastEmailSent: new Date(),
  }));

  try {
    await GraduateInvitation.insertMany(invitations);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
