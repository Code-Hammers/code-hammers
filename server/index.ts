import app from './app';
import connectDB from './config/db';

const PORT: number = Number(process.env.PORT) || 3000;

// Hazzah!
const hazzah = process.env.NODE_ENV === 'development' ? 'Hazzah! ' : '';

export const startServer = async () => {
  // Environment variable checks
  if (!process.env.JWT_SECRET) throw Error('❌ JWT_SECRET must be defined!');
  if (!process.env.MONGO_URI) throw Error('❌ MONGO_URI must be defined!');
  if (!process.env.POSTGRES_USER) throw Error('❌ POSTGRES_USER must be defined!');
  if (!process.env.POSTGRES_DB) throw Error('❌ POSTGRES_DB must be defined!');
  if (!process.env.POSTGRES_PASSWORD) throw Error('❌ POSTGRES_PASSWORD must be defined!');

  // Connect to MongoDB
  await connectDB(process.env.MONGO_URI);

  // Startup the server
  return app.listen(PORT, () =>
    console.log(`💥 ${hazzah}Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
  );
};

if (require.main === module) {
  startServer();
}
