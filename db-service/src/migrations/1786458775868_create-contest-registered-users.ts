import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("ContestsRegisteredUsers", {
		contest_id: {
			type: "integer",
			references: "Contests(contest_id)",
			notNull: true,
			onDelete: "CASCADE",
		},
		user_id: {
			type: "uuid",
			references: "Users(user_id)",
			onDelete: "CASCADE",
			notNull: true,
		},
		rank: {
			type: "integer", // Deliberate duplication of rank to store final rank
			default: "null",
		},
	});

	pgm.addConstraint("ContestsRegisteredUsers", "contest_id_user_id_pk", {
		primaryKey: ["contest_id", "user_id"],
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("ContestsRegisteredUsers");
}
