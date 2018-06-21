<template>	
<div class="container">
<h2 class="card-title">
			{{ $t('profile_title', { name: user.name }) }}
</h2>	 
<nav class="navbar navbar-dark">
 
	<div class="nav-item  ">
	<nuxt-link class="nav-link" :to="$i18n.path('profile')"  exact>
		{{ $t('profile') }}
	</nuxt-link>
  </div>
	<nuxt-link class="nav-link" :to="$i18n.path('profile/info')" exact>
		{{ $t('profile_edit_info') }}
	</nuxt-link>
	<nuxt-link class="nav-link" :to="$i18n.path('profile/password')"  exact>
		{{ $t('profile_edit_password') }}
	</nuxt-link>
  
</nav>
</div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: function() {
        return {};
      }
    },
  }
};
</script>

<style scoped>
.profile_active {
  color: blue;
  font-weight: bolder;
}
</style>