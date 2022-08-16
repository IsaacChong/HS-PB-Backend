const express = require("express");
const app = express()
app.use(express.json())

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

const generateId = () => {
    return Math.floor(Math.random()*1000)    
}

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    const numOfPpl = persons.length
    const timeOfReq = new Date()
    res.send(`<h1>Phonebook has info for ${numOfPpl} people.</h1><p>${timeOfReq}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const idPerson = persons.find((person) => person.id === id);
    !idPerson ? res.status(404).end() : res.json(idPerson)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => person.id !== id)
    res.status(204).end();
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).end("Person's name is missing")
    } else if (!body.number) {
        return res.status(400).end("Person's number is missing")
    } else if (persons.find((person) => person.name === body.name)) {
        return res.status(400).end("Person already exists in phonebook")
    }
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    res.json(persons)
})

const PORT = 3001;
app.listen(PORT, () => {console.log("Site is running on port " + PORT)})
