<template>
	<div class="container">
		<div class="row">
			<div class="col-md-4">
				<div class="panel panel-primary">
					<div class="panel-heading">
						個人資料
					</div>
					<div class="panel-body">
						<table class="table">
							<tbody>
								<tr>
									<td>姓名</td>
									<td>{{ meminfo.detail.name }}</td>
								</tr>
								<tr>
									<td>學號</td>
									<td>{{ meminfo.detail.stuId }}</td>
								</tr>
								<tr>
									<td>電話</td>
									<td>{{ meminfo.detail.phoneNum }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="panel panel-primary">
					<div class="panel-heading">
						訂單狀況
					</div>
					<div class="panel-body">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>訂單編號</th>
									<th>訂購日期</th>
									<th>結帳金額</th>
									<th>狀態</th>
									<th>查看</th>
								</tr>
							</thead>
							<tbody>
								<template v-if="memOrderList.length === 0">
									<tr>
										<td colspan="5">
											從未購買
										</td>
									</tr>
								</template>
								<template v-else>
								<tr v-for="orderList in memOrderList">
									<td>{{orderList.idorder}}</td>
									<td>{{orderList.buyDate}}</td>
									<td>{{orderList.price}}</td>
									<td>{{orderList.orderStatus}}</td>
									<td><router-link :to="{
										name: 'MEMORDER',
										params: {
											userId: meminfo.userId,
											orderId: orderList.idorder
										}
									}">查看</router-link></td>
								</tr>
								</template>
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
		computed: {
			...mapGetters({
				memOrderList: 'getMemOrderList',
				meminfo: 'getLoginStatus'
			})
		},
		created(){
			this.$store.dispatch('MemberDetail');
			this.$store.dispatch('MemberOrderList');
		}
	}
</script>