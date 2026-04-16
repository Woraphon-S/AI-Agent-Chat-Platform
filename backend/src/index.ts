import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import prisma from './config/prisma';
import bcrypt from 'bcryptjs';
import morgan from 'morgan';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Auto-seed Admin User for Resume purposes with Retry logic
const seedAdmin = async (retries = 5) => {
  while (retries > 0) {
    try {
      const adminEmail = 'admin@example.com';
      const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
      
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
          data: {
            email: adminEmail,
            password: hashedPassword,
            name: 'Admin Portfolio'
          }
        });
      }
      break;
    } catch (error) {
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds
    }
  }
};

// API Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, async () => {
  await seedAdmin();
  console.log(`🚀 AI Agent Backend running on http://localhost:${PORT}`);
});
