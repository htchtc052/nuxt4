export default async ({ store, req, redirect, route }) => {
  if (process.server && !req) {
    return
  }
  if (route.name == "activate_set" || route.name == "password_set") {
    console.log("check-auth middleware no need auth for this routes");
    store.dispatch('auth/logout')
    return
  }

  if (process.server && route.path == "/social_login") {
    const token = route.query.token
    if (!token) {
      return redirect('/login?error_msg=error_social')
    }
    store.dispatch("auth/saveToken", token)
    return redirect('/profile')
  }

  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    console.log("check-auth midd before fetch user", "isServer", process.server ? true : false)
      try {
        await store.dispatch('auth/fetchUser')
      } catch (errors) {
        console.log("check-auth fetchUser error")
        return redirect('/login')
      }
  
  }
}
