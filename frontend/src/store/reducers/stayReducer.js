const initialState = {
  currStay: null,
  stays: []
};

export function stayReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_STAYS':
      return {...state, stays: action.stays}
    case 'SET_STAY':
      return {...state, currStay: action.currStay}
    case 'ADD_STAY':
      return { ...state, stays: [action.stay, ...state.stays] }
    case 'UPDATE_STAY':
      return { ...state, stays: [action.stay, ...state.stays.filter(stay => action.stay._id !== stay._id)] }
    case 'REMOVE_STAY':
      return { ...state, stays: state.stays.filter(stay => stay._id !== action.stayId) }
    default: return state
  }
}
