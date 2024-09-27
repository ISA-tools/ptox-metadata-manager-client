/*
 * TODO:
 *  Possible clues at:
 *  https://nuxt.com/docs/guide/directory-structure/middleware (basic guide)
 *  https://stackoverflow.com/questions/75373246/nuxt3-accessing-vuex-store-from-middleware (access store, inc. async)
 */

import user from '../store/user.js';

//export default async function ({ store, navigateTo, route }) {
// eslint-disable-next-line no-undef
export default defineNuxtRouteMiddleware(async (to) => {
    const store = user;
    await store.dispatch('app/bootApp')

    if (to.path === '/logout') {
        await store.dispatch('user/logout')
        // eslint-disable-next-line no-undef
        return navigateTo('/')
    } else if (!to.path.includes('/users/enable') && !to.path.includes('unauthorized')) {
        store.dispatch('user/autologin')

        const user_role = store.state.user.role
        // eslint-disable-next-line no-undef
        if (user_role === 'banned') return navigateTo('/unauthorized')

        if (to.path !== "/" && !to.path.includes('/users/reset_pwd')) {

            // Protect all routes from unauthenticated users
            // eslint-disable-next-line no-undef
            if (to.path !== "/login" && !store.state.user.isLoggedIn) return navigateTo('/login?next=' + to.path)

            // Redirect not activated users to the home page if they try to access any other page
            // eslint-disable-next-line no-undef
            if (user_role === 'disabled' && to.path !== '/users/disabled') return navigateTo('/users/disabled')

            // Protect admin routes from non-admin users
            if ((to.path === '/users' || to.path === '/users/'
                    || to.path === '/files/' || to.path === '/files/')
                && user_role !== 'admin') {
                // eslint-disable-next-line no-undef
                return navigateTo('/unauthorized')
            }

            // Protect create routes from non activated users
            if ((to.path === '/files/create' || to.path === '/files/create/')
                && (user_role !== 'admin' && user_role !== 'user')) {
                // eslint-disable-next-line no-undef
                return navigateTo('/unauthorized')
            }

            // Protect register routes from disabled users
            if ((to.path === '/files/register' || to.path === '/files/register')
                && (user_role === 'disabled')) {
                // eslint-disable-next-line no-undef
                return navigateTo('/unauthorized')
            }

            // Redirect authenticated users to the home page
            // eslint-disable-next-line no-undef
            else if (to.path === "/login" && store.state.user.isLoggedIn) return navigateTo('/')
        }
    }
})