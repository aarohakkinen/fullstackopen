const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));
morgan.token("body", function(req) {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
});
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  if (!name || !number) {
    return res.status(400).json({
      error: "name or number missing"
    });
  } else if (persons.some(person => person.name === name)) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name: name,
    number: number,
    id: Math.floor(Math.random() * 9999999999999)
  };

  persons = persons.concat(person);
  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.get("/info", (req, res) => {
  res.send(
    "<p>Phonebook has info for " + persons.length + " people</p>" + Date()
  );
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})