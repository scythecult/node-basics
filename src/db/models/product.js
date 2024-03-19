import { DataTypes } from 'sequelize';
import { ModelName } from '../../common/enums/db.js';
import { ProductKey } from '../../common/enums/product.js';

export const defineProductModel = (sequelize) =>
  sequelize.define(ModelName.PRODUCT, {
    [ProductKey.ID]: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    [ProductKey.TITLE]: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: 'Book',
    },
    [ProductKey.PRICE]: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: 23,
    },
    [ProductKey.DESCRIPTION]: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'A very interesting Book',
    },
    [ProductKey.IMAGE_SRC]: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://checl.net',
    },
  });
