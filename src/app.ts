import express, { Express } from 'express';
import cors from 'cors';
import authRoutes from './routes/authroutes'
import todoRoutes from './routes/todoRoutes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todo', todoRoutes)


// Health check root route
app.get('/', (_req, res) => {
  res.send(`
    🚀 Status: Online
    ⏱️ Uptime: ${Math.floor(process.uptime())} seconds
  `);
});

export default app;
