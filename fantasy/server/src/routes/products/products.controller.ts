import { Request, Response } from "express";
import Product from "./products.model";

// 处理 GET 请求
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name } = req.query;
    const products = await Product.findAll({
      where: {
        ...(id && { id: id as string }),
        ...(name && { name: name as string }),
      },
    });
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch products" });
  }
};

// 处理 POST 请求
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price } = req.body;
    const newProduct = await Product.create({ name, price });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
};

// 处理 PUT 请求
export const putProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      Object.assign(product, req.body);
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
};
