import mongoose from "mongoose";
import GraduateInvitation from "../../server/models/graduateInvitationModel";
import crypto from "crypto";

const alumniList = [
  { email: "J@email.com", name: "Jane Doe" },
  { email: "Jh@email.com", name: "John Doe" },
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
    name: alumnus.name,
    lastEmailSent: new Date(),
  }));

  try {
    await GraduateInvitation.insertMany(invitations);
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
