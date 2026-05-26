// ==========================================
// XIII Backend - Database Seed Script
// ==========================================
// Insère les données initiales : 4 roles + 4 users avec passwords hashés

// === Imports ===
import argon2 from "argon2";
import pool from "./pool.js";

// === Configuration ===
const SALT_ROUNDS = 10; // Coût de hashage (équilibre sécurité/performance)

// === Données Seed ===
const roles = ["admin", "photographer", "visitor", "guest"];

const users = [
  {
    email: "admin@xiii.local",
    firstname: "Admin",
    lastname: "XIII",
    role: "admin",
  },
  {
    email: "photographer@xiii.local",
    firstname: "Jonas",
    lastname: "Valuska",
    role: "photographer",
  },
  {
    email: "visitor@xiii.local",
    firstname: "Lewis",
    lastname: "Caroll",
    role: "visitor",
  },
  {
    email: "guest@xiii.local",
    firstname: "Alain",
    lastname: "Damasio",
    role: "guest",
  },
];

const DEFAULT_PASSWORD = "admin123";

// === Fonction Principale ===
async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // --- 1. Insertion des roles ---
    console.log("📝 Inserting roles...");
    for (const roleName of roles) {
      await pool.query("INSERT INTO roles (name) VALUES (?)", [roleName]);
    }
    console.log(`✅ ${roles.length} roles inserted`);

    // --- 2. Récupération des IDs de roles ---
    const [rolesData] = await pool.query("SELECT id, name FROM roles");
    const roleMap = Object.fromEntries(rolesData.map((r) => [r.name, r.id]));

    // --- 3. Hash du password par défaut ---
    console.log("🔐 Hashing passwords...");
    const passwordHash = await argon2.hash(DEFAULT_PASSWORD);

    // --- 4. Insertion des users ---
    console.log("👤 Inserting users...");
    for (const user of users) {
      await pool.query(
        "INSERT INTO users (email, password_hash, firstname, lastname, role_id, is_active) VALUES (?, ?, ?, ?, ?, ?)",
        [
          user.email,
          passwordHash,
          user.firstname,
          user.lastname,
          roleMap[user.role],
          true,
        ],
      );
    }
    console.log(`✅ ${users.length} users inserted`);

    // --- 5. Résumé ---
    console.log("\n📊 Seed Summary:");
    console.log(`   Roles: ${roles.join(", ")}`);
    console.log(`   Users: ${users.map((u) => u.email).join(", ")}`);
    console.log(`   Default password: ${DEFAULT_PASSWORD}`);
    console.log("\n✅ Database seeding completed successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

// === Exécution ===
seed();
