import { socketService } from '../../services/socketService'
import { userService } from '../../services/userService'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}
export function addOrder(order, hostId, userId) {
  console.log('order', order)
  return async dispatch => {
    try {
      await userService.addOrder(order, hostId, userId)
      socketService.emit('add order', order)
      dispatch({ type: 'ADD_ORDER', order })
    } catch (err) {
      console.log('UserActions: err in addOrder', err)
    }
  }
}

export function addHome(home, hostId) {
  console.log('home', home)
  return async dispatch => {
    try {
      await userService.addHome(home, hostId)
      socketService.emit('add home', home)
      dispatch({ type: 'ADD_HOME', home })
    } catch (err) {
      console.log('UserActions: err in addHome', err)
    }
  }
}

export function addToWish(wishlist, stay, userId) {
  return async dispatch => {
    try {
      await userService.addToWish(wishlist, stay, userId)
      dispatch({ type: 'ADD_TO_WISH', stay })
    } catch (err) {
      console.log('UserActions: err in addToWish', err)
    }
  }
}

export function removeFromWish(wishlist, wishId, userId) {
  console.log(userId);
  return async dispatch => {
    try {
      await userService.removeFromWish(wishlist, wishId, userId)
      dispatch({ type: 'REMOVE_FROM_WISH', wishId })
    } catch (err) {
      console.log('stayActions: err in removestay', err)
    }
  }
}

export function loadUser(userId) {
  return async dispatch => {
    try {
      const user = await userService.getById(userId)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in loadUser', err)
    }
  }
}

export function onLogin(credentials) {
  return async dispatch => {
    try {
      const user = await userService.login(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in login', err)
    }
  }
}

export function onSignup(userInfo) {
  return async dispatch => {
    try {
      const user = await userService.signup(userInfo)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in signup', err)
    }
  }
}

export function onLogout() {
  return async dispatch => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('UserActions: err in logout', err)
    }
  }
}