export default ({
  store,
  redirect
}) => {
  if (store.getters['auth/check']) {
    console.log("guest middleware redirect")
    return redirect('/profile')
  }
}
