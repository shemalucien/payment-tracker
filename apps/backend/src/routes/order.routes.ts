import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import {  OrderController } from "../controllers/order.controller";

const Router = express.Router();

Router.get(
    "/orders",
    authentification,
    authorization(["admin"]), (req, res) => {
        OrderController.getAllOrders(req, res);
    }
  );
  

    

export { Router as orderRouter }
