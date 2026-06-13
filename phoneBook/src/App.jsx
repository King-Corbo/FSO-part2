import { useState, useEffect } from "react";
import Persons from "./Components/Person";
import Form from "./Components/Form";
import Filter from "./Components/Filter";
import personService from "./Services/persons";
import Notifications from "./Components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const hook = () => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  };

  useEffect(hook, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    const tempFilter = event.target.value;
    setNewFilter(tempFilter);
    tempFilter.length > 0 ? setShowAll(false) : setShowAll(true);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter(
        (person) =>
          person.name.toUpperCase().includes(newFilter.toUpperCase()) === true,
      );

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.findIndex(
        (person) => person.name.toUpperCase() === newName.toUpperCase(),
      ) === -1
    ) {
      if (newName.length * newNumber.length !== 0) {
        personService.create(personObject).then((returnedPerson) => {
          const newFeedback = {
            message: `Added ${returnedPerson.name}`,
            positive: true,
          };
          setFeedback(newFeedback);
          setTimeout(() => {
            setFeedback(null);
          }, 5000);

          setPersons([...persons, returnedPerson]);
          setNewName("");
          setNewNumber("");
        });
      } else {
        const newFeedback = {
          message: `Please ensure that both fields (name and number) are filled.`,
          positive: false,
        };
        setFeedback(newFeedback);
        setTimeout(() => {
          setFeedback(null);
        }, 5000);
      }
    } else {
      const individual = persons.filter((person) => person.name === newName)[0];
      if (individual.number !== newNumber) {
        if (
          window.confirm(
            `${newName} is already aded to the phonebook, replace the old number with the new one? `,
          )
        ) {
          personService
            .update(individual.id, personObject)
            .then((returnedPerson) => {
              const newFeedback = {
                message: `Updated ${returnedPerson.name}`,
                positive: true,
              };
              setFeedback(newFeedback);
              setTimeout(() => {
                setFeedback(null);
              }, 5000);
              const fileteredPersons = persons.filter(
                (person) => person.id !== returnedPerson.id,
              );
              setPersons([...fileteredPersons, returnedPerson]);
              setNewName("");
              setNewNumber("");
            })
            .catch(() => {
              const newFeedback = {
                message: `Information for ${individual.name} has already been removed from the server`,
                positive: false,
              };
              setFeedback(newFeedback);
              setTimeout(() => {
                setFeedback(null);
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== individual.id),
              );
            });
        }
      } else {
        const newFeedback = {
          message: `'${newName}' is already in the phonebook with the number: '${newNumber}'`,
          positive: false,
        };

        setFeedback(newFeedback);
        setTimeout(() => {
          setFeedback(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      }
    }
  };

  const deletePerson = (id) => {
    const name = persons.find((person) => person.id === id).name;
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .eliminate(id)
        .then(() => {
          setPersons((persons) => persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          const newFeedback = {
            message: `Information for ${name} has already been removed from the server`,
            positive: false,
          };
          setFeedback(newFeedback);
          setTimeout(() => {
            setFeedback(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <br />
      <Notifications message={feedback} />
      <Filter
        newFilter={newFilter}
        handleNewFilter={handleNewFilter}
      />
      <h3>Add a new entry into the phonebook</h3>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
