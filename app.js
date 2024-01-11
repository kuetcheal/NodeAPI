const express = require('express');
const mysql = require('mysql');

// Configurer les paramètres de connexion à la base de données
const dbConfig = {
  host: 'localhost',  
  user: 'root',
  password: '',
  database: 'bd_stock',
};


const connection = mysql.createConnection(dbConfig);


connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données MySQL établie !');
});

// Gérer les erreurs de connexion
connection.on('error', (err) => {
  console.error('Erreur de connexion à la base de données MySQL :', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
   
    connection.connect();
  } else {
    throw err;
  }
});


connection.query('SELECT * FROM reservation', (err, résultats) => {
  if (err) throw err;
  console.log('Résultats de la requête :', résultats);
});


connection.end();

