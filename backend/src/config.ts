import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name',
  nodeEnv: process.env.NODE_ENV || 'development',
}; 