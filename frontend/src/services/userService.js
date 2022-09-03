import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const userService = {
    add,
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    addOrder,
    addHome,
    addToWish,
    removeFromWish
}

window.userService = userService

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get('user', userId)
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function add(order) {
    return storageService.post('order', order)
    // order = await httpService.post(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}
async function addOrder(order, hostId, userId) {
    // const host = await httpService.get(`user/${hostId}`)
    const user = await httpService.get(`user/${userId}`)
    console.log(user._id);
    // host.incomingOrders.push(order)
    const myOrder = { ...order }
    delete myOrder.guest
    user.orders.push(myOrder)
    httpService.put(`user/${userId}`, user)
    // httpService.put(`user/${hostId}`, host)
}

async function addHome(home, hostId) {

    const host = await httpService.get(`user/${hostId}`)
    host.houses.push(home)
    httpService.put(`user/${hostId}`, host)
}

async function addToWish(wishlist, stay, userId) {
    const user = await httpService.get(`user/${userId}`)
    const findSameId = user.wishlist.some(house => stay._id === house._id)
    if (!findSameId) {
        user.wishlist.push(stay)
        httpService.put(`user/${userId}`, user)
    } else return Promise.reject('Already saved')
    wishlist.push(stay)
}

async function removeFromWish(wishlist, wishId, userId) {
    console.log(userId);
    const user = await httpService.get(`user/${userId}`)
    const idx = wishlist.findIndex(wish => wish._id === wishId)
    user.wishlist.splice(idx, 1)
    httpService.put(`user/${userId}`, user)
    wishlist.splice(idx, 1)
}


async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function signup(userInfo) {
    console.log(userInfo);
    try {
        const user = await httpService.post('auth/signup', userInfo)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.clear()
        return await httpService.post('auth/logout')
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}


