const express = require("express");
const ngrok = require("ngrok");

const app = express();
const PORT = 3000;

// Sample data
const data = [
  { id: 1, tinyText: "Task A", person: "Alice", status: "Listo" },
  { id: 2, tinyText: "Task B", person: "Bob", status: "Estancado" },
  { id: 3, tinyText: "Task C", person: "Charlie", status: "En Proceso" },
  { id: 4, tinyText: "Task D", person: "David", status: "" }
];

// Route to expose the JSON data
app.get("/data", (req, res) => {
  res.json(data);
});

// Start server and expose via ngrok
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  const url = await ngrok.connect(PORT);
  console.log(`Public API URL: ${url}/data`);
});
