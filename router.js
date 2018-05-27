import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

import IndexPage from '~/pages/index.vue'
import PageDetail from '~/pages/pages/_id.vue'
import Login from '~/pages/login.vue'
import Register from '~/pages/register.vue'
import Slova from '~/pages/slova.vue'
import ProfileWrapper from '~/pages/profile/profileWrapper.vue'
import Profile from '~/pages/profile/profile.vue'
import EditProfile from '~/pages/profile/editProfile.vue'
import EditPassword from '~/pages/profile/editPassword.vue'
import ActivateSend from '~/pages/activateSend.vue'
import PasswordSend from '~/pages/passwordSend.vue'
import PasswordSet from '~/pages/passwordSet.vue'
import ActivateSet from '~/pages/activateSet.vue'


const routes = [
  { path: '/', name: 'welcome', component: IndexPage },
  { path: '/pages/:id', name: 'pages-id', component: PageDetail }, 
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/slova', name: 'slova', component: Slova },
  { path: '/activate_send', name: 'activate_send', component: ActivateSend },
  { path: '/password_send', name: 'password_send', component: PasswordSend },
  { path: '/password_set/:token', name: 'password_set', component: PasswordSet },
  { path: '/activate_set/:token', name: 'activate_set', component: ActivateSet },

 
  {
		path: '/profile',
		component: ProfileWrapper,
		children: [
			{
				path: '',
				name: 'profile',
				component: Profile,
			},
				{
				path: 'edit-profile',
				name: 'profile.editProfile',
				component: EditProfile,
			},
			{
				path: 'edit-password',
				name: 'profile.editPassword',
				component: EditPassword,
			},/*
	 	{
				path: 'edit-email',
				name: 'profile.editEmail',
				component: EditEmail,
				meta: {requiresAuth: true}
			}, */
			{
				path: '*',
				redirect: {
					name: 'profile'
				}
			}
		]
	},
  
]

export function createRouter () {
  const router =  new Router({
    routes,
    mode: 'history'
  })
/* 	router.beforeEach(async (to, from, next) => {
		 if (process.server) {
			console.log("return from before_each", to.name)
			return next({name: 'login'})
		} 
		if (to.name == "activate_set") {
			if (to.query.msg == "invalid_link") {
				//app.$noty.error(app.$t('error_activate_set'));
				return next({name: 'login'});
			} else if (to.query.msg == "server_error") {
				//app.$noty.error(app.$t('error_server'));
				return next({name: 'login'});
			} else if (to.query.msg == "success") {
				//app.$noty.success(app.$t('success_activate_set'))
				store.dispatch('auth/saveToken', to.query.token);
				return next({name: 'profile'});
			}
		}

		return next({name: 'login'});
	});
 */
  return router
}
