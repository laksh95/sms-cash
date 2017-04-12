let express= require('express')
let router = express.Router()
let controller = require('./post.controller')
router.post('/addPost',controller.addPost)
router.get('/getPosts',controller.getPosts)
module.exports = router