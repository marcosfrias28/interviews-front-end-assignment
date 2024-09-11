const express = require('express');
const jsonServer = require('json-server');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Set up JSON Server middleware
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(middlewares);

app.use('/uploads', express.static('uploads'));

// Custom route to handle multipart/form-data POST requests
app.post('/recipes', upload.single('image'), (req, res) => {
  const db = router.db; // Get lowdb instance

  // Extract form data from request
  const { name, ingredients, instructions, cuisineId, dietId, difficultyId } = req.body;

  // Create new recipe object
  const newRecipe = {
    id: String(Date.now()), // Generate a simple unique ID
    name,
    ingredients: ingredients ? ingredients.split(',') : [],
    instructions,
    cuisineId,
    dietId,
    difficultyId,
    image: req.file ? `/uploads/${req.file.filename}` : null
  };

  // Save new recipe to the database
  db.get('recipes').push(newRecipe).write();

  res.status(201).json(newRecipe);
});

// Utility functions to get cuisine and difficulty names by ID
const getCuisineNameById = (id, db) => {
  const cuisine = db.get('cuisines').find({ id }).value();
  return cuisine ? cuisine.name : null;
};

const getDifficultyNameById = (id, db) => {
  const difficulty = db.get('difficulties').find({ id }).value();
  return difficulty ? difficulty.name : null;
};

// Routes
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
