import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../errors';

const connectDB = async (mongoUri: string) => {
  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`🍃 MongoDB is connected to: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw new DatabaseConnectionError();
  }
};

export default connectDB;
