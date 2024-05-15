const users = require('../db/models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/cathcAsync')

const signup = catchAsync(
    async (req,res,next)=>{
        // console.log(req.body)
        const newUser = await users.create({
            role: req.body.role,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        })
        if(!newUser){
            return new AppError('Failed to create the user', 400)
        }
        return res.json({
            status: 'success',
            data: newUser
        })
    }
)

module.exports = signup