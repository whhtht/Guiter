import { Request, Response } from "express";
import Product from "../products/products.model";
import Specification from "../products/specification.model";

// 处理 GET 请求，获取所有的产品数据
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.query;
    const products = await Product.findAll({
      where: {
        ...(id && { id: id as string }),
        ...(name && { name: name as string }),
      },
      include: [
        {
          model: Specification, // 关联specification表
          as: "specificationDetail", // 设置别名
        },
      ],
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

// 处理 GET 请求，获取所有的规格数据
export const getSpecification = async (req: Request, res: Response) => {
  try {
    // 查询所有规格数据
    const specification = await Specification.findAll();
    res.status(200).json(specification);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error });
  }
};

// 处理 POST 请求，添加产品和规格数据
export const addProduct = async (req: Request, res: Response) => {
  const {
    Condition,
    Brand,
    Model,
    Finish,
    Categories,
    Year,
    Series,
    fretboardmaterial,
    pickupconfiguration,
    scalelength,
    bodyshape,
    rightorlefthanded,
    numberofstrings,
    neckmaterial,
    colorfamily,
    modelfamily,
    finishstyle,
    bodytype,
    offsetbody,
    bridgeortailpiecetype,
    neckconstruction,
    numberoffrets,
    name,
    price,
  } = req.body;

  try {
    // 添加规格到specification表
    const newSpecification = await Specification.create({
      Condition,
      Brand,
      Model,
      Finish,
      Categories,
      Year,
      Series,
      fretboardmaterial,
      pickupconfiguration,
      scalelength,
      bodyshape,
      rightorlefthanded,
      numberofstrings,
      neckmaterial,
      colorfamily,
      modelfamily,
      finishstyle,
      bodytype,
      offsetbody,
      bridgeortailpiecetype,
      neckconstruction,
      numberoffrets,
    });

    // 添加产品到product表并与规格关联
    const newProduct = await Product.create({
      name,
      price,
      specification: newSpecification.id, // 关联的规格ID
    });

    // 返回成功响应
    return res.status(201).json({
      message: "产品和规格添加成功",
      product: newProduct,
      specification: newSpecification,
    });
  } catch (error) {
    console.error("添加产品或规格时出错", error);
    return res.status(500).json({ error: "添加产品或规格失败" });
  }
};
