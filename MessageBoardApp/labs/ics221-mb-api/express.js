import './db.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api-router.js';

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

// Routing
app.get('/', (req, res) => {
    res.send('Node.js Server is live!');
});
app.use('/v1', apiRouter);

export default app;