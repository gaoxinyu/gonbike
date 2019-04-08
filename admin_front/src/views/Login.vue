<template>
<div class="login-view">
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>oBike</b></a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Login with username and password</p>
      <div class="form-group has-feedback">
        <input id="userName" @keyup.enter="focusPassword" v-model="user.name" type="text" class="form-control" placeholder="Username">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input id="password" @keyup.enter="login" v-model="user.password"  type="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button @click="login()" class="btn btn-primary btn-block btn-flat">Login</button>
        </div>
      </div>
    </div>
    <!-- /.login-box-body -->
  </div>
<!-- /.login-box -->
</div>
</template>

<script>
import api from "../api"

export default {
  mounted() {
    document.querySelector("#userName").autofocus = true;
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
        subject: 2,   // 2： web端
      }
    }
  },
  methods: {
    login() {
      api.login(this, this.user);
    },
    focusPassword() {
      document.querySelector("#password").select();
    }
  }
}
</script>

<style lang="scss">
.login-view {
  height: 100%;
}

</style>
