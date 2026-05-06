// ==========================================
// XIII Backend - ESLint Configuration
// ==========================================

module.exports = {
  // === Environnement d'exécution ===
  env: {
    node: true, // Active les globals Node.js (process, __dirname, etc.)
    es2024: true, // Supporte la syntaxe ECMAScript 2024
  },

  // === Règles de base recommandées ===
  extends: "eslint:recommended",

  // === Configuration du parser ===
  parserOptions: {
    ecmaVersion: "latest", // Utilise la dernière version ES disponible
    sourceType: "module", // Active les imports/exports ES6
  },

  // === Règles personnalisées ===
  rules: {
    // Indentation : 2 espaces (standard Node.js)
    indent: ["error", 2],

    // Fin de ligne Unix (LF) pour cohérence multi-OS
    "linebreak-style": ["error", "unix"],

    // Guillemets simples obligatoires (sauf échappement)
    quotes: ["error", "single"],

    // Point-virgules obligatoires
    semi: ["error", "always"],

    // Autorise console.log (utile en dev backend)
    "no-console": "off",

    // Variables inutilisées = warning (pas error)
    // Ignore les paramètres préfixés par _ (ex: _req, _next)
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
