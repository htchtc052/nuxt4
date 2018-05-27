<template>
  <div class="container">
  <div class="row">
    <div class="col-md-6">
  <locale-dropdown></locale-dropdown>
  </div>
	
    <div class="col-md-4">
     <nuxt-link :to="{name: 'login'}" v-if="!check" class="bll"> {{ $t('sign_in') }} </nuxt-link>
     <nuxt-link :to="{name: 'profile'}" class="bll" v-if="check"> {{ $t('profile_as', {name: user.name}) }}</nuxt-link>
		 </div>
		 <div class="col-md-2">
		 	<a class="bll" href="#" @click.prevent="logout" v-if="check">{{ $t('logout') }}</a>
		</div>
  </div>     

  </div> 
</template>
<script>
import {mapGetters} from 'vuex';

import LocaleDropdown from '~/components/LocaleDropdown.vue'
export default {
		components: {
		  LocaleDropdown,
		},
		data() {
			return {
			}
		},

		computed: mapGetters({
      check: 'auth/check',
      user: 'auth/user'
    }),
		methods: {
			async logout() {
				try {
					await this.$store.dispatch('auth/logout')
				} catch (e) {}
				
				this.$router.push({name: 'login'});
				
			}
		}
	}
</script>
<style>
.bll { font-weight: bold; font-size: 15px; color:white}
.rm-head__button {border: 1px solid #B7D5FC; background: #2b71b5;background: linear-gradient(to bottom, #2b71b5 1%,#2b71b5 50%,#1663ae 51%,#1663ae 100%);}
</style>
