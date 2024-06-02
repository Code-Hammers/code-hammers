import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Check that MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined in the environment variables.');
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB is connected to: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('❌ Error connecting to the database ❌');
    }
    process.exit(1);
  }
};

export default connectDB;
