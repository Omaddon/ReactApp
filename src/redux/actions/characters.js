import * as types from '../types/characters'
import { fetch, post, remove } from 'react_app/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'

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
        //const houseId = state.houses.item ? state.houses.item.id : null

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

export function deleteCharacter(character) {
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        // Accedemos al reducer que queramos para obtener su initialState
        const state = getState()
        const houseId = state.houses.item.id

        const fetchUrl = '/personajes/' + character.id
        remove(fetchUrl)
            .then( (response) => {
                dispatch(setCharactersFetching(false))
                if (response && response.status == 'ok') {
                    dispatch(fetchCharactersList(houseId))
                    // NO es necesario porque hacemos pop(), pero podríamos borrar el char guardado
                    //dispatch(updateCharacterSelected(null))
                    Actions.pop()
                }
            })
            .catch( (error) => {
                console.log("axios delete  error: ", error)
                dispatch(setCharactersFetching(false))
            })
    }
}

export function postCharacter(data) {
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))

        const state = getState()
        const houseId = state.houses.item.id

        const fetchUrl = '/personajes'
        post(fetchUrl, data)
            .then( (response) => {
                dispatch(setCharactersFetching(false))
                if (response.record) {
                    dispatch(fetchCharactersList(houseId))
                    dispatch(updateCharacterSelected(null))
                    Actions.pop()
                }
            })
            .catch( (error) => {
                console.log("axios delete  error: ", error)
                dispatch(setCharactersFetching(false))
            })
    }
}