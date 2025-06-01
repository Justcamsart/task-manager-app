# Task Manager API
PI RESTful pour une application de gestion de tâches, construite avec **Node.js**, **Express**, **MongoDB Atlas** et **Joi** pour la validation.

## Structure du projet
backend/
├── controllers/
│ └── taskController.js
├── models/
│ └── Task.js
├── routes/
│ └── taskRoutes.js
├── validations/
│ └── taskValidation.js
├── server.js
├── .env
└── package.json

## Lancer l'API en local

### 1. Cloner le dépôt

    ```bash
    git clone https://github.com/votre-utilisateur/task-manager-app.git
    cd task-manager-app/backend

### 2. Installer les dépendances
    npm install

### 3. Créer un fichier .env
    À la racine du dossier backend, créer un fichier .env :
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

    Remplace <username>, <password> et <cluster> par les informations de ton cluster MongoDB Atlas.


### 4. Lancer le serveur    
    npm run dev


## Endpoints de l’API

| Méthode | Route            | Description                 |
| ------- | ---------------- | --------------------------- |
| GET     | `/api/tasks`     | Récupérer toutes les tâches |
| GET     | `/api/tasks/:id` | Récupérer une tâche par ID  |
| POST    | `/api/tasks`     | Créer une nouvelle tâche    |
| PUT     | `/api/tasks/:id` | Mettre à jour une tâche     |
| DELETE  | `/api/tasks/:id` | Supprimer une tâche         |


## Tester l’API

Utilise :

    Postman

    Thunder Client (extension VSCode)

    ou curl en ligne de commande

## Technologies utilisées
Node.js

Express

MongoDB Atlas

Mongoose

Joi (validation)

dotenv

CORS   