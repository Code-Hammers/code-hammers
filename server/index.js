const path = require('path');
const express = require('express') ;
const userRoutes = require('./routes/userRoutes.js') ;

const connectDB = require('./config/db.js') ;
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js') ;
const dotenv = ('dotenv');


dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);




const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/api', (req, res) => {
    res.json({message: 'API Running - Hazzah!'})
  })
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000 ;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);