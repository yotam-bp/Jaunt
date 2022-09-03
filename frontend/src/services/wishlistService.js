import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
// import { utilService } from './utilService'

export const wishlistService = {
  add,
  query,
  remove
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balance:13}})

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`wishlist${queryStr}`)
  // return storageService.query('review')
}

function remove(wishlistId) {
  return httpService.delete(`wishlist/${wishlistId}`)
  // return storageService.delete('review', reviewId)

}
async function add(wishlist) {
  const addedWishlist = await httpService.post(`wishlist`,wishlist)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = storageService.post('review', review)

  return addedWishlist

}
