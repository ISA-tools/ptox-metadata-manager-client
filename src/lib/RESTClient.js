import axios from 'axios'

const BASE_URL = "https://pretox.isa-tools.org/api"
// const BASE_URL = "http://localhost:5000/api"
const HEADERS = { "Content-Type": "application/json", "Accept": "application/json" }


/** Login the user
 * @param {String} username
 * @param {String} password
 * @returns {Object} response.data
 */
export const login_request = async (username, password) => {
    const request = {
        method: "POST",
        url: `${BASE_URL}/session`,
        headers: HEADERS,
        data: { username, password }
    }
    const response = await axios(request)
    return response.data
}


export const logout_request = async (token) => {
    const request = {
        method: "DELETE",
        url: `${BASE_URL}/session`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    return axios(request)
}


export const test_token = async (token) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/session`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    })
}


export const create_file = async (token, data) => {
    const request = {
        method: "POST",
        url: `${BASE_URL}/files`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` },
        data
    }
    const response = await axios(request)
    return response.data

}


export const register_file = async (token, file_id) => {
    const request = {
        method: "POST",
        url: `${BASE_URL}/files/register`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` },
        data: {file_id: file_id}
    }
    return axios(request)
}


export const validate_file = async (token, file_id) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/files/${file_id}/validate`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    return axios(request)
}


export const get_myself = async (token) => await get(token, 'user')
export const get_organisms = async (token) => await get(token, "organisms")
export const get_chemicals = async(token) => await get(token, "chemicals")
export const get_organisations = async() => await get(null, "organisations")
export const get_users = async(token) => await get(token, "users")


export const get = async (token, path) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/${path}`,
        headers: token ? { ...HEADERS, "Authorization": `Bearer ${token}` } : { ...HEADERS}
    }
    const response = await axios(request)
    return response.data
}


export const create_user = async (token, data) => {
    const request = {
        method: "POST",
        url: `${BASE_URL}/users`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` },
        data
    }
    const response = await axios(request)
    return response.data
}


export const enable_user = async (token) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/users/enable/${token}`,
        headers: { ...HEADERS }
    }
    return axios(request)
}


export const activate_user = async (token, user_id) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/users/${user_id}/activate`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    })
}


export const send_reset_link = async (email) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/users/request_reset`,
        headers: { ...HEADERS },
        data: {"email": email}
    })
}


export const reset_password = async (token, password) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/users/reset/${token}`,
        headers: { ...HEADERS },
        data: { "password": password }
    })
}


export const make_admin = async (token, user_id) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/users/${user_id}/make_admin`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    })
}


export const ban_user = async (token, user_id) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/users/${user_id}/ban`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    })
}


export const delete_user = async (token, user_id) => {
    return axios({
        method: "DELETE",
        url: `${BASE_URL}/users/${user_id}`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    })
}


export const delete_file = async (token, file_id) => {
    const request = {
        method: "DELETE",
        url: `${BASE_URL}/files/${file_id}`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    return axios(request)
}


export const searchFiles = async (token, query) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/files/search?query=${query}`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    const response = await axios(request)
    return response.data
}


export const convertFileToISA = async (token, file_id) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/files/${file_id}/isa`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    const response = await axios(request)
    return response.data
}


export const publishSamples = async(token, file_id) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/files/${file_id}/receive`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    return axios(request)
}


export const getSamples = async(token, page = 1, per_page = 10) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/samples?page=${page}&per_page=${per_page}`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    const response = await axios(request)
    return response.data
}


export const shipSamples = async(token, fileID) => {
    const request = {
        method: "GET",
        url: `${BASE_URL}/files/${fileID}/ship`,
        headers: { ...HEADERS, "Authorization": `Bearer ${token}` }
    }
    const response = await axios(request)
    return response.data
}
