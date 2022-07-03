import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Weather from './components/Weather';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => setCountries(res.data));
  }, []);

  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectCountry = (e) => {
    const country = e.target.previousSibling.innerText;

    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => setSelectedCountry(res.data));
  };

  return (
    <>
      <label htmlFor="countries">Find countries: </label>
      <input
        type="text"
        id="countries"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCountries.length > 10 && searchTerm && (
        <p>Too many matches, please narrow your search</p>
      )}
      {filteredCountries.length < 10 &&
        filteredCountries.map((country) => (
          <div
            key={country.name.common}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '150px',
            }}
          >
            <p key={country.name.common}>{country.name.common}</p>
            <button style={{ marginLeft: 'auto' }} onClick={selectCountry}>
              show
            </button>
          </div>
        ))}
      {filteredCountries.length === 1 &&
        filteredCountries.map((country) => <Country country={country} />)}
      {selectedCountry.map((country) => (
        <>
          <Country country={country} />
          <Weather country={country} />
        </>
      ))}
    </>
  );
}

export default App;
