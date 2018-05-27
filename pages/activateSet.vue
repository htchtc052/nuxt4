<template>
	<div id="mega-content">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('activate_set_title') }}
			</h2>
			    <div class="card-body" v-if="loading">
						{{ $t('activate_set_text') }}
					</div>  
          <!-- 
                     <div class="card-body" v-if="!loading">
						{{ $t('activate_set_error') }}
					</div> -->
				</div>
			</div>

</template>
<script>
import axios from "axios";

let server_token_data = null;

export default {
  layout: "rm",
  middleware: "not_verified",
  computed: {},
  data() {
    return {
      loading: false,
      form: {
        token: null
      },
      error: {
        password: null
      }
    };
  },
  async mounted() {
    console.log(
      "activateSend mounted server_token_data",
      this.server_token_data
    );
    this.loading = true
    if (this.server_token_data) {
      this.handleSuccess()
    } else {
      this.handleFail()
    }

    //this.submit();
  },
  methods: {
    async handleSuccess() {
      console.log("activateSend handleSuccess");
      if (
        this.$store.getters["auth/check"] &&
        this.$store.getters["auth/user"].id != this.server_token_data.user.id
      ) {
        console.log("activateSend mounted need logout");
        await this.$store.dispatch("auth/logout");
      }

      this.$store.dispatch("auth/saveToken", this.server_token_data.token);

      await this.$store.dispatch("auth/fetchUser");

      this.loading = false

       new this.$noty({
        type: "success",
        text: this.$t("activate_set_done")
      }).show();

      this.$router.push({ name: "profile" });
    },
    async handleFail() {
      console.log("activateSet handleFails")
   
      new this.$noty({
        type: "error",
        text: this.$t("activate_set_error")
      }).show();

      this.loading = false

      this.$router.push({ name: "activate_send" });

    }
    /* async submit() {
      this.loading = true;
      try {
        //нужно что бы не путать токены и что бы авторизовалось под тем что пришли по ссылке
        await this.$store.dispatch("auth/logout")

        const res = await axios.post("api/activate_set", {token: this.$route.params.token});

        //console.log(111, res.data.token)

        this.$store.dispatch("auth/saveToken", res.data.token);
        
        await this.$store.dispatch("auth/fetchUser");
        console.log("after save token and fetch user");
        this.loading = false;
        new this.$noty({
          type: "success",
          text: this.$t("activate_set_done")
        }).show();
        this.$router.push({ name: "profile" });
      } catch (errors) {
        this.loading = false;
      }
    } */
  },
  middleware: async ({ route, query, redirect, app, store }) => {
    if (process.server) {
      console.log("activateSend midd process server", process.server);

      try {
        const response = await axios.post("api/activate_set", {
          activate_token: route.params.token
        });
        console.log("activateSend midd token ok", response.data);
        server_token_data = {
          token: response.data.new_token,
          user: response.data.user
        };
      } catch (error) {
        console.log("activateSend midd token error", error.response.data);
        //checked_token_data = null
        //return redirect('/login?error_msg=error_password_reset')
      }
    }
  },
  asyncData() {
    return { server_token_data };
  }
};
</script>