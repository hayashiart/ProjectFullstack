# Habit Tracker - Symfony API + React Frontend

Application de gestion d'habitudes personnelles (projet fullstack étudiant)

## Structure du projet
habit-tracker-fullstack/
├── backend/      # Symfony API (PHP 8.3, Doctrine, ApiPlatform, LexikJWT)
└── frontend/     # React + Vite + Tailwind
text## Prérequis

- PHP 8.3+
- Composer
- Node.js 18+ / npm
- Symfony CLI (optionnel mais recommandé)

## Installation

### Backend

```bash
cd backend
composer install
cp .env.example .env
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony serve
Frontend
Bashcd frontend
npm install
npm run dev
Variables d'environnement
Backend (.env)
envDATABASE_URL="sqlite:///%kernel.project_dir%/var/data_dev.db"
JWT_PASSPHRASE=ton_secret_ici
Frontend (.env.local)
envVITE_API_URL=http://127.0.0.1:8000
Lancement
Backend: symfony serve --no-tls
Frontend: npm run dev
Fonctionnalités implémentées

Inscription / Connexion JWT
Routes protégées (ProtectedRoute)
CRUD habitudes (create + read pour l’instant)
Tailwind CSS + design responsive

Documentation API
Swagger : http://127.0.0.1:8000/api/docs
Captures d'écran
<img src="frontend/public/screenshots/dashboard.png" alt="Dashboard">
<img src="frontend/public/screenshots/new-habit.png" alt="Formulaire création">
textAjoute 2-3 screenshots (F12 → capture ou outil de capture d’écran) dans `frontend/public/screenshots/`.

### Dernier push GitHub

```bash
git add .
git commit -m "CRUD Habit complet + frontend création + README"
git push