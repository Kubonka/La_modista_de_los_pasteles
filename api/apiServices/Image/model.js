const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Image",
    {
      image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isFirst: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};
