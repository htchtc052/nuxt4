<template>
<div id="mega-content" >
    	<div class="card">
			<div class="container">
			
				<div class="row">
					
			<div class="col-12 col-md-3">
				<nav class="nav flex-column nav-pills mb-4">
					<router-link :to="{name: 'profile'}" class="nav-link" activeClass="active" exact>
						{{ $t('main') }}
					</router-link>
					<router-link :to="{name: 'profile.editProfile'}" class="nav-link" activeClass="active" exact>
						{{ $t('edit_info') }}
					</router-link>
					<router-link :to="{name: 'profile.editPassword'}" class="nav-link" activeClass="active" exact>
						{{ $t('edit_password') }}
					</router-link>
					<!-- <router-link :to="{name: 'profile.editEmail'}" class="nav-link" activeClass="active" exact>
						{{ $t('edit_email') }}
					</router-link>
					-->
				</nav>
			</div>
			<div class="col-12 col-md-9">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
			</div>
			</div>
			</div>
		</div>

</template>

<script>
export default {
  middleware: ["auth", "verified"],
  layout: "rm",
  mounted() {
    if (this.$route.query.error_msg) {
      new this.$noty({
        type: "error",
        text: this.$t(this.$route.query.error_msg)
      }).show();
      this.$router.push({ name: "profile" });
	}
	
	if (this.$route.query.msg) {
      new this.$noty({
        type: "success",
        text: this.$t(this.$route.query.msg)
      }).show();
      this.$router.push({ name: "profile" });
    }
  },
  i18n: {
    messages: {
      en: {
        title: "Profile",
        main: "Main",
        edit_info: "Edit user info",
        edit_password: "Edit password",
        edit_email: "Edit email"
      },
      ru: {
        title: "Профиль",
        main: "Главная",
        edit_info: "Изменить инфо",
        edit_password: "Изменить пароль",
        edit_email: "Изуменить email"
      }
    }
  }
};
</script>
