import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("Users", {
		user_id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
		},
		username: {
			type: "varchar(255)",
			notNull: true,
		},
		password_hash: {
			type: "varchar(255)",
			notNull: true,
		},
		role: {
			type: "varchar(5)",
			notNull: true,
			default: "user",
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("Users");
}
