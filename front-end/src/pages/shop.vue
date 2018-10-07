<template>
	<div class="container">
		<div class="form-inline">
			<div class="form-group">
				<input type="text" name="searchInput" placeholder="搜尋商品" 
					class="form-control" v-model="searchData">
				<button type="button" class="btn btn-primary" 
					@click="sendSearch(searchData)">搜尋</button>
			</div>
		</div>
		<div class="row">
			<div v-if="itemList.length !== 0">
				<div v-for="(item, index) in itemList" class="col-md-4">
				<!--
					<img :src="item.image" style="width: 100%;">
				-->
				<h3><router-link :to="{name: 'ITEM',
					params:{ id: item.iditem }
				}">
				{{ item.itemTitle }}
				</router-link></h3>
				<h4>{{ item.itemSubtitle }}</h4>
				<h5>{{ item.author }}</h5>
				<h5>$ {{ item.price }}</h5>
				<button type="button" class="btn btn-primary" @click="addCart(item.iditem)">加入購物車</button>
				</div>
			</div>
			<div v-else>
				<p class="bg-warning" style="padding-top:20px; padding-bottom:20px; margin-top:80px">查無商品</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data(){
			return{
				searchData: "",
				resultData: ""
			}
		},
		created(){
			this.$store.dispatch('itemAJAX',"");
		},
		computed: mapGetters({
				itemList: 'getProducts'
		}),
		methods: {
			...mapActions(['addCart']),
			sendSearch(data){
				this.$store.dispatch('itemAJAX',data);
			}
		}
	}
</script>