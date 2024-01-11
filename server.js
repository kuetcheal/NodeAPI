const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const router = express.Router();
const uniqid = require('uniqid');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// ... le reste de votre code


const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

// Configuration de la connexion à la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'symfonyapi',
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données MySQL établie !');
});

connection.on('error', (err) => {
  console.error('Erreur de connexion à la base de données MySQL :', err);
  res.status(500).json({ error: 'Erreur de connexion à la base de données' });
});



connection.query('SELECT * FROM admins', (err, résultats) => {
  if (err) throw err;
  console.log('Résultats de la requête :', résultats);
});


// Middleware pour gérer les requêtes CORS


// Endpoint pour récupérer les données de la base de données
app.get('/', (req, res) => {
  const query = 'SELECT * FROM admins';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
      return;
    }

    res.json(results);
    console.log(results);
  });
});


app.get('/admins/:id', (req, res) => {
  const adminId = req.params.id;

  // Remplacez le code suivant par la logique de récupération des données de l'administrateur depuis votre base de données
  const adminData = {
    id: adminId,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123'
  };

  res.json(adminData);
});




app.post("/admins", async (req, res) => {
  const sql = "INSERT INTO admins (`name`, `email`, `password`) VALUES (?) ";
  const val = [req.body.name, req.body.email, req.body.password];

  console.log("Data received:", val);

  connection.query(sql, [val], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Erreur lors de l'insertion des données dans la base de données" });
    } 

    // Génération du code unique
    const veri = uniqid();
    const code = veri.substr(0, 5);

    // Envoi de l'email de confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      //port: 587,
      //secure: true,
      auth: {
        user: 'akuetche55@gmail.com',
        pass: 'elph odwj zetr tsvg'
      },
      tls: {
            rejectUnauthorized: false
          }
    });

    const mailOptions = {
      from: 'akuetche55@gmail.com',
      to: req.body.email, // Utilisez l'adresse e-mail fournie lors de l'inscription
      subject: 'Code de Confirmation de l\'inscription',
      text: `Merci pour votre inscription, vous y êtes presque, votre Code de confirmation est : ${code}`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email envoyé:", info.response);
      res.status(200).json({ message: "Inscription réussie. Un email de confirmation a été envoyé." });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'email de confirmation." });
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});


//connection.end();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   secure: true,
//   auth: {
//     user: 'akuetche55@gmail.com', 
//     pass: 'elph odwj zetr tsvg'
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// const mailOptions = {
//   from: 'akuetche55@gmail.com',
//   to: 'kuetchealex99@gmail.com', 
//   subject: 'comfirmation code',
//   text: 'Un nouvel administrateur a été ajouté à votre application.'
// };


//   transporter.sendMail(mailOptions, (error, info) => {
//     if(error){
//       console.log(error);
//     }else{
//       console.log("email envoyé" + info.response);
//     }
//   });