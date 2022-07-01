import React from 'react';

const Country = ({ country }) => {
  return (
    <div key={country.name}>
      <h2>{country.name.common}</h2>
      <p>Capital:{country.capital}</p>
      <p>Area: {country.area}</p>
      <br />
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};

export default Country;
