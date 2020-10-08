import DI from "../di";
import { IAppointmentService } from "../types";

class AppointmentService implements IAppointmentService {
  public getProviders(
    specialty?: string,
    date?: Date,
    minScore?: number
  ): Array<string> {
    const appointments = DI.appointmentRepo.getProviders({
      specialty,
      date,
      minScore,
    });

    return appointments.map((it) => it.name);
  }

  public isExist(name: string, date: Date): boolean {
    console.log(name, date);
    const appointments = DI.appointmentRepo.getProviders({ name, date });
    console.log(appointments);

    return !!appointments.length;
  }
}

export default AppointmentService;
