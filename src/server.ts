import fastify from 'fastify';
import { refoundRoutes } from './routes/refoundRoutes';

const app = fastify();

app.register(refoundRoutes)

const start = async () => {
  try {
    await app.listen({ port: 3040 });
    console.log('🚀 Server is Running!');
  } catch (err) {
    console.error(err);
    process.exit(1);
    
  }
};

start();