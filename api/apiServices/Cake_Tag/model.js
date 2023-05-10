const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cake_Tag",
    {
      cake_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Cake",
          key: "cake_id",
          onDelete: "CASCADE",
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tag",
          key: "tag_id",
          onDelete: "CASCADE",
        },
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
