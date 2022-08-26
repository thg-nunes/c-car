import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CategoriesCars1661532849945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'categories_cars',
      new TableForeignKey({
        name: 'FKCarCategory',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'categories_cars',
      new TableForeignKey({
        name: 'FKCategoryCar',
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        columnNames: ['category_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('categories_cars', 'FKCategoryCar');

    await queryRunner.dropForeignKey('categories_cars', 'FKCarCategory');

    await queryRunner.dropTable('categories_cars');
  }
}
