import express from "express";
import { check, query } from "express-validator";

import DI from "./di";
import { setupMiddlewares } from "./middleware";
import { validateDate, serializeDate } from "./utils/date";

const port = process.env.PORT || 3500;

const app = express();

setupMiddlewares(app);

app.get(
  "/appointments",
  [
    query("specialty").notEmpty(),
    check("minScore").isFloat().toFloat(),
    check("date").custom(validateDate).customSanitizer(serializeDate),
  ],
  DI.appointments.getProviders
);

app.post(
  "/appointments",
  [check("date").custom(validateDate).customSanitizer(serializeDate)],
  DI.appointments.postProviders
);

app.listen(port);
