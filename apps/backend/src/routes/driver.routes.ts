import * as express from "express";
import { authentification } from "../middleware/authentification";
import { DriverController } from "../controllers/driver.controller";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get(
  "/drivers",
  authentification,
  authorization(["admin"]),
  DriverController.getDrivers
);

Router.post("/adddriver",authentification,authorization(["admin"]), DriverController.createDriver);
Router.put(
  "/updatedriver/:id",
  authentification,
  authorization(["user", "admin"]),
  DriverController.updateDriver
);
Router.delete(
  "/deletedriver/:id",
  authentification,
  authorization(["admin"]),
  DriverController.deleteDriver
);
export { Router as driverRouter };