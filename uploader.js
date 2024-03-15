const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
require('dotenv').config();
const collection = require('./models/Data');

const cors = require("cors");
const app = express();
const fs = require('fs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Connexion à la base de données
connectDB();

// Lire le contenu du fichier JSON
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur de lecture du fichier JSON:', err);
        return;
    }

    try {
        // Convertir le JSON en objet JavaScript
        const jsonData = JSON.parse(data);

        // Insérer les données dans MongoDB
        collection.insertMany(jsonData)
            .then(result => {
                console.log('Données insérées avec succès dans MongoDB:', result);
            })
            .catch(err => {
                console.error('Erreur lors de l\'insertion des données dans MongoDB:', err);
            });
    } catch (error) {
        console.error('Erreur lors de l\'analyse du JSON:', error);
    }
});

// Routes
app.use("/", userRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
