#!/bin/bash

# Récupérer la valeur de VITE_PLACEHOLDER_IMAGE_URL depuis le fichier .env
PLACEHOLDER_URL=$(grep VITE_PLACEHOLDER_IMAGE_URL .env | cut -d '=' -f2 | tr -d ' ')

echo "Remplacement des URLs placeholder dans src/data/games.json..."
echo "Nouvelle URL: $PLACEHOLDER_URL"

# Créer une sauvegarde du fichier original
cp src/data/games.json src/data/games.json.bak

# Remplacer les URLs dans le fichier
sed -i "s|https://via.placeholder.com/300x400|$PLACEHOLDER_URL|g" src/data/games.json
sed -i "s|https://via.placeholder.com/1920x1080|$PLACEHOLDER_URL|g" src/data/games.json

echo "Terminé!" 