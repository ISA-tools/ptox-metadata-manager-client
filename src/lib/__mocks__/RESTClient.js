class RESTClient {
    constructor() {
        if (RESTClient._instance) {
            return RESTClient._instance;
        }
        RESTClient._instance = this;
        // They hate this hack on StackOverflow, but no-one could suggest a way to load the
        // necessary data in a development environment, so here it is...
        try {
            const env = require('../../env.js');
            this.BASE_URL = env.baseURL() || 'https://mmapi.precisiontox.org/api';
        } catch {
            this.BASE_URL = 'https://mmapi.precisiontox.org/api';
        }
        this.HEADERS = {"Content-Type": "application/json", "Accept": "application/json"}
    }

    async convertFileToISA(token, file_id) {
        return {
            data: {
                id: 1,
                name: 'file',
                file_id: file_id,
                token: token
            }
        }
    }


    async enable_user(token) {
        return {
            data: {
                message: 'success',
                token: token
            }
        }
    }

    async get(token, field) {
        return {
            data: {
                message: 'success',
                token: token,
                field: field
            }
        }
    }

    async reset_password(token, password) {
        return {
            data: {
                message: 'success',
                token: token,
                password: password
            }
        }
    }

    async validate_file(token, file_id) {
        return {
            data: {
                message: 'success',
                token: token,
                file_id: file_id
            }
        }
    }


}

export default RESTClient;