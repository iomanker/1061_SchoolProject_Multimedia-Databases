<template>
	<div class="container">
		<h2>{{ itemData.itemTitle }}</h2>
		<h3>{{ itemData.itemSubtitle }}</h3>
		<h3>作者: {{ itemData.author }}</h3>
		<h3>出版社: {{ itemData.publisherName }}</h3>
		<h4>價格: ${{ itemData.price }}</h4>
		<h5>{{ itemData.context }}</h5>
		<button type="button" class="btn btn-primary" @click="actionAddCart">加入購物車</button>
		<template v-if="itemData.amount > 0">
			<p>有庫存可銷售</p>
		</template>
		<template v-else>
			<p>訂購立即進貨</p>
		</template>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default {
		created(){
			this.$store.dispatch('itemDetailAJAX',
				this.$route.params.id);
		},
		computed: mapGetters({
			itemData: 'getItemDetail'
		}),
		methods: {
			actionAddCart(){
				this.$store.dispatch('addCart',
					this.$route.params.id);
			}
		}
	};
</script>