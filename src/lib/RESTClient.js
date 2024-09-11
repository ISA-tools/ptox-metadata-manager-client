import axios from 'axios'

// This will load the API URL from env.js, if it is present.
// The default, if loading fails or BASE_URL is not defined, is
// for the production site.
class RESTClient {
    constructor() {
        if (RESTClient._instance) {
            return RESTClient._instance;
        }
        RESTClient._instance = this;
        try {
            const env = require('../../env.js');
            this.BASE_URL = env.baseURL() || 'https://mmapi.precisiontox.org/api';
        }
        catch {
            this.BASE_URL = 'https://mmapi.precisiontox.org/api';
        }
        this.HEADERS = { "Content-Type": "application/json", "Accept": "application/json" }
    }


    /** Login the user
     * @param {String} username
     * @param {String} password
     * @returns {Object} response.data
     */
     async login_request(username, password)  {
        const request = {
            method: "POST",
            url: `${this.BASE_URL}/session`,
            headers: this.HEADERS,
            data: { username, password }
        }
        const response = await axios(request)
        return response.data
    }


    async logout_request(token) {
        const request = {
            method: "DELETE",
            url: `${this.BASE_URL}/session`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        }
        return axios(request)
    }


    async test_token(token) {
        return axios({
            method: "GET",
            url: `${this.BASE_URL}/session`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        })
    }


    async create_file(token, data) {
        const request = {
            method: "POST",
            url: `${this.BASE_URL}/files`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` },
            data
        }
        const response = await axios(request)
        return response.data

    }


    async register_file(token, file_id) {
        const request = {
            method: "POST",
            url: `${this.BASE_URL}/files/register`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` },
            data: {file_id: file_id}
        }
        return axios(request)
    }


    async validate_file(token, file_id){
        const request = {
            method: "GET",
            url: `${this.BASE_URL}/files/${file_id}/validate`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        }
        return axios(request)
    }


    async get_myself(token) { await get(token, 'user') }
    async get_organisms(token){ await get(token, "organisms") }
    async get_chemicals(token) { await get(token, "chemicals") }
    async get_organisations() { await get(null, "organisations") }
    async get_users(token){ await get(token, "users") }


    async get(token, path) {
        const request = {
            method: "GET",
            url: `${this.BASE_URL}/${path}`,
            headers: token ? { ...this.HEADERS, "Authorization": `Bearer ${token}` } : { ...this.HEADERS}
        }
        const response = await axios(request)
        return response.data
    }


    async create_user(token, data) {
        const request = {
            method: "POST",
            url: `${this.BASE_URL}/users`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` },
            data
        }
        const response = await axios(request)
        return response.data
    }


    async enable_user(token){
        const request = {
            method: "GET",
            url: `${this.BASE_URL}/users/enable/${token}`,
            headers: { ...this.HEADERS }
        }
        return axios(request)
    }


    async activate_user(token, user_id) {
        return axios({
            method: "GET",
            url: `${this.BASE_URL}/users/${user_id}/activate`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        })
    }


    async send_reset_link(email) {
        return axios({
            method: "POST",
            url: `${this.BASE_URL}/users/request_reset`,
            headers: { ...this.HEADERS },
            data: {"email": email}
        })
    }


    async reset_password(token, password) {
        return axios({
            method: "POST",
            url: `${this.BASE_URL}/users/reset/${token}`,
            headers: { ...this.HEADERS },
            data: { "password": password }
        })
    }


    async make_admin(token, user_id) {
        return axios({
            method: "GET",
            url: `${this.BASE_URL}/users/${user_id}/make_admin`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        })
    }


    async ban_user(token, user_id) {
        return axios({
            method: "GET",
            url: `${this.BASE_URL}/users/${user_id}/ban`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        })
    }


    async delete_user(token, user_id) {
        return axios({
            method: "DELETE",
            url: `${this.BASE_URL}/users/${user_id}`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        })
    }


    async delete_file(token, file_id) {
        const request = {
            method: "DELETE",
            url: `${this.BASE_URL}/files/${file_id}`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        }
        return axios(request)
    }


    async searchFiles(token, query) {
        const request = {
            method: "GET",
            url: `${this.BASE_URL}/files/search?${query}`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        }
        const response = await axios(request)
        return response.data
    }


    async convertFileToISA(token, file_id) {
        const request = {
            method: "GET",
            url: `${this.BASE_URL}/files/${file_id}/isa`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        }
        const response = await axios(request)
        return response.data
    }


    async publishSamples(token, file_id, at) {
        const request = {
            method: "POST",
            url: `${this.BASE_URL}/files/${file_id}/receive`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` },
            data: { at }
        }
        return axios(request)
    }


    async getSamples(token, page = 1, per_page = 10) {
        const request = {
            method: "GET",
            url: `${this.BASE_URL}/samples?page=${page}&per_page=${per_page}`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` }
        }
        const response = await axios(request)
        console.log(response.data)
        return response.data
    }


    async shipSamples(token, fileID, at) {
        const request = {
            method: "POST",
            url: `${this.BASE_URL}/files/${fileID}/ship`,
            headers: { ...this.HEADERS, "Authorization": `Bearer ${token}` },
            data: { at: at }
        }
        const response = await axios(request)
        return response.data
    }
}

export default RESTClient;