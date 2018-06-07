export default ({
  store,
  redirect
}) => {
  console.log("guest middleware")
  if (store.getters['auth/check']) {
    console.log("guest middleware redirect")
    //return redirect('/profile')
  }
}
