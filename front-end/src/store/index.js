import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import shop from './modules/shop';
import manage from './modules/manage';
import order from './modules/order';
import member from './modules/member';

Vue.use(Vuex);

export default new Vuex.Store({
	getters,
	modules:{
		shop: shop,
		manage: manage,
		order: order,
		member: member
	},
	strict: true
});