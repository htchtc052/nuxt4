export default ({ store, redirect }) => {
  console.log("guest middleware", store.getters['auth/check'])
  if (store.getters['auth/check']) {
    return redirect('/')
  }
}
