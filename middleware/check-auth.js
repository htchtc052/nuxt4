export default async ({ store, req, redirect, route }) => {
  
  console.log("check-auth midd", "isServer", process.server ? true : false)
  if (!process.server) {
    console.log("check-auth midd only on server side")
    return
  }

  if (process.server && !req) {
    return
  }

  if (route.path == "/social_login") {
    const token = route.query.token
    if (!token) {
      return redirect('/login?error_msg=error_social')
    }
    store.dispatch("auth/saveToken", token)
    return redirect('/profile')
  }

  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    
        try {
          await store.dispatch('auth/serverFetchUser')
        } catch (errors) {
          console.log("check-auth fetchUser error")
          return redirect('/login')
        }
  
  }
}
