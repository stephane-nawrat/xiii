# Guide d'Installation XIII

## Prérequis

- **Docker** (ou OrbStack pour macOS)
- **Node.js 24 LTS**
- **Git**

---

## Installation Docker

### macOS
```bash
brew install orbstack
# OU
brew install --cask docker
```

### Linux
```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

### Windows
1. Installer WSL2 : `wsl --install` (PowerShell Admin)
2. Télécharger [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. Activer l'intégration WSL2 dans les paramètres

---

## Installation Node.js 24 LTS

### macOS
```bash
brew install node@24
```

### Linux
```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

### Windows
Dans WSL2 :
```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## Configuration Projet

```bash
# 1. Cloner le repository
git clone git@github.com:stephane-nawrat/xiii.git
cd xiii

# 2. Copier les variables d'environnement
cp backend/.env.sample backend/.env

# 3. Démarrer les containers
docker-compose up -d

# 4. Vérifier l'API
curl http://localhost:3001/api/health
```

---

## Commandes Utiles

```bash
# Voir les containers
docker-compose ps

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Redémarrer proprement
docker-compose down -v && docker-compose up -d
```

---

## Problèmes Courants

**Port déjà utilisé :**
```bash
lsof -ti:3001 | xargs kill -9
```

**Container ne démarre pas :**
```bash
docker-compose logs xiii-api
docker-compose down -v && docker-compose up -d --build
```

**Permissions Docker (Linux/WSL2) :**
```bash
sudo chmod 666 /var/run/docker.sock
```