# Utilisez une image de Node.js comme base
FROM node:14

# Créez le répertoire de travail
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json (le cas échéant)
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste de l'application
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 3000

# Commande pour exécuter l'application
CMD ["node", "app.js"]
