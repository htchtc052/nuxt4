export default function ({
  $axios,
  redirect,
  app,
  store,
}) {
  console.log("$axios plugin")
  $axios.onRequest(request => {

    let token = store.getters['auth/token']

    if (token) {
      request.headers['Authorization'] = "Bearer " + token
    }

    const locale = store.getters['lang/locale']
    console.log("$axios req locale", locale)
  
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }
  })

  $axios.onError(error => {

    if (!error.response) {
      //not response
      if (process.server) {
        app.context.error({
          statusCode: 500,
          message: app.i18n.t("error_network")
        })
      } else {
        app.$toast.error(app.i18n.t("error_network"))
      }

      return Promise.reject()

    }

    const new_token = error.response.headers && error.response.headers.new_token ? error.response.headers.new_token : null

    console.log("$axios error", "new_token", new_token ? new_token : null)
    if (new_token) {
      store.dispatch('auth/saveToken', new_token)
    }

    if (error.response.status == 500) {
      console.log("$axios 500")
      app.context.error({
        statusCode: 500,
        message: app.i18n.t("error_server")
      })
      return Promise.reject()
    } else if (error.response.status == 401) {
      console.log("$axios 401")
      store.dispatch("auth/logout")
      return Promise.reject(error)
    } 
  
    return Promise.reject(error);
  })

  $axios.onResponse(response => {
    const new_token = response.headers && response.headers.new_token ? response.headers.new_token : null
    console.log("$axios response", "new_token", new_token ? new_token : null)

    if (new_token) {
      store.dispatch('auth/saveToken', new_token)
    }

  })
}
