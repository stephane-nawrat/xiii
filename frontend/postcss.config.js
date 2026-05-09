// ==========================================
// XIII Frontend - PostCSS Configuration
// ==========================================
// PostCSS traite le CSS avant qu'il soit servi au navigateur

export default {
  plugins: {
    // === Tailwind CSS ===
    // Transforme les directives @tailwind en CSS réel
    // Génère uniquement les classes utilisées dans les fichiers (tree-shaking)
    tailwindcss: {},

    // === Autoprefixer ===
    // Ajoute automatiquement les préfixes navigateurs (-webkit-, -moz-, etc.)
    // Exemple: transform → -webkit-transform, -ms-transform, transform
    autoprefixer: {},
  },
};
