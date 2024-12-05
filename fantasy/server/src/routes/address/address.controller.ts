import { Request, Response } from "express";
import Address from "./address.model";

// 获取保留的地址
export const getAddress = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  try {
    const address = await Address.findAll({ where: { userId } });
    if (address.length === 0) {
      res.status(200).json({ saveAddress: false });
    } else {
      res.status(200).json({ address, saveAddress: true });
    }
  } catch (error) {
    res.status(400).json({ message: "Cannot connect to address database" });
  }
};

// 保存地址
export const postAddress = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, country, province, city, postalCode } =
      req.body;
    const userId = res.locals.userId;
    Address.create({
      userId,
      name,
      phone,
      address,
      country,
      province,
      city,
      postalCode,
    });
    const result = await Address.findAll({ where: { userId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Cannot connect to address database" });
  }
};

// 修改地址
export const changeAddress = async (req: Request, res: Response) => {
  try {
    const {
      newname,
      newphone,
      newaddress,
      newcountry,
      newprovince,
      newcity,
      newpostalcode,
    } = req.body;
    const userId = res.locals.userId;
    Address.update(
      {
        name: newname,
        phone: newphone,
        address: newaddress,
        country: newcountry,
        province: newprovince,
        city: newcity,
        postalCode: newpostalcode,
      },
      { where: { userId } }
    );
    res.status(200).json({ message: "Address change successfully" });
  } catch (error) {
    res.status(400).json({ message: "Cannot connect to address database" });
  }
};
