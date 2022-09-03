let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  loggedInUser: localLoggedinUser,
  loginErr: null,
  orders: [],
  wishlist: [],
  houses: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_ORDER':
      console.log('order added')
      return { ...state, orders: [...state.orders, action.order] }
    case 'ADD_HOME':
      console.log('home added')
      return { ...state, houses: [...state.houses, action.home] }
    case 'ADD_TO_WISH':
      console.log('stay added')
      return { ...state, wishlist: [...state.wishlist, action.stay] }
    case 'REMOVE_FROM_WISH':
      console.log('stay removed')
      return {
        ...state,
        wishlist: state.wishlist.filter(wish => wish._id !== action.wishId)
      }
    case 'CANCEL_ORDER':
      return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.order._id ? action.order : order
        )
      }
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'ADD_USER':
      return { ...state, user: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }

    default:
      return state
  }
}
