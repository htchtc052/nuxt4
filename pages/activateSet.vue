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
import axios from "axios";

let server_ok = false;

export default {
  layout: "rm",
  data() {
    return {
      loading: false,
    };
  },
  async mounted() {
    console.log("activateSend mounted server_ok", this.server_ok);
    this.loading = true;
    if (this.server_ok) {
      this.loading = false;

      new this.$noty({
        type: "success",
        text: this.$t("activate_set_done")
      }).show();

      this.$router.push({ name: "profile" });
    } else {
      console.log("activateSet fail");

      new this.$noty({
        type: "error",
        text: this.$t("activate_set_error")
      }).show();

      this.loading = false;
      if (this.$store.getters["auth/check"])
        this.$router.push({ name: "profile" });
      else this.$router.push({ name: "login" });
    }
  },
  middleware: async ({ route, query, redirect, app, store }) => {
    if (process.server) {
      console.log("activateSend midd server");

      try {
        const response = await axios.post("api/activate_set", {
          activate_token: route.params.token
        });
        console.log("activateSend midd token ok");

        store.dispatch("auth/login", response.data);
        server_ok = true;
      } catch (error) {
        server_ok = false;
        console.log("activateSend midd token error");
      }
    }
  },
  asyncData() {
    return { server_ok };
  }
};
</script>