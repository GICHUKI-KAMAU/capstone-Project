import express from 'express';
import authRoutes from './routes/authRoutes';
import cookieParser  from 'cookie-parser'
import { courseRoutes } from './routes/courseRoutes';
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', authRoutes);
app.use('/api/v1', courseRoutes);

export default app;
