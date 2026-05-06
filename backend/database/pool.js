// ==========================================
// XIII Backend - MySQL Connection Pool
// ==========================================

import mysql from "mysql2/promise";

// === Configuration du Pool ===
// Un pool maintient plusieurs connexions réutilisables vers MySQL
const pool = mysql.createPool({
  // Hôte du serveur MySQL (nom du service Docker)
  host: process.env.DB_HOST || "localhost",
  // Port MySQL (3306 interne au container)
  port: process.env.DB_PORT || 3306,
  // Nom de la base de données
  database: process.env.DB_NAME || "xiii_db",
  // Identifiants de connexion
  user: process.env.DB_USER || "xiii_admin",
  password: process.env.DB_PASSWORD || "xiii_password",

  // === Configuration du Pool ===

  // Nombre maximum de connexions simultanées
  // 10 = bon équilibre dev/prod (MySQL supporte jusqu'à 151 par défaut)
  connectionLimit: 10,
  // Attendre une connexion si toutes sont occupées (vs erreur immédiate)
  waitForConnections: true,
  // Nombre de requêtes en attente maximum (0 = illimité)
  queueLimit: 0,
  // Fermer les connexions inactives après 10 secondes
  // Évite de garder des connexions zombies
  idleTimeout: 10000,
  // Timezone UTC pour cohérence dates
  timezone: "+00:00",
});

// === Test de Connexion au Démarrage ===
// Vérifie que MySQL est accessible dès le lancement
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL Pool connected successfully");
    console.log(
      `📊 Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`,
    );
    connection.release(); // Libère la connexion pour le pool
  })
  .catch((error) => {
    console.error("❌ MySQL Pool connection failed:", error.message);
    process.exit(1); // Arrête l'application si MySQL inaccessible
  });

// === Export du Pool ===
// Ce pool sera importé dans migrate.js, seed.js, models, etc.
export default pool;
