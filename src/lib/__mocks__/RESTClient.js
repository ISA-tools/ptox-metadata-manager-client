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

    async validate_file(token, file_id) {
        return {
            data: {
                message: 'success',
                token: token,
                file_id: file_id
            }
        }
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

}

export default RESTClient;