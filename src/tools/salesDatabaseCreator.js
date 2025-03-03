import fs from "fs";
import csv from "csv-parser";
import db from "../database/connection.js";

export function salesImport() {
  class SaleMovement {
    constructor(cd_produto, cd_empresa, in_estorno, nr_dctoorigem) {
      this.cd_produto = cd_produto;
      this.cd_empresa = cd_empresa;
      this.in_estorno = in_estorno === "T";
      this.nr_dctoorigem = isNaN(parseInt(nr_dctoorigem)) ? null : parseInt(nr_dctoorigem);
    }

    insertDatabase() {
      return new Promise((resolve, reject) => {
        const insertQuery = `
          INSERT INTO sales (product_id, store_id, is_sales_reversal, doc_origin) 
          VALUES (?, ?, ?, ?)
        `;

        db.run(
          insertQuery,
          [this.cd_produto, this.cd_empresa, this.in_estorno ? 1 : 0, this.nr_dctoorigem],
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

    fs.createReadStream("./vendas_e_devoluções.csv")
      .pipe(csv())
      .on("data", (row) => {
        const saleMovement = new SaleMovement(
          row.cd_produto,
          row.cd_empresa,
          row.in_estorno,
          row.nr_dctoorigem
        );

        salesPromises.push(saleMovement.insertDatabase());
      })
      .on("end", async () => {
        try {
          await Promise.all(salesPromises);
          console.log("Leitura do arquivo concluída e dados inseridos com sucesso.");
        } catch (error) {
          console.error("Erro ao processar o arquivo CSV:", error);
        } finally {
          db.close();
        }
      })
      .on("error", (err) => {
        console.error("Erro ao ler o arquivo:", err);
      });
  };

  insertSales();
}

salesImport()