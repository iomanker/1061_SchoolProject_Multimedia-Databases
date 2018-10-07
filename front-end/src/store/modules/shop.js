import Vue from 'vue';
import mainVue from '../../main'

const types = {
	ADD_CART: 'store/ADD_CART',
	CANCEL_CART: 'store/CANCEL_CART',
	SUBMITORDER_SUCCESS: 'store/SUBMITORDER_SUCCESS',

	ADD_NUM_ITEM: 'store/ADD_NUM_ITEM',
	MINUS_NUM_ITEM: 'store/MINUS_NUM_ITEM',

	itemAJAX_SUCCESS: 'store/itemAJAX_SUCCESS',
	itemDetailAJAX_SUCCESS: 'store/itemDetailAJAX_SUCCESS',
	itemInCartAJAX_SUCCESS: 'store/itemInCartAJAX_SUCCESS',

	REQ_FAIL: 'store/REQ_FAIL'
};

const state = {
	products: [
		/*{
			itemId: 0,
			title: '多媒體資料庫',
			subtitle: '全新原文書!!',
			price: 689,
			author:
			publisher:
		}*/
	],
	shoppingCart: [],
	itemDetail:{
		itemTitle: "",
		itemSubtitle: "",
		author: "",
		publisherName: "",
		context: "",
		price: "",
		amount: "",
		idpublisher: -1
	}
};

const getters = {
	getProducts: (state) => state.products,
	getShoppingCartTotal: (state) => state.shoppingCart.reduce((a,b)=> a + b.quantity, 0),
	getShoppingCartList: (state) => state.shoppingCart,
	getShoppingCartTotalPrice:(state) => state.shoppingCart.reduce((a,b)=> a + (b.price*b.quantity), 0),
	getItemDetail: (state) => state.itemDetail
};

const actions = {
	addCart({ commit }, id){
		commit(types.ADD_CART, id);
	},
	cancelCart({ commit },index){
		commit(types.CANCEL_CART, index);
	},

	addNumItem({ commit }, index){
		commit(types.ADD_NUM_ITEM, index);
	},
	minusNumItem({ commit },index){
		commit(types.MINUS_NUM_ITEM, index);
	},

	itemAJAX({ commit },data){
		if(data === ""){
			Vue.http.get('http://localhost:3000/api/item').then(
				(res) =>{
					commit(types.itemAJAX_SUCCESS, res.body);
				},(res) =>{
					console.log(res);
				}
			);
		}else{
			Vue.http.get('http://localhost:3000/api/item/' + data).then(
				(res) =>{
					commit(types.itemAJAX_SUCCESS, res.body);
				},(err)=>{
					console.log(err);
				}
			);
		}
	},

	itemDetailAJAX({ commit }, id){
		Vue.http.get('http://localhost:3000/api/item/' + id ).then(
			(res) =>{
				commit(types.itemDetailAJAX_SUCCESS, res.body);
			},(err) =>{
				commit(types.REQ_FAIL, err.msg);
			}
		);
	},

	itemInCartAJAX({ commit, state }){
		if(state.shoppingCart.length > 0){
			let cartList = [];
			state.shoppingCart.forEach((el)=>{
				cartList.push(el.iditem)
			});
			Vue.http.post('http://localhost:3000/api/cart',{
				inCart: true,
				cartList: cartList
			}).then((res)=>{
				commit(types.itemInCartAJAX_SUCCESS, res.body);
			}).catch((err)=>{
				commit(types.REQ_FAIL, err.msg);
			});
		}
	},

	submitOrder({ commit, rootState, state }){
		const userId = rootState.member.loginStatus.userId;
		if (userId === null){
			mainVue.$notify({
				  group: 'foo',
				  title: '注意',
				  text: "請先登入再來結帳",
				  type: 'warn'
			});
		}else{
			const submitData = {
				user_iduser: userId,
				detail: []
			}
			state.shoppingCart.forEach((el)=>{
				submitData.detail.push({
					item_iditem: el.iditem,
					buyPrice: el.price,
					buyNum: el.quantity
				});
			});
			Vue.http.post('http://localhost:3000/api/order',submitData)
			.then((res)=>{
				commit(types.SUBMITORDER_SUCCESS);
			}).catch((err)=>{
				commit(types.REQ_FAIL, err.body.msg);
			});
			// SUBMITORDER_SUCCESS, SUBMITORDER_FAIL
		}
	}
};

const mutations = {
	[types.ADD_CART](state, id){
		//const product = state.products.find((item) => item.itemId === id);
		const existInCart = state.shoppingCart.findIndex((item) => item.iditem === id)
		if(existInCart >= 0){
			++state.shoppingCart[existInCart].quantity;
		}
		else{
			state.shoppingCart.push({
				iditem: id,
				quantity: 1
			});
		}
	},
	[types.CANCEL_CART](state, index){
		state.shoppingCart.splice(index, 1);
	},

	[types.ADD_NUM_ITEM](state,index){
		++state.shoppingCart[index].quantity;
	},
	[types.MINUS_NUM_ITEM](state,index){
		if(state.shoppingCart[index].quantity - 1 > 0)
			--state.shoppingCart[index].quantity;
	},

	[types.itemAJAX_SUCCESS](state, data){
		state.products = [];
		data.forEach((element)=>{
			state.products.push({
				iditem: element.iditem,
				itemTitle: element.itemTitle,
				itemSubtitle: element.itemSubtitle,
				price: element.price,
				author: element.author,
				publisherName: element.publisherName
			});
		});
	},

	[types.itemDetailAJAX_SUCCESS](state, data){
		state.itemDetail = data;
	},

	[types.itemInCartAJAX_SUCCESS](state, data){
		data.forEach((el)=>{
			const existInCart = state.shoppingCart.findIndex((item) => item.iditem === el.iditem);
			if(existInCart >= 0){
				Vue.set(state.shoppingCart[existInCart], 'itemTitle', el.itemTitle);
				Vue.set(state.shoppingCart[existInCart], 'price', el.price);
				//state.shoppingCart[existInCart].itemTitle = el.itemTitle;
				//state.shoppingCart[existInCart].price = el.price;
			}
		});
	},

	[types.SUBMITORDER_SUCCESS](state){
		state.shoppingCart = [];
		mainVue.$notify({
				  group: 'foo',
				  text: "成功訂單",
				  type: 'success'
		});
	}
};

export default{
	state,
	getters,
	actions,
	mutations
};