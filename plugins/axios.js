import axios from 'axios'
import Cookies from 'js-cookie'


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({
  app,
  store,
  redirect,
}) => {

  //срабатывает и на сервере и на клиенте. не нужен перехватчик на сервере. 
  //тк токен и локаль к запросу на сервере добавляется в миддваре, тк серверный и клиентский axios по разному настраивается..
  //кроме того перехватчик ответа с обработчиком ошибок не нужен на сервере

  axios.defaults.baseURL = process.env.apiURL

  if (process.server) {
    console.log("axios server side return")
    return
  }
  console.log("axios client side")
  // Request interceptor
  axios.interceptors.request.use(request => {

    request.baseURL = process.env.apiURL

    const token = store.getters['auth/token']

    console.log("axiois client intercept request", "retry", request._retry, "config", request, "token", token ? token : false)

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

    console.log("axios success", response.headers.new_token)

    //const new_token = _.get(response.headers, 'new_token', null)
    const new_token = response.headers && response.headers.new_token ? response.headers.new_token : null
    console.log("axios sucess headers new_token", "new_token", new_token)

    if (new_token) {
      store.dispatch('auth/saveToken', new_token)
    }
    console.log("axios sucess end handle response", response)
    return response;

  }, error => {
    //const {status} = error.response || {}
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
      console.log("axios  @@error new_token", "response", error.response.headers, "new_token", new_token)
      if (new_token) {
        store.dispatch('auth/saveToken', new_token)
      }
      console.log("axios error end handle new token")
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
    } else if (error.response.status == 403) {
      //console.log("status 403", error.response.data[0]);
      return Promise.reject(error.response);
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
    }
  })
}
