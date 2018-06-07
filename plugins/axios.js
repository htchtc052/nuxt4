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
      console.log("$axios setToken")
      request.headers['Authorization'] = "Bearer " + token
    }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }
  })

  $axios.onError(error => {
      if (error.response) {
        const new_token = error.response.headers && error.response.headers.new_token ? error.response.headers.new_token : null

        console.log("$axios error", "new_token", new_token ? new_token : null)
        if (new_token) {
          console.log("$axios error set new token")
          store.dispatch('auth/saveToken', new_token)
        }

        if (error.response.status == 401) {
          console.log("$axios 4013")
          app.$cookies.remove('token')
          if (process.server) {
            redirect("/login?error_msg=error_token_expired");

          } else {
            new app.Noty({
              type: 'error',
              text: app.i18n.t("error_token_expired")
            }).show()
            app.router.push({
              name: "login"
            })

          }
        } else if (error.response.status == 403) {
          console.log("$axios 403")
          if (process.server) {
            app.context.error({
              statusCode: 403,
              message: app.i18n.t("error_forbidden")
            })
        } else {
          new app.Noty({
            type: 'error',
            text: app.i18n.t("error_forbidden")
          }).show()
        }
        return Promise.reject()
      } else if (error.response.status == 422) {
        return Promise.reject(error.response.data)
      }
    }
    //500 and other error or not response
    if (process.server) {
      app.context.error({
        statusCode: 500,
        message: app.i18n.t("error_server")
      })
    } else {
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_server")
      }).show()
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
