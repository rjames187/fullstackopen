require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
morgan.token('body', (request, response) => {
  return request.body ? JSON.stringify(request.body) : ""
})

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.use(logger)

app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
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