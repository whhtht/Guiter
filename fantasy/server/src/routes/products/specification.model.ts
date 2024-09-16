import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";

class Specification extends Model {
  public id!: string;
  public Condition!: string;
  public Brand!: string;
  public Model!: string;
  public Finish!: string;
  public Categories!: string;
  public Year!: string;
  public Series!: string;
  public "Fretboard Material"!: string;
  public "Pickup Configuration"!: string;
  public "Scale Length"!: string;
  public "Body Shape"!: string;
  public "Right/Left Handed"!: string;
  public "Number of Strings"!: string;
  public "Neck Material"!: string;
  public "Color Family"!: string;
  public "Model Family"!: string;
  public "Finish Style"!: string;
  public "Body Type"!: string;
  public "Offset Body"!: string;
  public "Bridge/Tailpiece Type"!: string;
  public "Neck Construction"!: string;
  public "Number of Frets"!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Specification.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Finish: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Categories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Series: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "Fretboard Material": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Fretboard Material",
    },
    "Pickup Configuration": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Pickup Configuration",
    },
    "Scale Length": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Scale Length",
    },
    "Body Shape": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Body Shape",
    },
    "Right/Left Handed": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Right/Left Handed",
    },
    "Number of Strings": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Number Of Strings",
    },
    "Neck Material": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Neck Material",
    },
    "Color Family": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Color Family",
    },
    "Model Family": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Model Family",
    },
    "Finish Style": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Finish Style",
    },
    "Body Type": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Body Type",
    },
    "Offset Body": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Offset Body",
    },
    "Bridge/Tailpiece Type": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Bridge/Tailpiece Type",
    },
    "Neck Construction": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Neck Construction",
    },
    "Number of Frets": {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Number Of Frets",
    },
  },
  {
    sequelize,
    modelName: "Specification",
    tableName: "specification",
  }
);

export default Specification;
