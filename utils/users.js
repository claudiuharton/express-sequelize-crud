const utils = {
    userConstructor: function User(firstName, lastName, email, phone) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phone = phone
    },
    validationConstructor: function Validation(status, message) {
        this.status = status
        this.message = message
    },
    userValidateOnCreate: (user) => {
        if (!user.firstName.match('^.{4,20}$')) {
            return (new utils.validationConstructor(400, 'Invalid FirstName'))
        } else if (!user.lastName.match('^.{4,20}$')) {
            return (new utils.validationConstructor(400, 'Invalid LastName'))
        } else if (!user.email.match('^.{4,30}$')) {
            return (new utils.validationConstructor(400, 'Invalid email'))
        } else if (!user.phone.match('^.{10,10}$')) {
            return (new utils.validationConstructor(400, 'Invalid phone'))
        } else return (new utils.validationConstructor(200, 'Validation passed'))
    },
    userValidateOnEdit: (user) => {
        if (user.firstName && !user.firstName.match('^.{4,20}$')) {
            return (new utils.validationConstructor(400, 'Invalid FirstName'))
        } else if (user.lastName && !user.lastName.match('^.{4,20}$')) {
            return (new utils.validationConstructor(400, 'Invalid LastName'))
        } else if (user.email && !user.email.match('^.{4,30}$')) {
            return (new utils.validationConstructor(400, 'Invalid email'))
        } else if (user.phone && !user.phone.match('^.{10,10}$')) {
            return (new utils.validationConstructor(400, 'Invalid phone'))
        } else return (new utils.validationConstructor(200, 'Validation passed'))
    },
    constructEditedUser: (user, foundUser) => {
        return {
            firstName: (user.firstName) ? user.firstName : foundUser.firstName,
            lastName: (user.lastName) ? user.lastName : foundUser.lastName,
            email: (user.email) ? user.email : foundUser.email,
            phone: (user.phone) ? user.phone : foundUser.phone
        }
    },
    constructFullName: (firstName, lastName) => firstName + ' ' + lastName
}


module.exports = utils
