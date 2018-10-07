import Vue from 'vue';

const types = {
	REQ_FAIL: 'store/REQ_FAIL',
	ORDER_DETAIL_SUCCESS: 'store/ORDER_DETAIL_SUCCESS'
};

const state = {
	orderDetail: {
		idorder: -1,
		buyDate: '',
		orderStatus: '',
		stuId: '',
		phoneNum: '',
		price: -1,
		detail: []
	}
};

const getters = {
	getOrderDetail: (state) => state.orderDetail
};

const actions = {
	orderDetailAJAX({ commit }, data){
		Vue.http.get('http://localhost:3000/api/profile/'
			+ data.userId + '/order/' + data.orderId).then(
			(res)=>{
				commit(types.ORDER_DETAIL_SUCCESS, res.body.order);
			},(err)=>{
				// 404 406
				commit(types.REQ_FAIL, err.body.msg);
			}
		);
	}
};

const mutations = {
	[types.ORDER_DETAIL_SUCCESS](state,data){
		state.orderDetail = data;
	},
	UPDATE_STATUS(state,data){
		state.orderDetail.orderStatus = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};