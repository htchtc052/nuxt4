export default ({
  store,
  redirect
}) => {
  if (!store.getters['auth/check']) {
    console.log("auth middleware redirect")
    return redirect('/login')
  }
}
