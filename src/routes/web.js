const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
//import controller
const HomeController = require('../controller/HomeController')

// Set up storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join('./src', 'public', 'image'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    }
});


const imageFilter = function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter })

router.get('/upload', HomeController.uploadPage)
router.post('/upload-profile-pic', upload.single('profile_pic'), HomeController.handleUploadFile)
router.post('/upload-profile-pic-multi', upload.array('multiple_images'), HomeController.handleUploadMultiFile)
router.post('/update-user', HomeController.updateUserFromClient)
router.get('/delete-user/:id', HomeController.deleteUserFromClient)
router.post('/delete-user', HomeController.deleteUser)
router.get('/update/:id', HomeController.update)
router.get('/update', HomeController.updateUser)
router.get('/create-user', HomeController.createUser)
router.post('/create-user', HomeController.postCreateUser)
router.get('/', HomeController.home)

module.exports = router