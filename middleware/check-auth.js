import axios from 'axios'
import Cookies from 'js-cookie'

export default async ({
  app,
  store,
  req,
  res,
  redirect
}) => {
  //console.log("check-auth middleware", "is_server", process.server ? true : false, "is_check")



  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    //console.log("check-auth midd before fetch user")
    if (!process.server) {
      //console.log("check-auth midd client before fetch user!")
      //await store.dispatch('auth/fetchUser')
    } else {
      if (!req) {
        console.log("check-auth pass if !req")
        return
      }

      try {
        console.log("check-auth before serverFetchUser")
        await store.dispatch('auth/serverFetchUser')
        console.log("check-auth after serverFetchUser")
      } catch (errors) {
        console.log("check-auth serverFetchUser error")
        return redirect('/login')
      }
    }
  }
}
