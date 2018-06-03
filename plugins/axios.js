import axios from 'axios'
import Cookies from 'js-cookie'


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({
  app,
  store,
  redirect,
}) => {

  axios.defaults.baseURL = process.env.apiURL

  if (process.server) {
    return
  }
  console.log("axios client side")
  // Request interceptor
  axios.interceptors.request.use(request => {

    request.baseURL = process.env.apiURL

    const token = store.getters['auth/token']

    console.log("axiois client intercept request", "token", token ? true : false)

    if (token) {
      request.headers['Authorization'] = "Bearer " + token
    }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    return request
  })

  // Response interceptor
  axios.interceptors.response.use(response => {

    console.log("axios success")

    const new_token = response.headers && response.headers.new_token ? response.headers.new_token : null
    console.log("axios sucess headers new_token", "new_token", new_token)

    if (new_token) {
      store.dispatch('auth/saveToken', new_token)
    }
    return response;

  }, error => {
    if (!error.response) {
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_network")
      }).show()
      return Promise.reject();
    }
    console.log("axios client intercept status ", error.response.status)

    if (error.response.status != 500) {

      const new_token = error.response.headers && error.response.headers.new_token ? error.response.headers.new_token : null
      console.log("axios error new_token", new_token)
      if (new_token) {
        store.dispatch('auth/saveToken', new_token)
      }
    }

    if (error.response.status >= 500) {
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_server")
      }).show()
      return Promise.reject()
    } else if (error.response.status == 429) {
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_throttle")
      }).show()
      return Promise.reject()
    } else if (error.response.status == 422 || error.response.status == 423) {
      return Promise.reject(error.response)
    } else if (error.response.status == 401) {
      console.log("axios client intercept handle 401")
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_token_expired")
      }).show()
      app.router.push({
        name: "login"
      })
      return Promise.reject()
    } else if (error.response.status == 403) {
      console.log("axios client intercept handle 403");
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_forbidden")
      }).show()
    
      if (store.getters["auth/check"]) {
        app.router.push({
          name: "profile"
        })
      } else {
        app.router.push({
          name: "login"
        })
      }
      
      return Promise.reject();
    }
  })
}
