import express ,{ Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./routes/user.routes";
import { clientRouter } from "./routes/client.routes";
import { orderRouter } from "./routes/order.routes";
import { productRouter } from "./routes/product.routes";
import {paymentRouter } from "./routes/payment.routes";
import { driverRouter } from "./routes/driver.routes";
import { reportRouter } from "./routes/report.routes";
const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);

app.get('/hello', (req, res, next) => {
    return res.status(200).json({ message: 'Hello World!' });
});

app.use("/auth", userRouter);
app.use("/clients", clientRouter);
app.use("/products", productRouter);
app.use("/payments", paymentRouter);
app.use("/orders", orderRouter);
app.use("/drivers", driverRouter);
app.use("/reports", reportRouter);




export default app;

