export interface Sale {
    product_id: number;
    store_id: number;
    value: number;
    doc_origin: number;
    is_sales_reversal: number;
  }
  
  export interface TransactionSale {
    product: number | null;
    company: number | null;
    is_reversal: boolean;
    value: number | null;
  }
  
  export interface TransactionRefund {
    product: number;
    company: number;
    is_reversal: boolean;
    value: number;
  }
  
  export interface Transaction {
    sale: TransactionSale;
    refund: TransactionRefund;
  }
  
  export interface ResultItem {
    invoice: string;
    transacation: Transaction;
  }