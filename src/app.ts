import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import criptocRoute from '../routes/criptoc.route';
dotenv.config();

if (process.env.DB_URI) {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
} else {
  throw new Error(
    'DB_URI not defined make sure your env file exists and the DB_URI is assigned the mongodb url'
  );
}

const app = express();
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.on('open', () => console.log('Connected to database'));

app.use(express.json());
app.use('/criptoc', criptocRoute);

//all errors are handled below
app.get('*', function (req, res) {
  res.status(404).json({ message: 'No resource found at this location' });
});

app.listen(5000, () => console.log('server'));
