import * as types from '../types/houses'
import { fetch, post } from 'react_app/src/webservices/webservices'

// Función que devuelve el action que actualiza
function updateHousesList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value
    }
}

function setHousesFetching(value) {
    return {
        type: types.HOUSES_SET_FETCHING,
        value
    }
}

// Función que carga del WS el listado
export function fetchHousesList() {
    return (dispatch, getState) => {

        // Mientras se descarga los datos, lanzamos el dispatch de "fetching"
        // Esto podrá activar un spinner o similar
        dispatch(setHousesFetching(true))

        const fetchUrl = '/casas'
        fetch(fetchUrl)
            .then((response) => {
                const list = response.records
                dispatch(updateHousesList(list))
                dispatch(setHousesFetching(false))
            })
            .catch((error) => {
                console.log("axios get error: ", error)
                dispatch(setHousesFetching(false))
            })
    }
}

export function updateHouseSelected(value) {
    return {
        type: types.HOUSES_UPDATE_HOUSE,
        value
    }
}