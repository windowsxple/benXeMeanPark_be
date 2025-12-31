import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();

// Use createRequire to import CommonJS module
const require = createRequire(import.meta.url);

// Import PrismaClient from @prisma/client (Prisma 5)
const prismaPkg = require('@prisma/client');
const PrismaClientClass = prismaPkg.PrismaClient;

if (!PrismaClientClass || typeof PrismaClientClass !== 'function') {
  throw new Error('PrismaClient not found. Make sure to run "npm run prisma:generate"');
}

// PrismaClient singleton instance
let prismaInstance;

// Initialize Prisma Client
function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClientClass({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
      errorFormat: 'pretty',
    });

    // Handle connection events (if needed)
    // Note: $on is mainly for query events, errors are handled by error handler
  }
  
  return prismaInstance;
}

// Export singleton instance
export const prisma = getPrismaClient();

// Helper function to disconnect Prisma Client
export async function disconnectPrisma() {
  if (prisma) {
    await prisma.$disconnect();
    console.log('Prisma Client disconnected');
  }
}

// Helper function to connect Prisma Client
export async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log('Prisma Client connected');
    return true;
  } catch (error) {
    console.error('Failed to connect Prisma Client:', error);
    return false;
  }
}

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}

// Graceful shutdown handler
export async function gracefulShutdown() {
  console.log('Shutting down Prisma Client...');
  await disconnectPrisma();
  process.exit(0);
}

// Handle process termination
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await disconnectPrisma();
  });

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

export default prisma;
