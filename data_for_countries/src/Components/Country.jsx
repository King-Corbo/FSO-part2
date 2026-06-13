const Country = ({ name, handleShowClick }) => {
  return (
    <p>
      <li>
        {name} <button onClick={() => handleShowClick(name)}>Show</button>
      </li>
    </p>
  );
};

const Countries = ({ countriesToShow, handleShowClick }) => {
  if (countriesToShow.length === 1) {
    return null;
  }
  return (
    <ul>
      {countriesToShow.map((country) => (
        <Country
          key={country.name.official}
          name={country.name.common}
          handleShowClick={handleShowClick}
        />
      ))}
    </ul>
  );
};

export default Countries;
