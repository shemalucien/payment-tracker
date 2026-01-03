// import * as dotenv from "dotenv";
// import { DataSource } from "typeorm";

// dotenv.config();

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: process.env.DB_HOST || "127.0.0.1",
//   port: Number(process.env.DB_PORT) || 3306,
//   username: process.env.DB_USERNAME || "user",
//   password: process.env.DB_PASSWORD || "root",
//   database: process.env.DB_DATABASE || "bookie",
//   logging: ["query"],
//   synchronize: false,
//   subscribers: [],
//   migrations: ["src/database/migrations/*.ts"],
// });

import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "../entity/User.entity";
import { Client } from "../entity/Client.entity";
import { Order } from "../entity/Order.entity";
import { Payment } from "../entity/Payment.entity";
import { Product } from "../entity/Product.entity";
import { Report } from "../entity/Report.entity";
import { Notification } from "../entity/Notification.entity";
import {Driver} from "../entity/Driver.entity";
import {OrderDetail} from "../entity/OrderDetail.entity";


dotenv.config();

const { DB_HOST , DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;
  
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "localhost",
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "Kigali869762024@$",
  database: DB_DATABASE || "redco_db",
  synchronize:  true,
  // synchronize: NODE_ENV === "dev" ? true : false,
//logging logs sql command on the treminal
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Client, Order, Payment, Product, Report, Notification,Driver,OrderDetail],
  migrations: ["migrations/*.ts"],
  subscribers: [],
});
