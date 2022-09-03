import { storageService } from './asyncStorageService'
// const KEY_STORAGE = 'order'

export const orderService = {
    add,
    updateGuestAmount
}

async function add(order) {
    // const addedStay = await httpService.post(`stay`, stay)

    // stay.byUser = userService.getLoggedinUser()
    // stay.aboutUser = await userService.getById(stay.aboutUserId)
    const currOrder = storageService.post('order', order)
    return currOrder
}
async function updateGuestAmount(num) {
    const guestAmount = storageService.put('guestAmount', num)
    return guestAmount
}

