const express = require('express')
const router = express.Router()
const { validateFields } = require('../helpers/validate-fields')
const { postLogin } = require('../controllers/login')
const { check } = require('express-validator')





router.post('/', [
    check('email','Email is invalid').isEmail(),
    
    check('password', 'El password no debe estar vacio').notEmpty(),
    validateFields
], postLogin )

module.exports = router