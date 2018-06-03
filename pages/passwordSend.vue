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
import axios from "axios";
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
        const res = await axios.post("api/password_send_email", this.form);

        this.clearErrors();

        this.loading = false;

        new this.$noty({
          type: "success",
          text: this.$t("password_send_done", { email: this.form.email })
        }).show();
      } catch (errors) {
        this.loading = false;
        errors ? this.setErrors(errors) : this.clearErrors();
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
