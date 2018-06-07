<template>
<div id="mega-content" >
    	<div class="card">
			<div class="container">
			
				<div class="row">
					
			<div class="col-12 col-md-3">
				<nav class="nav flex-column nav-pills mb-4">
					<router-link :to="{name: 'profile'}" class="nav-link" activeClass="active" exact>
						{{ $t('profile_main') }}
					</router-link>
					<router-link :to="{name: 'profile.editProfile'}" class="nav-link" activeClass="active" exact>
						{{ $t('profile_edit_info') }}
					</router-link>
					<router-link :to="{name: 'profile.editPassword'}" class="nav-link" activeClass="active" exact>
						{{ $t('profile_edit_password') }}
					</router-link>
					<!-- <router-link :to="{name: 'profile.editEmail'}" class="nav-link" activeClass="active" exact>
						{{ $t('profile_edit_email') }}
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

	if (this.$route.query.msg) {
      new this.$noty({
        type: "success",
        text: this.$t(this.$route.query.msg)
      }).show();
      this.$router.push({ name: "profile" });
    }
  }
};
</script>
