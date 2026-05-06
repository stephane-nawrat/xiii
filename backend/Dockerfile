# ==========================================
# XIII Backend - Node.js Dockerfile
# ==========================================

# === Stage: Base ===
FROM node:24.15-alpine AS base

# Métadonnées
LABEL maintainer="contact@stephane-nawrat.com"
LABEL project="xiii-backend"

# Installer dumb-init (gestion propre des signaux Linux)
RUN apk add --no-cache dumb-init

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# === Stage: Development ===
FROM base AS development

# Installer TOUTES les dépendances (dev + prod)
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3001

# Utiliser dumb-init pour gérer les signaux
ENTRYPOINT ["dumb-init", "--"]

# Commande par défaut (sera overridée par docker-compose)
CMD ["npm", "run", "dev"]