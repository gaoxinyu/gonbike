<template>
  <el-dialog 
    :title="$t('account.dialog.title3')" 
    width="30%" 
    :visible.sync="resetPasswordVisible"
    @close="handleResetDialogClose">
    <p class="word-bread"><i class="el-icon-warning warning"></i>{{ $t('account.dialog.rsttip', { name: resetAccount.name}) }}</p>
    <label class="word-bread">{{ $t('account.dialog.resetpass', { name: resetAccount.name}) }}</label>
    <div class="row">
      <div class="col-md-6">
        <el-input v-model="newPassword"></el-input>
        <!-- 必须是6-12位含大小写英文、数字的组合 -->
        <p class="error" v-show="showPasswordTip">{{ $t('enterpriseAccountReset.tip') }}</p>
      </div>
      <div class="col-md-3">
        <el-button @click="generateNewPassword" type="primary">{{ $t('account.dialog.custompass') }}</el-button>
      </div>
      <div class="col-md-3">
        <el-button v-clipboard="newPassword">{{ $t('account.dialog.passcopy') }}</el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- 取 消 -->
      <el-button 
        @click="resetPasswordVisible = false"
        :loading="loading">{{$t('enterpriseAccountReset.cancel')}}</el-button>
        <!-- 确 定 -->
      <el-button 
        type="primary" 
        @click="sendResetPassword" 
        :disabled="!newPassword || showPasswordTip"
        :loading="loading">{{$t('enterpriseAccountReset.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import api from "../../api";
import { ENTERPRISE_PASS } from '../../utils/regex'
import Mixins from "../../mixins/index.js";

export default {
  mixins: [Mixins.common],
  data() {
    return {
      loading: false,
      resetPasswordVisible: false,
      newPassword: null,
      resetAccount: {}
    }
  },
  computed: {
    showPasswordTip() {
      return (this.newPassword && !ENTERPRISE_PASS.test(this.newPassword));
    }
  },
  methods: {
    resetPassword (resetAccount) {
      this.resetAccount = resetAccount;
      this.resetPasswordVisible = true;
    },
    sendResetPassword() {
      let params = {
        id: this.resetAccount.id,
        password: this.newPassword
      }
      api.resetEnterprisePassword(this, params)
      .then(data => {
        if(data.success){
          this.resetPasswordVisible = false;
        }
      });
    },
    generateNewPassword(){
      this.newPassword = this.randPass(8, 12, ENTERPRISE_PASS);
    },
    handleResetDialogClose() {
      this.resetAccount = {};
      this.newPassword = null;
    }

  }
}
</script>

<style lang="scss" scoped>
.word-bread {
  word-break: break-all;
}
</style>
