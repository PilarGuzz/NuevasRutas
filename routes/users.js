const express = require('express')
const router = express.Router()
const { addUser, getUsers, deleteUser, editUser} = require('../controllers/users')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isValidRol, isValidEmail, existUser } = require('../helpers/db-validators')
const { validateJWT } = require('../middlewares/validate-jwt')
const { isAdminRol, hasRol } = require('../middlewares/validate-rol')

router.get('/', getUsers)
// router.get('/:id', getUser)
router.post('/',[
    check('email','Email is invalid').isEmail(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('name','Name is mandatory').not().isEmpty(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isValidRol),
    check('email').custom( isValidEmail),
    validateFields
] ,addUser)

router.delete('/:id',[
    //protege la ruta antes de nada
    validateJWT,
    //isAdminRol,
    hasRol('ADMIN_ROLE', 'DELETE_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existUser),
    validateFields
] , deleteUser)

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existUser),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6, max: 12 }),
    check('name','Name is mandatory').not().isEmpty(),
    validateFields
],  editUser)

module.exports = router