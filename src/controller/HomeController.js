const User = require('../services/CRUDService')

class HomeController {
  async home(req, res) {
    // connection.query('SELECT * from users', function (error, results, fields) {
    //     if (error) throw error;
    //   });
    const users = await User.getAllUser()
    res.render("home", { users });
  }

  async postCreateUser(req, res) {
    
    const [results, fields] = await connection.query(
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

}

module.exports = new HomeController();
