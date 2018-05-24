import Vue from 'vue'

export default ({ app }) => 
{
  
  const Noty = require('noty');

  Noty.overrideDefaults({
    layout   : 'bottomRight',
    theme    : 'bootstrap-v4',
    progressBar: true,
    timeout: 1000,
  });
  app.Noty = Noty  

 // console.log(this.$noty)

  if (!Vue.prototype.$noty) {
    Object.defineProperties(Vue.prototype, {
      $noty: {
        get: () => {
          return Noty
        },

      }
    })
  }


}
