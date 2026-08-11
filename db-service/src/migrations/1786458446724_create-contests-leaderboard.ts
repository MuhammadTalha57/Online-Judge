import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("ContestsLeaderboard", {
		contest_id: {
			type: "integer",
			references: `"Contests"(contest_id)`,
			notNull: true,
			onDelete: "CASCADE",
		},
		user_id: {
			type: "uuid",
			references: `"Users"(user_id)`,
			notNull: true,
			onDelete: "CASCADE",
		},
		rank: {
			type: "integer",
			notNull: true,
		},
	});

	pgm.addConstraint("ContestsLeaderboard", "contest_id_user_id_pk", {
		primaryKey: ["contest_id", "user_id"],
	});

	pgm.addConstraint("ContestsLeaderboard", "unique_rank_per_contest", {
		unique: ["contest_id", "rank"],
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("ContestsLeaderboard");
}
