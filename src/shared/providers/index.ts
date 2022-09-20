import { container } from 'tsyringe';
import { DayjsProvider } from './dayjs/Dayjs';
import { IDateProvider } from './dayjs/protocol';
import { EtherialMailProvider } from './mailProvider/etherealMailProvider';
import { EtherialMailProtocol } from './mailProvider/protocol';

container.registerSingleton<IDateProvider>('DayjsProvider', DayjsProvider);
container.registerInstance<EtherialMailProtocol>('EtherialMailProvider', new EtherialMailProvider());
