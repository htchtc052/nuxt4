export default ({ store, redirect }) => {
    console.log("not_verified middleware", store.getters['auth/verified'])
    if (store.getters['auth/verified']) {
      return redirect('/profile')
    }
  }
  