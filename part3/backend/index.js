require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Person = require("./models/person");

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

app.get("/api/persons", (req, res, next) => {
	Person.find({})
		.then(persons => {
			res.json(persons.map(person => person.toJSON()));
		})
		.catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person.toJSON());
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {
	const name = req.body.name;
	const number = req.body.number;

	if (!name) {
		return res.status(400).json({
			error: "name missing"
		});
	}

	if (!number) {
		return res.status(400).json({
			error: "number missing"
		});
	}

	const person = new Person({
		name: name,
		number: number
	});

	person
		.save()
		.then(person => {
			res.json(person.toJSON());
		})
		.catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
	const update = {
		name: req.body.name,
		number: req.body.number
	};

	Person.findByIdAndUpdate(req.params.id, update, { new: true })
		.then(person => {
			res.json(person.toJSON());
		})
		.catch(error => next(error));
});

app.get("/info", (req, res, next) => {
	Person.find({})
		.then(persons => {
			res.send(
				"<p>Phonebook has info for " + persons.length + " people</p>" + Date()
			);
		})
		.catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		return res.status(400).send({ error: "malformatted id" });
	}

	if (error.name === "ValidationError") {
		return res.status(400).send({ error: error.message });
	}

	next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
