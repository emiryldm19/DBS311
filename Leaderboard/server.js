const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://Emir:Emir1234@cluster0.97jp3wg.mongodb.net/";
const client = new MongoClient(uri);

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/leaderboard', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('seneca_students');
    const collection = database.collection('students');

    const leaderboard = await collection.aggregate([
      {
        $unwind: "$courses"
      },
      {
        $addFields: {
          numericGrade: {
            $switch: {
              branches: [
                { case: { $eq: ["$courses.grade", "A"] }, then: 4.0 },
                { case: { $eq: ["$courses.grade", "A-"] }, then: 3.7 },
                { case: { $eq: ["$courses.grade", "B+"] }, then: 3.3 },
                { case: { $eq: ["$courses.grade", "B"] }, then: 3.0 },
                { case: { $eq: ["$courses.grade", "B-"] }, then: 2.7 },
                { case: { $eq: ["$courses.grade", "C+"] }, then: 2.3 },
                { case: { $eq: ["$courses.grade", "C"] }, then: 2.0 },
                { case: { $eq: ["$courses.grade", "C-"] }, then: 1.7 },
                { case: { $eq: ["$courses.grade", "D+"] }, then: 1.3 },
                { case: { $eq: ["$courses.grade", "D"] }, then: 1.0 },
                { case: { $eq: ["$courses.grade", "F"] }, then: 0.0 }
              ],
              default: null
            }
          }
        }
      },
      {
        $group: {
          _id: "$student_id",
          name: { $first: "$name" },
          averageGrade: { $avg: "$numericGrade" }
        }
      },
      {
        $sort: { averageGrade: -1 }
      },
      {
        $limit: 10
      }
    ]).toArray();

    res.json(leaderboard);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
