import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { ProductController } from "../controllers/product.controller";

const Router = express.Router();

Router.get("/products",authentification,authorization(["admin"]), (req, res) => {
    ProductController.getAllProducts(req, res);
});
Router.post("/addproduct",authentification,authorization(["admin"]),(req, res) => {
    ProductController.createProduct(req, res);
});
Router.put("/updateproduct/:id",authentification,authorization(["admin"]), (req, res) => {
    ProductController.updateProduct(req, res);
});
Router.delete("/deleteproduct/:id",authentification,authorization(["admin"]), (req, res) => {
    ProductController.deleteProduct(req, res);
});
    

export { Router as productRouter }

