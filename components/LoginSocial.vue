<template> 

<div class="row">   
  <div class="col-lg-12">
  {{ $t('login_with') }}
  
  <button @click="loginGithub" type="button" class="btn btn-dark">
  {{ $t('github') }} <i class="fa fa-github"></i>
  </button> 

   <button @click="loginFacebook" type="button" class="btn btn-dark">
   {{ $t('facebook') }}
  <i class="fa fa-facebook"></i>
  </button>


   <button @click="loginGoogle" type="button" class="btn btn-dark">
 {{ $t('google') }}
  <i class="fa fa-google"></i>
  </button>

   <button @click="loginVkontakte" type="button" class="btn btn-dark">
   {{ $t('vkontakte') }}
  <i class="fa fa-vk"></i>
  </button>

  <button @click="loginYandex" type="button" class="btn btn-dark">
   {{ $t('yandex') }}
  <i class="fa fa-yandex"></i>
  </button>
  <button @click="loginOdnoklassniki" type="button" class="btn btn-dark">
   {{ $t('odnoklassniki') }}
  <i class="fa fa-odnoklassniki"></i>
  </button>

<button @click="loginMailru" type="button" class="btn btn-dark">
   {{ $t('mailru') }}
  <i class="fa fa-mailru"></i>
  </button>

  </div>
</div> 
</template>

<script>

import axios from "axios";
export default {
  name: "LoginSocial",
  data() {
    return {
      social: {
        github: process.env.apiURL + "/api/oauth/github",
        facebook: process.env.apiURL + "/api/oauth/facebook",
        google: process.env.apiURL + "/api/oauth/google",
        vkontakte: process.env.apiURL + "/api/oauth/vkontakte",
        yandex: process.env.apiURL + "/api/oauth/yandex",
        odnoklassniki: process.env.apiURL  + "/api/oauth/odnoklassniki",
        mailru: process.env.apiURL + "/api/oauth/mailru"
      }
    };
  },
  methods: {
    async loginGithub() {
      this.redirectToProvider(this.social.github);
    },
    async loginFacebook() {
      this.redirectToProvider(this.social.facebook);
    },
    async loginGoogle() {
      this.redirectToProvider(this.social.google);
    },
    async loginVkontakte() {
      this.redirectToProvider(this.social.vkontakte);
    },
    async loginYandex() {
      this.redirectToProvider(this.social.yandex);
    },
    async loginOdnoklassniki() {
      this.redirectToProvider(this.social.odnoklassniki);
    },
    async loginMailru() {
      this.redirectToProvider(this.social.mailru);
    },
    async redirectToProvider(apiProviderLink) {
      try {
        const { data } = await axios.post(apiProviderLink);
        window.location.href = data.url;
      } catch (e) {
        console.log("Error redirect to provider", e);
      }
    }
  }
};
</script>
