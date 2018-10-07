<template>
	<div class="container">
		<div class="col-md-6 col-md-offset-3">
			<div class="form-group">
				<label for="signupId">帳號</label>
				<input v-model="applyData.username" type="text" id="signupId" class="form-control" placeholder="帳號">
			</div>
			<div class="form-group">
				<label for="signupPwd">密碼</label>
				<input v-model="applyData.password" type="password" id="signupPwd" class="form-control" placeholder="密碼">
			</div>
			<div class="form-group">
				<label for="signupName">姓名</label>
				<input v-model="applyData.name" type="text" id="signupName" class="form-control" placeholder="姓名">
			</div>
			<div class="form-group">
				<label for="signupSid">學號</label>
				<input v-model="applyData.stuId" type="text" id="signupSid" class="form-control" placeholder="學號">
			</div>
			<div class="form-group">
				<label for="signupPhone">聯絡電話</label>
				<input v-model="applyData.phoneNum" type="text" id="signupPhone" class="form-control" placeholder="聯絡電話">
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary btn-lg btn-block" @click="actionsSubmitApply">註冊</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data(){
			return{
				applyData:{
					username: "",
					password: "",
					name: "",
					stuId: "",
					phoneNum: ""
				}
			}
		},
		methods: {
			actionsSubmitApply(){
				this.$store.dispatch('submitApply',this.applyData);
			}
		}
	};
</script>