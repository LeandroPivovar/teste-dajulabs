import db from './connection.js';

function runMigrations() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id TEXT NOT NULL,
            store_id TEXT NOT NULL,
            is_sales_reversal INTEGER NOT NULL,
            doc_origin TEXT
        )
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err.message);
        } else {
            console.log('Tabela "sales" criada com sucesso.');
        }
    });
}

runMigrations()