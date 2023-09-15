const express = require('express');
const { authRouter } = require('../routes/auth.routes');
const cors = require('cors');
const globalErrorHandler = require('../controllers/error.controllers');
const AppError = require('../helpers/appError');
const { db } = require('../database/db');
const morgan = require('morgan');

class Server {
    constructor() {
        this.app = express()
        this.port = 3000
    

    this.paths = {
        auth: '/minnerk/api/v1/auth'
    }

    this.database()
    this.middlewares()
    this.routes()

}

    middlewares() {
        if(process.env.NODE_ENV === 'development') {
            console.log('Modo de desarrollo')
            this.app.use(morgan('dev')) //Me sirve para ver las peticiones que se hacen al back-end
          }
          if(process.env.NODE_ENV === 'production') {
            console.log('Modo de produccion')
          }

          this.app.use(cors())
            this.app.use(express.json())
    }

    routes(){
        this.app.use(this.paths.auth, authRouter)

        this.app.all('*', (req,res ,next) => {
            return next(new AppError(`La ruta ${req.originalUrl} no esta definida`))
         })
 
         this.app.use(globalErrorHandler)
    }

    database() {
        db.authenticate()
        .then(() => {
            console.log('Database Authenticated')
        })
        .catch(err => console.log(err))

        db.sync()
        .then(() => console.log('Database Synced'))
        .catch(err => console.log(err))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port)
        })
    }

}

module.exports = Server