import AppointmentCtroller from "./api/appointment-controller";
import AppointmentRepository from "./model/appointment-repository";
import AppointmentService from "./services/appointment-service";

const DI = {
  appointments: new AppointmentCtroller(),
  appointmentService: new AppointmentService(),
  appointmentRepo: new AppointmentRepository(),
};

export default DI;
