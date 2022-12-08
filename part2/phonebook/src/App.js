import { useState, useEffect } from 'react'
import axios from 'axios';

const Filter = ({onChangeHandler}) => {
  return (
    <>
      filter shown with <input onChange={onChangeHandler} />
    </>
  )
}

const PersonForm = ({handleFormSubmit, handleNameChange, handleNumChange}) => {
  return (
    <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
          <br/>
          number: <input onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons, searchStr}) => {
  return (
    <>
      { persons.filter((i) => i.name.includes(searchStr)).map((i, j) => <div key={j}>{i.name + ' ' + i.number}</div>) }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      console.log(res.data);
      setPersons(res.data);
    })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  }

  const handleSearchChange = (e) => {
    setSearchStr(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nameObj = { name: newName, number: newNum };
    if (persons.map(i => JSON.stringify(i)).includes(JSON.stringify(nameObj))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios.post('http://localhost:3001/persons', nameObj)
        .then(response => {
          console.log(response.data);
        })
      setPersons([...persons, nameObj]);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeHandler={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchStr={searchStr} />
    </div>
  )
}

export default App