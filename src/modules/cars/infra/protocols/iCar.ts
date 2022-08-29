import { Specification } from '../typeorm/entities/specification';

type Car = {
  id?: string;
  name: string;
  available: boolean;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specification?: Specification[];
};

export { Car };
