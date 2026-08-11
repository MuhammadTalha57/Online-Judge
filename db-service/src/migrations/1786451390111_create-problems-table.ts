import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('Problems', {
        problem_id: 'id',
        title: {
            type: 'varchar(100)',
            notNull: true,
            unique: true
        },
        statement: {
            type: 'text',
            notNull: true
        },
        time_limit: {
            type: 'integer', // in ms
            notNull: true,
            check: 'time_limit > 0'
        },
        memory_limit: {
            type: 'bigint', // in Bytes
            notNull: true,
            check: 'memory_limit > 0'
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('Problems')
}
