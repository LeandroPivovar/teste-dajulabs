import db from '../models';

export class RefoundController {
  public async get(request: any, reply: any) {
    try {
      const sales = await db.Sale.findAll();
      return reply.send(sales);
    } catch (error) {
      console.error('Error fetching sales:', error);
      return reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
}