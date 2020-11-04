import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransaction1603975425338 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'title',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'value',
              type: 'integer',
              isNullable: true
            },
            {
              name: 'type',
              type: 'varchar',
              isNullable: true
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions')
    }

}
