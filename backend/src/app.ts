import express from 'express';
import authRoutes from './routes/authRoutes';
import cookieParser  from 'cookie-parser'
import { courseRoutes } from './routes/courseRoutes';
import enrollmentRoutes from "./routes/enrollmentRoutes"
import assignmentRoutes from './routes/assignmentRoutes';

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', authRoutes);
app.use('/api/v1', courseRoutes);
app.use('/api/v1', enrollmentRoutes);
app.use('/api/v1', assignmentRoutes);
export default app;
