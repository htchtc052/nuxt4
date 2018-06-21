export default async ({
  app,
  store,
  req,
  redirect,
 // route
}) => {

  console.log("check-auth midd", "isServer", process.server ? true : false)

  if (process.server && !req) {
    return
  }

  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (errors) {
       console.log("check-auth fetchUser errors", errors && errors.response ? errors.response : errors)
    }
    //console.log("check-auth after ftc")
  }
}
