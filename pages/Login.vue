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
							<!-- 
								<div class="form-group">
									<router-link :to="{name: 'password_send'}">
										<a class="">{{ $t('forgot_password') }}</a>
									</router-link>
								</div>
								-->
						</form>	


					<!--	<login-social /> -->

					</div>
				</div>
		
</div>

</template>

<script>
//import axios from '~/plugins/axios.js'

import axios from 'axios'
//import Vue from 'vue'

export default {
  middleware: 'guest',
  layout: "rm",
  computed: {
    meta_title: function() {
      return this.$t("title");
    }
  },
  metaInfo() {
    return {
      title: this.meta_title
    };
  },
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
      //this.$noty.error(3333)
      //this.$toasted.show('hello billo')
  },
  methods: {
    async sendForm() {
      this.loading = true;

      try {
        console.log("before submit", axios.defaults.baseURL);
         const res = await axios.post("api/login", this.form);
        return
         //console.log("after register");

        this.$store.dispatch("saveToken", res.data.token);
        //console.log("after save token");

        await this.$store.dispatch("fetchUser");

        this.loading = false;

        this.$noty.success(this.$t("login_done"));
		
		    this.$router.push({ name: "profile" });
       /*  if (this.$store.getters["verified"]) {
          this.$router.push({ name: "profile" });
        } else {
          this.$router.push({ name: "activate_send" });
        } */
      } catch (errors) {
        this.loading = false;
        errors ? this.setErrors(errors) : this.clearErrors();
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

<style>
</style>
