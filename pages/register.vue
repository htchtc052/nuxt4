<template>
<div id="mega-content" >
    	<div class="card">
					<h2 class="card-title mx-auto">
						{{ $t('register_title') }}
					</h2>
					<div class="card-body">
								<form @submit.prevent="submit" class="form" role="form">
									<div class="form-group">
										<label for="name">{{ $t('name') }}</label>
										<input 
											type="text" 
											class="form-control" 
											:class="{'is-invalid' : error.name}"
											id="name"
											v-model="form.name"
											autocomplete="off"
											:disabled="loading"
										/>
										<div class="invalid-feedback" v-show="error.name">{{ error.name }}</div>
									</div>

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
								
									<div class="form-check">
										<label class="form-check-label">
											<input type="checkbox" 
												id="agree" 
												name="agree" 
												class="form-check-input"
												:class="{'is-invalid' : error.agree}" 
												v-model="form.agree"
												:disabled="loading"
											/>
											<i18n path="agree" tag="span">
												<a href="#">{{ $t('terms') }}</a>
											</i18n>

										<div class="invalid-feedback" v-show="error.agree">{{ error.agree }}</div>   
										</label>                              
									</div>
										
									<div class="form-group mx-auto">
										<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('register_submit') }}</button>
									</div>
										<div class="form-group">
									<div><nuxt-link :to="$i18n.path('password/send')">{{ $t('forgot_password') }}</nuxt-link></div>
                    <div><nuxt-link :to="$i18n.path('login')">{{ $t('login_title') }}</nuxt-link></div>
            
										</div>
								</form>
						<login-social />
					</div>
				</div>
			</div>
	
</template>

<script>
import LoginSocial from "~/components/LoginSocial.vue";

export default {
  middleware: "guest",
  layout: "rm",
  data() {
    return {
      loading: false,
      form: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        agree: null
      },
      error: {
        name: null,
        email: null,
        password: null,
        confirm_password: null,
        agree: null
      }
    };
  },
  components: {
    LoginSocial
  },
  methods: {
    async submit() {
      this.loading = true;

      try {
        // console.log(" register.vue before submit");
        const data = await this.$axios.$post("api/register", this.form);
        console.log("register.vue after post", data);
        this.$store.dispatch("auth/login", data);
        this.loading = false;
        this.$toast.success(
          this.$t("register_done", { email: this.form.email })
        );
        this.$router.push(this.$i18n.path('activate/send'));
      } catch (error) {
        console.log("resp", error.response.data.errors);
        this.loading = false;
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.setErrors(error.response.data.errors);
        } else {
          this.clearErrors();
        }
      }
    },
    setErrors(errors) {
      this.error.name = errors.name ? errors.name[0] : null;
      this.error.email = errors.email ? errors.email[0] : null;
      this.error.password = errors.password ? errors.password[0] : null;
      this.error.confirm_password = errors.confirm_password
        ? errors.confirm_password[0]
        : null;
      this.error.agree = errors.agree ? errors.agree[0] : null;
    },
    clearErrors() {
      this.error.name = null;
      this.error.email = null;
      this.error.password = null;
      this.error.confirm_password = null;
      this.error.agree = null;
    }
  }
};
</script>
