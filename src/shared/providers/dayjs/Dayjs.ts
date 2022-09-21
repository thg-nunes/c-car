import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from './protocol';

class DayjsProvider implements IDateProvider {
  diffDateInHours(end_date: Date): number {
    dayjs.extend(utc);
    /* a linha seguinte pega a data esperada para devolução do carro e converte para o formato de data local */
    const expectedReturnDate = dayjs(end_date).local().format();

    /* a linha seguinte pega a data atual */
    const dateNow = dayjs().local().format();

    return dayjs(expectedReturnDate).diff(dateNow, 'hours');
  }

  diffDateInDays(end_date: Date): number {
    dayjs.extend(utc);
    /* a linha seguinte pega a data esperada para devolução do carro e converte para o formato de data local */
    const expectedReturnDate = dayjs(end_date).local().format();

    /* a linha seguinte pega a data atual */
    const dateNow = dayjs().local().format();

    return dayjs(expectedReturnDate).diff(dateNow, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  compareIfDateIsBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
export { DayjsProvider };
