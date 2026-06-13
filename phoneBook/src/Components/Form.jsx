const Form = ({
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name:
        <input
          name="name_input"
          value={newName}
          onChange={handleNewName}
          autoComplete="off"
        />
        <br />
        <br />
        number:
        <input
          name="number_input"
          value={newNumber}
          onChange={handleNewNumber}
        />
      </div>
      <div>
        <br />
        <button
          type="submit"
          onClick={addPerson}
        >
          Add to phonebook
        </button>
        <br />
        <br />
      </div>
    </form>
  );
};

export default Form;
