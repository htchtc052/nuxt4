<template>
<div class="d-flex p-3 justify-content-between align-items-center">
      
<nuxt-link :to="$i18n.path()" class="mt-1 ml-1">
      <img src="~assets/i/logo.svg">
    </nuxt-link>
<nav class="navbar navbar-light">

		
<div class="container">
	<div class="nav-item">
		<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
			{{ this.localeFull.name }}
	  	</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" v-for="locale in notSelectedlocales" href="#"
			@click.prevent="switchLocale(locale.code)"
			:key="locale.code">{{ locale.name }}</a>
    </div>
	</div> 


		<div v-if="!check" class="nav-item">
			<nuxt-link  class="nav-link" :to="$i18n.path('login')">{{ $t('sign_in') }}</nuxt-link>
		</div>
		
		<div v-if="!check" class="nav-item">
    	<nuxt-link  class="nav-link" :to="$i18n.path('register')">{{ $t('register_title') }}</nuxt-link>
			
		</div>

		<div v-if="check" class="nav-item">
			<nuxt-link class="nav-link" :to="$i18n.path('profile')">{{ $t('profile_as', {name: user.name}) }}</nuxt-link>		
		</div>
		
		<div v-if="check" class="nav-item">
		 	<a class="nav-link" href="#" @click.prevent="logout">{{ $t('logout') }}</a>
		</div>
	</div>	

</nav>
</div>

</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    notSelectedlocales() {
      const locales = this.$store.getters["lang/locales"].filter(
        locale => locale["code"] != this.locale
      );
      return locales;
    },
    selectedLocaleName() {
      return this.localeFull["name"];
    },
    ...mapGetters({
      check: "auth/check",
      user: "auth/user",
      locale: "lang/locale",
      localeFull: "lang/localeFull"
    })
  },
  methods: {
    switchLocale(new_locale) {
      //console.log("switchLocale old_locale " + this.locale + " new_locale " + new_locale + " fallbackLocale " + this.$i18n.fallbackLocale);

      let new_path = this.$i18n.switchPath(this.$route.fullPath, new_locale);
      console.log("switchLocale new_path", new_path);

      this.$store.commit("lang/SET_LANG", new_locale);

      this.$i18n.locale = new_locale;

      this.$router.push({
        path: new_path
      });
    },
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");
      } catch (e) {}

      this.$router.push(this.localePath("login"));
    }
  }
};
</script>