import { login_request, get_myself, create_user } from "@/lib/RESTClient"


/**
 * Login the user and store the token in the local storage or gets the token from the local storage
 * @param username
 * @param password
 * @returns {Object} the user object
 */
export async function login(username = null, password = null) {
    let user = localStorage.getItem("user")
    if (!user) {
        const response = await login_request(username, password)
        user = JSON.stringify({ isLoggedIn: true, token: response['access_token'], username: username })
        localStorage.setItem("user", user)
    }
    return user
}


/**
 * Logout the user and remove the token from the local storage
 */
export function logout() { localStorage.removeItem("user") }


/**
 * Redirect the user to home page after login
 * @param router
 * @param commit
 * @param username
 * @param password
 * @param form
 */
export async function login_redirect(router, commit, { username, password }, form) {
    form.validate()
    commit("error", null)
    try {
        const user = JSON.parse(await login(username, password))
        commit("login", user.token)
        router.push('/me')
    }
    catch (error) {
        logout()
        commit("logout")
        commit("error", error.response.data.msg)
    }
}


/**
 * Auto login the user if the token is in the local storage
 * @param commit
 */
export async function autoLogin(commit) {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
        commit("login", user.token)
        commit("setUsername", user.username)
    }
    if (user) await getMyself(user.token, commit)
}


/**
 * Get the current user data and sets it into the store
 * @param token
 * @param commit
 */
export async function getMyself(token, commit) {
    const user = await get_myself(token)
    commit("setUserData", {
        organisation: user.organisation.name,
        googleDriveID: user.organisation.gdrive_id || 'None',
        userID: user.id,
        files: user.organisation.files
    })
}


export async function createUser(token, data, commit) {
    commit("error", null)
    try {
        await create_user(token, {
            organisation: data.organisation,
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
