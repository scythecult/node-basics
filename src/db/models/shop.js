import { DataTypes } from 'sequelize';
import { ModelName } from '../../common/enums/db.js';
import { ShopKey } from '../../common/enums/shop.js';

export const defineShopModel = (sequelize) =>
  sequelize.define(
    ModelName.Shop,
    {
      [ShopKey.PRODUCTS]: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
