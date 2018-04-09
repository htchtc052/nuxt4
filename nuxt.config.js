module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'RealMusic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i&amp;subset=cyrillic,https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&amp;subset=cyrillic,https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&amp;subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&amp;subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&amp;subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' },
      { rel: 'stylesheet', href: 'http://simplelineicons.com/css/simple-line-icons.css' },
      { rel: 'stylesheet', href: 'https://www.realmusic.ru/css/flags.css' }
    ]
  },
  modules: [
    ['@nuxtjs/bootstrap-vue', { css: true }],
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
