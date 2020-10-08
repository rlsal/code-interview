import express from "express";
import { AppointmentQuery } from "../types";
import DI from "../di";

class AppointmentController {
  public getProviders(
    request: express.Request<unknown, unknown, unknown, AppointmentQuery>,
    response: express.Response
  ): void {
    const { specialty, date, minScore } = request.query;

    const data = DI.appointmentService.getProviders(
      specialty ? specialty.toLowerCase() : undefined,
      date ? new Date(Number(date)) : undefined,
      minScore ? Number(minScore) : undefined
    );

    response.send(data).end();
  }

  public postProviders(
    request: express.Request,
    response: express.Response
  ): void {
    const { name } = request.body;

    if (DI.appointmentService.isExist(name.toLowerCase())) {
      return response.status(400).end();
    }

    return response.status(200).end();
  }
}

export default AppointmentController;
