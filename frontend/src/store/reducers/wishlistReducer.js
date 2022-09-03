const initialState = {
wishlist:[]
}

export function wishlistReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'ADD_WISHLIST':
            return { ...state, wishlist: [...state.wishlist, action.wishlist]}
        default:
            return state
    }
}
