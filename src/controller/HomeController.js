const User = require('../services/CRUDService')

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

            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }

            res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    }
    
    async handleUploadMultiFile(req, res) {

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.files) {
                return res.send('Please select an image to upload');
            }


            let result = "You have uploaded these images: <hr />";
            const files = req.files;
            let index, len;
    
            // Loop through all the uploaded images and display them on frontend
            for (index = 0, len = files.length; index < len; ++index) {
                result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
            }
            result += '<hr/><a href="./">Upload more images</a>';
            res.send(result);
    }
    
}

module.exports = new HomeController();
