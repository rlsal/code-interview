export type AppointmentQuery = {
  specialty?: string;
  date?: Date;
  minScore?: number;
};

type AvailableDateModel = {
  from: number;
  to: number;
};

export type FilterProvidersQuery = {
  name?: string;
  specialty?: string;
  date?: Date;
  minScore?: number;
};

export type AppointmentModel = {
  name: string;
  score: number;
  specialties: string[];
  availableDates: AvailableDateModel[];
};

export interface IAppointmentService {
  getProviders: (
    specialty?: string,
    date?: Date,
    minScore?: number
  ) => Array<string>;

  isExist(name: string): boolean;
}

export interface IAppointmentRepository {
  getProviders: (query: FilterProvidersQuery) => Array<AppointmentModel>;
}
