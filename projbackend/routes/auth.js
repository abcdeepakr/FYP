var express = require('express')
const {signup,signin,isSignedIn,signout} = require("../controllers/auth")
const { check } = require('express-validator');
const { body, validationResult } = require('express-validator');
var router = express.Router()   
router.post("/signup",[
    check('name').isLength({ min: 3 }).withMessage("must be at least 5 chars long"),
    check('email').isEmail().withMessage( "must be a valid Email"),
    check('password').isLength({ min: 4 }).withMessage( "must be at least 5 chars long")
    ], signup)

router.post("/signin",[
    check('email').isEmail().withMessage( "must be a valid Email"),
    check('password').isLength({ min: 4 }).withMessage( "password field is required")
    ], signin   )


router.get('/test',isSignedIn,(req,res) => {
    res.send("Protected content")
})

router.post('/signout',signout)
module.exports = router
