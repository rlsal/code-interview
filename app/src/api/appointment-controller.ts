import express from "express";
import { validationResult } from "express-validator";

import DI from "../di";
import { AppointmentQuery } from "../types";

class AppointmentController {
  public getProviders(
    request: express.Request<unknown, unknown, unknown, AppointmentQuery>,
    response: express.Response
  ): void {
    const { specialty, date, minScore } = request.query;

    const errors = validationResult(request as express.Request);
    if (!errors.isEmpty()) {
      return response.status(400).end();
    }

    const data = DI.appointmentService.getProviders(specialty, date, minScore);

    response.send(data).end();
  }

  public postProviders(
    request: express.Request,
    response: express.Response
  ): void {
    const { name, date } = request.body;

    if (!DI.appointmentService.isExist(name, date)) {
      return response.status(400).end();
    }

    return response.status(200).end();
  }
}

export default AppointmentController;
