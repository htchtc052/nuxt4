<template>
	<div id="mega-content">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('password_send_title') }}
			</h2>
			<div class="card-body">
						<form @submit.prevent="submit" role="form" class="form">
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
						<div class="form-group mx-auto">
							<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('password_send_submit') }}</button>
						</div>
					</form>
					</div>
				</div>
			</div>
	
</template>

<script>
export default {
  layout: "rm",
  middleware: "guest",
  computed: {},
  data() {
    return {
      loading: false,
      form: {
        email: null
      },
      error: {
        email: null
      }
    };
  },
  methods: {
    async submit() {
      this.loading = true;

      try {
        await this.$axios.$post("api/password_send_email", this.form);

        this.clearErrors();

        this.loading = false;

        this.$toast.success(this.$t("password_send_done", { email: this.form.email }));
   
      } catch (resp) {
        this.loading = false;
        if (resp && resp.errors) {
          this.setErrors(resp.errors);
        } else {
          this.clearErrors();
        }
      }
    },
    setErrors(errors) {
      this.error.email = errors.email ? errors.email[0] : null;
    },
    clearErrors() {
      this.error.email = null;
    }
  }
};
</script>
