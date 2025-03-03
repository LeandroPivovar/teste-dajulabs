import sqlite3 from "sqlite3";
import { salesImport } from "./salesDatabaseCreator.js";

sqlite3.verbose();

const createTable = (db) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        store_id TEXT NOT NULL,
        is_sales_reversal INTEGER NOT NULL,
        doc_origin TEXT,
        value FLOAT
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Erro ao criar a tabela:", err.message);
    } else {
      console.log('Tabela "sales" criada com sucesso.');

      salesImport(db);
    }
  });
};

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    createTable(db);
  }
});

export default db;