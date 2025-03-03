import fastify from 'fastify';
import cors from '@fastify/cors';
import { refoundRoutes } from './routes/refoundRoutes';
import db from './database/connection.js';

const app = fastify();

app.register(cors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

app.decorate('db', db);

app.register(refoundRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3080 });
    console.log('🚀 Server is Running!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();