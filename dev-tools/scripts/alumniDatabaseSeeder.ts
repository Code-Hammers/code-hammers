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
  const existingInvitations = await GraduateInvitation.find();

  const newInvitations = [];

  for (const alumnus of alumniList) {
    const existingInvitation = existingInvitations.find(
      (invitation) => invitation.email === alumnus.email
    );

    if (existingInvitation && !existingInvitation.isRegistered) {
      existingInvitation.token = generateToken();
      existingInvitation.tokenExpiry = new Date(
        Date.now() + 72 * 60 * 60 * 1000
      );
      existingInvitation.lastEmailSent = new Date();
    } else if (!existingInvitation) {
      newInvitations.push({
        email: alumnus.email,
        token: generateToken(),
        tokenExpiry: new Date(Date.now() + 48 * 60 * 60 * 1000),
        isRegistered: false,
        createdAt: new Date(),
        firstName: alumnus.firstName,
        lastName: alumnus.lastName,
        lastEmailSent: new Date(),
      });
    }
  }

  if (newInvitations.length > 0) {
    try {
      await GraduateInvitation.insertMany(newInvitations);
      console.log(
        `${newInvitations.length} new invitations added to adatabse.`
      );
    } catch (error) {
      console.error("Error adding new invitations:", error);
    }
  }

  console.log("Database seeded successfully");
};
