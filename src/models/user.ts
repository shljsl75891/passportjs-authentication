import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/database.js";
import { IUser } from "../types.js";

export default class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements IUser
{
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare hash: string;
  declare salt: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
      validate: {
        isAlpha: { msg: "First name must contains only alphabetic characters" },
        max: 10,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
      validate: {
        isAlpha: { msg: "Last name must contains only alphabetic characters" },
        max: 10,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email must be valid" },
      },
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" },
);
