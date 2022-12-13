const express = require('express')
const router = express.Router()
const { getCountries, getCountry, addCountry, deleteCountry, editCountry } = require('../controllers/country')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')


router.get('/', getCountries)
router.get('/:id', getCountry)
// router.get('/:id', getUser)


router.post('/', addCountry)

router.delete('/:id', deleteCountry)


router.put('/:id', editCountry)

module.exports = router