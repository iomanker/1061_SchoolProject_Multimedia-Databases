<template>
	<div class="container">
		<div class="row">
			<div class="col-md-4">
				<div class="panel panel-primary">
					<div class="panel-heading">
						出版社管理
					</div>
					<div class="panel-body">
						<table class="table">
							<thead>
								<tr>
									<th>編號</th>
									<th>名稱</th>
									<th>電話號碼</th>
									<th>刪除</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="pub in pubList">
									<td>{{ pub.idpublisher }}</td>
									<td><router-link :to="{
											name: 'MEMPUB', 
											params:{
												id: pub.idpublisher
											}
										}">{{ pub.publisherName }}
									</router-link></td>
									<td>{{ pub.publisherPhone }}</td>
									<td>
										<button class="btn btn-default btn-xs glyphicon glyphicon-remove" @click="actionRemovePublisher(pub.idpublisher)"></button>
									</td>
								</tr>
							</tbody>
						</table>
						<router-link class="btn btn-primary btn-block" :to="{name: 'MEMADDPUB'}">
							新增出版社
						</router-link>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="panel panel-primary">
					<div class="panel-heading">
						書本管理
					</div>
					<div class="panel-body">
						<table class="table">
							<thead>
								<tr>
									<th>編號</th>
									<th>書名</th>
									<th>價錢</th>
									<th>作者</th>
									<th>出版社</th>
									<th>刪除</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in itemList">
									<td>{{ item.iditem }}</td>
									<td><router-link :to="{
											name: 'MEMITEM', 
											params:{
												id: item.iditem
											}
										}">{{ item.itemTitle }}
									</router-link></td>
									<td>{{ item.price }}</td>
									<td>{{ item.author }}</td>
									<td>{{ item.publisherName }}</td>
									<td>
										<button class="btn btn-default btn-xs glyphicon glyphicon-remove" @click="actionRemoveItem(item.iditem)"></button>
									</td>
								</tr>
							</tbody>
						</table>
						<router-link class="btn btn-primary btn-block" :to="{name: 'MEMADDITEM'}">
							新增商品
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<div class="panel panel-primary">
					<div class="panel-heading">
						會員管理
					</div>
					<div class="panel-body">
						<table class="table">
							<thead>
								<tr>
									<th>編號</th>
									<th>姓名</th>
									<th>學號</th>
									<th>刪除</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="mem in memList">
									<td>{{mem.iduser}}</td>
									<td>
										<router-link :to="{
											name: 'MEMDETAIL', 
											params:{
												id: mem.iduser
											}
										}">{{mem.name}}
										</router-link>
									</td>
									<td>{{mem.stuId}}</td>
									<td>
										<button class="btn btn-default btn-xs glyphicon glyphicon-remove" @click="actionRemoveUser(mem.iduser)"></button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="col-md-8">
				<div class="panel panel-primary">
					<div class="panel-heading">
						訂單管理
					</div>
					<div class="panel-body">
						<table class="table">
							<thead>
								<tr>
									<th>訂單編號</th>
									<th>訂購日期</th>
									<th>學號</th>
									<th>狀態</th>
									<th>刪除</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="order in orderList">
									<td><router-link :to="{
										name: 'ORDER',
										params: {
											userId: order.user_iduser,
											orderId: order.idorder
										}
									}">
										{{ order.idorder }}
									</router-link></td>
									<td>{{ order.buyDate }}</td>
									<td>{{ order.stuId }}</td>
									<td>{{ order.orderStatus }}</td>
									<td>
										<button class="btn btn-default btn-xs glyphicon glyphicon-remove" @click="actionRemoveOrder(order.idorder)"></button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		created(){
			this.$store.dispatch('memberList');
			this.$store.dispatch('manageOrderList');
			this.$store.dispatch('itemList');
			this.$store.dispatch('pubList');
		},
		computed: mapGetters({
				memList: 'getMemList',
				orderList: 'getOrderList',
				itemList: 'getItemList',
				pubList: 'getPubList'
		}),
		methods: {
			actionRemovePublisher(id){
				this.$store.dispatch('removePublisher',{id:id});
			},
			actionRemoveItem(id){
				this.$store.dispatch('removeItem',{id:id});
			},
			actionRemoveUser(id){
				this.$store.dispatch('removeUser',{id:id});
			},
			actionRemoveOrder(id){
				this.$store.dispatch('removeOrder',{id:id});
			}
		}
	}
</script>