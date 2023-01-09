export default async function ({ store, redirect, route }) {
    await store.dispatch('user/autologin')
    if (route.path !== "/login" && !store.state.user.isLoggedIn) return redirect('/login')
    else if (route.path === "/login" && store.state.user.isLoggedIn) return redirect('/')
    else if (route.path === '/logout') {
        store.dispatch('user/logout')
        return redirect('/login')
    }
}
