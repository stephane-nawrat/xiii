// ==========================================
// XIII Backend - Database Migration Script
// ==========================================
// Reset complet : DROP DATABASE + CREATE depuis schema.sql

// === Imports ===
import "dotenv/config";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mysql from "mysql2/promise";

// === Configuration Chemins ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === Fonction Principale ===
async function migrate() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  // Connexion SANS base de données (pour pouvoir la DROP/CREATE)
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true, // Permet d'exécuter tout schema.sql d'un coup
  });

  try {
    console.log(`🔄 Réinitialisation complète de : ${DB_NAME}...`);

    // --- 1. Destruction totale de la base ---
    await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);
    console.log("🗑️  Database dropped");

    // --- 2. Recréation de la base ---
    await connection.query(`CREATE DATABASE ${DB_NAME}`);
    console.log("📦 Database created");

    // --- 3. Sélection de la base ---
    await connection.query(`USE ${DB_NAME}`);

    // --- 4. Lecture et exécution du schema ---
    console.log("📄 Reading schema.sql...");
    const schemaPath = join(__dirname, "schema.sql");
    const sql = readFileSync(schemaPath, "utf8");

    await connection.query(sql);
    console.log("🔨 Tables created");

    console.log("✅ Migration completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  } finally {
    await connection.end();
    process.exit(0);
  }
}

// === Exécution ===
migrate();
