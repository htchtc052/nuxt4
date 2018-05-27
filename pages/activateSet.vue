<template>
	<div id="mega-content">
		<div class="card">
			<h2 class="card-title mx-auto">
				{{ $t('activate_set_title') }}
			</h2>
			        <div class="card-body" v-if="loading">
						{{ $t('activate_set_text') }}
					</div>
                     <div class="card-body" v-if="!loading">
						{{ $t('activate_set_error') }}
					</div>
				</div>
			</div>

</template>
<script>
import axios from "axios";

export default {
  layout: 'rm',
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
  mounted() {
     this.submit();
  },
  methods: {
    async submit() {
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
    }
  }
};
</script>