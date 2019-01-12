const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')


const connection = new Sequelize('training', 'root', '', {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

function User(firstName, lastName, email, phone) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
}

const UserDB = connection.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
}, {
    underscored: true
})


const app = express()
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World'
    })
})

app.get('/reset', (req, res) => {
    connection.sync({force: true})
        .then(() => {
            res.status(201).send({
                message: 'Database reset'
            })
        })
        .catch(() => {
            res.status(500).send({
                message: 'Error'
            })
        })
})

app.get('/users', (req, res) => {
    UserDB.findAll({
        raw: true
    })
        .then(users => {
            res.status(200).send(users)
        })
        .catch(() => {
            res.status(500).send({
                message: 'Error'
            })
        })
})

app.get('/users/:id', (req, res) => {
    UserDB.findOne({
        where: {
            id: req.params.id
        },
        raw: true
    })
        .then(user => {
            if (!user) res.status(404).send({
                message: 'No user found'
            })
            else res.status(200).send(user)
        })
        .catch(() => {
            res.status(500).send({
                message: 'Error'
            })
        })
})

app.post('/users', (req, res) => {
    const user = new User(req.body.firstName, req.body.lastName,req.body.email, req.body.phone)

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
        UserDB.create(user)
            .then(newUser => {
                res.status(201).send({
                    message: `User ${newUser.firstName} created`
                })
            })
            .catch(() => {
                res.status(500).send({
                    message: 'Error'
                })
            })
    }

})


app.put('/users/:id', (req, res) => {
    const user = new User(req.body.firstName, req.body.lastName,req.body.email, req.body.phone)

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
        UserDB.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(foundUser => {
                if (foundUser) {
                    foundUser.update({
                        firstName: (user.firstName) ? user.firstName : foundUser.firstName,
                        lastName: (user.lastName) ? user.lastName : foundUser.lastName,
                        email: (user.email) ? user.email : foundUser.email,
                        phone: (user.phone) ? user.phone : foundUser.phone,

                    })
                        .then((foundUser) => {
                            res.status(201).send({
                                message: `User ${foundUser.firstName} modified`
                            })
                        })
                } else res.status(404).send({
                    message: `User not found`
                })


            })
            .catch(() => {
                res.status(500).send({
                    message: 'Error'
                })
            })
    }
})


app.delete('/users/:id', (req, res) => {
    UserDB.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            if (!user) res.status(404).send({
                message: 'No user found'
            })
            else {
               user.destroy()
                   .then(user =>{
                       res.status(200).send({
                           message: `User ${user.firstName} deleted`
                       })
                   })
                   .catch(() =>{
                       res.status(500).send({
                           message: `Error while deleting user`
                       })
                   })

            }
        })
        .catch(() => {
            res.status(500).send({
                message: 'Error'
            })
        })
})

app.listen(8080, () => {
    console.log(`Server is running on http://localhost:${8080}`)
})
