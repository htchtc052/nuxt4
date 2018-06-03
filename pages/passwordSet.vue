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

export default {
  layout: "rm",
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
    (this.form.reset_password_token = this.$route.params.token),
      (this.form.email = this.$route.query.email);
  },
  methods: {
    async submit() {
      this.loading = true;

      try {

        const { data } = await axios.post("api/password_set", this.form);
        console.log("passwordSend client submit ok", data);
        this.$store.dispatch("auth/login", data);

        this.loading = false;

        new this.$noty({
          type: "success",
          text: this.$t("password_set_done")
        }).show();

        this.$router.push({ name: "profile" });
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
      this.error.password = errors.password ? errors.password[0] : null;
      this.error.confirm_password = errors.confirm_password
        ? errors.confirm_password[0]
        : null;
    },
    clearErrors() {
      this.error.password = null;
      this.error.confirm_password = null;
    }
  },
  middleware: async ({ route, query, redirect, store }) => {
    if (process.server) {
      console.log("passwordSend midd server");
      if (store.getters["auth/check"]) {
        console.log("passwordSend midd redirect auth to profile")
        return redirect('/profile?error_msg=password_set_error')
      }

      try {
        const response = await axios.post("api/password_check_before_set", {
          reset_password_token: route.params.token,
          email: query.email
        });
        console.log("passwordSend midd server ok");
      } catch (error) {
        console.log("passwordSend midd server error");
        return redirect('/login?error_msg=password_set_error')
     
      }
    }
  },

};
</script>