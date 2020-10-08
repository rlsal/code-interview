import express from "express";
import { setupMiddlewares } from "./middleware";
import DI from "./di";

const port = process.env.PORT || 3500;

const app = express();

setupMiddlewares(app);

app.get("/appointments", DI.appointments.getProviders);
app.post("/appointments", DI.appointments.postProviders);

app.listen(port);
