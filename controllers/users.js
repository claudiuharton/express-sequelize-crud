const UserDB = require('../models').User
const User = require('../utils').users.userConstructor;
const validateOnUserCreate = require('../utils').users.userValidateOnCreate;
const validateOnUserEdit = require('../utils').users.userValidateOnEdit;
const constructEditedUser = require('../utils').users.constructEditedUser;
const constructFullName = require('../utils').users.constructFullName;

const controller = {
    findAll: async (req, res) => {
        try {
            const users = await UserDB.findAll({
                raw: true
            })
            res.status(200).send(users)
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error'
            })
        }
    },
    create: async (req, res) => {
        const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.phone)
        const validate = validateOnUserCreate(user)
        if (validate.status === 200) {
            try {
                const newUser = await UserDB.create(user)
                res.status(201).send({
                    message: `User ${newUser.firstName} created`
                })
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    message: 'Error'
                })
            }
        } else {
            res.status(validate.status).send({
                message: validate.message
            })
        }

    },
    findById: async (req, res) => {
        try {
            const user = await UserDB.findOne({
                where: {id: req.params.id},
                raw: true
            })
            if (!user) res.status(404).send({
                message: 'No user found'
            })
            else res.status(200).send(user)
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error'
            })
        }
    },
    edit: async (req, res) => {
        const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.phone)
        const validate = validateOnUserEdit(user)

        if (validate.status === 200) {
            try {
                const foundUser = await UserDB.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                if (foundUser) {
                    const updatedUser = await foundUser.update(constructEditedUser(user, foundUser))
                    res.status(201).send({
                        message: `User ${updatedUser.firstName} modified`
                    })
                } else res.status(404).send({
                    message: `User not found`
                })
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    message: 'Error'
                })
            }
        } else {
            res.status(validate.status).send({
                message: validate.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            const user = await UserDB.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!user) res.status(404).send({
                message: 'No user found'
            })
            else {
                try {
                    const deletedUser = await user.destroy()
                    res.status(200).send({
                        message: `User ${deletedUser.firstName} deleted`
                    })
                } catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: `Error while deleting user`
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error'
            })
        }
    },
    getNames: async (req, res) => {
        try {
            const users = await UserDB.findAll({
                raw: true
            })
            const names = await Promise.all(users.map(user => constructFullName(user.firstName, user.lastName)))
            res.status(200).send(names)
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Error'
            })
        }
    }
}

module.exports = controller




