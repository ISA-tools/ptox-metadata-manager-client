export default async function ({ store, redirect, route }) {
    if (route.path === '/logout') {
        await store.dispatch('user/logout')
        return redirect('/')
    }
    else if (!route.path.includes('/users/enable/')) {
        store.dispatch('user/autologin')
        if (route.path !== "/") {
            // Protect all routes from unauthenticated users
            if (route.path !== "/login" && !store.state.user.isLoggedIn) return redirect('/login')

            // Redirect authenticated users to the home page
            else if (route.path === "/login" && store.state.user.isLoggedIn) return redirect('/')
        }
    }
}
