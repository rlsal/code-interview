import { filter, sortBy } from "lodash";

import DB from "../../providers.json";
import { AppointmentModel, FilterProvidersQuery } from "../types";

class AppointmentRepository {
  public getProviders(filterQ: FilterProvidersQuery): AppointmentModel[] {
    const { name, specialty, minScore, date } = filterQ;

    const filterFns: Array<(it: AppointmentModel) => boolean> = [];

    if (name) {
      filterFns.push(
        (it: AppointmentModel) => it.name.toLowerCase() === name.toLowerCase()
      );
    }

    if (specialty) {
      filterFns.push((it: AppointmentModel) =>
        it.specialties
          .map((x) => x.toLowerCase())
          .includes(specialty.toLowerCase())
      );
    }

    if (minScore) {
      filterFns.push((it: AppointmentModel) => it.score >= minScore);
    }

    if (date) {
      filterFns.push((it: AppointmentModel) =>
        it.availableDates.some(
          (av) => date.valueOf() >= av.from && date.valueOf() <= av.to
        )
      );
    }

    const filtered = filter(DB, (it) => filterFns.every((f) => f(it)));

    const sorted = sortBy(filtered, ["score"]).reverse();

    return sorted.map((it) => it as AppointmentModel);
  }
}

export default AppointmentRepository;
