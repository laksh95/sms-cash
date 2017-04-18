let express= require('express')
let router = express.Router()
let controller = require('./post.controller')

router.post('/addPost',controller.addPost)
router.get('/getPosts',controller.getPosts)
router.post('/getPost',controller.getPost)
router.post('/addComment',controller.addComment)
router.post('/editComment',controller.editComment)
router.post('/deleteComment',controller.deleteComment)
router.post('/setLikes',controller.setLikes)
router.post('/getStats',controller.getStats)

module.exports = router