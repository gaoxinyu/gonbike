<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $route.name == 'editaccount' ? $t('addAccount.form.title1') : $t('addAccount.form.title') }}
        <!--
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goCredit"><i class="fa fa-mail-reply"></i></button>
        </div>
        -->
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="80px">
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.countryId')">
                <el-select v-model="query.countryId" @change="getCountryInfo">
                  <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-input v-model="query.countryName" :disabled="true" v-if="$route.name == 'editaccount'"></el-input> -->
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.cityId')">
                <el-select v-model="query.cityId">
                  <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-input v-model="query.cityName" :disabled="true" v-if="$route.name == 'editaccount'"></el-input> -->
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.name')" class="required">
                <el-input v-model="query.name" :placeholder="$t('addAccount.form.namePlaceholder')"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item v-if="isAdd" :label="$t('addAccount.form.password')" class="required">
                <el-input v-model="query.password"></el-input>
                <p class="error" v-show="showrstTip">{{ $t('account.dialog.rstpassTip') }}</p>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12" v-if="isAdd">
              <el-button @click="customPass" type="primary" style="margin-top: 2px;">{{ $t('account.dialog.custompass') }}</el-button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.phone')" class="required">
                <!-- <div class="cus-phone">
                  + <input type="number" class="phone-code" v-model="query.phoneCode" :placeholder="$t('addAccount.form.phoneCode')" />
                  <input type="number" class="phone-num" v-model="query.phone" :placeholder="$t('addAccount.form.phone')" />
                </div> -->
                <div class="col-md-4" style="padding:0">
                  <el-input type="number" v-model="query.phoneCode" :placeholder="$t('addAccount.form.phoneCode')">
                    <template slot="prepend">+</template>
                  </el-input>
                </div>
                <div class="col-md-8" style="padding:0">
                  <el-input type="number" v-model="query.phone" :placeholder="$t('addAccount.form.phone')"></el-input>
                </div>
                <p class="error">{{ $t('addAccount.form.phoneTip') }}</p>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.realName')" class="required">
                <el-input v-model="query.realName"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.status')">
                <el-select v-model="query.status" :disabled="query.status == 3 || $route.name == 'addaccount'">
                  <el-option v-for="item in computedStatus" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addAccount.form.roleId')" class="required">
                <el-select v-model="query.roleId">
                  <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
                <el-date-picker 
                  v-model="dateTimeRange.startDateTime" 
                  type="datetime" 
                  :picker-options="pickerStartOption" 
                  :disabled="disabledStart" 
                  @change="handleStartDateChange" 
                  :clearable="false"
                  :editable="false"
                  :placeholder="$t('addMessage.form.startPlaceholder')">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addMessage.form.endDateTime')" class="required">
                <el-date-picker 
                  v-model="dateTimeRange.endDateTime" 
                  type="datetime" 
                  :picker-options="pickerEndOption" 
                  @change="handleEndDateChange" 
                  :clearable="false"
                  :editable="false"
                  :placeholder="$t('addMessage.form.endPlaceholder')">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addAccount.form.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import api from "../../api"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.common, Mixins.pickerStartOption],
  mounted() {
    // 初始默认有效期为90天
    this.dateTimeRange.startDateTime = moment(new Date()).toDate();
    this.dateTimeRange.endDateTime = moment(new Date()).add(1, 'month').toDate();

    const account = sessionStorage.account;
    if (this.$route.name === 'editaccount' && account) {
      this.query = JSON.parse(account);
      this.dateTimeRange.startDateTime = this.query.startTime ? moment(this.query.startTime).toDate() : null;
      this.dateTimeRange.endDateTime = this.query.endTime ? moment(this.query.endTime).toDate() : null;
    }

    this.getCitysByCountry();
    this.getAllRoles();
  },
  data() {
    return {
      loading: false,
      beginTime: null,
      endTime: null,
      query: {
        countryId: 153,
        cityId: 1,
        name: null,
        password: null,
        phoneCode: null,
        phone: null,
        realName: null,
        status: 1,
        roleId: null,
        startTime: null,
        endTime: null,
      },
      isAdd: this.$route.name === 'addaccount',
      roles: [],
      loading: false,
      cityOptions: [],
      roleOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
      passReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([-_#]{0,})[A-Za-z\d-_#]{8,15}$/
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.name && this.query.realName &&
               (this.isAdd ? this.passReg.test(this.query.password) : true) && 
               this.query.phoneCode && this.query.phone && this.query.roleId && 
               this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
    },
    showrstTip() {
      // 校验规则8-15个字符，必须包含数字，字母大小写，允许包含特殊字符[- _ #]
      return (this.query.password && !this.passReg.test(this.query.password));
    },
    computedStatus() {
      // 根据时间动态改变状态
      let curTime = (new Date()).getTime();
      if(moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
        this.query.status = 3;
        return [
          { label: this.$t('account.js.status3'), value: 3 } // 过期
        ]
      }
      else {
        if(this.$route.name === 'addaccount') {
          this.query.status = 1;
        }
        
        return [
          { label: this.$t('account.js.status1'), value: 1 }, // 正常
          { label: this.$t('account.js.status2'), value: 2 } // 冻结
        ];
      }
    },
  },
  methods: {
    submit() {
      this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      if (this.$route.name === 'addaccount') {
        api.saveAdmin(this, this.query).then(() => this.$router.push({ name: "account" }));
      } else if (this.$route.name === 'editaccount') {
        delete this.query.password;
        api.updateAdmin(this, this.query).then(() => this.$router.push({ name: "account" }));
      }
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editaccount' ? false : this.handleStartDateChange(val);
    // },
    getAllRoles() {
      api.getAllRoles(this, {}).then(roles => {
        this.roleOptions = this.roles.map(role => {
          return {
            label: role.name,
            value: role.id,
          }
        })
      });
    },
    getCountryInfo() {
      api.getCountryInfo(this, { id: this.query.countryId }).then(country => {
        if (country) {
          this.nums = country.topUpStandard ? country.topUpStandard.split('|') : [];
        }
      });
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, { countryId: this.query.countryId }).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        if (this.cityOptions.length > 0 && this.isAdd) {
          this.query.cityId = this.cityOptions[0].value;
        }
      })
    },
    customPass() {
      this.query.password = this.randPass(8, 15);
    },
    handleBeginTime(time) {
      this.query.startTime = moment(time).toDate().getTime();
    },
    handleEndTime(time) {
      this.query.endTime = moment(time).toDate().getTime();
    },
  },
  components: {
  }

}
</script>

<style>
.required .el-form-item__label::before {
  content: '*';
  color: #f00;
}

.cus-phone {
  width: 100%;
  display: flex;
}

.cus-phone .phone-code,
.cus-phone .phone-num {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  display: block;
  font-size: 12px;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.cus-phone .phone-code {
  width: 60px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 0;
  padding-right: 0;
}

.cus-phone .phone-num {
  width: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.error {
  margin: 0;
}
</style>
