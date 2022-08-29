import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './category';
import { Specification } from './specification';

@Entity('cars')
class CarEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

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

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [
      {
        name: 'car_id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'specification_id',
      },
    ],
  })
  specification: Specification[];

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
      this.available = true;
    }
  }
}

export { CarEntity };
