import { Request, Response } from "express";
import { Product, Specification } from "./products.model";

// 获取产品及其规格信息
export const getProduct = async (req: Request, res: Response) => {
  const { name } = req.params; // 获取产品名称
  try {
    // 查询产品并关联specification表的信息
    const product = await Product.findOne({
      where: { name: name }, // 根据产品名称查询
      include: [
        {
          model: Specification, // 关联specification表
          as: "specificationDetail", // 设置别名
        },
      ],
    });
    if (product) {
      return res.status(200).json(product); // 返回产品和规格信息
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("查询产品和规格时出错:", error);
    return res.status(500).json({ error: "查询产品和规格失败" });
  }
};
