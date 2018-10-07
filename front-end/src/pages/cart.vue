<template>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">
				總計： <span>$ {{ total }}</span>
			</div>
			<div class="panel-body">
				<table class="table table-hover" v-if="cartTotal > 0">
					<thead>
						<tr>
							<th>No.</th>
							<th>書名</th>
							<th>價格</th>
							<th>數量</th>
							<th>刪除</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(cartList, index) in cartList">
							<td>{{ index+1 }}</td>
							<td>{{ cartList.itemTitle }}</td>
							<td>{{ cartList.price }}</td>
							<td>
							<button class="btn btn-default btn-xs glyphicon glyphicon-plus" @click="addNumItem(index)"></button>
							{{ cartList.quantity }}
							<button class="btn btn-default btn-xs glyphicon glyphicon-minus" @click="minusNumItem(index)" :disabled="cartList.quantity === 1"></button>
							</td>
							<td>
								<button class="btn btn-default btn-xs glyphicon glyphicon-remove" @click="cancelCart(index)"></button>
							</td>
						</tr>
					</tbody>
				</table>
				<span v-else>趕快去購物吧！</span>
			</div>
		</div>
		<button type="button" 
		class="btn btn-primary btn-lg btn-block" 
		data-toggle="collapse"
		data-target="#writeInfo"
		aria-expanded="false"
		aria-controls="writeInfo"
		@click="submitOrder"
		:disabled="cartTotal == 0">前往結帳</button>

	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data(){
			return{
				sidInput: "",
				phoneInput: ""
			};
		},
		created(){
			this.$store.dispatch('itemInCartAJAX');
		},
		computed: {
			...mapGetters({
				cartList: 'getShoppingCartList',
				total: 'getShoppingCartTotalPrice',
    			cartTotal: 'getShoppingCartTotal'
			})
		},
		methods: mapActions([
			'cancelCart',
			'addNumItem',
			'minusNumItem',
			'submitOrder'
		])
	}
</script>