const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const uri = "mongodb+srv://Emir:Emir1234@cluster0.97jp3wg.mongodb.net/seneca_students";  
const client = new MongoClient(uri);

app.use(express.json());

// Optional: Handle the root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Welcome to the Student Records API');
});

// Get all active students
app.get('/students', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('seneca_students');  // Use your actual database name
    const collection = database.collection('students');
    const students = await collection.find({ status: 'active' }).toArray();
    res.json(students);
  } finally {
    await client.close();
  }
});

// Add a new student record
app.post('/students', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('seneca_students');  // Use your actual database name
    const collection = database.collection('students');
    const result = await collection.insertOne(req.body);
    res.json(result);
  } finally {
    await client.close();
  }
});

// Update a student's status
app.put('/students/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('seneca_students');  // Use your actual database name
    const collection = database.collection('students');
    const result = await collection.updateOne(
      { student_id: req.params.id },
      { $set: { status: req.body.status } }
    );
    res.json(result);
  } finally {
    await client.close();
  }
});

// Delete a student record
app.delete('/students/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('seneca_students');  // Use your actual database name
    const collection = database.collection('students');
    const result = await collection.deleteOne({ student_id: req.params.id });
    res.json(result);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
