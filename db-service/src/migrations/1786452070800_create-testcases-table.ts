import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.createTable("Testcases", {
		problem_id: {
			type: "integer",
			references: `"Problems"(problem_id)`,
			onDelete: "CASCADE",
			notNull: true,
		},
		test_case_no: { type: "integer", notNull: true, check: "test_case_no > 0" },
		is_sample: { type: "boolean", notNull: true, default: false },
		input_url: { type: "varchar(255)", notNull: true },
		expected_output_url: { type: "varchar(255)", notNull: true },
	});

	pgm.addConstraint("Testcases", "problem_test_case_no_pk", {
		primaryKey: ["problem_id", "test_case_no"],
	});
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.dropTable("Testcases");
}
