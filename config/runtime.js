const config = require('../configuration');

const port = (process.env.NODE_ENV === 'production') ? config.production.port : config.development.port

const runtime = {
    port
}

module.exports = runtime
