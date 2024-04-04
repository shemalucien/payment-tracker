import { AppDataSource } from "./database/data-source";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import app from './app';

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));


