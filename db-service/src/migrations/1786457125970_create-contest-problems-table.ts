import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("ContestsProblems", {
		contest_id: {
			type: "integer",
			references: "Contests(contest_id)",
			notNull: true,
			onDelete: "CASCADE",
		},
		problem_no: {
			type: "integer",
			notNull: true,
		},
		problem_id: {
			type: "integer",
			references: "Problems(problem_id)",
			notNull: true,
		},
	});

	pgm.addConstraint("ContestsProblems", "contest_id_problem_id_pk", {
		primaryKey: ["contest_id", "problem_id"],
	});

	pgm.addConstraint("ContestsProblems", "contest_id_problem_no_unique", {
		unique: ["contest_id", "problem_no"],
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("ContestsProblems");
}
