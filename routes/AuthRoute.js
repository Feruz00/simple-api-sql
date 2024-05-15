const signup = require('../controller/authController')

const router = require('express').Router()

router.route('/')
    .post(signup)

module.exports = router