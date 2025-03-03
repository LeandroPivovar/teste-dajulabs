import {FastifyInstance, FastifyPluginCallback} from 'fastify';
import {RefoundController} from '../controllers/RefoundController';

export const refoundRoutes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {
    const refoundController = new RefoundController();

    fastify.get('/', (request, reply) => {
        return refoundController.get(request, reply);
    });

    done();
}