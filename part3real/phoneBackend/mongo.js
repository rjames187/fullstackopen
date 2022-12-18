const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Please provide the password, name, and number as arguments: node mongo.js <password> <name> <number>')
    process.exit(1)
  }
  
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://rjames187:${password}@cluster0.8jrpzka.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url).then(result => {
   console.log('connected')
   
   if (process.argv.length === 3) {
        Person.find({}).then(result => {
            console.log('phonebook: ')
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })     
   } else {
        const person = new Person({
            name: name,
            number: number
        })

        person.save().then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
   }
}).catch(error => {
    console.log(error)
})

