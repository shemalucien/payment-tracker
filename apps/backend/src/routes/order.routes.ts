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

  Router.get(
    "/orders/:id",
    authentification,
    authorization(["admin"]), (req, res) => {
        OrderController.getOrderById(req, res);
    }
  );
  Router.post(
    "/orders",
    authentification,
    authorization(["admin"]), (req, res) => {
        OrderController.createOrder(req, res);
    }
  );

  Router.put(
    "/orders/:id",
    authentification,
    authorization(["admin"]), (req, res) => {
        OrderController.updateOrder(req, res);
    }
  );
  Router.delete(
    "/orders/:id",
    authentification,
    authorization(["admin"]), (req, res) => {
        OrderController.deleteOrder(req, res);
    }
  );
  

    

export { Router as orderRouter }
