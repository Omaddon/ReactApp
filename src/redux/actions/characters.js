import * as types from '../types/characters'
import { fetch, post } from 'react_app/src/webservices/webservices'

function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value
    }
}

export function updateCharacterSelected(value) {
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value
    }
}
export function fetchCharactersList(houseId) {
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        // Limpiamos previamente la lista, por si hubieramos descargado algo previamente
        dispatch(updateCharactersList([]))
        
        //const state = getState()
        //houseId = state.houses.item ? state.houses.item.id : null

        const fetchUrl = '/personajes?casa=' + houseId
        fetch(fetchUrl)
            .then((response) => {
                const list = response.records
                dispatch(updateCharactersList(list))
                dispatch(setCharactersFetching(false))
            })
            .catch((error) => {
                console.log("axios get error: ", error)
                dispatch(setCharactersFetching(false))
            })
    }
}