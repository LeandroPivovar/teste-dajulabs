import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface SaleAttributes {
  id: number;
  product_id: number;
  store_id: number;
  is_sales_reversal: boolean;
  doc_origin?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type SaleCreationAttributes = Optional<SaleAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export default (sequelize: Sequelize) => {
  class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
    public id!: number;
    public product_id!: number;
    public store_id!: number;
    public is_sales_reversal!: boolean;
    public doc_origin!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Sale.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_sales_reversal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      doc_origin: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Sale',
      tableName: 'sales', 
      timestamps: true, 
    }
  );

  return Sale;
};