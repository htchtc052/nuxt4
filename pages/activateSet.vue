<template>
	<div id="mega-content">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('activate_set_title') }}
			</h2>
			    <div class="card-body" v-if="loading">
						{{ $t('activate_set_text') }}
					</div>  
     		</div>
			</div>

</template>
<script>
let server_ok = false;

export default {
  layout: "rm",
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    console.log("activateSet mounted server_ok", this.server_ok);
    this.loading = true;
    if (this.server_ok) {
      this.loading = false;

      this.$toast.success(this.$t("activate_set_done"));

      this.$router.push({ name: "profile" });
    } else {
      console.log("activateSet fail");
/* 
      this.$toast.error(app.i18n.t("activate_set_error"));

      this.loading = false;
      if (this.$store.getters["auth/check"])
        this.$router.push({ name: "profile" });
      else this.$router.push({ name: "login" }); */
    }
  },
  middleware: async ({ route, query, redirect, app, store }) => {
    console.log("activateSet midd ");
    if (process.server) {
      console.log("activateSet midd server");

      try {
        const data = await app.$axios.$post("api/activate_set", {
          activate_token: route.params.token
        });
        console.log("activateSet midd token ok", data);

        store.dispatch("auth/login", data);
        server_ok = true;
      } catch (error) {
        server_ok = false;
        console.log("activateSet midd token error", error ? error : null);
      }
    }
  },
  asyncData() {
    return { server_ok };
  }
};
</script>