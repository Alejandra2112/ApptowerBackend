require('dotenv').config()

const Servers = require('./Models/server')

const server = new Servers ()

server.listen()
