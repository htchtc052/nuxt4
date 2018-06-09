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
//let server_ok = false;

export default {
  layout: "rm",
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    console.log("activateSet mounted server_ok");

    this.loading = false;

    this.$toast.success(this.$t("activate_set_done"));

    this.$router.push({ name: "profile" });
  },
  middleware: async ({ route, redirect, app, store }) => {
    console.log("activateSet midd ");
    if (process.server) {
      console.log("activateSet midd server");

      try {
        const data = await app.$axios.$post("api/activate_set", {
          activate_token: route.params.token
        });
        console.log("activateSet midd token ok", data);

        store.dispatch("auth/login", data);
      } catch (error) {
        console.log(
          "activateSet midd server error",
          error.response ? true : error
        );

        app.context.error({
          statusCode: 403,
          message: app.i18n.t("activate_set_error")
        });
      }
    }
  }
  /*   asyncData() {
    return { server_ok };
  } */
};
</script>