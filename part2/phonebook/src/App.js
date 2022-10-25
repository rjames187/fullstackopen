import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nameObj = { name: newName };
    if (persons.map(i => JSON.stringify(i)).includes(JSON.stringify(nameObj))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, nameObj]);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        { persons.map((i) => <div>{i.name}</div>) }
    </div>
  )
}

export default App