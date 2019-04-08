<template>
<div class="add-credit-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addCredit.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goCredit"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="120px">
        <div class="row">
          <div class="col-md-4 col-xs-12 plus-select">
            <el-form-item :label="$t('addCredit.form.phone')" class="required">
              <el-input v-model="query.phone" @blur="handleInputBlur">
                <el-select slot="prepend" v-model="query.countryId" @change="handleCountryChange">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCredit.form.credit')">
              <el-input disabled v-model="user.credit"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCredit.form.subject')" class="required">
              <el-select v-model="query.subject" @change="handleSubjectChange">
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCredit.form.creditChange')" class="required">
              <el-input v-model="query.creditChange" type="number" :disabled="query.subject < 16"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCredit.form.remark')">
              <el-input v-model="query.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" :placeholder="$t('addCredit.form.remarkPlaceholder')" max-length="100"></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addCredit.form.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country],
  mounted() {

  },
  data() {
    return {
      loading: false,
      user: {credit: 100},
      query: {
        memberId: '',
        countryId: 153,
        phone: null,
        subject: 3,
        creditChange: 2,
        remark: null,
      },
      subjectOptions: [
        {label: this.$t('addCredit.js.subject1'), value: 1},
        {label: this.$t('addCredit.js.subject2'), value: 2},
        {label: this.$t('addCredit.js.subject3'), value: 3},
        {label: this.$t('addCredit.js.subject4'), value: 4},
        {label: this.$t('addCredit.js.subject5'), value: 5},
        {label: this.$t('addCredit.js.subject6'), value: 6},
        {label: this.$t('addCredit.js.subject7'), value: 7},
        {label: this.$t('addCredit.js.subject8'), value: 8},
        {label: this.$t('addCredit.js.subject9'), value: 9},
        {label: this.$t('addCredit.js.subject10'), value: 10},
        {label: this.$t('addCredit.js.subject11'), value: 11},
        {label: this.$t('addCredit.js.subject12'), value: 12},
        {label: this.$t('addCredit.js.subject13'), value: 13},
        {label: this.$t('addCredit.js.subject14'), value: 14},
        {label: this.$t('addCredit.js.subject15'), value: 15},
        {label: this.$t('addCredit.js.subject17'), value: 17},
        {label: this.$t('addCredit.js.subject18'), value: 18},
        {label: this.$t('addCredit.js.subject19'), value: 19},
        {label: this.$t('addCredit.js.subject20'), value: 20},
        {label: this.$t('addCredit.js.subject21'), value: 21},
        {label: this.$t('addCredit.js.subject16'), value: 16},
      ],
      areaOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    submitDisabled() {
      let subjectCreditValid = true;
      switch (this.query.subject){
        case 17: subjectCreditValid = this.query.creditChange < 0; break;
        case 18: subjectCreditValid = this.query.creditChange >= 0; break;
        case 19: subjectCreditValid = this.query.creditChange >= 0; break;
        case 20: subjectCreditValid = this.query.creditChange < 0; break;
        case 21: subjectCreditValid = this.query.creditChange >= 0; break;
        default: break;
      }
      if(!subjectCreditValid) {
        return true;
      }
      return !(this.query.memberId && this.query.creditChange && this.query.subject && this.query.phone);
    }
  },
  methods: {
    goCredit() {
      this.$router.push({'name': 'credit'});
    },
    submit() {
      api.updateCredit(this, this.query);
    },
    getUser() {
      if(this.query.phone && this.query.countryId) {
        api.getUserList(this, this.query).then(users => {
          if(users.length > 0) {
            this.user = users[0];
            this.query.memberId = this.user.memberId;
          } else {
            this.user.credit = 100;
            this.query.memberId = '';
            this.$message({ message: this.$t('addCredit.js.message'), type: 'info' });
          }
          if(this.query.subject === 10 || this.query.subject === 11 || this.query.subject === 12 || this.query.subject === 13) {
            this.query.creditChange = -this.user.credit;
          }
        });
      }
    },
    handleInputBlur(event) {
      this.getUser();
    },
    handleCountryChange(value) {
      this.getUser();
    },
    handleSubjectChange(value) {
      // if(this.user.credit && this.query.phone) {
        switch (value) {
          case 1: this.query.creditChange = 100; break;
          case 2: this.query.creditChange = 1; break;
          case 3: this.query.creditChange = 2; break;
          case 4: this.query.creditChange = 3; break;   // 举报违停的，改成加3分
          case 5: this.query.creditChange = 2; break;
          case 6: this.query.creditChange = 2; break;
          case 7: this.query.creditChange = 2; break;
          case 8: this.query.creditChange = -20; break;
          case 9: this.query.creditChange = -20; break;
          case 10: this.query.creditChange = -this.user.credit; break;
          case 11: this.query.creditChange = -this.user.credit; break;
          case 12: this.query.creditChange = -this.user.credit; break;
          case 13: this.query.creditChange = -this.user.credit; break;
          case 14: this.query.creditChange = -20; break;
          case 15: this.query.creditChange = 1; break;
          case 16: this.query.creditChange = 1; break;
          case 17: this.query.creditChange = -1; break;
          case 18: this.query.creditChange = 1; break;
          case 19: this.query.creditChange = 1; break;
          case 20: this.query.creditChange = -1; break;
          case 21: this.query.creditChange = 1; break;
          default: null;
        }
      // }
    },
  },
  components: {
    // Iphone
  }

}
</script>
<style lang="scss">
.add-credit-view {
  .plus-select .el-select {
    width: 100px;
  }
}
</style>
