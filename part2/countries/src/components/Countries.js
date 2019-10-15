import React from "react";
import Country from "./Country";
import DetailedCountry from "./DetailedCountry";

const Countries = ({ filteredCountries, handleFilterChange }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length > 1) {
    return filteredCountries.map(country => (
      <Country
        key={country.name}
        country={country}
        handleFilterChange={handleFilterChange}
      />
    ));
  } else if (filteredCountries.length > 0) {
    return filteredCountries.map(country => (
      <DetailedCountry key={country.name} country={country} />
    ));
  } else {
    return null;
  }
};

export default Countries;
