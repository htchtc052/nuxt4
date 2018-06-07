import Vue from 'vue'
import Router from 'vue-router'
import {
  scrollBehavior
} from '~/utils'

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
import Error500 from '~/pages/errors/500.vue'
import Error403 from '~/pages/errors/403.vue'
import Error404 from '~/pages/errors/404.vue'

const routes = [{
    path: '/',
    name: 'welcome',
    component: IndexPage
  },
  {
    path: '/pages/:id',
    name: 'pages-id',
    component: PageDetail
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/slova',
    name: 'slova',
    component: Slova
  },
  {
    path: '/activate_send',
    name: 'activate_send',
    component: ActivateSend
  },
  {
    path: '/password_send',
    name: 'password_send',
    component: PasswordSend
  },
  {
    path: '/password_set/:token',
    name: 'password_set',
    component: PasswordSet
  },
  {
    path: '/activate_set/:token',
    name: 'activate_set',
    component: ActivateSet
  },
  /* {
    name: 'social_login',
    path: '/social_login',
    redirect(to) {
		console.log('social_login' + to);
	    return '/login'
	}
  }, */
  {
    path: '/profile',
    component: ProfileWrapper,
    children: [{
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
      },
      /*
      	 	{
      				path: 'edit-email',
      				name: 'profile.editEmail',
      				component: EditEmail,
      			}, */
     
    ]
  },
 /*  {
    path: '/error500',
    name: 'error500',
    component: Error500
  },
  {
    path: '/error403',
    name: 'error403',
    component: Error403
  },
  
  {
    path: '/error404',
    name: 'error404',
    component: Error404
  },
  {
    path: '*',
    redirect: {
      name: 'error404'
    }
  } */



]

export function createRouter() {

 /*  routes.push({
    name: 'social_login',
    path: '/social_login',
    redirect(ctx) {
		console.log("is_server ###", process.server)
		//if (process.server) {
	 		 console.log('in extendRoutes' + ctx);
		//}
      return '/login'
    }
  }) */

  const router = new Router({
    routes,
    mode: 'history'
  })




  return router
}
