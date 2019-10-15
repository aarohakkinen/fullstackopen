import React from "react";

const Country = ({ country, handleFilterChange }) => (
  <div key={country.name}>
    {country.name}
    <button value={country.name} onClick={handleFilterChange}>
      show
    </button>
  </div>
);

export default Country;
