import * as types from '../types/houses'
import { fetch, post } from 'react_app/src/webservices/webservices'

// Función que devuelve el action que actualiza
function updateHousesList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value
    }
}

// Función que carga del WS el listado
export function fetchHousesList() {
    return (dispatch, getState) => {
        const fetchUrl = '/casas'
        fetch(fetchUrl)
            .then((response) => {
                const list = response.records
                dispatch(updateHousesList(list))
            })
            .catch((error) => {
                console.log("axios get error: ", error)
            })
    }
}