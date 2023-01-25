import axios from 'axios'

const BASE_URL = "https://pretox.isa-tools.org/api"
const HEADERS = { "Content-Type": "application/json", "Accept": "application/json" }


/** Login the user
 * @param {String} username
 * @param {String} password
 * @returns {Object} response.data
 */
export const login_request = async (username, password) => {
    const request = {
        method: "POST",
        url: `${BASE_URL}/login`,
        headers: HEADERS,
        data: { username, password }
    }
    const response = await axios(request)
    return response.data
}


export const create_file = async (token, data) => {
    const request = {
        method: "POST",
        url: `${BASE_URL}/create_file`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` },
        data
    }
    const response = await axios(request)
    return response.data

}


export const get_myself = async (token) => await get(token, 'me')
export const get_organisms = async (token) => await get(token, "organisms")
export const get_chemicals = async(token) => await get(token, "chemicals")
export const get_organisations = async(token) => await get(token, "organisations")


export const get = async (token, path) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/${path}`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    const response = await axios(request)
    return response.data
}
