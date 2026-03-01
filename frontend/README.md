
Application web fullstack permettant de suivre ses habitudes quotidiennes de façon simple et motivante.

**Backend** : Symfony 7 (API REST + JWT + ApiPlatform + Doctrine)  
**Frontend** : React + Vite + Tailwind CSS + React Router + Context API  
**Base de données** : SQLite (dev)  

Projet réalisé dans le cadre d'une formation fullstack – respecte les bonnes pratiques d'architecture client-serveur.

## Fonctionnalités principales

- Inscription et connexion sécurisées (JWT)
- Routes protégées (accès dashboard réservé aux utilisateurs connectés)
- Création d'habitudes personnelles
- Liste des habitudes de l'utilisateur connecté
- Design moderne, sobre et responsive (Tailwind CSS)
- Gestion d'état centralisée (AuthContext)
- Formulaires contrôlés avec validation côté client
- Gestion d'erreurs utilisateur (messages clairs)
- Déconnexion sécurisée

## Prérequis

- PHP ≥ 8.3
- Composer
- Node.js ≥ 18 + npm
- Symfony CLI (fortement recommandé)
- Git

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/hayashiart/habit-tracker-fullstack.git
cd habit-tracker-fullstack
2. Backend (Symfony API)
Bashcd backend
composer install
Copiez le fichier .env exemple :
Bashcp .env.example .env
Créez la base SQLite et migrez :
Bashphp bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
Lancez le serveur Symfony :
Bashsymfony serve --no-tls
# ou php -S 127.0.0.1:8000 -t public/
API disponible sur : http://127.0.0.1:8000
Documentation Swagger : http://127.0.0.1:8000/api/docs
3. Frontend (React + Vite)
Bashcd ../frontend
npm install
Lancez le serveur de développement :
Bashnpm run dev
Application disponible sur : http://localhost:5173
Commandes utiles
Backend
Bash# Lancer le serveur Symfony
symfony serve --no-tls

# Vider le cache
php bin/console cache:clear

# Créer une migration
php bin/console make:migration
php bin/console doctrine:migrations:migrate

# Voir les routes
php bin/console debug:router
Frontend
Bash# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Build pour production
npm run build
Variables d'environnement
Backend – .env (backend/.env)
envAPP_ENV=dev
APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data_dev.db"

# JWT (changez en production !)
JWT_PASSPHRASE=your_very_long_and_secure_passphrase_here
JWT_TOKEN_TTL=3600           # 1 heure
JWT_REFRESH_TOKEN_TTL=2592000 # 30 jours
Frontend – .env.local (frontend/.env.local)
envVITE_API_URL=http://127.0.0.1:8000
Structure du projet
texthabit-tracker-fullstack/
├── backend/                     Symfony API
│   ├── config/
│   ├── src/
│   │   ├── Controller/
│   │   ├── Entity/
│   │   └── ...
│   ├── migrations/
│   ├── var/
│   └── public/
├── frontend/                    React + Vite
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
ApiPlatform (documentation auto + opérations REST)
LexikJWTAuthenticationBundle (JWT)
NelmioCorsBundle (CORS)

Frontend

React 18
Vite
Tailwind CSS
React Router v6
Context API + useAuth
fetch (appels API sécurisés)

Fonctionnalités bonus possibles (si temps restant)

 Pagination sur la liste des habitudes
 Compteur de streak (jours consécutifs)
 Dark mode
 Loader / skeleton pendant chargement
 Tests unitaires frontend (Vitest)
 Docker-compose (backend + frontend)

Documentation API
Générée automatiquement par ApiPlatform :
→ http://127.0.0.1:8000/api/docs (quand le serveur tourne)
Auteur
Sébastien – Projet étudiant fullstack 2026