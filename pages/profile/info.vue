<template>

		<div id="mega-content">
		<div class="card">
			<ProfileMenu :user=user></ProfileMenu>
		
			<div class="card-body">
				
						<form @submit.prevent="submit" role="form" class="form">
						<div class="form-group">
							<label for="name">{{ $t('name') }}</label>
							<input
								type="text"
								class="form-control"
								:class="{'is-invalid' : error.name}"
								id="name"
								v-model="form.name"
								
								:disabled="loading"
							/>
							<div class="invalid-feedback" v-show="error.name">{{ error.name }}</div>
						</div>
						<div class="form-group mx-auto">
							<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('edit_profile_submit') }}</button>
						</div>
					</form>
	</div>
	</div>
	</div>



</template>
<script>
import { mapState, mapGetters } from "vuex";
import ProfileMenu from "~/components/ProfileMenu.vue";

export default {
  middleware: ["auth", "verified"],
  layout: "rm",
  components: {
    ProfileMenu
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  data() {
    return {
      loading: false,
      form: {
        name: ""
      },
      error: {
        name: ""
      }
    };
  },
  mounted() {
    this.form.name = this.user.name;
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await this.$axios.$post("api/user/update", this.form);

        this.user.name = this.form.name;

        this.loading = false;

        this.$toast.success(this.$t("edit_profile_done"));

        this.$router.push(this.$i18n.path("profile"));
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
    },
    clearErrors() {
      this.error.name = null;
    },
    created() {
      console.log("form", form);
    }
  }
};
</script>
