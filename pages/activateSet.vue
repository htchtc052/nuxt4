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
export default {
  layout: "rm",
  computed: {},
  data() {
    return {
    };
  },
  async mounted() {
    console.log("activateSend mounted");
   
  },
  middleware: async ({ route, query, redirect, app, store }) => {
    if (process.server) {
      console.log("activateSend midd server", route.params.token);

      try {
        const response = await axios.post("api/activate_set", {
          activate_token: route.params.token
        });
        console.log("activateSet midd ok");
        store.dispatch("auth/login", response.data);
        return redirect("/profile?msg=activate_set_done");
      } catch (error) {
        console.log("activateSet midd error");
        if (store.getters["auth/check"])
          if (store.getters["auth/verified"])
            return redirect("/profile?error_msg=activate_set_error");
          else return redirect("/activate_send?error_msg=activate_set_error");
        else return redirect("/login?error_msg=activate_set_error");
      }
    }
  }
};
</script>