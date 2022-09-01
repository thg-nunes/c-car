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
}
export { DayjsProvider };
