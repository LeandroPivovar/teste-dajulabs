import { Sale, TransactionSale, TransactionRefund, Transaction, ResultItem } from '../interfaces';

export class RefoundService {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  public async getChargebacks(): Promise<Sale[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM sales WHERE is_sales_reversal = 1', (err: any, rows: Sale[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  public async getOriginalSale(chargeback: Sale): Promise<Sale | undefined> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM sales WHERE is_sales_reversal = 0 AND product_id = ${chargeback.product_id} AND store_id = ${chargeback.store_id} AND doc_origin = ${chargeback.doc_origin}`,
        (err: any, rows: Sale[]) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  }

  public formatTransaction(index: number, chargeback: Sale, sale: Sale | undefined): ResultItem {
    return {
      invoice: String(index + 1),
      transacation: {
        sale: {
          product: sale?.product_id || null,
          company: sale?.store_id || null,
          is_reversal: false,
          value: sale?.value || null,
        },
        refund: {
          product: chargeback.product_id,
          company: chargeback.store_id,
          is_reversal: true,
          value: chargeback.value,
        },
      },
    };
  }

  public async getAllTransactions(): Promise<ResultItem[]> {
    const chargebacks = await this.getChargebacks();
    const result: ResultItem[] = [];

    for (const [index, chargeback] of chargebacks.entries()) {
      const sale = await this.getOriginalSale(chargeback);
      const formattedTransaction = this.formatTransaction(index, chargeback, sale);
      result.push(formattedTransaction);
    }

    return result;
  }
}