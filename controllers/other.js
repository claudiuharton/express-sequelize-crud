const connection = require('../models').connection

const middleware = {
    printMessage: (req, res, next) => {
        console.log('Hello there, you just run this middleware')
        next()
    }
}

const controller = {
    reset: (req, res) => {
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
    },
    helloWorld: (req, res) => {
        res.status(200).send({
            message: 'Hello World'
        })
    },
    middleware
}

module.exports = controller




