const express = require('express')
const path = require('path')
const app = express()
const {v4} = require('uuid')

let CONTACTS = [{
     name: 'Денис', value: '+38063 84 44 038', id: 1, marked: false
}]

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'client')))

//GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json('Contacts has been delete')
})

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    console.log(CONTACTS)
    console.log(req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))
