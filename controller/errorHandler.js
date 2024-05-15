const AppError = require("../utils/appError")

const sendDevError = (err, res)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error'
    const message = err.message
    const stack = err.stack

    return res.status(statusCode).json({
        status,
        message,
        stack
    })

}

const sendProdError = (err, res)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error'
    const message = err.message
    const stack = err.stack

    if(err.isOperational){
        return res.status(statusCode).json({
            status,
            message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Something wrong went'
    })

}
const errorHandling = (err,req,res,next)=>{
    console.log(Object.keys(err))
    if(err.name === "SequelizeValidationError"){
       
        err = new AppError(err.errors[0].message, 400)
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        console.dir(err.original)
        err = new AppError(err.errors[0].message, 400);
    }
    

    if(process.env.NODE_ENV==='development'){
        return sendDevError(err,res)
    }
    sendProdError(err,res)
}

module.exports = errorHandling