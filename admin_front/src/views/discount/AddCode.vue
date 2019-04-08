<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addCode.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="box">
        <div class="box-header with-border">
          {{ $t('addCode.form.basic') }}
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="120px">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.code')" v-if="this.$route.name === 'addcode'" class="required">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    :placeholder="$t('addCode.form.codePlaceholder')"
                    v-model="queryCode">
                  </el-input>
                </el-form-item>

                <el-form-item :label="$t('addCode.form.code')" v-if="this.$route.name === 'editcode'" class="required">
                  <el-input
                    type="text"
                    :disabled="true"
                    v-model="query.code">
                  </el-input>
                </el-form-item>
              </div>

              <div class="col-md-4 col-xs-12">
                <el-button type="primary" @click="dialogNameRuleVisible = true" >{{ $t('addCode.form.openGenerate') }}</el-button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.useTimesPerOne')" class="required">
                  <el-input v-model="query.useTimesPerOne" type="number"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.tag')" class="required">
                  <el-input v-model="query.tag"></el-input>
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
                    @change="handleStartDate"
                    :clearable="false"
                    :editable="false"
                    :placeholder="$t('addMessage.form.startPlaceholder')">
                  </el-date-picker>
                </el-form-item>

                <el-form-item :label="$t('addMessage.form.endDateTime')" class="required">
                  <el-date-picker
                    v-model="dateTimeRange.endDateTime"
                    type="datetime"
                    :picker-options="pickerEndOption"
                    @change="handleEndDate"
                    :clearable="false"
                    :editable="false"
                    :placeholder="$t('addMessage.form.endPlaceholder')">
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>

            <!--<div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.status')">
                  <el-select v-model="query.status" :disabled="this.$route.name === 'editcode'">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>-->

            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.limitTime')">
                  <el-input v-model="query.useTimes" type="number" :placeholder="$t('addCode.form.limitPlaceholder')"></el-input>
                </el-form-item>
              </div>
              <div class="col-md-4 col-xs-12">
                <el-form-item label-width="0">
                  <span class="text-red" v-if="+query.useTimes > 0 && +query.useTimes < +query.useTimesPerOne"><i class="el-icon-warning"></i>{{ $t('addCode.form.useTimesWarning') }}</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="box">
        <div class="box-header with-border">
          {{ $t('addCode.form.setting') }}
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="120px">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.quantity')">
                  <el-input v-model="query.quantity" type="number"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.activityType')">
                  <el-select v-model="query.activityType" @change='handleExchangeTypeChange'>
                    <el-option
                      v-for="item in exchangeTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>

          <div class="row" v-if="query.activityType === 2">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addCode.form.selectCard')" class="required">
                <el-select v-model="query.countryId" @change="handleCardCountryChange" :placeholder="$t('addCode.form.selectCardHelper1')">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                
                <el-select v-model="query.couponId" :disabled="cardOptions.length < 1" :placeholder="cardOptions.length > 0 || !query.countryId ? $t('addCode.form.selectCardHelper2') :$t('addCode.form.selectCardHelper3')">
                    <el-option
                      v-for="item in cardOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
            </div>
          </div>
            
            <div class="row" v-if="query.activityType === 5">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addCode.form.couponId')" class="required">
                  <el-select v-model="query.couponId" @change="handleCouponChange">
                    <el-option
                      v-for="item in coupons"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-md-4 col-xs-12">
                <el-form-item label-width="0">
                  <a href="/discount/couponadd" target="_blank" >{{ $t('addCode.form.toAdd') }}</a>
                </el-form-item>
              </div>
            </div>

            <div class="row" v-if="query.activityType === 5">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('addCode.form.detail')">
                  <table>
                    <tbody>
                      <tr><td width="100px">{{ $t('addCode.form.content') }}</td><td>{{ computedCoupon.contentString || '--' }}</td></tr>
                      <tr><td width="100px">{{ $t('addCode.form.days') }}</td><td>{{ computedCoupon.daysString || '--' }}</td></tr>
                      <tr><td width="100px">{{ $t('addCode.form.area') }}</td><td>{{ computedCoupon.areaString || '--' }}</td></tr>
                    </tbody>
                  </table>
                </el-form-item>
              </div>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addCode.form.submit') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
  </div>

  <el-dialog :title="$t('addCode.dialog.title')" :visible.sync="dialogNameRuleVisible" :close-on-click-modal="false">
    <el-form :inline="true" label-position="left">
      <!--<span>{{ $t('addCode.dialog.nameRule') }}:</span>-->

      <div v-for="(rule, index) in rules" :key="index">
        <el-form-item :label="$t('addCode.dialog.code')">
          <el-input v-model="rule.from" type="number" disabled style="width:80px;"></el-input>
        </el-form-item>
        <el-form-item :label="$t('addCode.dialog.to')">
          <el-input v-model="rule.to" type="number" :min="rule.from + 1" :max="20" :disabled="rules.length - index > 1" style="width:80px;"></el-input>
        </el-form-item>
        <el-form-item :label="$t('addCode.dialog.bit')">
          <el-select v-model="rule.type" :disabled="rules.length - index > 1" style="width:100px;">
            <el-option :label="$t('addCode.dialog.ruleType1')" :value="1"></el-option>
            <el-option :label="$t('addCode.dialog.ruleType2')" :value="2"></el-option>
            <el-option :label="$t('addCode.dialog.ruleType3')" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="rule.type === 3">
          <el-input v-model="rule.str" :disabled="rules.length - index > 1" :maxlength="rule.to - rule.from + 1" :minlength="rule.to - rule.from + 1" style="width:100px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" icon="el-icon-minus" :disabled="index === 0 || rules.length - index > 1" @click="removeRule(index)"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" 
            :disabled="rules.length - index > 1 || 
                      !rules[rules.length - 1].to || 
                      rule.to < rule.from || 
                      rule.to >= 20 ||
                      (rule.type === 3 && (rule.to - rule.from + 1) !== rule.str.length )" 
            @click="addRule"></el-button>
        </el-form-item>
      </div>
      
      <el-form-item :label="$t('addCode.dialog.generateNum')">
        <el-input v-model="generateNum" type="number" :min="1" :max="1000" style="width:80px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" 
          :disabled="rules[rules.length - 1].to < rules[rules.length - 1].from || 
                    (rules[rules.length - 1].type === 3 && (rules[rules.length - 1].to - rules[rules.length - 1].from + 1) !== rules[rules.length - 1].str.length ) || 
                    rules[rules.length - 1].to > 20 ||
                    generateNum > 1000 ||
                    generateNum <= 0" 
          @click="generateCode">{{ $t('addCode.dialog.generateCode') }}</el-button>
      </el-form-item>
      <el-form-item>
        <span class="text-red" v-if="this.hasRepeat"><i class="el-icon-warning"></i>{{ $t('addCode.dialog.hasRepeat') }}</span>
        <span class="text-red" v-if="generateNum > 1000"><i class="el-icon-warning"></i>{{ $t('addCode.dialog.generateNumIsTooLarge') }}</span>
        <span class="text-red" v-if="rules[rules.length - 1].to > 20"><i class="el-icon-warning"></i>{{ $t('addCode.dialog.codeIsTooLarge') }}</span>
      </el-form-item>

      <div class="row">
        <div class="col-md-3 col-xs-4" v-for="(code, index) in generateCodes" :key="index">{{ code }}</div>
      </div>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogNameRuleVisible = false">{{ $t('addCode.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="handleNameRuleOK" :disabled="generateCodes.length === 0 || this.hasRepeat">{{ $t('addCode.dialog.ok') }}</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import api from "../../api"
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.pickerStartOption, Mixins.country],
  mounted() {
    const code = sessionStorage.code;
    if(this.$route.name === 'editcode' && code) {
      this.editVisible = true;
      this.query = JSON.parse(code);
      // this.getCoupons(this, {});
      this.dateTimeRange.startDateTime = this.query.startTime ? moment(this.query.startTime).toDate() : null;
      this.dateTimeRange.endDateTime = this.query.endTime ? moment(this.query.endTime).toDate() : null;
      this.getCountryCards()
      this.getCouponsNopage(true);
    }
    else {
      this.addVisible = true;
      this.getCountryCards()
      this.getCouponsNopage();
    }
  },
  data() {
    return {
      loading: false,
      daterange: '',
      country: {},
      coupons: [],
      randomCode: null,
      selectedCoupon: {},
      dialogNameRuleVisible: false,
      query: {
        // type: 1,
        // status: 3,
        couponId: null,
        code: null,
        startTime: null,
        endTime: null,
        quantity: 3,
        useTimes: null,
        tag: null,
        useTimesPerOne: 1,
        activityType: 5,
      },
      rules: [
        {from: 1, to: null, type: 1, str: ''},
      ],
      generateNum: null,
      generateCodes: [],
      hasRepeat: false,
      typeOptions: [
        {label: this.$t('addCode.js.type'), value: 1},
      ],
      exchangeTypeOptions: [
        {label: this.$t('addCode.js.exchangeTypeOption5'), value: 5},
        {label: this.$t('addCode.js.exchangeTypeOption2'), value: 2},
      ],
      statusOptions: [
        {label: this.$t('addCode.js.status1'), value: 1},
        {label: this.$t('addCode.js.status2'), value: 2},
        {label: this.$t('addCode.js.status3'), value: 3},
      ],
      areaOptions: this.getAreaOnlyOptions(),
      cardOptions: [],
      queryCode: null,
      letters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      numbers: '0123456789'.split(''),
    }
  },
  computed: {
    submitDisabled() {
      return !((this.queryCode || this.query.code) 
      && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime 
      && this.dateTimeRange.startDateTime < this.dateTimeRange.endDateTime 
      && this.query.couponId && this.query.tag 
      && (+this.query.useTimes > 0 ? +this.query.useTimes >= +this.query.useTimesPerOne : true )
      && this.query.useTimesPerOne);
    },
    computedCoupon() {
      return {
        ...this.selectedCoupon,
        daysString: this.selectedCoupon.endType === 1 ? this.selectedCoupon.days + ' ' + this.$t('addCode.js.day')
                  : this.selectedCoupon.endType === 2 ? moment(this.selectedCoupon.startTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(this.selectedCoupon.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
        contentString: this.selectedCoupon.benefitType === 1 ? this.getCotentStringType1() : this.selectedCoupon.benefitType === 2 ?  this.getCotentStringType2() : '',
        areaString: (this.selectedCoupon.countryName ? this.selectedCoupon.countryName : '') + (this.selectedCoupon.cityName ? ' - ' + this.selectedCoupon.cityName : ''),
      }
    }
  },
  methods: {
    getCotentStringType1() {
      if(this.selectedCoupon.randomPromotion){
        return this.$t('addCode.js.benefitType1') + ' ' + this.selectedCoupon.minPromotion + '% ~ ' +  this.selectedCoupon.maxPromotion + '%'
      }else{
        return this.$t('addCode.js.benefitType1') + ' ' + this.selectedCoupon.benefitPercent + '%';
      }
    },
    getCotentStringType2() {
      if(this.selectedCoupon.randomPromotion){
        return this.$t('addCode.js.benefitType2') + ' ' + this.selectedCoupon.currencySymbol + ' ' + this.selectedCoupon.minPromotion + ' ~ ' + this.selectedCoupon.currencySymbol + ' ' + this.selectedCoupon.maxPromotion
      }else{
        return this.$t('addCode.js.benefitType2') + ' ' + this.selectedCoupon.currencySymbol + ' ' + this.selectedCoupon.benefitMoney
      }
    },
    goBack() {
      this.$router.push({name: 'code'});
    },
    submit() {
      this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      if(this.$route.name === 'addcode') {
        this.query.code = this.queryCode.trim().replace(/(\r\n|\n|\r)/g, ',');
        api.saveCode(this, this.query);
      } else if (this.$route.name === 'editcode') {
        api.updateCode(this, this.query);
      }
    },
    getCouponsNopage(afterMounted = false) {
      // couponType: 2  普通优惠券
      const parms = {
        couponType: 2, 
        exchangeCodeStartTime: this.dateTimeRange.startDateTime ? moment(this.dateTimeRange.startDateTime).toDate().getTime() : null, 
        exchangeCodeEndTime: this.dateTimeRange.endDateTime ? moment(this.dateTimeRange.endDateTime).toDate().getTime() : null
        };
      api.getCouponsNopage(this, parms).then(coupons => {
        coupons.forEach(item => {
          item.label = item.name;
          item.value = item.id;
        })
        if(afterMounted){
          for(let i = 0, len = coupons.length; i < len; i++) {
            if(coupons[i].id === this.query.couponId) {
              this.selectedCoupon = coupons[i];
              break;
            }
          }
        }else{
          this.query.couponId = null;
          this.query.countryId = coupons[0].countryId;
          this.query.cityId = coupons[0].cityId;
          this.selectedCoupon = {};
        }
      })
    },
    handleStartDate(val) {
      if(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime) {
        this.getCouponsNopage();
      }
      this.handleStartDateChange(val);
    },
    handleEndDate(val) {
      if(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime) {
        this.getCouponsNopage();
      }
      return this.handleEndDateChange(val);
    },
    handleExchangeTypeChange(){
      this.query.countryId = null;
      this.query.couponId = null;
      if(this.query.activityType === 5) this.getCouponsNopage();
    },
    handleCardCountryChange() {
      this.getCountryCards()
      this.query.couponId = null;
    },
    getCountryCards(){
      if(!this.query.countryId) return
      let query = {
        id: this.query.countryId
      }
      api.getCountryCards(this, query).then(res => {
        this.cardOptions = this.cardOptions.map((item) => {
          return {
            ...item,
            label: item.days + this.$t('addCode.js.exchangeTypeOption2'),
            value: item.id
          };
        });
      });
    },
    handleCouponChange(value) {
      this.query.couponId = value;
      for(let i = 0, len = this.coupons.length; i < len; i++) {
        if(this.coupons[i].id === value) {
          this.selectedCoupon = this.coupons[i];
          this.query.countryId = this.coupons[i].countryId;
          this.query.cityId = this.coupons[i].cityId;
          break;
        }
      }
    },
    random() {
      api.getRandomCodes(this).then(code => this.query.code = code);
    },
    handleNameRuleOK() {
      this.queryCode = this.generateCodes.join('\n');
      this.dialogNameRuleVisible = false;
    },
    addRule() {
      this.rules.push({from: +this.rules[this.rules.length - 1].to + 1, to: null, type: 1, str: ''});
    },
    removeRule(index) {
      this.rules.splice(index, 1);
    },
    generateCode() {
      let codes = [];
      for(let i = 0; i < this.generateNum; i++){
        codes.push(this.getCodeByRule());
      }
      this.generateCodes = codes;
      this.hasRepeat = this.generateCodes.length !== [...new Set(codes)].length;
    },
    getCodeByRule() {
      let code = '';
      this.rules.forEach(rule => {
        if(rule.type === 3) {         // 自定义
          code += rule.str;
        } else {
          for(let i = 0, len = rule.to - rule.from + 1; i < len; i++) {
            if(rule.type === 1) {         // 随机字母
              code += this.getRandomLetters();
            } else if (rule.type === 2) { // 随机数字
              code += this.getRandomNumbers();
            }
          }
        }
      })
      return code;
    },
    getRandomLetters() {
      const random = Math.floor(Math.random() * 26);
      return this.letters[random];
    },
    getRandomNumbers() {
      const random = Math.floor(Math.random() * 10);
      return this.numbers[random];
    }
  }
}
</script>

<style>
.add-activity-view .el-textarea__inner {
  font-size: 12px;
}
</style>
