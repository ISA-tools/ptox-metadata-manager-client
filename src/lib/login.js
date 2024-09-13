import RESTClient from "@/lib/RESTClient";

const restClient = new RESTClient();


/**
 * Login the user and store the token in the local storage or gets the token from the local storage
 * @param username
 * @param password
 * @returns {Object} the user object
 */
export async function login(username = null, password = null) {
    let user = localStorage.getItem("user")
    if (!user) {
        const response = await restClient.login_request(username, password)
        const jwt = response['access_token']
        const user_data = await restClient.get(jwt, 'user');
        user = JSON.stringify({
            isLoggedIn: true, token: jwt, username: username, role: user_data.role
        })
        localStorage.setItem("user", user)
        return user
    }
    return JSON.parse(user)
}


/**
 * Logout the user and remove the token from the local storage
 */
export async function logout(token) {
    if (token) await restClient.logout_request(token)
    localStorage.removeItem("user")
}


/**
 * Redirect the user to given page after login
 * @param router
 * @param commit
 * @param username
 * @param password
 * @param next the next page
 * @param form
 */
export async function login_redirect(router, commit, { username, password }, form, next) {
    form.validate()
    commit("error", null)
    try {
        let data = await login(username, password);
        const user = JSON.parse(data)
        commit("login", user.token)
        router.push(next)
    }
    catch (error) {
        await logout()
        commit("logout")
        commit("error", error.response.data.msg)
    }
}


/**
 * Auto login the user if the token is in the local storage
 * @param commit
 */
export function autoLogin(commit) {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
        commit("login", user.token)
        commit("setUsername", user.username)
        commit("setRole", user.role)
    }
}


/**
 * Get the current user data and sets it into the store
 * @param token
 * @param commit
 */
export async function getMyself(token, commit) {
    const user = await restClient.get(token, 'user')
    commit("setUserData", {
        organisation: user.organisation,
        userID: user.id,
        files: user.files,
        username: user.username
    })
}


export async function createUser(token, data, commit) {
    commit("error", null)
    try {
        await restClient.create_user(token, {
            organisation: data.organisation,
            email: data.email,
            username: data.username,
            password: data.password,
            confirm_password: data.confirmPassword
        })
        commit('setCreationSuccess', true)
        commit("resetNewUser")
    }
    catch (error) {
        commit('setCreationSuccess', false)
        commit("error", error.response.data.msg)
    }
}


export async function validateToken(token, commit) {
    commit("setTokenError", null)
    try {
        const response = await restClient.enable_user(token)
        commit("setTokenValidation", response.data.msg)
        commit("setTokenError", null)
    }
    catch (error) {
        commit("setTokenError", error.response.data.msg)
        commit("setTokenValidation", null)
    }
}


export async function LOGIN_USER({ username, password }) {
    console.log(username, password)
}
