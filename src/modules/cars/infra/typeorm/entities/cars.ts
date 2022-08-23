import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
class CarEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  category_id: string;

  @Column()
  name: string;

  @Column()
  available: boolean;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.created_at = new Date();
      this.available = true;
    }
  }
}

export { CarEntity };
