import { useAppStore } from "@/stores/app";

const store = useAppStore();

export default async function ({ redirect, route }) {
    await store.bootApp;


    if (route.path === '/logout') {
        await store.user.logout;
        return redirect('/')
    }
    else if (!route.path.includes('/users/enable') && !route.path.includes('unauthorized')) {
        store.user.autologin;

        const user_role = store.user.role;
        if (user_role === 'banned') return redirect('/unauthorized')

        if (route.path !== "/" && !route.path.includes('/users/reset_pwd')) {

            // Protect all routes from unauthenticated users
            if (route.path !== "/login" && !store.user.isLoggedIn) return redirect('/login?next=' + route.path)

            // Redirect not activated users to the home page if they try to access any other page
            if (user_role === 'disabled' && route.path !== '/users/disabled') return redirect('/users/disabled')

            // Protect admin routes from non-admin users
            if ((route.path === '/users' || route.path === '/users/'
                || route.path === '/files/' || route.path === '/files/')
                && user_role !== 'admin') { return redirect('/unauthorized') }

            // Protect create routes from non activated users
            if ((route.path === '/files/create' || route.path === '/files/create/')
                && (user_role !== 'admin' && user_role !== 'user')) {
                return redirect('/unauthorized')
            }

            // Protect register routes from disabled users
            if ((route.path === '/files/register' || route.path === '/files/register')
                && (user_role === 'disabled')) { return redirect('/unauthorized') }

            // Redirect authenticated users to the home page
            else if (route.path === "/login" && store.user.isLoggedIn) return redirect('/')
        }
    }
}

