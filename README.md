# DBS311

Overview
This project is a full-stack application for managing and visualizing student records at Seneca Polytechnic. It includes a Node.js-based RESTful API, MongoDB database interactions, dynamic data visualization using MongoDB Charts, and a web application displaying a leaderboard of top students based on their average grades.

Features

CRUD Operations: Create, read, update, and delete student records via a RESTful API.
Data Visualization: Visualize student data using MongoDB Charts.
Dynamic Leaderboard: View the top 10 students by average grades through a web interface.
Prerequisites

Node.js (v14.x or higher)
MongoDB (Atlas or local instance)
Git (for cloning the repository)

Install Dependencies
Install the required Node.js packages:
- npm install

Set Up MongoDB

MongoDB Connection:
Replace the MongoDB connection string in server.js with your own MongoDB URI.
The database name used in the project is seneca_students.
Run the MongoDB Setup Script:
Populate your MongoDB database with initial data by running the following command:

node scripts/mongodb-setup.js
Running the Application

Run the API Server
Start the Node.js server:
node server.js

The API will run on http://localhost:3000.

Access the Web Application
Once the server is running, open your browser and go to:
http://localhost:3000
