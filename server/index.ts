import app from './app';
import connectDB from './config/db';

const PORT: number = Number(process.env.PORT) || 3000;

// Hazzah!
const hazzah = process.env.NODE_ENV === 'development' ? 'Hazzah! ' : '';

export const startServer = () => {
  // Connect to MongoDB
  connectDB();

  // Startup the server
  return app.listen(PORT, () =>
    console.log(`💥 ${hazzah}Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
  );
};

if (require.main === module) {
  startServer();
}
