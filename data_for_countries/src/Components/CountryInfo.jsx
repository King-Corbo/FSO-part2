import Weather from "./Weather";

const CountryInfo = ({ countriesToShow }) => {
  if (countriesToShow.length !== 1) {
    return;
  } else {
    const country = countriesToShow[0];

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt=""
        />
        <Weather country={country} />
      </div>
    );
  }
};

export default CountryInfo;
