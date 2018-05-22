import axios from 'axios'

export default async ({ store, req }) => {
  const token = store.getters['auth/token']
  console.log("auth-check middleware", process.server)

  //если на сервере то добавляем токен, тк было return в плагине
  if (process.server) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }  
 
  if (!store.getters['auth/check'] && token) {
    console.log("need ferch user")
    await store.dispatch('auth/fetchUser')
  }
}
