const express = require('express')
const AppError = require('./utils/appError')
const errorHandling = require('./controller/errorHandler')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth', require('./routes/AuthRoute'))

app.all('*', (req,res,next)=>{
    return next(new AppError('Not found this page', 404))
})

app.use(errorHandling)

module.exports = app