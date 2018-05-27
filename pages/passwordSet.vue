<template>
	<div id="mega-content">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('password_set_title') }}
			</h2>
			<div class="card-body">
							<form @submit.prevent="submit" role="form" class="form">
								<div class="form-group">
									<label for="email">{{ $t('email') }}</label>
									<input
										type="email"
										class="form-control"
										id="email"
										v-model="form.email"
										autocomplete="off"
										readonly
										disabled=true
									/>
									<div class="invalid-feedback" v-show="error.email">{{ error.email }}</div>
								</div>
								<div class="form-group">
									<label for="password">{{ $t('new_password') }}</label>
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
									<div class="form-group">
									<label for="confirm_password">{{ $t('confirm_password') }}</label>
									<input
										type="password"
										class="form-control"
										:class="{'is-invalid' : error.confirm_password}"
										id="confirm_password"
										v-model="form.confirm_password"
										:disabled="loading"
									/>
									<div class="invalid-feedback" v-show="error.confirm_password">{{ error.confirm_password }}</div>
								</div>
								<div class="form-group mx-auto">
									<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('password_set_submit') }}</button>
								</div>
							</form>
					</div>
				</div>
			</div>

</template>
<script>
import axios from "axios";

let checked_token = false;

export default {
  layout: 'rm',
  computed: {},
  data() {
    return {
      loading: false,
      form: {
        password: null,
        email: null,
        token: null
      },
      error: {
        password: null
      }
    };
  },
  mounted() {
      console.log("passwordSend client mounted checked_token", this.checked_token)
      if (!this.checked_token) {
          new this.$noty({
            type: "error",
            text: this.$t("password_set_error")
          }).show();
          
          this.$router.push({ name: "login" });
      }
      this.form.reset_password_token = this.$route.params.token,
      this.form.email = this.$route.query.email
    //console.log("mounted password set.vue", this)
  },
  methods: {
    async submit() {
      this.loading = true;
      
      await this.$store.dispatch("auth/logout")

      try {
          const res = await axios.post("api/password_set", this.form);
          console.log("passwordSend client submit ok", res.data)
        
          this.$store.dispatch("auth/saveToken", res.data.new_token);

          await this.$store.dispatch("auth/fetchUser");
          
          this.loading = false;

          new this.$noty({
            type: "success",
            text: this.$t("password_set_done")
          }).show();
        
          this.$router.push({ name: "profile" });
      
      } catch (response) {
        console.log("passwordSend client submit catch errors", response, "status", response.status)
        this.loading = false;

        if (response.status == 403) {
          new this.$noty({
            type: "error",
            text: this.$t("password_set_error")
          }).show();
          this.$router.push({ name: "login" });
        } else {
         // console.log("passwordSend errors", response.data.errors)
          response.data.errors ? this.setErrors(response.data.errors) : this.clearErrors()
        }
      }  
      
     
    },
    setErrors(errors) {
  
      this.error.password = errors.password ? errors.password[0] : null;
      this.error.confirm_password = errors.confirm_password
        ? errors.confirm_password[0]
        : null;
    },
    clearErrors() {
      this.error.password = null;
      this.error.confirm_password = null;
    },
  },
  middleware: async ({ route, query, redirect, app }) => {
    //токен путается если авторизован.. явно его указать..
     if (process.server) {
      console.log("passwordSend midd process server", process.server)
      
      try {
        const response = await axios.post("api/password_check_before_set", {
          reset_password_token: route.params.token,
          email: query.email
        });
        console.log("passwordSend midd token ok", response.data)
        checked_token = true
      } catch (error) {
          console.log("passwordSend midd token error", error.response.data)
          checked_token = false
          //return redirect('/login?error_msg=error_password_reset')
      }

    
    } 
  },
  asyncData() {
    return  {checked_token}
  }


};
</script>