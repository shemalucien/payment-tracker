import express ,{ Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./routes/user.routes";
import { clientRouter } from "./routes/client.routes";
import { orderRouter } from "./routes/order.routes";
import { productRouter } from "./routes/product.routes";
import {paymentrouter } from "./routes/payment.routes";
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
app.use("/payments", paymentrouter);
app.use("/orders", orderRouter);



export default app;

