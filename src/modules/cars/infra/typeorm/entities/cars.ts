import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class CarEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  category_id: string;

  @Column()
  name: string;

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
}

export { CarEntity };
