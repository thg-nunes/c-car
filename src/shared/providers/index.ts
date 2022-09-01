import { container } from 'tsyringe';
import { DayjsProvider } from './dayjs/Dayjs';
import { IDateProvider } from './dayjs/protocol';

container.registerSingleton<IDateProvider>('DayjsProvider', DayjsProvider);
