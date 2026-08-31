import express from "express";
import type { Request, Response } from "express";

import userRouter from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import clinicRouter from "./routes/clinic.routes";
import warehouseRouter from "./routes/warehouse.routes";
import medicineRouter from "./routes/medicine.routes";
import warehouseMedicineRouter from "./routes/warehouseMedicine.routes";
import requestRouter from "./routes/request.routes";
import requestHistoryRouter from "./routes/requestHistory.routes";


import sequelize from "./config/database";
import "./models";

import helmet from "helmet";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/users", userRouter);
app.use("/auth", authRoutes);
app.use("/clinics", clinicRouter);
app.use("/warehouses", warehouseRouter);
app.use("/medicines", medicineRouter);
app.use("/warehouses", warehouseMedicineRouter);
app.use("/requests", requestRouter);
app.use("/request-history", requestHistoryRouter);


sequelize.authenticate()
    .then(() => {
        console.log("Base de datos conectada");
        return sequelize.sync();
    })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((error) => {
        console.error("Error:", error);
    });

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "ok",
        message: "Servidor funcionando"
    });
});

app.listen(3000, () => {
    console.log("hola desde el puerto 3000");
});


