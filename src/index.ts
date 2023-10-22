import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

// Corrected MongoDB connection URL
const MONGO_URL = 'mongodb://127.0.0.1:27017/Danidb';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
  .catch((error: Error) => {
    console.error(error);
  });

app.use('/', router());
