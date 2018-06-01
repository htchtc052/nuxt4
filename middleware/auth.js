export default ({ store, redirect }) => {
  console.log("auth middleware", store.getters['auth/check'])
  if (!store.getters['auth/check']) {
    //return redirect('/login')
  }
}
