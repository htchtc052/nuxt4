import axios from 'axios'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({
  app,
  store,
  redirect
}) => {

  //срабатывает и на сервере и на клиенте. не нужен перехватчик на сервере. 
  //тк токен и локаль к запросу на сервере добавляется в миддваре, тк серверный и клиентский axios по разному настраивается..
  //кроме того перехватчик ответа с обработчиком ошибок не нужен на сервере

  axios.defaults.baseURL = process.env.apiURL
  console.log("start axios plugin11", process.server, axios.defaults.baseURL)

  if (process.server) {
    console.log("before return")
    return
  }
  console.log("start axios plugin222")
  // Request interceptor
  axios.interceptors.request.use(request => {

   console.log("Request client", "retry", request._retry, "token", store.getters['auth/token'])

    request.baseURL = process.env.apiURL

    const token = store.getters['auth/token']

    if (token) {
      request.headers.common['Authorization'] = `Bearer ${token}`
    }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    return request
  })

  // Response interceptor
  axios.interceptors.response.use(response => response, error => {
    const {
      status
    } = error.response || {}
    //return Promise.resolve();
    if (!error.response) {
      //console.log("error444444")
      new app.Noty({
        type: 'error',
        text: app.i18n.t("error_network")
      }).show()
      return Promise.reject();
    }


    console.log("main error response", error.response, "status ", error.response.status, "retry", error.config._retry, "refresh_req", error.config.refresh_req)

    if (error.response.status >= 500) {
      app.$noty.error(app.$t("error_server"))
      return Promise.reject()
    } else if (error.response.status == 429) {
      app.$noty.error(app.$t("error_throttle"))
      return Promise.reject()
    } else if (error.response.status == 403) {
      console.log("status 403", error.response.data[0]);
      if (error.response.data[0] == "need_active") {
        app.$noty.error(app.$t("error_need_active"))
        router.push({
          name: 'activate_send'
        });
      } else if (error.response.data[0] == "need_inactive") {
        app.$noty.error(app.$t("error_need_inactive"))
        router.push({
          name: 'profile'
        });
      }
      return Promise.reject();
    } else if (error.response.status == 422 || error.response.status == 423) {
      return Promise.reject(error.response.data.errors)
    } else if (error.response.status == 401) {

      //  console.log("status 401", error.config, error.config._retry, error.config.refresh_req);

      if (error.config.refresh_req || error.config._retry) {
        console.log("refresh failed");
        app.$noty.error(app.$t("error_token_expired"))
        store.dispatch('unsetUser')
        router.push({
          name: 'login'
        })
        return Promise.reject();
      } else {
        //     console.log("need refresh", error.config, error.config._retry);
        error.config._retry = true;
        return axios.get(api.refreshToken, {
          refresh_req: 1
        }).then((response) => {
          let refreshed_token = _.get(response.headers, 'authorization', null).replace('Bearer ', '');
          console.log("refreshToken response refreshed_token", refreshed_token)
          store.dispatch('saveToken', refreshed_token)
          return axios(error.config)
        })
      }

      return Promise.reject()
    }
  })
}
