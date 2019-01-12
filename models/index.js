const db = require('../config').db;

const User = db.import('./user');

module.exports ={
    User,
    connection:db
};
