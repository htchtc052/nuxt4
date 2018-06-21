export default ({
  store,
  redirect
}) => {
  //вставить локали..
  //console.log("auth middleware")
  if (!store.getters['auth/check']) {
    console.log("auth middleware redirect")
    return redirect('/login?error_msg=error_token_expired')
  }
}
