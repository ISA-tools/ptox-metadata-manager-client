export default async function ({ store, redirect, route }) {
    await store.dispatch('user/autologin')

    // Protect all routes from unauthenticated users
    if (route.path !== "/login" && !store.state.user.isLoggedIn) return redirect('/login')

    // Protect admin routes from non-admin users
    if (route.path === "/create_user") {
        if (!store.state.user.isLoggedIn) return redirect('/login')
        else if (store.state.user.username !== "admin") return redirect('/me')
    }

    // Redirect authenticated users to the home page
    else if (route.path === "/login" && store.state.user.isLoggedIn) return redirect('/')

    // Logout user
    else if (route.path === '/logout') {
        store.dispatch('user/logout')
        return redirect('/login')
    }
}
