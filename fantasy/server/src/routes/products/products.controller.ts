import { Request, Response } from "express";
import { Op } from "sequelize";
import Product from "./products.model";

// 搜索产品
export const searchProducts = async (req: Request, res: Response) => {
  const { query } = req.query; // 获取用户输入的搜索关键字
  console.log("query:", query);
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`, // 模糊匹配查询
        },
      },
      attributes: ["name"], // 仅返回必要的字段
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

// 获取产品及其规格信息
export const getProduct = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({
      where: { name: name },
      attributes: [
        "id",
        "name",
        "attribute",
        "quantity",
        "price",
        "condition",
        "brand",
        "category",
        "right_left_handed",
      ],
    });
    return res.status(200).json(product);
  } catch (error) {
    console.error("查询产品和规格时出错:", error);
    return res.status(400).json({ error: "查询产品和规格失败" });
  }
};

// 从数据库中筛选所有产品
export const queryProduct = async (req: Request, res: Response) => {
  const { category, brand, condition, handedness, minPrice, maxPrice } =
    req.query;
  const where: any = {};
  // 如果 category 不是 "All Categories"，则将其作为查询条件
  if (category && category !== "All Categories") {
    where.category = category;
  }
  // 如果 brand 是一个数组，将其作为查询条件
  if (brand) {
    if (Array.isArray(brand)) {
      where.brand = {
        [Op.in]: brand, // 如果 brand 是一个数组，使用 Op.in
      };
    } else {
      where.brand = brand;
    }
  }
  // 如果 minPrice 或 maxPrice 存在，将其作为查询条件
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) {
      where.price[Op.gte] = Number(minPrice);
    }
    if (maxPrice) {
      where.price[Op.lte] = Number(maxPrice);
    }
  }
  // 如果 condition 存在，将其作为查询条件
  if (condition) {
    if (Array.isArray(condition)) {
      where.condition = {
        [Op.in]: condition,
      };
    } else {
      where.condition = condition;
    }
  }
  // 如果 handedness 存在，将其作为查询条件
  if (handedness) {
    if (Array.isArray(handedness)) {
      where.right_left_handed = {
        [Op.in]: handedness,
      };
    } else {
      where.right_left_handed = handedness;
    }
  }

  try {
    const result = await Product.findAll({
      where: Object.keys(where).length > 0 ? where : undefined,
      attributes: [
        "name",
        "attribute",
        "quantity",
        "price",
        "condition",
        "brand",
        "category",
        "right_left_handed",
      ],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("查询产品和规格时出错:", error);
    return res.status(400).json({ message: error.message });
  }
};
