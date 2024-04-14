import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { ReportController } from "../controllers/report.controller";


const Router = express.Router();


Router.get("/reports",authentification,authorization(["admin"]), (req, res) => {
    ReportController.generateReport(req, res);
});


export { Router as reportRouter }