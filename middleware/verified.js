export default ({
  store,
  redirect
}) => {
  if (!store.getters['auth/verified']) {
    console.log("verified middleware redirect")
    return redirect('/activate_send')
  }
}
