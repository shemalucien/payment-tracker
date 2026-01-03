import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Driver } from "../entity/Driver.entity";


export class DriverController {
  static async getDrivers(req: Request, res: Response) {
    const drivers = await AppDataSource.getRepository(Driver).find();
    return res.status(200).json({ drivers });
  }

  static async getDriver(req: Request, res: Response) {
    const { id } = req.params;
    const driver = await AppDataSource.getRepository(Driver).findOne({
      where: { id },
    });
    return res.status(200).json({ driver });
  }

  static async createDriver(req: Request, res: Response) {
    const { name, IdNumber, contact } = req.body;
    const driver = new Driver();
    driver.name = name;
    driver.IdNumber = IdNumber;
    driver.contact = contact;

    const driverRepository = AppDataSource.getRepository(Driver);
    await driverRepository.save(driver);
    return res.status(200).json({ message: "Driver created successfully", driver });
  }

  static async updateDriver(req: Request, res: Response) {
    const { id } = req.params;
    const { name, IdNumber, contact } = req.body;
    const driverRepository = AppDataSource.getRepository(Driver);
    const driver = await driverRepository.findOne({
      where: { id },
    });
    if (driver) {
      driver.name = name;
      driver.IdNumber = IdNumber;
      driver.contact = contact;
      await driverRepository.save(driver);
      res.status(200).json({ message: "Driver updated successfully", driver });
    } else {
      // Handle the case where driver is null, such as returning a 404 error
      res.status(404).json({ message: "Driver not found" });
    }
  }

  static async deleteDriver(req: Request, res: Response) {
    const { id } = req.params;
    const driverRepository = AppDataSource.getRepository(Driver);
    const driver = await driverRepository.findOne({
      where: { id },
    });
    if (driver) {
      await driverRepository.remove(driver);
      res.status(200).json({ message: "Driver deleted successfully" });
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  }
}