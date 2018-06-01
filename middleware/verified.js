export default ({ store, redirect }) => {
    console.log("verified middleware", store.getters['auth/verified'])
    if (!store.getters['auth/verified']) {
     // return redirect('/activate_send')
    }
  }
  