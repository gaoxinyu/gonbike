<template>
<div class="login-view">
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>oBike</b></a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">首次登陆请修改密码</p>
      <div class="form-group has-feedback">
        <input id="password" @keyup.enter="focusConfirm" @click.self="rstPassword" v-model="query.password" type="password" class="form-control" placeholder="新密码">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        <p class="error" v-show="showrstTip">{{ $t('account.dialog.rstpassTip') }}</p>
      </div>
      <div class="form-group has-feedback">
        <input id="confirm" @keyup.enter="submit" @click.self="focusConfirm" v-model="query.confirm"  type="password" class="form-control" placeholder="确认密码">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <el-button @click="submit" :disabled="submitDisabled" type="primary" style="width: 100%;">确认</el-button>
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
    document.querySelector("#password").autofocus = true;
  },
  data() {
    return {
      query: {
        password: "",
        confirm: ""
      },
      showrstTip: false,
      // 校验规则8-15个字符，必须包含数字，字母大小写，允许包含特殊字符[- _ #]
      passReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([-_#]{0,})[A-Za-z\d-_#]{8,15}$/
    }
  },
  computed: {
    submitDisabled() {
      return !((this.query.password === this.query.confirm) && this.passReg.test(this.query.password))
    }
  },
  methods: {
    submit() {
      if((this.query.password === this.query.confirm) && this.passReg.test(this.query.password)) {
        api.modifyPassword(this, this.query);
      } 
      else if(this.query.password !== this.query.confirm) {
        this.$message({ message: "两次输入的密码不一致", type: 'error' });
      }
      else if(!this.passReg.test(this.query.password)) {
        this.$message({ message: "密码必须包含数字，字母大小写，允许包含特殊字符[- _ #]", type: 'error' });
      }
    },
    focusConfirm() {
      if(!this.passReg.test(this.query.password)) {
        this.showrstTip = true;
      }
      document.querySelector("#confirm").select();
    },
    rstPassword() {
      // 将之前密码清空，重新输入
      this.query.password = '';
      this.showrstTip = false;
    }
  }
}
</script>

<style lang="scss">
.login-view {
  height: 100%;
}

</style>