import { DataTypes, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums/db.js';
import { PromocodeKey } from '../../common/enums/promocode.js';

export const defineCartModel = (sequelize: Sequelize) =>
  sequelize.define(
    ModelName.CART,
    {
      [PromocodeKey.ID]: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      [PromocodeKey.VALUE]: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: 'CHECK',
      },
      [PromocodeKey.DISCOUNT_AMOUNT]: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: 10,
      },
    },
    { timestamps: false }
  );
