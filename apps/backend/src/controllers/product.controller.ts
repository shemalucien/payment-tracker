import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Product } from "../entity/Product.entity";

export class ProductController {

  static async getAllProducts(req: Request, res: Response) {
    const data = await AppDataSource.manager.find(Product);
    return res.status(200).json({ data });  
}
  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  }

  static async createProduct(req: Request, res: Response) {
    const { name, description, price } = req.body;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    await AppDataSource.manager.save(product);

    return res.status(200).json({ message: "Product created successfully", product });
  }

  static async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });
    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      await AppDataSource.manager.save(product);
      return res.status(200).json({ message: "Product updated successfully", product });
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
   
    const { id } = req.params;
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });
    if (product) {
        await AppDataSource.manager.remove(product);
        return res.status(200).json({ message: "Product deleted successfully" });
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
  }
}
