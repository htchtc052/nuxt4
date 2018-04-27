import _ from 'lodash'
import Vue from 'vue'

export const testing = (Vue) => {
  Vue.testing = {
    test: () => 'test'
  }
  // Подключаем для вызова с любой точки объекта Vue в контексте this
  if (!Vue.prototype.$testing) {
    Object.defineProperties(Vue.prototype, {
      $testing: {
        get: () => {
          return Vue.testing
        }
      }
    })
  }
}

Vue.use(testing)