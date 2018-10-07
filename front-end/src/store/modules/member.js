import Vue from 'vue';
import mainVue from '../../main'

const types = {
	REQ_FAIL: 'store/REQ_FAIL',
	REQ_SUCCESS: 'store/REQ_SUCCESS',
	APPLY_SUCCESS: 'store/APPLY_SUCCESS',
	LOGIN: '/store/LOGIN',
	LOGOUT: '/store/LOGOUT',
	MEM_DETAIL: '/store/MEM_DETAIL',
	MEMORDER_LIST: '/store/MEMORDER_LIST'
};

const state = {
	loginStatus: {
		userId: null,
		admin: 0,
		detail:{
			name: "",
			stuId: -1,
			phoneNum: ""
		},
		orderList: []
	}
};

const getters = {
	getLoginStatus: (state) => state.loginStatus,
	getMemOrderList: (state) => state.loginStatus.orderList
};

const actions = {
	submitApply({ commit }, data){
		Vue.http.post('http://localhost:3000/api/signup',data).then(
			(res)=>{
				commit(types.APPLY_SUCCESS, res.body.iduser);
			},(err)=>{
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	},
	login({ commit }, data){
		Vue.http.post('http://localhost:3000/api/login',data).then(
			(res)=>{
				commit(types.LOGIN, res.body);
			},(err)=>{
				// 404 406
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	},
	logout({ commit }){
		commit(types.LOGOUT);
	},
	MemberDetail({ commit,state }){
		let getId = state.loginStatus.userId;
		if(getId !== null){
			Vue.http.get('http://localhost:3000/api/profile/' + getId).then(
				(res)=>{
					commit(types.MEM_DETAIL, res.body.detail);
				},(err)=>{
					// 404 406
					commit(types.REQ_FAIL, err.body.msg);
				}
			);
		}
	},
	MemberOrderList({ commit,state }){
		let getId = state.loginStatus.userId;
		if(getId !== null){
			Vue.http.get('http://localhost:3000/api/profile/' + getId + '/order').then(
				(res)=>{
					commit(types.MEMORDER_LIST, res.body.orderlist);
				},(err)=>{
					commit(types.REQ_FAIL, err.body.msg);
				}
			);
		}
	}
};

const mutations = {
	[types.REQ_FAIL](state, msg){
		mainVue.$notify({
		  group: 'foo',
		  title: '注意',
		  text: msg,
		  type: 'error'
		});
	},
	[types.APPLY_SUCCESS](state, data_userId){
		state.loginStatus.userId = data_userId;
		mainVue.$router.push({name: 'PROFILE'});
	},
	[types.LOGOUT](state){
		state.loginStatus.userId = null;
		state.loginStatus.admin = 0;
		state.loginStatus.detail.name = "";
		state.loginStatus.detail.stuId = -1;
		state.loginStatus.detail.phoneNum = "";
		state.loginStatus.orderList = [];
		mainVue.$router.push({path: '/*'});
	},
	[types.LOGIN](state,data){
		state.loginStatus.userId = data.userId;
		state.loginStatus.admin = data.admin;
		mainVue.$router.push({name: 'PROFILE'});
	},
	[types.MEM_DETAIL](state, data){
		state.loginStatus.detail.name = data.name;
		state.loginStatus.detail.stuId = data.stuId;
		state.loginStatus.detail.phoneNum = data.phoneNum;
	},
	[types.MEMORDER_LIST](state,data){
		state.loginStatus.orderList = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};