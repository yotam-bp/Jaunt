import { wishlistService } from '../../services/wishlistService'
import { userService } from '../../services/userService'
// import { socketService,  } from '../../services/socketService'


export function loadWishlist(filterBy) {
  return async dispatch => {
    try {
      const wishlists = await wishlistService.query()
      dispatch({ type: 'LOAD_WISHLISTS', wishlists })

      // socketService.on(SOCKET_EVENT_wishlist_ADDED, wishlist =>{
      //   dispatch({ type: 'ADD_wishlist', wishlist })
      // })

    } catch (err) {
      console.log('wishlistActions: err in loadwishlists', err)
    }
  }
}

export function addToWishlist(wishlist) {
  return async dispatch => {
    try {
      const addedwishlist = await wishlistService.add(wishlist)
      dispatch({ type: 'ADD_WISHLIST', wishlist: addedwishlist })
      
    } catch (err) {
      console.log('wishlistActions: err in addwishlist', err)
    }
  }
}

export function removeFromWishlist(wishlistId) {
  return async dispatch => {
    try {
      await wishlistService.remove(wishlistId)
      dispatch({ type: 'REMOVE_WISHLIST', wishlistId })
    } catch (err) {
      console.log('wishlistActions: err in removewishlist', err)
    }
  }
}
