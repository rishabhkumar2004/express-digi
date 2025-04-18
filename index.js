// Importing the Express framework using ES Modules syntax
// This line imports the 'express' library, which is a minimal and flexible Node.js web application framework
import express from "express";

// Creating an Express application instance
// 'app' is the main object that will be used to define routes, middleware, and start the server
const app = express();

// Defining the port number where the server will run
// This is the port the server will listen on (http://localhost:3000)
const port = 3000;

// Using express.json() middleware to parse incoming JSON request bodies
// This middleware parses incoming requests with JSON payloads and makes the data available in req.body
app.use(express.json());

// Initializing an empty array to store tea data (acts like an in-memory database)
// This array acts like a temporary database that stores tea objects while the server is running
let teaData = [];

// A variable to assign unique IDs to each tea entry
// Each new tea entry will be given a unique ID using this counter, which increments each time
let nextId = 1;

// Defining a POST route at '/teas' to handle adding new tea entries
// When a client sends a POST request to '/teas', this function will be executed
app.post("/teas", (req, res) => {
  req.body.price; // ❌ This line does nothing and can be removed

  // Destructuring 'name' and 'price' from the request body
  // Expected input JSON: { "name": "Tea Name", "price": 100 }
  const { name, price } = req.body;

  // Creating a new tea object with a unique ID
  const newTea = {
    id: nextId++, // Assign the current value of nextId, then increment it for the next entry
    name, // Assign the name received from the request
    price, // Assign the price received from the request
  };

  // Adding the new tea object to the teaData array
  teaData.push(newTea);

  // Sending a response with status 201 (Created) and the newly added tea object
  res.status(201).send(newTea);
});

// GET route to retrieve all teas
// When a client sends a GET request to '/teas', it will respond with the entire teaData array
app.get("/teas", (req, res) => {
  res.status(200).send(teaData); // ✅ Returns all tea entries with status code 200 (OK)
});

// GET route to retrieve a tea by its ID
// When a client sends a GET request like '/teas/1', this route returns the tea with ID 1 if it exists
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // Find tea by ID
  if (!tea) {
    return res.status(404).send("tea not found "); // If tea doesn't exist, send 404
  } else {
    res.status(200).send(tea); // ✅ If found, return the tea with status 200
  }
});

// PUT route to update a tea by its ID
// When a client sends a PUT request to '/teas/:id', this updates the tea with new values
app.put("/teas/:id", (req, res) => {
  const teaId = req.params.id; // Extract tea ID from URL (string)
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // Find tea in array

  if (!tea) {
    return res.status(404).send("tea not found "); // ❌ if not found, return 404
  }

  const { name, price } = req.body; // Get updated name and price from request body

  tea.name = name; // ❌ Logical bug: assigning price to name
  tea.price = price; // ✅ Correctly assigning price to price

  res.status(200).send(tea); // ❌ Incorrect syntax: res.send(200) is not valid. Should be res.status(200).send(tea)
});

// DELETE route to remove a tea by ID
// This handles requests like DELETE /tea/2 and removes the corresponding tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id)); // Find the index of tea

  if (index === -1) {
    return res.status(404).send("tea not found"); // ❌ Returns 404 if no such tea exists
  }

  teaData.splice(index, 1); // ✅ Removes the tea from array
  return res.status(204).send("deleted "); // ✅ 204 usually has no content, but sending a message is okay here for clarity
});

// Starting the server and listening on the defined port
// This will make the server start and begin listening for incoming HTTP requests
app.listen(port, () => {
  // Logging a message to the console once the server is up and running
  console.log(`server is running at port : ${port}.......`);
});






//SUMMARY:
// -----------------------------------------
// 📌 PROJECT SUMMARY: TEA MANAGEMENT API
// -----------------------------------------

// ✅ This project is a basic RESTful API using Node.js and Express.js.
// ✅ It lets you perform full CRUD operations (Create, Read, Update, Delete) on a tea collection.
// ✅ Data is stored in-memory using a JavaScript array (no database).
// ✅ The API supports JSON-formatted request/response bodies.

// -----------------------------------------
// 🔧 TECH USED
// -----------------------------------------

// - Express.js: Web framework for Node.js
// - express.json(): Middleware to parse JSON in incoming requests
// - Array methods: Used to store, find, update, and delete tea entries

// -----------------------------------------
// 🔄 ROUTE FUNCTIONALITY (CRUD)
// -----------------------------------------

// -----------------------------------------
// ➕ POST /teas
// -----------------------------------------
// - Purpose: Add a new tea entry.
// - Request Body: { "name": "Green Tea", "price": 100 }
// - Logic:
//     - Destructure `name` and `price` from req.body
//     - Create a new tea object with a unique ID (from `nextId`)
//     - Push the tea object to the `teaData` array
//     - Increment `nextId`
// - Response: 201 Created with the new tea object

// -----------------------------------------
// 📃 GET /teas
// -----------------------------------------
// - Purpose: Get all teas
// - Logic: Return the full `teaData` array
// - Response: 200 OK with list of all teas

// -----------------------------------------
// 🔍 GET /teas/:id
// -----------------------------------------
// - Purpose: Get a specific tea by ID
// - Logic:
//     - Extract ID from req.params
//     - Use `find()` to locate the tea
//     - If not found: return 404 Not Found
//     - If found: return the tea object
// - Response: 200 OK or 404 Not Found

// -----------------------------------------
// ✏️ PUT /teas/:id
// -----------------------------------------
// - Purpose: Update a tea by ID
// - Request Body: { "name": "New Name", "price": 120 }
// - Logic:
//     - Extract ID from req.params
//     - Find the tea object
//     - If not found: return 404
//     - Update the `name` and `price` fields
// - Response: 200 OK with updated tea

// -----------------------------------------
// ❌ DELETE /teas/:id
// -----------------------------------------
// - Purpose: Delete a tea by ID
// - Logic:
//     - Extract ID from req.params
//     - Find index of the tea using `findIndex()`
//     - If not found: return 404
//     - Use `splice()` to remove tea from the array
// - Response: 204 No Content (successful deletion)

// -----------------------------------------
// 🟢 SERVER START
// -----------------------------------------
// - The server starts and listens on port 3000
// - Once started, logs message: "server is running at port : 3000......."
