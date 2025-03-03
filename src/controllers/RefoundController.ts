import { RefoundService } from '../service/RefoundService';

export class RefoundController {

  public async get(request: any, reply: any) {
    try {
      const db = request.server.db;
      const refoundService = new RefoundService(db)

      const transactions = await refoundService.getAllTransactions();
      return reply.status(200).send(transactions);
    } catch (error) {
      console.error('Error fetching sales:', error);
      return reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
}