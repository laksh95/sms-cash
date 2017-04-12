let express= require('express')
let router = express.Router()
let controller = require('./post.controller')
router.post('/addPost',controller.addPost)
module.exports = router