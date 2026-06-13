import { useState, useEffect } from "react";
import Countries from "./Components/Country";
import Filter from "./Components/Filter";
import countriesService from "./Services/countries";
import FilterMessage from "./Components/FilteredMessage";
import CountryInfo from "./Components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    countriesService.getAll().then((initialData) => {
      setCountries(initialData);
    });
  };

  useEffect(hook, []);

  const countriesFiltered = showAll
    ? countries
    : countries.filter(
        (country) =>
          country.name.common
            .toUpperCase()
            .includes(newFilter.toUpperCase()) === true,
      );

  const countriesToShow =
    countriesFiltered.length > 10 ? [] : countriesFiltered;

  const handleNewFilter = (event) => {
    const tempFilter = event.target.value;
    setNewFilter(tempFilter);
    tempFilter.length > 0 ? setShowAll(false) : setShowAll(true);
  };

  const handleShowClick = (nameSelected) => {
    setNewFilter(nameSelected);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Filter
        newFilter={newFilter}
        handleNewFilter={handleNewFilter}
      />
      <FilterMessage
        newFilter={newFilter}
        countriesToShow={countriesToShow}
        countriesFiltered={countriesFiltered}
      />

      <Countries
        countriesToShow={countriesToShow}
        handleShowClick={handleShowClick}
        // deleteCountry={deleteCountry}
      />
      <CountryInfo countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;
