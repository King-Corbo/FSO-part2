const Person = ({ person, deletePerson }) => {
  return (
    <p>
      <li>
        {person.name} {person.number} &nbsp;
        <button onClick={deletePerson}>Delete</button>
      </li>
    </p>
  );
};

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </ul>
  );
};

export default Persons;
