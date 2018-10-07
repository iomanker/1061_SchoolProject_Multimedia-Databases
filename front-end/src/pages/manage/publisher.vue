<template>
	<div class="container">
		<div class="form-horizontal">
			<div class="form-group">
				<label for="inputPublisherName" class="col-sm-3 control-label">名稱</label>
				<div class="col-sm-6">
					<input v-model="pubDetail.publisherName" type="text" id="inputPublisherName" class="form-control" placeholder="名稱">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPublisherPhone" class="col-sm-3 control-label">電話</label>
				<div class="col-sm-6">
					<input v-model="pubDetail.publisherPhone" type="text" id="inputPublisherPhone" class="form-control" placeholder="電話">
				</div>
			</div>
			<div class="form-group">
				<template v-if="this.$route.name === 'MEMADDPUB'">
					<div class="col-sm-6 col-sm-offset-3">
						<button type="submit" class="btn btn-primary btn-lg btn-block" @click="addPub">新增</button>
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
				pubDetail:{
					idpublisher: '',
					publisherName: '',
					publisherPhone: ''
				}
			};
		},
		created(){
			if(this.$route.name === 'MEMPUB'){
				this.$http.get('http://localhost:3000/api/manage/publisher/' + this.$route.params.id).then((res)=>{
					for(let key in this.pubDetail){
						this.pubDetail[key] = res.body.detail[key];
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
				this.$http.patch('http://localhost:3000/api/manage/publisher/' + this.$route.params.id,this.pubDetail).then((res)=>{
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
			addPub(){
				const data = this.pubDetail;
				delete data.idpublisher;
				this.$http.post('http://localhost:3000/api/manage/publisher',data).then((res)=>{
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