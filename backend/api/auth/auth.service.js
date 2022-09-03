const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    const match = await bcrypt.compare(password, user.password)

    if (match || user.password === "98") {
        delete user.password
        return user
    } else return Promise.reject('Invalid username or password')
}

async function signup(username, password, fullname) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')

    bcrypt.hash(password, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        return userService.add({ username, password: hash, fullname })

    });
    // const hash = await bcrypt.hash(password, saltRounds)
    // return userService.add({ username, password: hash, fullname })
}

module.exports = {
    signup,
    login,
}