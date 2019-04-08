<template>
<div class="addBalance-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('editRecharge.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <el-form label-position="left" label-width="80px">
      <div class="box-body">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <h5>{{ $t('editRecharge.form.title1') }}：</h5>
            <el-form-item :label="$t('editRecharge.form.name')">
              <el-input v-model="country.name" disabled></el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.code')">
              <el-input v-model="country.code" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('editRecharge.form.currency')" class="required">
              <el-input v-model="country.currency"></el-input>
            </el-form-item>
            <el-form-item :label="$t('editRecharge.form.currencySymbol')" class="required">
              <el-input v-model="country.currencySymbol"></el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.open')" class="required">
              <!-- :disabled="disabledOpen" -->
              <el-select v-model="country.open" >
                <el-option
                  v-for="item in openOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <h5>{{ $t('editRecharge.form.title2') }}：</h5>
            <el-form-item :label="$t('editRecharge.form.deposit')" class="required">
              <el-input v-model="country.deposit" :disabled="!country.needDeposit" type="number" :placeholder="$t('editRecharge.form.needDepositPlaceholder')">
                <template slot="prepend">
                  <el-switch
                    v-model="country.needDeposit"
                    @change="handleDepositChange"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.depositToBalance')" class="required">
              <el-switch
                v-model="country.depositToBalance"
                :disabled="country.needDeposit"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.studentDeposit')" class="required">
              <el-input v-model="country.studentDeposit" :min="0" :disabled="!country.openStudent" type="number" :placeholder="$t('editRecharge.form.dPlaceholder')">
                <template slot="prepend">
                  <el-switch
                    v-model="country.openStudent"
                    :disabled="!country.needDeposit"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.noDeposit')" class="required">
              <el-input v-model="country.withOutDepositNum" :min="0" :disabled="!country.withOutDepositOpen || !country.needDeposit" type="number" :placeholder="$t('editRecharge.form.dPlaceholder')">
                <template slot="prepend">
                  <el-switch
                    v-model="country.withOutDepositOpen"
                    :disabled="!country.needDeposit"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
                <template slot="append">{{ $t('editRecharge.form.times') }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.bonus')">
              <el-input v-model="country.bonus" :disabled="!country.needDeposit && !country.openStudent" type="number">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.negativeBalanceRefund')" class="required">
              <el-switch
                v-model="country.negativeBalanceRefund"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <h5>{{ $t('editRecharge.form.title3') }}：</h5>
            <el-form-item :label="$t('editRecharge.form.money0')" class="required">
              <el-input v-model="money[0]" type="number" :placeholder="$t('editRecharge.form.dPlaceholder')">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.money1')" class="required">
              <el-input v-model="money[1]" type="number" :placeholder="$t('editRecharge.form.dPlaceholder')">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.money2')" class="required">
              <el-input v-model="money[2]" type="number" :placeholder="$t('editRecharge.form.dPlaceholder')">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.money3')" class="required">
              <el-input v-model="money[3]" type="number" :placeholder="$t('editRecharge.form.dPlaceholder')">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <p class="text-red" v-show="moneyIsRepeated">* {{ $t('editRecharge.form.moneyIsRepeated') }}</p>
          </div>
          <div class="col-md-3 col-xs-12">
            <h5>{{ $t('editRecharge.form.title4') }}：</h5>
            <el-form-item :label="$t('editRecharge.form.money4')">
              <el-input v-model="money[4]" type="number" :placeholder="$t('editRecharge.form.xPlaceholder')">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.money5')">
              <el-input v-model="money[5]" type="number" :placeholder="$t('editRecharge.form.xPlaceholder')" :disabled="!money[4]">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.money6')">
              <el-input v-model="money[6]" type="number" :placeholder="$t('editRecharge.form.xPlaceholder')" :disabled="!money[5]">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('editRecharge.form.money7')">
              <el-input v-model="money[7]" type="number" :placeholder="$t('editRecharge.form.xPlaceholder')" :disabled="!money[6]">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="box-footer text-center">
        <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('editRecharge.form.submit') }}</el-button>
        <!--<el-button @click="clear" :loading="loading">清除</el-button>-->
      </div>
    </el-form>
  </div>
</div>
</template>

<script>
import api from "../../api"

export default {
  mounted() {
    this.money = this.country.topUpStandard ? this.country.topUpStandard.split('|') : [];
    this.disabledOpen =  location.href.indexOf('test') >= 0 || location.href.indexOf('localhost') >= 0 ? false : this.country.open;  // 正式环境需禁止关城
  },
  data() {
    return {
      loading: false,
      disabledOpen: false,
      country: JSON.parse(sessionStorage.getItem('country')) || {},
      money: [],
      openOptions: [
        {label: this.$t('editRecharge.js.open1'), value: true},
        {label: this.$t('editRecharge.js.open0'), value: false},
      ],
    }
  },
  computed: {
    submitDisabled() {
      return !(this.country.id && this.country.currency && this.country.currencySymbol
              && (!this.country.needDeposit || this.country.deposit > 0)
              && (!this.country.openStudent || this.country.studentDeposit >= 0)
              && (!this.country.withOutDepositOpen || this.country.withOutDepositNum >= 0)
              && this.money[0] > 0 && this.money[1] > 0 && this.money[2] > 0 && this.money[3] > 0
              && !this.moneyIsRepeated);
    },
    moneyIsRepeated() {
      let m = {};
      for (let i = 0, len = this.money.length; i < len; i++) {
        if(m[this.money[i]]) {
          return true;
        } else {
          m[this.money[i]] = !!this.money[i];
        }
      }
      return false;
    },
  },
  methods: {
    submit() {
      this.country.topUpStandard = this.money.filter(m => !!m).join('|');
      api.updateCountry(this, this.country).then(() => {
        // 更新开城国家到 localStorage
        api.getCountryList(this, {open: true}).then(countrys => {
          localStorage.openCountrys = JSON.stringify(countrys);
        });
        this.$router.push({name: "recharge"});
      });
    },
    goBack() {
      this.$router.push({name: "recharge"})
    },
    handleDepositChange() {
      this.country.openStudent = false;
      this.country.depositToBalance = false;
    }
  },
}
</script>
