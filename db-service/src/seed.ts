import bcrypt from "bcryptjs"
import { queryMaster } from "./db.js"
import 'dotenv/config'

async function runSeed() {
    console.log(`Seeding DB`)

    try {
        await queryMaster(`INSERT INTO "Users" (username, password_hash, role) VALUES ($1, $2, 'admin')`, [process.env.POSTGRESQL_WRITE_USER, await bcrypt.hash(process.env.POSTGRESQL_WRITE_USER_PASSWORD!, 10)])
        console.log("Database seeded successfully")
    } catch(error) {
        console.error(`Seeding Failed: ${error}`)
        process.exit(1);
    }
}

runSeed()