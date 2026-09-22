import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "StyleStore API läuft",
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpunkt nicht gefunden",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

export default app;
