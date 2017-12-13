import axios from 'axios'

export function fetchHousesList() {
    const fetchUrl = '/casas'
    return axios.get(fetchUrl)
}