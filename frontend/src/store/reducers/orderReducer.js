const initialState = {
    currOrder: {
        location: '',
        startDate: '',
        endDate: '',
        guestAmount: { adults: 0, children: 0, infants: 0 },
    }
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_LOCATION':
            return { ...state, currOrder: { ...state.currOrder, location: action.order.location } }
        case 'SET_DATES':
            return { ...state, currOrder: { ...state.currOrder, startDate: action.order.startDate, endDate: action.order.endDate } }
        case 'SET_GUSET_AMOUNT':
            return { ...state, currOrder: action.guestAmount }
        case 'RESET_ORDER':
            return { ...state, currOrder: action.emptyOrder }
        case 'SET_ORDER':
            return { ...state, currOrder: action.order }
        default:
            return state
    }
}
