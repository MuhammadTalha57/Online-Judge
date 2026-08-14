import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("ContestsRegisteredUsers", {
		contest_id: {
			type: "integer",
			references: `"Contests"(contest_id)`,
			notNull: true,
			onDelete: "CASCADE",
		},
		username: {
			type: "varchar(255)",
			references: `"Users"(username)`,
			onDelete: "CASCADE",
			notNull: true,
		},
		rank: {
			type: "integer" // Deliberate duplication of rank to store final rank
		},
	});

	pgm.addConstraint("ContestsRegisteredUsers", "contest_registered_users_pk", {
		primaryKey: ["contest_id", "username"],
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("ContestsRegisteredUsers");
}
