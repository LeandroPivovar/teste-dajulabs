export class RefoundController {
  public async get(request: any, reply: any) {
    try {
      return 'Sucesso';
    } catch (error) {
      console.error('Error fetching sales:', error);
      return reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
}