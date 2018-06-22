<template>
	<div id="mega-content">
		<div class="card">
			
			    <div class="card-body" v-if="loading">
						{{ $t('social_login_text') }}
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
    console.log("social/:token mounted");

    this.loading = false;

    this.$toast.success(this.$t("success_social_auth"));
    this.$router.push(this.$i18n.path('profile'));
  },
  middleware: async ({ route, redirect, app, store }) => {
    console.log("social/:token midd ");
    if (process.server) {
      console.log("social/:token midd server", route.params.token);

      try {
        const user  = await app.$axios.$get("api/user",{ params: {
           token: route.params.token
        }});

        const data = Object.assign({}, user,  {
            token:  route.params.token,
        })
    
        const locale = app.$cookies.get('locale')
        console.log("sociale get locale from cookie", locale ? locale : null)

        if (locale) {
          store.commit('lang/SET_LANG', locale);
          app.i18n.locale = locale;
        }

        //console.log("social_login midd", data)
        store.dispatch("auth/login", data);
      } catch (error) {
        console.log(
          "social_login/:token server error",
           error && error.response && error.response.data ? error.response.data : error
        );


        //return redirect(app.localePath('login') + "?error_msg=error_social")
         app.context.error({
          statusCode: 403,
          message: app.i18n.t("error_social")
        }); 
      }
    }
  }
};
</script>