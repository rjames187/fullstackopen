const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
morgan.token('body', (request, response) => {
  return request.body ? JSON.stringify(request.body) : ""
})

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.use(logger)

app.use(cors())

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)
    //console.log(persons)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }

    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

    if (persons.map(i => i.name).includes(body.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const id = Math.floor(Math.random() * 10000)
    const person = request.body
    person.id = id
    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
})

app.get('/info', (request, response) => {
    const numPersons = persons.length
    const date = String(new Date())
    response.send(`<p>Phonebook has info for ${numPersons} people</p><p>${date}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})