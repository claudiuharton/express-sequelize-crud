const express = require('express')
const bodyParser = require('body-parser')


function User(firstName, lastName, email, phone) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
}

const users = []

const app = express()
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    })
})

app.get('/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    if (id > users.length && id < 1)
        res.status(404).send({
            message: 'No user found'
        })
    else res.status(200).send(users[id - 1])

})

app.post('/users', (req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.phone)
    if (!user.firstName.match('^.{4,20}$')) {
        res.status(400).send({
            message: 'Invalid FirstName'
        })
    } else if (!user.lastName.match('^.{4,20}$')) {
        res.status(400).send({
            message: 'Invalid LastName'
        })
    } else if (!user.email.match('^.{4,30}$')) {
        res.status(400).send({
            message: 'Invalid email'
        })
    } else if (!user.phone.match('^.{10,10}$')) {
        res.status(400).send({
            message: 'Invalid phone'
        })
    } else {
        users.push(user)
        res.status(201).send({
            message: `User ${user.firstName} created`
        })

    }

})


app.put('/users/:id', (req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.phone)
    const id = req.params.id
    if (user.firstName && !user.firstName.match('^.{4,20}$')) {
        res.status(400).send({
            message: 'Invalid FirstName'
        })
    } else if (user.lastName && !user.lastName.match('^.{4,20}$')) {
        res.status(400).send({
            message: 'Invalid LastName'
        })
    } else if (user.email && !user.email.match('^.{4,30}$')) {
        res.status(400).send({
            message: 'Invalid email'
        })
    } else if (user.phone && !user.phone.match('^.{10,10}$')) {
        res.status(400).send({
            message: 'Invalid phone'
        })
    } else {
        if (id > users.length && id < 1)
            res.status(404).send({
                message: 'No user found'
            })
        else {
            const foundUser = users[id - 1];
            users[id - 1] = {
                firstName: (user.firstName) ? user.firstName : foundUser.firstName,
                lastName: (user.lastName) ? user.lastName : foundUser.lastName,
                email: (user.email) ? user.email : foundUser.email,
                phone: (user.phone) ? user.phone : foundUser.phone,
            }
            res.status(201).send({
                message: `User ${users[id - 1].firstName} modified`
            })
        }
    }
})


app.delete('/users/:id', (req, res) => {
    const id = req.params.id

    if (id > users.length && id < 1)
        res.status(404).send({
            message: 'No user found'
        })
    else {
        const foundUser = users[id - 1];
        users.splice(id - 1, 1)
        res.status(200).send({
            message: `User ${foundUser.firstName} deleted`
        })
    }
})


app.listen(8080, () => {
    console.log(`Server is running on http://localhost:${8080}`)
})
