<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addCoupon.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="100px">
        <!-- 优惠券名称 -->
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.name')" class="required">
              <el-input v-model="query.name" type="text"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 适用区域 -->
        <div class="row">
          <div class="col-md-2 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo" @visible-change="handleCountryVisibleChange" :disabled="$route.name === 'editcoupon'">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-2 col-xs-12">
            <el-form-item label=""  label-width="0">
              <el-select v-model="query.cityId" :disabled="$route.name === 'editcoupon'">
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!-- 优惠券类型 -->
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.couponType')">
              <el-select v-model="query.couponType">
                <el-option
                  v-for="item in couponTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!-- 优惠券有效期 -->
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.endType')" class="required">
              <el-select v-model="query.endType" @change="handleEndType">
                <el-option
                  v-for="item in endTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!-- 指定天数 -->
        <div class="row" v-show="query.endType === 1">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.days')" class="required">
              <el-input v-model="query.days" type="number">
                <template slot="append">{{ $t('addCoupon.form.day') }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 指定时间段 -->
        <div class="row" v-show="query.endType === 2">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addMessage.form.startDateTime')" :class="{'required': query.endType === 2}">
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

            <el-form-item :label="$t('addMessage.form.endDateTime')" :class="{'required': query.endType === 2}">
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
        <!-- 折扣类型 -->
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.benefitType')" class="required">
              <el-select v-model="query.benefitType" @change="handleTypeChange">
                <el-option
                  v-for="item in benefitTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <!-- 折扣 -->
        <div class="row">
          <div class="col-md-4 col-xs-8">
            <el-form-item :label="$t('addCoupon.form.randomPromotion' + query.benefitType)" class="required">
              <el-select v-model="query.randomPromotion" @change="handleRandomPromotion">
                <el-option
                  v-for="item in randomPromotionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-xs-8">
            <el-form-item>
              <!-- 定额 -->
              <div class="random-line" v-show="!query.randomPromotion">
                <div class="random-option">
                  <el-input v-model="query.benefitPercent" type="number" v-show="query.benefitType === 1">
                    <template slot="append">%</template>
                  </el-input>
                  <el-input v-model="query.benefitMoney" type="number" v-show="query.benefitType === 2">
                    <template slot="append">{{ country.open ? country.currency : 'USD' }}</template>
                  </el-input>
                </div>
              </div>
              <!-- 随机 -->
              <div class="random-line" v-show="query.randomPromotion">
                <div class="random-option">
                  <el-input v-model="query.minPromotion" type="number">
                    <template slot="append">{{ query.benefitType === 1 ? '%' : (country.open ? country.currency : 'USD') }}</template>
                  </el-input>
                </div>
                —
                <div class="random-option">
                  <el-input v-model="query.maxPromotion" type="number">
                    <template slot="append">{{ query.benefitType === 1 ? '%' : (country.open ? country.currency : 'USD') }}</template>
                  </el-input>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addCoupon.form.query') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption],
  mounted() {
    const coupon = sessionStorage.coupon;
    if(this.$route.name === 'editcoupon' && coupon) {
      this.query = JSON.parse(coupon);
      this.dateTimeRange.startDateTime = this.query.startTime ? moment(this.query.startTime).toDate() : null;
      this.dateTimeRange.endDateTime = this.query.endTime ? moment(this.query.endTime).toDate() : null;
    }
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      country: {},
      citys: [],
      query: {
        name: null,
        benefitType: 2,
        couponType: 2,
        startTime: null,
        endTime: null,
        countryId: 153,
        cityId: null,
        endType: 1,
        benefitMoney: null,
        benefitPercent: null,
        days: null,
        randomPromotion: false,
        minPromotion: null,
        maxPromotion: null
      },
      benefitTypeOptions: [
        {label: this.$t('addCoupon.js.benefitType1'), value: 1},
        {label: this.$t('addCoupon.js.benefitType2'), value: 2},
      ],
      randomPromotionOptions: [
        {label: this.$t('addCoupon.js.randomPromotion0'), value: false},
        {label: this.$t('addCoupon.js.randomPromotion1'), value: true}
      ],
      couponTypeOptions: [
        // {label: this.$t('addCoupon.js.couponType1'), value: 1},
        {label: this.$t('addCoupon.js.couponType2'), value: 2},
        // {label: this.$t('addCoupon.js.couponType3'), value: 3},
        {label: this.$t('addCoupon.js.couponType4'), value: 4},
        {label: this.$t('addCoupon.js.couponType7'), value: 7}
      ],
      endTypeOptions: [
        {label: this.$t('addCoupon.js.endType1'), value: 1},
        {label: this.$t('addCoupon.js.endType2'), value: 2}
      ],
      cityOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.name
        && ((this.query.endType === 1 && this.query.days > 0) 
          || (this.query.endType === 2 && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime) 
          || this.query.endType === 0)
        && (
            (!this.query.randomPromotion 
              && ((this.query.benefitType === 1 && this.query.benefitPercent > 0) 
              || (this.query.benefitType === 2 && this.query.benefitMoney > 0))
            )
            || 
            ( this.query.randomPromotion 
              && Number(this.query.maxPromotion) > Number(this.query.minPromotion) 
              && Number(this.query.minPromotion) > 0
              && (this.query.benefitType === 1 && Number(this.query.maxPromotion) < 100 || this.query.benefitType === 2))
          )
        );


      // return !(this.query.name
      //   && ((this.query.benefitType === 2 && this.query.benefitMoney > 0) ||  (this.query.benefitType === 1 && this.query.benefitPercent > 0))
      //   && ((this.query.endType === 1 && this.query.days > 0) || (this.query.endType === 2 && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime)));
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: 'coupon'});
    },
    submit() {
      this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      if(this.$route.name === 'addcoupon') {
        api.saveCoupon(this, this.query).then(() => this.$router.push({name: "coupon"}));
      } else if (this.$route.name === 'editcoupon') {
        api.updateCoupon(this, this.query).then(() => this.$router.push({name: "coupon"}));
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      return api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('report.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
      })
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editcoupon' ? false : this.handleStartDateChange(val);
    // },
    handleCountryVisibleChange(change) {
      if(change) {
        this.query.cityId = null;
      }
    },
    handleTypeChange() {
      if(this.query.benefitType === 2) {          // 定额
        this.query.benefitPercent = null;
      } else if (this.query.benefitType === 1) {  // 折扣
        this.query.benefitMoney = null;
      }
    },
    handleEndType() {
      if(this.query.endType === 1) {          // 指定天数
        this.query.startTime = null;
        this.query.endTime = null;
      } else if (this.query.endType === 2) {  // 指定日期
        this.query.days = null;
      }
      else if(this.query.endType === 0) {
        this.query.startTime = null;
        this.query.endTime = null;
        this.query.days = null;
      }
    },
    handleRandomPromotion() {
      if(!this.query.randomPromotion) {
        this.query.minPromotion = null;
        this.query.maxPromotion = null;
      }
      else if(this.query.randomPromotion) {
        this.query.benefitMoney = null;
        this.query.benefitPercent = null;
      }
    }
  },

}
</script>
<style>
.random-line {
  display: flex;
}
.random-option {
  width: 48%;
}
</style>
