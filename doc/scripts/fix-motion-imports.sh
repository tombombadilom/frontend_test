#!/bin/bash

# Script pour corriger les importations de motion dans le projet
# Remplace 'import { ... } from "motion"' par 'import { ... } from "motion/react"'

echo "Correction des importations de motion..."

# Utiliser grep pour trouver les fichiers contenant les importations incorrectes
FILES=$(grep -l "import.*from ['\"]motion['\"]" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" -r src/)

# Compteur pour les fichiers modifiés
COUNT=0

for FILE in $FILES; do
  echo "Traitement de $FILE"
  
  # Sauvegarde du fichier original
  cp "$FILE" "${FILE}.bak"
  
  # Remplace les importations
  sed -i 's/import \(.*\) from "motion"/import \1 from "motion\/react"/g' "$FILE"
  
  # Vérifie si le fichier a été modifié
  if ! cmp -s "$FILE" "${FILE}.bak"; then
    echo "✅ Corrigé: $FILE"
    COUNT=$((COUNT+1))
  else
    echo "⚠️ Aucun changement: $FILE"
  fi
  
  # Supprime le fichier de sauvegarde
  rm "${FILE}.bak"
done

echo "Terminé! $COUNT fichiers ont été corrigés." 