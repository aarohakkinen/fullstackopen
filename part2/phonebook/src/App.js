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
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.fetch().then(response => {
      setPersons(response);
      setFilteredPersons(response);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };
    const index = persons.findIndex(person => person.name === nameObject.name);

    if (index !== -1 && window.confirm(nameObject.name +
        " is already added to phonebook, replace the old number with a new one?")) {
      nameObject["id"] = persons[index].id;
      personService
        .update(nameObject)
        .then(() => {
          setPersons(persons.splice(index, 1, nameObject));
          if (new RegExp(filter, "i").test(nameObject.name)) {
            setFilteredPersons(
              persons.filter(person =>
                new RegExp(filter, "i").test(person.name)
              )
            );
          }
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`${nameObject.name} has been successfully updated`);
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch(() => {
          setPersons(persons.filter(x => x.id !== nameObject.id));
          setFilteredPersons(
            filteredPersons.filter(x => x.id !== nameObject.id)
          );
          setErrorMessage(`Information of ${nameObject.name} has already been removed from server`);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    } else {
      personService.add(nameObject).then(response => {
        setPersons(persons.concat(response));
        if (new RegExp(filter, "i").test(response.name)) {
          setFilteredPersons(filteredPersons.concat(response));
        }
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`${nameObject.name} has been successfully added`);
        setTimeout(() => setSuccessMessage(null), 5000);
      });
    }
  };

  const removePerson = nameObject => {
    if (window.confirm("Delete " + nameObject.name + "?")) {
      personService
        .remove(nameObject)
        .then(() => {
          setSuccessMessage(`${nameObject.name} has been successfully removed`);
          setTimeout(() => setSuccessMessage(null), 5000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${nameObject.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(null), 5000);
        });
      setPersons(persons.filter(x => x.id !== nameObject.id));
      setFilteredPersons(filteredPersons.filter(x => x.id !== nameObject.id));
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setFilteredPersons(
      persons.filter(person =>
        new RegExp(event.target.value, "i").test(person.name)
      )
    );
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
