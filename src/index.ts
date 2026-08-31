import express from "express";
import type { Request, Response} from "express";
import userRouter from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import clinicRouter from "./routes/clinic.routes";
import sequelize from "./config/database";
import warehouseRouter from "./routes/warehouse.routes";
import "./models"
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

const app = express()

app.use(express.json());
app.use(helmet());
app.use(cors());



app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/warehouses", warehouseRouter);
app.use("/users", userRouter);
app.use("/auth", authRoutes);
app.use("/clinics", clinicRouter);

sequelize.authenticate()
    .then(() => {
        console.log("Base de datos conectada");
        // return sequelize.sync({ force: true });
        // sequelize.sync({ alter: true })
        return sequelize.sync();
    })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((error) => {
        console.error("Error:", error);
    });

app.get("/health", (req: Request, res: Response)=>{
    res.json({
        status: 'ok',
        message: 'Servidor funcionando'
    })
})

app.listen(3000, ()=>{
    console.log('hola desde el puerto 3000')
})

