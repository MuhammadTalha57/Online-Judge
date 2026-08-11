import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("Contests", {
		contest_id: "id",
		start_at: {
			type: "timestamp",
			notNull: true,
		},
		duration: {
			type: "interval",
			notNull: true,
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("Contests");
}
