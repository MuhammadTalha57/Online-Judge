import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("Submissions", {
		submission_id: "id",
		problem_id: {
			type: "integer",
			references: `"Problems"(problem_id)`,
			notNull: true,
			onDelete: "RESTRICT",
		},
		username: {
			type: "varchar(255)",
			references: `"Users"(username)`,
			notNull: true,
			onDelete: "CASCADE",
		},
		language: {
			type: "varchar(100)",
			notNull: true,
		},
		source_code: {
			type: "text",
			notNull: true,
		},
		verdict: {
			type: "varchar(30)",
			notNull: true,
		},
		runtime: {
			type: "integer", // in ms
			notNull: true,
			check: "runtime >= 0",
		},
		memory: {
			type: "bigint", // in bytes
			notNull: true,
			check: "memory >= 0",
		},
		created_at: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("CURRENT_TIMESTAMP"),
		},
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("Submissions");
}
