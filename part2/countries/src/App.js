import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setFilteredCountries(
      countries.filter(country =>
        new RegExp(event.target.value, "i").test(country.name)
      )
    );
  };

  return (
    <div>
      <span>find countries</span>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries
        filteredCountries={filteredCountries}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
