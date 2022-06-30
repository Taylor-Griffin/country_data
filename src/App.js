import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data));
  }, []);
  console.log(countries[1]);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <label htmlFor="countries">Find countries: </label>
      <input
        type="text"
        id="countries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCountries.length > 10 && (
        <p>Too many matches, please narrow your search</p>
      )}
      {filteredCountries.length < 10 &&
        filteredCountries.length !== 1 &&
        filteredCountries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      {filteredCountries.length === 1 &&
        filteredCountries.map((country) => (
          <>
            <h2>{country.name.common}</h2>
            <p>Capital:{country.capital}</p>
            <p>Area: {country.area}</p>
            <br />
            <h3>Languages:</h3>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li>{language}</li>
              ))}
            </ul>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
          </>
        ))}
    </>
  );
}

export default App;
