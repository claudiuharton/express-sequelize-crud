const Sequelize = require('sequelize');
const config = require('../configuration');

const db = (process.env.NODE_ENV === 'production') ? config.production.db : config.development.db
const sequelize = new Sequelize(db.database, db.username, db.password, {
    dialect: db.dialect,
    host: db.host,
    define: {
        timestamps: false
    }
});

module.exports = sequelize
