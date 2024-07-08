import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePagamentoTable1720398476912 implements MigrationInterface {
    name = 'CreatePagamentoTable1720398476912'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        'CREATE TABLE `Pagamento` (' +
        '  `id` varchar(36) NOT NULL, ' +
        '  `pedido_id` varchar(36) NOT NULL, ' +
        '  `valor` varchar(36) NOT NULL, ' +
        '  `status` varchar(36) NOT NULL, ' +
        '  `gateway_pagamento_id` varchar(36) NOT NULL, ' +
        '  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
        '  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), ' +

        '  INDEX `IDX_5589751b6aecc223a1ec71fe66` (`pedido_id`), ' +
        '  INDEX `IDX_28aa63a9c443b031346a5688f6` (`gateway_pagamento_id`), ' +

        '  PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB'
      )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_28aa63a9c443b031346a5688f6` ON `Pagamento`')
      await queryRunner.query('DROP INDEX `IDX_5589751b6aecc223a1ec71fe66` ON `Pagamento`')
      await queryRunner.query('DROP TABLE `Pagamento`')
    }
}
