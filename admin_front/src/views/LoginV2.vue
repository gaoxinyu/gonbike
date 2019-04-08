<template>
<div class="login-view">
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>oBike</b></a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body" v-if="!nextPhone">
      <p class="login-box-msg">{{ $t('login.form.title') }}</p>
      <div class="form-group has-feedback">
        <input id="userName" @keyup.enter="focusPassword" v-model="user.name" type="text" class="form-control" :placeholder="$t('login.form.namePlaceholder')">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input id="password" @keyup.enter="focusPicCode" v-model="user.password"  type="password" class="form-control" :placeholder="$t('login.form.passPlaceholder')">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input id="picCode" v-model="user.picCode" type="text" class="form-control" :placeholder="$t('login.form.codePlaceholder')">
        <div class="pic-code">
          <img :src="picCode.image ? ('data:image/png;base64,' + picCode.image) : ''" />
          <i @click="changePic" class="fa fa-refresh" aria-hidden="true"></i>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <el-button class="fullwidth" :disabled="loginDisabled" @click="login" type="primary" :loading="loading">{{ $t('login.form.login') }}</el-button>
        </div>
      </div>
    </div>
    <!-- /.login-box-body -->
    <div class="login-box-body" v-if="nextPhone">
      <p class="login-box-msg">{{ $t('login.form.next', {phone: phone.phone ? ((phone.countryCode ? ('+' + phone.countryCode + ' ') : '') + phone.phone) : ''}) }}</p>
      <div class="form-group has-feedback">
        <input v-model="phone.code" type="text" class="form-control" :placeholder="$t('login.form.phonePlaceholder')">
        <div class="pic-code">
          <el-button @click="getCodeAgain" class="get-code" type="primary" :disabled="getAgain">{{ getAgain ? count + 's' : $t('login.form.getcode') }}</el-button>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <el-button class="fullwidth" :disabled="submitDisabled" @click="submit" type="primary" :loading="loading">{{ $t('login.form.submit') }}</el-button>
        </div>
      </div>
    </div>
  </div>
<!-- /.login-box -->
</div>
</template>

<script>
import api from "../api"
import {saveStorage} from '../services/auth'

export default {
  mounted() {
    api.getPicCode(this);
    document.querySelector("#userName").autofocus = true;
  },
  data() {
    return {
      loading: false,
      user: {
        name: "",
        password: "",
        subject: 2,   // 2： web端
        picCode: '',
        picToken: ''
      },
      picCode: {
        image: '',
        token: ''
      },
      loginInfo: {},
      nextPhone: false,
      phone: {
        adminId: null,
        countryCode: null,
        phone: null,
        code: null,
        subject: 2
      },
      getCode: '120s',
      timer: null,  // 定时器
      count: 120,
      getAgain: true,
      submitData: {}
    }
  },
  computed: {
    loginDisabled() {
      return !(this.user.name && this.user.password && this.user.picCode && this.user.picCode.length == 4);
    },
    submitDisabled() {
      return !(this.phone.code && this.phone.code.length == 4);
    }
  },
  methods: {
    login() {
      this.user.picToken = this.picCode.token;
      api.loginV2(this, this.user).then(() => {
        this.loading = false;
        if(this.loginInfo.success) {
          let data = this.loginInfo.data.data;
          if(!data.frozen) {
            this.phone.adminId = data.adminId;
            this.phone.countryCode = data.countryCode;
            this.phone.phone = data.phone;
            this.startTimer();
            this.nextPhone = true;
          }
          else {
            this.picCode = data.pic;
            this.loginDisabled = data.frozen;
            this.$message({ message: this.loginInfo.data.error, type: 'error' });
          }
        }
        else {
          let errorData = this.loginInfo.data.errorData;
          this.picCode = errorData.pic;
          this.$message({ message: this.loginInfo.data.error, type: 'error' });
        }
      });
    },
    submit() {
      api.saveSMSCode(this, this.phone).then(() => {
        if(this.submitData.success && !this.submitData.data.data.frozen) {
          let token = this.submitData.data.data;
          saveStorage("token", token);
          this.$router.push({name: "welcome"});
        }
        else {
          this.$message({ message: this.submitData.data.error, type: 'error' });
          if(this.submitData.data.errorData.frozen) {
            api.getPicCode(this);
            this.user = {
              name: "",
              password: "",
              subject: 2,   // 2： web端
              picCode: '',
              picToken: ''
            },
            this.nextPhone = false;
          }
        }
        // 这里做跳转
        this.loading = false;
        this.submitDisabled = true;
      });
    },
    focusPassword() {
      document.querySelector("#password").select();
    },
    focusPicCode() {
      document.querySelector("#picCode").select();
    },
    changePic() {
      api.getPicCode(this);
    },
    getCodeAgain() {
      this.startTimer();
      api.getSMSCode(this, this.phone);
    },
    // 倒计时
    startTimer() {
      this.getAgain = true;
      this.count = 120;
      this.timer = setInterval(() => {
        if(this.count < 1) {
          return this.stopTimer();
        }
        this.count--;
      }, 1000);
    },
    stopTimer() {
      this.getAgain = false;
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss">
.login-view {
  height: 100%;
  .pic-code {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    min-width: 100px;
    background-color: #ddd;
    img {
      height: 100%;
    }
    .fa-refresh {
      position: absolute;
      font-size: 20px;
      color: #fff;
      top: 20%;
      right: 5px;
      cursor: pointer;
    }
    .get-code {
      width: 100%;
      height: 100%;
      font-size: 14px;
    }
  }
  .fullwidth {
    width: 100%;
  }
}

</style>