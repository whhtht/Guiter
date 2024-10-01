import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db";
import Specification from "./specification.model";

class Product extends Model {
  public id!: string;
  public name!: string;
  public price!: string;
  public specification!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specification: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
  }
);

// 关联specification表
Product.belongsTo(Specification, {
  foreignKey: "specification", // 这个字段是 products 表中指向 specification 表的外键
  as: "specificationDetail", // 别名，用于引用关联的 specification 表数据
});

// 如果你需要反向关联，设置反向的关联
Specification.hasOne(Product, {
  foreignKey: "specification", // specification 表的主键与 products 表的外键一致
  as: "productDetail", // 别名，用于引用关联的 product 表数据
});

export default Product;
