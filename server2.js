const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes');
const PORT = require('./config').runtime.port

const app = express()

app.use(bodyParser.json())
app.use('/',router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
