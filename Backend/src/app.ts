import express from 'express';
import cors from 'cors';

import UserRouter from './routes';
import { mongoConnect } from './database/mongodb';

mongoConnect();

const app = express();

app.use(express.json());
app.use(cors());
app.use(UserRouter);

export default app;
