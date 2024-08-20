import { Request, Response } from "express";
import Product from "./products.model";

// 处理 GET 请求
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name } = req.query;
    if (id) {
      const product = await Product.findByPk(id as string);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: "Product not found by Id" });
      }
    } else if (name) {
      const product = await Product.findOne({ where: { name } });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(400).json({ error: "Product not found by name" });
      }
    } else {
      const products = await Product.findAll();
      res.status(200).json(products);
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
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await Product.findByPk(id);
    if (product) {
      product.name = name;
      product.price = price;
      await product.save();
      res.status(200).json(product);
      console.log("product", product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
};
