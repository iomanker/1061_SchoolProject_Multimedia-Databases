// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Notifications)

import shop from './pages/shop.vue'
import cart from './pages/cart.vue'
import order from './pages/order.vue'
import item from './pages/item.vue'
import login from './pages/member/login.vue'
import signup from './pages/member/signup.vue'
import manage from './pages/manage/manage.vue'
import profile from './pages/member/profile.vue'
import manageMem from './pages/manage/manageMem.vue'
import manageItem from './pages/manage/item.vue'
import managePub from './pages/manage/publisher.vue'

const router = new VueRouter({
	mode: 'history',
	base: __dirname,

	routes:[
		{
			path: '/shop',
			name: 'SHOP',
			component: shop
		},
		{
			path: '/item/:id',
			name: 'ITEM',
			component: item
		},
		{
			path: '/cart',
			name: 'CART',
			component: cart
		},
		{
			path: '/login',
			name: 'LOGIN',
			component: login
		},
		{
			path: '/signup',
			name: 'SIGNUP',
			component: signup
		},
		{
			path: '/manage',
			name: 'MANAGE',
			component: manage,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{
			path: '/profile',
			name: 'PROFILE',
			component: profile,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/profile/:userId/order/:orderId',
			name: 'MEMORDER',
			component: order,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/manage/member/:userId/order/:orderId',
			name: 'ORDER',
			component: order,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{
			path: '/manage/item/add',
			name: 'MEMADDITEM',
			component: manageItem,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{
			path: '/manage/item/:id',
			name: 'MEMITEM',
			component: manageItem,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{
			path: '/manage/publisher/add',
			name: 'MEMADDPUB',
			component: managePub,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{
			path: '/manage/publisher/:id',
			name: 'MEMPUB',
			component: managePub,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{
			path: '/manage/member/:id',
			name: 'MEMDETAIL',
			component: manageMem,
			meta: {
				requireAuth: true,
				requireAdmin: true
			}
		},
		{ path: '/*', redirect: '/shop' }
	]
});

router.beforeEach((to,from,next)=>{
	if(to.matched.some((r)=>r.meta.requireAuth)){
		if(store.state.member.loginStatus.userId === null){
			next({
				name: "LOGIN"
			});
		}else{
			if(to.matched.some((r)=>r.meta.requireAdmin)){
				if(store.state.member.loginStatus.admin === 1){
					next();
				}else{
					next({
						name: "PROFILE"
					});
				}
			}else{
				next();
			}
		}
	}else{
		next();
	}
});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});