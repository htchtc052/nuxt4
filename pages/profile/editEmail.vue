<template>
	
	<div class="mx-auto">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('title') }}
			</h2>
			<div class="card-body">
					<form @submit.prevent="submit" role="form" class="form">
						   <div class="form-group">
								<label for="old_email">{{ $t('old_email') }}</label>
								<input
									type="email"
									class="form-control"
									id="old_email"
									v-model="userData.email"
									autocomplete="off"
									readonly
									disabled=true
								/>
							</div>
							<div class="form-group">
								<label for="email">{{ $t('new_email') }}</label>
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
							<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('submit') }}</button>
						</div>
					</form>
			</div>
		</div>
	</div>

</template>
<script>
import { mapGetters } from "vuex";

export default {
  i18n: {
    messages: {
      en: {
        title: "Change email",
        submit: "Save",
        done: "Change confirm link sending to {email}",
        old_email: "Old email",
        new_email: "New email"
      },
      ru: {
        title: "Смена email",
        submit: "Сохранить",
        done: "Ссылка подтвержения изменения email направлена на {email}",
        old_email: "Старый email",
        new_email: "Новый email"
      }
    }
  },

  computed: {
    meta_title: function() {
      return this.$t("title");
    },
    ...mapGetters({
      userData: "userData"
    })
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
        email: ""
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
        const res = await axios.post(api.editUserEmail, this.form);

        this.loading = false;

        this.$noty.success(this.$t("done", { email: this.form.email }));

        this.$router.push({ name: "profile" });
      } catch (response) {
        this.loading = false;
        response.data.errors
          ? this.setErrors(response.data.errors)
          : this.clearErrors();
      }
    },
    setErrors(errors) {
      this.error.email = errors.email ? errors.email[0] : null;
    },
    clearErrors() {
      this.error.email = null;
    }
  },
  created() {
    console.log("userData", this.userData);
  }
};
</script>
