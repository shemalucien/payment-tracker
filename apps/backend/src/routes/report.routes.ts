import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { ReportController } from "../controllers/report.controller";


const Router = express.Router();


Router.post("/reports",authentification,authorization(["admin"]), (req, res) => {
    ReportController.generateReport(req, res);
});

Router.get("/reports",authentification,authorization(["admin"]), (req, res) => {
    ReportController.getReports(req, res);
});




export { Router as reportRouter }