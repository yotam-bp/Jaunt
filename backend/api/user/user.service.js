
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    // query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    const userToSave = {
        ...user,
        _id: ObjectId(user._id)
    }
    try {
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': ObjectId(user._id) }, { $set: userToSave })
        return user;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    console.log('user', user);
    try {
        const userToAdd = {
            fullname: user.fullname,
            username: user.username,
            password: user.password,
            img: "https://i.imgur.com/9pNffkj.png",
            isHost: false,
            houses: [],
            wishlist: [],
            orders: [],
            incomingOrders: []
        }

        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}




