const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL!');
    return prisma;
  } catch (err) {
    console.error(err.message);
    process.exit(-1);
  }
};

module.exports = { connectDB, prisma };

