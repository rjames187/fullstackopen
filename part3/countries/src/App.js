import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({data, searchStr}) => {
  const results = data.filter((i) => i.toLowerCase().includes(searchStr));

  return (
    <>
      { 
        results.length > 10 ? <p>Too many matches, specify another filter</p> : 
        results.map((i, j) => <p key={j}>{i}</p>)
      }
    </>
  )
}

function App() {

  const [data, setData] = useState([]);
  const [searchStr, setSearchStr] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const countries = res.data;
      const names = countries.map((i) => i.name.common);
      setData(names);
    })
  }, [])

  const handleSearchChange = (e) => {
    setSearchStr(e.target.value);
  }

  return (
    <>
      <div>
        find countries <input type="text" onChange={handleSearchChange}></input>
      </div>
      <Countries data={data} searchStr={searchStr}></Countries>
    </>
  );
}

export default App;
