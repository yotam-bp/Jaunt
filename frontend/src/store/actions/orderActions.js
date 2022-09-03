export function setLocation(order) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_LOCATION', order })
        } catch (err) {
            console.log('orderActions: err in setLocation', err)
        }
    }
}
export function setDates(order) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_DATES', order })
        } catch (err) {
            console.log('orderActions: err in setDates', err)
        }
    }
}

export function setGuestAmount(order) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_ORDER', order })
        } catch (err) {
            console.log('orderActions: err in setGuestAmount', err)
        }
    }
}
export function resetOrder(emptyOrder) {
    return async dispatch => {
        try {
            dispatch({ type: 'RESET_ORDER', emptyOrder })
        } catch (err) {
            console.log('orderActions: err in setGuestAmount', err)
        }
    }
}

