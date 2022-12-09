import { useState, useEffect } from 'react'
import axios from 'axios';
import personService from './services/persons';


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

const Persons = ({persons, searchStr, handleDeletion}) => {
  return (
    <>
      { persons.filter((i) => i.name.includes(searchStr)).map((i, j) => 
        <div key={j}>{i.name + ' ' + i.number}<button onClick={() => handleDeletion(i.id, i.name)}>delete</button></div>
      )}
    </>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return type === "error" ? (
    <div className='error'>
      {message}
    </div>
  ) :
  (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchStr, setSearchStr] = useState('');
  const [trigger, setTrigger] = useState(0);
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(intialPersons => {
        console.log(intialPersons);
        setPersons(intialPersons);
      })
  }, [trigger])

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
    const matchedPersons = persons.filter(i => i.name === newName);
    
    if (persons.map(i => JSON.stringify(i)).includes(JSON.stringify(nameObj))) {
      alert(`${newName} is already added to phonebook`)
    } else if (matchedPersons.length > 0) {
      if (window.confirm(`${matchedPersons[0].name} is already added to phone number, replace the old number with a new one?`)) {
        personService.update(matchedPersons[0].id, nameObj)
          .then(returnedPerson => {
            console.log(returnedPerson);
            setTrigger(trigger + 1);
            setMessage(`Updated ${nameObj.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }).catch(err => {
            console.log(err)
            setErrorMessage(`Information of ${nameObj.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      personService.create(nameObj)
        .then(returnedPersons => {
          console.log(returnedPersons);
          setPersons(persons.concat(returnedPersons))
          setMessage(`Added ${nameObj.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleDeletion = (id, name) => {
    if (window.confirm(`Delete ${name}?`)){
      personService.remove(id)
        .then(removedPerson => {
          console.log(removedPerson);
          setTrigger(trigger + 1);
        }).catch(err => {
          console.log(err)
          setErrorMessage(`Information of ${name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="success" message={message} />
      <Notification type="error" message={errorMessage} />
      <Filter onChangeHandler={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchStr={searchStr} handleDeletion={handleDeletion}/>
    </div>
  )
}

export default App