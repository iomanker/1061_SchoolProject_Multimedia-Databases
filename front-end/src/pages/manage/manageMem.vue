<template>
	<div class="container">
		<div class="col-md-6 col-md-offset-3">
			<div class="form-group">
				<label for="memberId">帳號</label><br/>
				<label id="memberId">{{ memberData.username }}</label>
			</div>
			<div class="form-group">
				<label for="memberPwd">密碼</label>
				<input v-model="memberData.password" type="text" id="memberPwd" class="form-control" placeholder="密碼">
			</div>
			<div class="form-group">
				<label for="memberName">姓名</label>
				<input v-model="memberData.name" type="text" id="memberName" class="form-control" placeholder="姓名">
			</div>
			<div class="form-group">
				<label for="memberSid">學號</label>
				<input v-model="memberData.stuId" type="text" id="memberSid" class="form-control" placeholder="學號">
			</div>
			<div class="form-group">
				<label for="memberPhone">聯絡電話</label>
				<input v-model="memberData.phoneNum" type="text" id="memberPhone" class="form-control" placeholder="聯絡電話">
			</div>
			<div class="form-group">
				<label for="memberAdmin">管理員權限</label>
				<input v-model="memberData.admin" type="text" id="memberAdmin" class="form-control" placeholder="權限數">
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary btn-lg btn-block" @click="actionsModifyMember">修改</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data(){
			return{
				memberData:{
					username: "",
					password: "",
					name: "",
					stuId: "",
					phoneNum: "",
					admin: 0
				}
			}
		},
		created(){
			this.$http.get('http://localhost:3000/api/manage/member/'+ this.$route.params.id).then((res)=>{
				/*for(var k in res.body.detail){
					console.log(k,res.body.detail[k]);
				}*/
				this.memberData = res.body.detail;
			}).catch((err)=>{
				console.log(err);
			});
		},
		methods: {
			actionsModifyMember(){
				this.$http.patch('http://localhost:3000/api/manage/member/'
					+ this.$route.params.id, this.memberData).then(
					(res)=>{
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