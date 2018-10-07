<template>
	<div class="container">
		<div class="panel panel-primary">
			<div class="panel-body">
				<table class="table">
					<thead>
						<tr>
							<th colspan="2">資訊</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>學號</td>
							<td>{{ orderDetail.stuId }}</td>
						</tr>
						<tr>
							<td>聯絡電話</td>
							<td>{{ orderDetail.phoneNum }}</td>
						</tr>
						<tr>
							<td>訂單編號</td>
							<td>{{ orderDetail.idorder }}</td>
						</tr>
						<tr>
							<td>訂購日期</td>
							<td>{{ orderDetail.buyDate }}</td>
						</tr>
						<tr>
							<td>狀態</td>
							<td>{{ orderDetail.orderStatus }}</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-hover">
					<thead>
						<tr>
							<th>商品編號</th>
							<th>書名</th>
							<th>單價</th>
							<th>數量</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(itemList, index) in orderDetail.detail">
							<td>{{ itemList.item_iditem }}</td>
							<td>{{ itemList.itemTitle }}</td>
							<td>{{ itemList.buyPrice }}</td>
							<td>{{ itemList.buyNum }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="panel-footer">
				<h4>總計：$ {{ orderDetail.price }}</h4>
			</div>
		</div>
		<div class="row" v-if="getAdmin === 1">
			<div class="col-md-offset-4">
			<div class="col-md-4">
				<input :value="tempStatus" @input="updateStatus" type="text" id="inputStatus" class="form-control" placeholder="目前狀態">
			</div>
			<div class="col-md-1">
				<button type="button" @click="modifyStatus(tempStatus)" class="btn btn-primary">確定修改</button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapState } from 'vuex';

	export default {
		created(){
			this.$store.dispatch('orderDetailAJAX',{
				userId :this.$route.params.userId,
				orderId: this.$route.params.orderId
			});
		},
		computed: {
			...mapGetters({
				orderDetail: 'getOrderDetail'
			}),
			...mapState({
				tempStatus: state => state.order.orderDetail.orderStatus,
				getAdmin: state=> state.member.loginStatus.admin
			})
		},
		methods:{
			modifyStatus(data){
				this.$http.patch('http://localhost:3000/api/manage/order/' + this.$route.params.orderId + '/status',{orderStatus: data}).then((res)=>{
					this.$notify({
					  group: 'foo',
					  text: res.body.msg,
					  type: 'success'
					});
				}).catch((err)=>{
					this.$notify({
					  group: 'foo',
					  text: err.body.msg,
					  type: 'error'
					});
				});
			},
			updateStatus(e){
				this.$store.commit('UPDATE_STATUS', e.target.value);
			}
		}
	}
</script>