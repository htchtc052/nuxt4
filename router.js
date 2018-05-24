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
//import EditProfile from '~/pages/profile/editProfile.vue'
//import EditPassword from '~/pages/profile/editPassword.vue'


const routes = [
  { path: '/', name: 'welcome', component: IndexPage },
  { path: '/pages/:id', name: 'pages-id', component: PageDetail }, 
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/slova', name: 'slova', component: Slova },
  {
		path: '/profile',
		component: ProfileWrapper,
		children: [
			{
				path: '',
				name: 'profile',
				component: Profile,
			},
				/*{
				path: 'edit-profile',
				name: 'profile.editProfile',
				component: EditProfile,
			},
			{
				path: 'edit-password',
				name: 'profile.editPassword',
				component: EditPassword,
			},
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
  return new Router({
    routes,
    mode: 'history'
  })
}
