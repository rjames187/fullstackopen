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

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(400).end()
      }
    }).catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' }).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error => {
    next(error)
  })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => {
      next(error)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const numPersons = persons.length
        const date = String(new Date())
        response.send(`<p>Phonebook has info for ${numPersons} people</p><p>${date}</p>`)
    }).catch(error => {
        next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: "malformatted id"})
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})