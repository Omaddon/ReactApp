import * as types from '../types/houses'

const initialState = {
    isFetching: false,  // 'True' si se está descargando al lista de casas
    list: [],           // La lista de casas
    item: null          // Aquí guardaremos la casa seleccionada
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.HOUSES_UPDATE_LIST:
            return {
                ...state,
                list: action.value
            }

        case types.HOUSES_UPDATE_HOUSE:
            return {
                ...state,
                item: action.value
            }
        
        case types.HOUSES_SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
    
        default:
            return state
    }
}