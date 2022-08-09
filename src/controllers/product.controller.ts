import { Request, Response } from "express";
import { ProductModel } from "../models/products.model";

const productControllerIndex = async (req: Request, res: Response) => {
  try {
    const productModel = new ProductModel();
    const products = await productModel.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(`error while getting products ${error}`);
  }
};

const productControllerShow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productModel = new ProductModel();
    const product = await productModel.show(id);
    if (!product)
      res.status(400).json({ message: `product ${id} isn't found` });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(`error while getting product ${error}`);
  }
};

const productControllerCreate = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    const productModel = new ProductModel();
    const product = await productModel.create({
      name,
      price,
      category,
    });
    res
      .status(200)
      .json({ message: `Product is created successfully`, product });
  } catch (error) {
    res.status(500).json(`error while creating product ${error}`);
  }
};

const productControllerTopFive = async (req: Request, res: Response) => {
  try {
    const productModel = new ProductModel();
    const products = await productModel.findTopFive();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(`error while getting top 5 product ${error}`);
  }
};

const productControllerByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const productModel = new ProductModel();
    const products = await productModel.findByCategory(category);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(`error while getting products ${error}`);
  }
};

export {
  productControllerShow,
  productControllerIndex,
  productControllerCreate,
  productControllerTopFive,
  productControllerByCategory,
};
