import { combineReducers } from 'redux'
import { systemReducer } from './systemReducer'
import { orderReducer } from './orderReducer'
import { userReducer } from './userReducer'
import { stayReducer } from './stayReducer'
import { wishlistReducer } from './wishlistReducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  stayModule: stayReducer,
  orderModule: orderReducer,
  userModule: userReducer,
  wishlistModule: wishlistReducer
})
