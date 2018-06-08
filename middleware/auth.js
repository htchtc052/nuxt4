export default ({
  store,
  redirect
}) => {
  //console.log("auth middleware")
  if (!store.getters['auth/check']) {
    console.log("auth middleware redirect")
    return redirect('/login?error_msg=error_token_expired')
  }
}
