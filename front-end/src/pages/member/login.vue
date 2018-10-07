<template>
	<div class="container">
		<div class="form-horizontal">
			<div class="form-group">
				<label for="inputId" class="col-sm-4 control-label">帳號</label>
				<div class="col-sm-4">
					<input v-model="submitData.username" type="text" id="inputId" class="form-control" placeholder="帳號">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPassword" class="col-sm-4 control-label">密碼</label>
				<div class="col-sm-4">
					<input v-model="submitData.password" type="password" id="inputPassword" class="form-control" placeholder="密碼">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-4">
					<div class="col-sm-3">
						<button @click="login" type="submit" class="btn btn-primary btn-lg btn-block">登入</button>
					</div>
					<div class="col-sm-3">
						<router-link :to="{name: 'SIGNUP'}" type="submit" class="btn btn-danger btn-lg btn-block">註冊</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data(){
			return{
				submitData:{
					username: "",
					password: ""
				}
			}
		},
		methods:{
			login(){
				this.$store.dispatch('login',this.submitData);
			}
		}
	}
</script>