let express= require('express')
let router = express.Router()
let controller = require('./post.controller')
router.post('/addPost',controller.addPost)
router.get('/getPosts',controller.getPosts)
router.get('/getPost',controller.getPost)
module.exports = router