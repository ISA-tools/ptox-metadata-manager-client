import { useAppStore } from "@/stores/app";
import { defineNuxtRouteMiddleware} from "nuxt/app";
import { navigateTo} from "nuxt/app";

const store = useAppStore();

export default defineNuxtRouteMiddleware(async (to) => {
    await store.bootApp();

    if (to.path === '/logout') {
        await store.user.logout;
        return navigateTo('/')
    }
    else if (!to.path.includes('/users/enable') && !to.path.includes('unauthorized')) {
        store.user.autologin;

        const user_role = store.user.role;
        if (user_role === 'banned') return navigateTo('/unauthorized')

        if (to.path !== "/" && !to.path.includes('/users/reset_pwd')) {

            // Protect all routes from unauthenticated users
            if (to.path !== "/login" && !store.user.isLoggedIn) return navigateTo('/login?next=' + to.path)

            // Redirect not activated users to the home page if they try to access any other page
            if (user_role === 'disabled' && to.path !== '/users/disabled') return navigateTo('/users/disabled')

            // Protect admin routes from non-admin users
            if ((to.path === '/users' || to.path === '/users/'
                || to.path === '/files/' || to.path === '/files/')
                && user_role !== 'admin') { return navigateTo('/unauthorized') }

            // Protect create routes from non activated users
            if ((to.path === '/files/create' || to.path === '/files/create/')
                && (user_role !== 'admin' && user_role !== 'user')) {
                return navigateTo('/unauthorized')
            }

            // Protect register routes from disabled users
            if ((to.path === '/files/register' || to.path === '/files/register')
                && (user_role === 'disabled')) { return navigateTo('/unauthorized') }

            // Redirect authenticated users to the home page
            else if (to.path === "/login" && store.user.isLoggedIn) return navigateTo('/')
        }
    }
})

