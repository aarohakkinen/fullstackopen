import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Numbers from "./components/Numbers";
import personService from "./services/persons";
import "./index.css";

const App = () => {
	const [filter, setFilter] = useState("");
	const [persons, setPersons] = useState([]);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService.fetch().then(response => {
			setPersons(response);
		});
	}, []);

	const handleNameChange = event => {
		setNewName(event.target.value);
	};

	const handleNumberChange = event => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = event => {
		setFilter(event.target.value);
	};

	const addPerson = event => {
		event.preventDefault();
		const existing = persons.find(x => x.name === newName);

		if (existing) {
			const answer = window.confirm(
				existing.name +
          " is already added to phonebook, replace the old number with a new one?"
			);

			if (answer) {
				existing.number = newNumber;
				personService
					.update(existing)
					.then(() => {
						setPersons(persons.map(x => (x.id !== existing.id ? x : existing)));
						setNewName("");
						setNewNumber("");

						setSuccessMessage(`${existing.name} has been successfully updated`);
						setTimeout(() => setSuccessMessage(null), 5000);
					})
					.catch(error => {
						setNewName("");
						setNewNumber("");

						setErrorMessage(error.response.data.error);
						setTimeout(() => setErrorMessage(null), 5000);
					});
			}
		} else {
			const person = { name: newName, number: newNumber };
			personService
				.add(person)
				.then(response => {
					setPersons(persons.concat(response));
					setNewName("");
					setNewNumber("");

					setSuccessMessage(`${person.name} has been successfully added`);
					setTimeout(() => setSuccessMessage(null), 5000);
				})
				.catch(error => {
					setErrorMessage(error.response.data.error);
					setTimeout(() => setErrorMessage(null), 5000);
				});
		}
	};

	const removePerson = person => {
		if (window.confirm("Delete " + person.name + "?")) {
			personService
				.remove(person)
				.then(() => {
					setPersons(persons.filter(x => x.id !== person.id));
					setSuccessMessage(`${person.name} has been successfully removed`);
					setTimeout(() => setSuccessMessage(null), 5000);
				})
				.catch(error => {
					setPersons(persons.filter(x => x.id !== person.id));
					setErrorMessage(error.response.data.error);
					setTimeout(() => setErrorMessage(null), 5000);
				});
		}
	};

	const filteredPersons = () => {
		if (filter) {
			return persons.filter(person =>
				person.name.toLowerCase().includes(filter.toLowerCase())
			);
		} else {
			return persons;
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				successMessage={successMessage}
				errorMessage={errorMessage}
			/>
			<Filter handleFilterChange={handleFilterChange} />
			<h2>Add a new</h2>
			<Form
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Numbers filteredPersons={filteredPersons} removePerson={removePerson} />
		</div>
	);
};

export default App;
