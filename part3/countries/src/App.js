import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FullCountry = ({data}) => {
  
  console.log(data);

  return (
    <>
      <h1>{data.name.common}</h1>
      <p>capital {data.capital[0]}</p>
      <p>area {data.area}</p>
      <div>
        languages
        <ul>
          {Object.keys(data.languages).map((i) => <li>{data.languages[i]}</li>)}
        </ul>
      </div>
      <img src={data.flags.png} alt={`flag of ${data.name.common}`}/>
    </>
  )
}

const Countries = ({data, searchStr}) => {
  const results = data.filter((i) => i.name.common.toLowerCase().includes(searchStr));

  const [showingFull, setShowingFull] = useState(false);
  const [fullCountryData, setFullCountryData] = useState({});

  const handleButtonClick = (j) => {
    setFullCountryData(results[j]);
    setShowingFull(true);
  }

  useEffect(() => {
    setShowingFull(false);
  }, [searchStr])

  return (
    <>
      { 
        showingFull ? <FullCountry data={fullCountryData} /> :
        results.length > 10 ? <p>Too many matches, specify another filter</p> : 
        results.length !== 1 ? results.map((i, j) => <><p key={j}>{i.name.common}</p> 
        <button onClick={() => handleButtonClick(j)} key={j}>Show</button></>) :
        <FullCountry data={results[0]} />
      }
    </>
  )
}

function App() {

  const [data, setData] = useState([]);
  const [searchStr, setSearchStr] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      
      setData(res.data);
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
