# Habit Tracker – Gestion d'habitudes quotidiennes

Application web fullstack pour suivre et gérer ses habitudes quotidiennes de façon simple, motivante et sécurisée.

**Projet étudiant** réalisé dans le cadre d'une formation fullstack (Symfony + React).

<p align="center">
  <strong>Backend :</strong> Symfony 7 • API REST • JWT<br>
  <strong>Frontend :</strong> React 18 + Vite + Tailwind CSS + React Router<br>
  <strong>Base de données :</strong> SQLite (dev)
</p>

## Fonctionnalités principales

- Inscription & connexion sécurisées (JWT + connexion auto après inscription)
- Routes protégées (dashboard inaccessible si non connecté)
- Création d’habitudes personnalisées
- Liste des habitudes de l’utilisateur connecté
- Marquage journalier « fait aujourd’hui »
- Modification (nom + description) & suppression d’une habitude
- Validation des formulaires (client + serveur)
- Messages d’erreur clairs pour l’utilisateur
- Design moderne, épuré et responsive (Tailwind)
- Architecture propre : séparation backend/frontend + Context API pour l’auth
- Documentation API automatique (ApiPlatform)

## Prérequis

- PHP ≥ 8.3
- Composer
- Node.js ≥ 18 + npm
- Symfony CLI (fortement recommandé)
- Git

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/hayashiart/ProjectFullstack.git
cd ProjectFullstack
2. Backend (Symfony API)
Bashcd backend
composer install
Copier le fichier d’exemple d’environnement :
Bashcp .env.example .env
Créer la base SQLite et lancer les migrations :
Bashphp bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
Lancer le serveur :
Bashsymfony serve --no-tls
→ API : http://127.0.0.1:8000
→ Documentation Swagger : http://127.0.0.1:8000/api/docs
3. Frontend (React + Vite)
Bashcd ../frontend
npm install
Lancer le serveur de dev :
Bashnpm run dev
→ Application : http://localhost:5173
Commandes utiles
Backend
Bash# Lancer le serveur
symfony serve --no-tls

# Vider le cache
php bin/console cache:clear

# Créer + appliquer migration
php bin/console make:migration
php bin/console doctrine:migrations:migrate

# Voir les routes
php bin/console debug:router

# (Re)générer les clés JWT si besoin
php bin/console lexik:jwt:generate-keypair
Frontend
Bash# Installer dépendances
npm install

# Mode développement
npm run dev

# Build production
npm run build
Variables d’environnement
Backend → backend/.env
envAPP_ENV=dev
APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data_dev.db"

# JWT – À changer en production !
JWT_PASSPHRASE=your_very_long_and_secure_passphrase_here
JWT_TOKEN_TTL=3600           # 1 heure
JWT_REFRESH_TOKEN_TTL=2592000 # 30 jours
Frontend → frontend/.env.local
envVITE_API_URL=http://127.0.0.1:8000
Structure du projet
texthabit-tracker-fullstack/
├── backend/                 # Symfony API
│   ├── config/
│   ├── src/
│   │   ├── Controller/
│   │   ├── Entity/
│   │   └── ...
│   ├── migrations/
│   └── var/
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── vite.config.js
└── README.md
Technologies utilisées
Backend

Symfony 7
Doctrine ORM + SQLite
LexikJWTAuthenticationBundle
NelmioCorsBundle
ApiPlatform (doc auto)

Frontend

React 18
Vite
Tailwind CSS
React Router v6
Context API (useAuth)
fetch + intercepteurs

Points forts du projet

Authentification JWT complète & sécurisée
Séparation nette backend / frontend
Protection des routes + redirection intelligente
CRUD complet + marquage journalier des habitudes
Design moderne, responsive et accessible
Gestion d’état centralisée (Context API)
Validation double (client + serveur)
Gestion d’erreurs utilisateur claire et professionnelle

Documentation API
Générée automatiquement par ApiPlatform :
→ http://127.0.0.1:8000/api/docs (après avoir lancé le backend)