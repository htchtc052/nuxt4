<template>
<div id="mega-content" >
    
				<div class="card">
					<h2 class="card-title mx-auto">
						{{ $t('login_title') }}
					</h2>
					<div class="card-body">
								<form @submit.prevent="sendForm" class="form" role="form">
							<div class="form-group">
								<label for="email">{{ $t('email') }}</label>
								<input
									type="email"
									class="form-control"
									:class="{'is-invalid' : error.email}"
									id="email"
									v-model="form.email"
									autocomplete="off"
									:disabled="loading"
								/>
								<div class="invalid-feedback" v-show="error.email">{{ error.email }}</div>
							</div>
							<div class="form-group">
								<label for="password">{{ $t('password') }}</label>
								<input
									type="password"
									class="form-control"
									:class="{'is-invalid' : error.password}"
									id="password"
									v-model="form.password"
									:disabled="loading"
								/>
								<div class="invalid-feedback" v-show="error.password">{{ error.password }}</div>
							</div>
							<div class="form-group mx-auto">
								<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('login_submit') }}</button>
							</div>
								<div class="form-group">
										<div><nuxt-link :to="{ name: 'password_send'}">{{ $t('forgot_password') }}</nuxt-link></div>
                    <div><nuxt-link :to="{ name: 'register' }">{{ $t('register_title') }}</nuxt-link></div>
                    <div><nuxt-link :to="{ name: 'password_set', params: { token: 'test' } }">{{ $t('password_set_title') }}</nuxt-link></div>
                    <div><nuxt-link :to="{ name: 'profile' }">Profile</nuxt-link></div>
                    <div><a  href="/">Main page</a></div>
					
					
                </div>
							
						</form>	


					<!--	<login-social /> -->

					</div>
				</div>
		
</div>

</template>

<script>
import axios from "axios";
export default {
  middleware: "guest",
  layout: "rm",
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null
      },
      error: {
        email: null,
        password: null
      }
    };
  },
  mounted() {
    /*   if (this.$route.query.error_msg) {
        console.log("login mounted error param", this.$route.query.error_msg)
        new this.$noty({ type: "error", text: this.$t(this.$route.query.error_msg) }).show();
    } */
  },
  methods: {
    async sendForm() {
      this.loading = true;

      try {
       console.log(" login.vue before submit", axios.defaults.baseURL);
        const { data } = await axios.post("api/login", this.form);
        this.$store.commit("auth/SET_USER", data.user)
        console.log("login.vue  success after user")

        
          this.$store.commit("auth/SET_TOKEN", data.token)

          this.$cookies.set('token', data.token, {
            path: '/',
            maxAge: 31536000
          })
          console.log("login.vue   success after token")

        
        this.loading = false;

        new this.$noty({ type: "success", text: this.$t("login_done") }).show();

        console.log("login.vue GO TO PROFILE");

        //this.$router.push({ name: "profile" });
        if (!this.$store.getters["auth/verified"]) {
           this.$router.push({ name: "activate_send" });
        } else {
         this.$router.push({ name: "profile" });
        } 

      } catch (response) {
        this.loading = false;
        if (response && response.data && response.data.errors) {
          this.setErrors(response.data.errors);
        } else {
          this.clearErrors();
        }
      }
    },
    setErrors(errors) {
      this.error.email = errors.email ? errors.email[0] : null;
      this.error.password = errors.password ? errors.password[0] : null;
    },
    clearErrors() {
      this.error.email = null;
      this.error.password = null;
    }
  }
};
</script>