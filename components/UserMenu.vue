<template>
  <div class="container">
  <div class="row">
    <div class="col-md-9">
  <locale-dropdown></locale-dropdown>
  </div>
    <div class="col-md-3">
     <a href="/login" v-if="!check" class="mt-2 rm-head__button btn btn-primary border border-white py-1 px-2 font-weight-light">
       <span class="icon-lock icons"></span> Войти
     </a>
     <a href="/profile" v-if="check" class="mt-2 rm-head__button btn btn-primary border border-white py-1 px-2 font-weight-light">
       <span class="icon-lock icons"></span> Профиль {{user.name}}
     </a>
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
			//'verified',
    }),
		methods: {
			logout() {
				this.$store.dispatch('logout')
					.then(() => {
						//this.$noty.success('You are logged out');
						this.$router.push({name: 'login'});
					});
			}
		}
	}
</script>
<style>
.rm-head__button {border: 1px solid #B7D5FC; background: #2b71b5;background: linear-gradient(to bottom, #2b71b5 1%,#2b71b5 50%,#1663ae 51%,#1663ae 100%);}
</style>
