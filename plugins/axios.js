import axios from 'axios'
import swal from 'sweetalert2'



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({ app, store, redirect }) => 
{
  
/*   if (!process.server) {
  const Noty = require('noty');

  Noty.overrideDefaults({
    layout   : 'bottomRight',
    theme    : 'mint',
    animation: {
        open : 'animated fadeInRight',
        close: 'animated fadeOutRight'
    }
  });
  app.Noty = Noty  
} */
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
    request.baseURL = process.env.apiURL

    const token = store.getters['auth/token']

    if (token) {
      request.headers.common['Authorization'] = `Bearer ${token}`
    }

    console.log("token", token)
    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    return request
  }) 

  // Response interceptor
  axios.interceptors.response.use(response => response, error => {
    const { status } = error.response || {}
    console.log("error222", error)
          
    //return Promise.resolve();
    if (!error.response) {
      console.log("error444444")
      new app.Noty({type: 'error',  text: app.i18n.t("error_network")}).show()
      return Promise.reject();
    } 


    if (status >= 500) {
      swal({
        type: 'error',
        title: app.i18n.t('error_alert_title'),
        text: app.i18n.t('error_alert_text'),
        reverseButtons: true,
        confirmButtonText: app.i18n.t('ok'),
        cancelButtonText: app.i18n.t('cancel')
      })
    }

    if (status === 401 && store.getters['auth/check']) {
      swal({
        type: 'warning',
        title: app.i18n.t('token_expired_alert_title'),
        text: app.i18n.t('token_expired_alert_text'),
        reverseButtons: true,
        confirmButtonText: app.i18n.t('ok'),
        cancelButtonText: app.i18n.t('cancel')
      }).then(() => {
        store.commit('auth/LOGOUT')

        redirect({ name: 'login' })
      })
    }

    return Promise.reject(error)
  })
}
