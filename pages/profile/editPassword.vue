<template>
	
	<div class="mx-auto">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('edit_password_title') }}
			</h2>
			<div class="card-body">
					<form @submit.prevent="submit" role="form" class="form">
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
							<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('edit_password_submit') }}</button>
						</div>
					</form>
			</div>
		</div>
	</div>

</template>
<script>
import axios from "axios";
export default {
  computed: {},
  metaInfo() {},
  data() {
    return {
      loading: false,
      form: {
        password: null,
        confirm_password: null
      },
      error: {
        password: null,
        confirm_password: null
      }
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        const res = await axios.post("api/user/password", this.form);

        this.loading = false;

        new this.$noty({
          type: "success",
          text: this.$t("edit_password_done")
        }).show();

        this.$router.push({ name: "profile" });
       } catch (response) {
        this.loading = false;
        if (response) {
          if (response.data.errors) this.setErrors(response.data.errors);
          else this.clearErrors();
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
  }
};
</script>
