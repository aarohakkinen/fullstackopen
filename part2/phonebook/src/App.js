import React, { useState } from "react"

const Filter = ({ newFilter, handleFilterChange }) => <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const Numbers = ({ persons }) => persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-123456" }])
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newFilter, setNewFilter] = useState("")
    
    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }
        if (persons.some(person => person.name === nameObject.name)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(nameObject))
            if (new RegExp(newFilter, "i").test(nameObject.name)) {
                setFilteredPersons(filteredPersons.concat(nameObject))
            }
            setNewName(""); setNewNumber("")
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        setFilteredPersons(persons.filter(person => new RegExp(event.target.value, "i").test(person.name)))
    }

	return (
		<div>
			<h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <h2>Add a new</h2>
			<Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

			<h2>Numbers</h2>
            <Numbers persons={filteredPersons} />
		</div>
	)
}

export default App
