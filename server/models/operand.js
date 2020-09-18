'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Operand.init({
    value: DataTypes.NUMBER,
    calcId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Operand',
  });
  return Operand;
};