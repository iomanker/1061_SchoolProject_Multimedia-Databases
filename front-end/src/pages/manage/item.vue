<template>
	<div class="container">
		<div class="form-horizontal">
			<div class="form-group">
				<label for="inputTitle" class="col-sm-3 control-label">商品名稱</label>
				<div class="col-sm-6">
					<input v-model="itemDetail.itemTitle" type="text" id="inputTitle" class="form-control" placeholder="商品名稱">
				</div>
			</div>
			<div class="form-group">
				<label for="inputSubtitle" class="col-sm-3 control-label">副標</label>
				<div class="col-sm-6">
					<input v-model="itemDetail.itemSubtitle" type="text" id="inputSubtitle" class="form-control" placeholder="副標">
				</div>
			</div>
			<div class="form-group">
				<label for="inputAuthor" class="col-sm-3 control-label">作者</label>
				<div class="col-sm-6">
					<input v-model="itemDetail.author" type="text" id="inputAuthor" class="form-control" placeholder="作者">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPublisher" class="col-sm-3 control-label">出版社編號</label>
				<div class="col-sm-6">
					<input v-model="itemDetail.publisher_idpublisher" type="text" id="inputPublisher" class="form-control" placeholder="作者">
				</div>
			</div>
			<div class="form-group">
				<label for="inputContext" class="col-sm-3 control-label">文字內容</label>
				<div class="col-sm-6">
					<textarea v-model="itemDetail.context" rows="6" id="inputContext" class="form-control" placeholder="文字內容"></textarea>
				</div>
			</div>
			<div class="form-group">
				<label for="inputPrice" class="col-sm-3 control-label">價格</label>
				<div class="col-sm-6">
					<input v-model="itemDetail.price" type="text" id="inputPrice" class="form-control" placeholder="價格">
				</div>
			</div>
			<div class="form-group">
				<label for="inputAmount" class="col-sm-3 control-label">庫存數量</label>
				<div class="col-sm-6">
					<input v-model="itemDetail.amount" type="text" id="inputAmount" class="form-control" placeholder="數量">
				</div>
			</div>
			<div class="form-group">
				<template v-if="this.$route.name === 'MEMADDITEM'">
					<div class="col-sm-6 col-sm-offset-3">
						<button type="submit" class="btn btn-primary btn-lg btn-block" @click="addItem">新增</button>
					</div>
				</template>
				<template v-else>
					<div class="col-sm-6 col-sm-offset-3">
						<button type="submit" class="btn btn-primary btn-lg btn-block" @click="modifyItem">修改</button>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				itemDetail:{
					itemTitle: '',
					itemSubtitle: '',
					context: '',
					price: 0,
					author: '',
					publisher_idpublisher: 0,
					amount: 0
				}
			};
		},
		created(){
			if(this.$route.name === 'MEMITEM'){
				this.$http.get('http://localhost:3000/api/item/' + this.$route.params.id).then((res)=>{
					for(let key in this.itemDetail){
						this.itemDetail[key] = res.body[key];
					}
				}).catch((err)=>{
					this.$notify({
						group: 'foo',
						text: err.body.msg,
						type: 'error'
					});
				});
			}
		},
		methods:{
			modifyItem(){
				this.$http.patch('http://localhost:3000/api/manage/item/' + this.$route.params.id,this.itemDetail).then((res)=>{
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
			addItem(){
				const data = this.itemDetail;
				this.$http.post('http://localhost:3000/api/manage/item',data).then((res)=>{
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
			}
		}
	};
</script>