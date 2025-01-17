const connection = require("../config/database");

class User {
    async getAllUser() {
        const [results, fields] = await connection.query('SELECT * from users')
        return results
    }

    async getUserById(id) {
        const [results, fields] = await connection.query(`SELECT * FROM users WHERE id = ${id}`)
        console.log(results)
        return results[0]
    }

    async updateUser(req) {
        const [results, fields] = await connection.query(
            `UPDATE users
             SET name = '${req.body.name}', email = '${req.body.email}', city = '${req.body.city}'
             WHERE id = ${req.body.id};`
        )
        return results
    }

    async deleteUser(id) {
        try {
            const [results, fields] = await connection.query(
                `DELETE FROM users WHERE id= ${id}`
            )
            console.log(results)
            return results

        } catch(e) {

        }
    }

}

module.exports = new User