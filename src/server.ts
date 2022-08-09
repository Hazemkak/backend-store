import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/users.route";
import productRouter from "./routes/products.route";
import orderRouter from "./routes/orders.route";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const corsOptions = {
  origin: "http://someothedomain.com",
  optionsSuccessStatus: 200,
};

const app: express.Application = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/order", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});
