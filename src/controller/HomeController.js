const User = require('../services/CRUDService')
const multer = require('multer')


// const upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic')


class HomeController {

    async home(req, res) {
        // connection.query('SELECT * from users', function (error, results, fields) {
        //     if (error) throw error;
        //   });
        const users = await User.getAllUser()
        console.log(users)
        res.render("home", { users });
    }

    async postCreateUser(req, res) {
        
        const [results, fields] = await connection.execute(
            `INSERT INTO users (name, email, city) VALUES ("${req.body.name}", "${req.body.email}", "${req.body.city}")`,
        )

    }

    createUser(req, res) {
        res.render('createUser')
    }

    updateUser(req, res) {
        res.render('edit')
    }

    async update(req, res) {
        const user = await User.getUserById(req.params.id)
        res.render('edit', { user })
    }

    async updateUserFromClient(req, res) {
        await User.updateUser(req)
        res.redirect('/')
    }

    async deleteUserFromClient(req, res) {
        const user = await User.getUserById(req.params.id)
        res.render('delete', { user })
    }

    async deleteUser(req, res) {
        const user = await User.deleteUser(req.body.id)

        res.redirect('/')
    }

    async uploadPage(req, res) {
        res.render('uploadFile')
    }
    
    async handleUploadFile(req, res) {
        const upload = multer().single('profile_pic')
        // 'profile_pic' is the name of our file input field in the HTML form
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                console.log(err)
                return res.send(err);
            }
            res.send(`You have uploaded this image: <hr/><img src=/image/${req.file.filename} width="500"><hr /><a href="/upload">Upload another image</a>`);
            // Display uploaded image for user validation
        })
    }

       
        

}

module.exports = new HomeController();
