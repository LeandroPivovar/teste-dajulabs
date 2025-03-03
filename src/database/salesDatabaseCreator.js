import fs from "fs";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import path from "path";

// Converte o caminho do módulo ES para um caminho absoluto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constrói o caminho absoluto para o arquivo CSV
const filePath = path.resolve(__dirname, "./vendas_e_devolucoes.csv");

export function salesImport(db) {
  class SaleMovement {
    constructor(cd_produto, cd_empresa, in_estorno, nr_dctoorigem, value) {
      this.cd_produto = cd_produto;
      this.cd_empresa = cd_empresa;
      this.in_estorno = in_estorno === "T";
      this.nr_dctoorigem = nr_dctoorigem;
      this.value = value
    }

    insertDatabase() {
      return new Promise((resolve, reject) => {
        const insertQuery = `
          INSERT INTO sales (product_id, store_id, is_sales_reversal, doc_origin, value) 
          VALUES (?, ?, ?, ?, ?)
        `;

        db.run(
          insertQuery,
          [this.cd_produto, this.cd_empresa, this.in_estorno ? 1 : 0, this.nr_dctoorigem, this.value],
          (err) => {
            if (err) {
              console.error("Erro ao inserir venda no banco:", err.message);
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    }
  }

  const insertSales = async () => {
    const salesPromises = [];

    // Verifica se o arquivo existe antes de tentar lê-lo
    if (!fs.existsSync(filePath)) {
      console.error(`Arquivo CSV não encontrado: ${filePath}`);
      return;
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const saleMovement = new SaleMovement(
          row.cd_produto,
          row.cd_empresa,
          row.in_estorno,
          row.nr_dctoorigem,
          row.round
        );

        salesPromises.push(saleMovement.insertDatabase());
      })
      .on("end", async () => {
        try {
          await Promise.all(salesPromises);
          console.log("Leitura do arquivo concluída e dados inseridos com sucesso.");
        } catch (error) {
          console.error("Erro ao processar o arquivo CSV:", error);
        }
      })
      .on("error", (err) => {
        console.error("Erro ao ler o arquivo:", err);
      });
  };

  insertSales();
}