const webpack = require('webpack')


module.exports = {

  env: {
    apiURL: 'http://localhost:8081'
  },
  head: {
    title: 'RealMusic',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }

    ],
    link: [{
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i&amp;subset=cyrillic,https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&amp;subset=cyrillic,https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&amp;subset=cyrillic'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&amp;subset=cyrillic'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&amp;subset=cyrillic'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://www.realmusic.ru/css/flags.css'
      },
    ]
  },
  loading: {
    color: '#3B8070'
  },
  modules: [
    '@nuxtjs/router',
    '@nuxtjs/toast',
    '@nuxtjs/axios', ['cookie-universal-nuxt', {
      parseJSON: false
    }],

  ],
  toast: {
    position: 'top-center',
    duration: 2000,
    fullWidth: false,
    closeOnSwipe: true,
  },
  axios: {
    proxyHeaders: false,
    baseURL: 'http://localhost:8081',
    browserBaseUrl: 'http://localhost:8081',
  },
  plugins: [
    {
      src: '~plugins/axios',
      ssr: true
    },
    {
      src: '~plugins/i18n',
      ssr: true
    },
    {
      src: '~plugins/tracksHelper.js',
      ssr: false
    },
    {
      src: '~/plugins/persistedStorage.js',
      ssr: false
    },
    {
      src: '~/plugins/bootstrap.js',
      ssr: false
    }
  ],
  css: [{
    src: 'bootstrap/scss/bootstrap.scss',
    lang: 'scss'
  }],
  router: {
    middleware: [
      'check-auth',
      'i18n'
    ]
  },
  
  build: {
    vendor: ['vue-i18n'],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
        // ...etc.
      })
    ],
    extractCSS: {
      allChunks: true
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
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
