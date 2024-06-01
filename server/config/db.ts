import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    console.log('MONGO_URI', MONGO_URI);

    if (!MONGO_URI) {
      throw new Error('MONGO_URI must be defined in the environment variables.');
    }

    const connection = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB is connected to: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
