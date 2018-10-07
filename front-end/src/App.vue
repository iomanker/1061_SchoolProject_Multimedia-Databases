<template>
  <div id="app">
    <notifications group="foo" position="bottom right" />
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" :to="{path: '/'}">Book-Shopping</router-link>
        </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <template v-if="loginStatus.userId === null">
            <li>
              <router-link :to="{name: 'LOGIN'}">登入
              </router-link>
            </li>
          </template>
          <template v-else>
            <li v-if="loginStatus.admin === 1">
              <router-link :to="{name: 'MANAGE'}">管理頁面
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'PROFILE'}">個人頁面
              </router-link>
            </li>
            <li>
              <a href="#" @click="logout">登出</a>
            </li>
          </template>
          <li>
            <router-link :to="{name: 'CART'}">
              <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
              <span class="badge">{{ cartTotal }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
    <div id="insider">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'app',
  computed: mapGetters({
    loginStatus: 'getLoginStatus',
    cartTotal: 'getShoppingCartTotal'
  }),
  methods:{ ...mapActions([
    'logout'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-bottom: 60px;
  color: #2c3e50;
}
#insider{
  margin-top: 80px;
}
</style>
