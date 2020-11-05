import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddColumnUserId1604508810441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('transactions', new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }))

      await queryRunner.createForeignKey('transactions', new TableForeignKey({
        name: 'TransactionUserID',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('transactions', 'TransactionUserID');

      await queryRunner.dropColumn('transactions', 'user_id');
    }

}
