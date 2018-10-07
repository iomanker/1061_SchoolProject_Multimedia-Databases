import Vue from 'vue';
import mainVue from '../../main'

const types = {
	REQ_FAIL: 'store/REQ_FAIL',
	REM_SUCCESS: 'store/REM_SUCCESS',
	MEM_LIST: 'store/MEM_LIST',
	MANAGE_ORDER_LIST: 'store/MANAGE_ORDER_LIST',
	MANAGE_ITEM_LIST: 'store/MANAGE_ITEM_LIST',
	MANAGE_PUB_LIST: 'store/MANAGE_PUB_LIST',
};

const state = {
	memList: [],
	orderList: [],
	itemList: [],
	pubList: []
};

const getters = {
	getMemList: (state) => state.memList,
	getOrderList: (state) => state.orderList,
	getItemList: (state) => state.itemList,
	getPubList: (state) => state.pubList
};

const actions = {
	memberList({ commit }){
		Vue.http.get('http://localhost:3000/api/profile').then(
			(res)=>{
				commit(types.MEM_LIST, res.body.itemlist);
			},(err)=>{
				// 404 406
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	},
	manageOrderList({ commit }){
		Vue.http.get('http://localhost:3000/api/manage/order').then(
			(res)=>{
				commit(types.MANAGE_ORDER_LIST, res.body.orderList);
			},(err)=>{
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	},
	itemList({ commit }){
		Vue.http.get('http://localhost:3000/api/manage/item').then(
			(res)=>{
				commit(types.MANAGE_ITEM_LIST, res.body);
			},(err)=>{
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	},
	pubList({ commit }){
		Vue.http.get('http://localhost:3000/api/manage/publisher').then(
			(res)=>{
				commit(types.MANAGE_PUB_LIST, res.body);
			},(err)=>{
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	},
	removePublisher({ commit },data){
		Vue.http.delete('http://localhost:3000/api/manage/publisher',{
			body:{
				idpublisher: data.id
			}
		}).then((res)=>{
			commit(types.REM_SUCCESS, res.body.msg);
		}).catch((err)=>{
			commit(types.REQ_FAIL, err.body.msg);
		});
	},
	removeItem({ commit },data){
		Vue.http.delete('http://localhost:3000/api/manage/item',{
			body:{
				iditem: data.id
			}
		}).then((res)=>{
			commit(types.REM_SUCCESS, res.body.msg);
		}).catch((err)=>{
			commit(types.REQ_FAIL, err.body.msg);
		});
	},
	removeUser({ commit },data){
		Vue.http.delete('http://localhost:3000/api/manage/member',{
			body:{
				iduser: data.id
			}
		}).then((res)=>{
			commit(types.REM_SUCCESS, res.body.msg);
		}).catch((err)=>{
			commit(types.REQ_FAIL, err.body.msg);
		});
	},
	removeOrder({ commit },data){
		Vue.http.delete('http://localhost:3000/api/manage/order',{
			body:{
				idorder: data.id
			}
		}).then((res)=>{
			commit(types.REM_SUCCESS, res.body.msg);
		}).catch((err)=>{
			commit(types.REQ_FAIL, err.body.msg);
		});
	}
};

const mutations = {
	[types.MEM_LIST](state,data){
		state.memList = data;
	},
	[types.MANAGE_ORDER_LIST](state,data){
		state.orderList = data;
	},
	[types.MANAGE_ITEM_LIST](state,data){
		state.itemList = data;
	},
	[types.MANAGE_PUB_LIST](state,data){
		state.pubList = data;
	},
	[types.REM_SUCCESS](state, msg){
		mainVue.$notify({
		  group: 'foo',
		  title: '注意',
		  text: msg,
		  type: 'success'
		});
		setTimeout(()=>{
			mainVue.$router.go(0);
		},2000);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};