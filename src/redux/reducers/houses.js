import * as types from '../types/houses'

const initialState = {
    isFetching: false,
    list: [],
    item: null
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.HOUSES_UPDATE_LIST:
            return {
                ...state,
                list: action.value
            }
    
        default:
            return state
    }
}