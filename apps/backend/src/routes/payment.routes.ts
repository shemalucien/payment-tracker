import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { PaymentController } from "../controllers/payment.controller";

const Router = express.Router();	

Router.get("/payments",authentification,authorization(["admin"]), (req, res) => {
    PaymentController.getAllPayments(req, res);
});

Router.post("/payments",authentification,authorization(["admin"]), (req, res) => {
    PaymentController.createPayment(req, res);
});





export { Router as paymentRouter }

