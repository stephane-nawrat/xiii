// ==========================================
// XIII Frontend - Tailwind Configuration
// ==========================================
// Config Tailwind CSS v3.4 avec palette XIII

/** @type {import('tailwindcss').Config} */
export default {
  // === Content ===
  // Fichiers scannés par Tailwind pour générer le CSS
  // Tailwind analyse ces fichiers et génère UNIQUEMENT les classes utilisées
  content: [
    "./index.html", // Page HTML principale
    "./src/**/*.{js,jsx}", // Tous les composants React (.js et .jsx)
  ],

  // === Theme ===
  theme: {
    extend: {
      // === Couleurs XIII ===
      // Palette inspirée AIF (noir/blanc cassé minimaliste)
      colors: {
        // Crème (backgrounds)
        cream: {
          DEFAULT: "#EFEEE6", // Background principal (blanc cassé)
          light: "#FAFAF8", // Surface claire (cards, inputs)
        },

        // Noir (textes, boutons)
        carbon: {
          DEFAULT: "#0C0C0C", // Noir subtil (texte principal)
          button: "#0B0B0B", // Noir boutons (légèrement différent)
        },

        // Gris (textes secondaires)
        gray: {
          text: "#676664", // Gris moyen (corps de texte)
        },
      },

      // === Typographie ===
      // Police sans-serif moderne (Inter)
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },

  // === Plugins ===
  // Pas de plugins Tailwind pour l'instant (ajout futur si besoin)
  plugins: [],
};
