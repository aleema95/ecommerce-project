import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("User", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }

  }, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  return User;
};