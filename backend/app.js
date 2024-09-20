const config = require('./utils/config')
const express = require('express')
require('express-async-errors') //ya no es necesario try and catch y next(exception)
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const moviesRouter = require('./controllers/movies')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const path = require('path');

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/login', loginRouter)

app.get('*', (_req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

//redireccionar rutas no existentes a pagina 404
//redireccionar rutas sin permiso a home

module.exports = app