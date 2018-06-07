export default ({
  store,
  redirect
}) => {
  if (store.getters['auth/verified']) {
    console.log("not_verified middleware redirect")
    //return redirect('/profile')
  }
}
