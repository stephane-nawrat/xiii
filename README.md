# XIII Backend

Backend API pour XIII

## Stack Technique

- **Runtime:** Node.js 24 LTS (Kryptonite) - Alpine
- **Framework:** Express 4.21.2
- **Base de données:** MySQL 8.4 LTS
- **Conteneurisation:** Docker + OrbStack (macOS)

## Architecture

Structure 3 couches :
- **Models** : Accès données (AbstractModel, Registry, DI)
- **Services** : Logique métier (Auth, bcrypt, JWT)
- **Controllers** : Orchestration HTTP

## Développement

### Prérequis
- Node.js 24.x LTS
- Docker Desktop ou OrbStack
- MySQL 8.4 (via Docker)

### Démarrage rapide

```bash
# Installation dépendances
cd backend && npm install

# Démarrer l'environnement Docker
docker-compose up -d

# Accéder à l'API
curl http://localhost:3001/api/health
```

## Ports

- **API:** 3001
- **MySQL:** 3307 (externe) → 3306 (interne)

## Documentation

Voir le dossier `/docs` pour la documentation détaillée.

## Auteur

Stéphane Nawrat - [contact@stephane-nawrat.com](mailto:contact@stephane-nawrat.com)

## License

Projet privé - Tous droits réservés