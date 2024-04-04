import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { ClientController } from "../controllers/client.controller";

const Router = express.Router();

Router.get("/clients",authentification,authorization(["admin"]), (req, res) => {
    ClientController.getClients(req, res);
});
Router.post("/addclient",authentification,authorization(["admin"]),(req, res) => {
    ClientController.createClient(req, res);
});
Router.put("/updateclient/:id",authentification,authorization(["admin"]), (req, res) => {
    ClientController.updateClient(req, res);
});
Router.delete("/deleteclient/:id",authentification,authorization(["admin"]), (req, res) => {
    ClientController.deleteClient(req, res);
});
    

export { Router as clientRouter }

