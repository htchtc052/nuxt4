<template>
	<div id="mega-content">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('activate_send_title') }}
			</h2>
			<div class="card-body">
				<form @submit.prevent="submit" role="form" class="form">
					<div class="form-group">
						<div>{{ $t('activate_send_text', { email: this.user.email }) }} </div>
					</div>

					<div class="form-group mx-auto">
						<button type="submit" class="btn btn-primary btn-lg btn-block" :class="{ 'btn-loading': loading }" :disabled="loading">{{ $t('activate_send_submit') }}</button>
					</div>
				</form>
			</div>
		</div>
	</div>
 
</template>

<script>

import { mapGetters } from "vuex";

export default {
  middleware: ["auth", "not_verified"],
  layout: "rm",
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  data() {
    return {
      loading: false
    };
  },
   mounted() {
    
  
  },
  methods: {
    async submit() {
      this.loading = true;

      try {
        await this.$axios.$post("api/activate_send_email");
        this.loading = false;
        this.$toast.success(this.$t("activate_send_done", {email: this.user.email})).show();
        //this.$router.push(this.localePath('profile'))
       } catch (error) {
        console.log("error", error);
        this.loading = false;
       
      }
    },
  }
};
</script>
