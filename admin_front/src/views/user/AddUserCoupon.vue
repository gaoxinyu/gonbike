<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addUserCoupon.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="120px">

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addUserCoupon.form.memberCountryId')">
              <el-select v-model="query.memberCountryId" @change="getCouponsNopage">
                <el-option
                  v-for="item in areaOptions"
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
            <el-form-item :label="$t('addUserCoupon.form.memberPhone')" class="required">
              <el-input v-model="query.memberPhone" type="text"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addUserCoupon.form.quantity')" class="required">
              <el-input v-model="query.quantity" type="number"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addUserCoupon.form.couponId')" class="required">
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
              <a href="/discount/couponadd" target="_blank" >{{ $t('addUserCoupon.form.toAdd') }}</a>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addUserCoupon.form.detail')">
              <table>
                <tbody>
                  <tr><td width="100px">{{ $t('addUserCoupon.form.content') }}</td><td>{{ computedCoupon.contentString || '--' }}</td></tr>
                  <tr><td width="100px">{{ $t('addUserCoupon.form.days') }}</td><td>{{ computedCoupon.daysString || '--' }}</td></tr>
                  <tr><td width="100px">{{ $t('addUserCoupon.form.area') }}</td><td>{{ computedCoupon.areaString || '--' }}</td></tr>
                </tbody>
              </table>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addUserCoupon.form.sendNoti')">
              <el-radio-group v-model="query.sendNoti">
                <el-radio :label="1">{{ $t('addUserCoupon.form.yes') }}</el-radio>
                <el-radio :label="0">{{ $t('addUserCoupon.form.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>


        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addUserCoupon.form.submit') }}</el-button>
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
import moment from "moment"

export default {
  mixins: [Mixins.country],
  mounted() {
    this.getCouponsNopage();
  },
  data() {
    return {
      loading: false,
      country: {},
      coupons: [],
      selectedCoupon: {},
      query: {
        memberCountryId: +this.$route.query.countryId || 153,
        couponId: null,
        memberPhone: this.$route.query.phone,
        quantity: 3,
        sendNoti: 1,
      },
      areaOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.memberPhone && this.query.quantity && this.query.couponId);
    },
    computedCoupon() {
      return {
        ...this.selectedCoupon,
        daysString: this.selectedCoupon.endType === 1 ? this.selectedCoupon.days + ' ' + this.$t('addUserCoupon.js.day')
                  : this.selectedCoupon.endType === 2 ? moment(this.selectedCoupon.startTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(this.selectedCoupon.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
        contentString: this.getContentString(),
        areaString: (this.selectedCoupon.countryName ? this.selectedCoupon.countryName : '') + (this.selectedCoupon.cityName ? ' - ' + this.selectedCoupon.cityName : ''),
      }
    },
  },
  methods: {
    getContentString() {
      if(!this.selectedCoupon){
        return '';
      }
      let res = "";
      if(this.selectedCoupon.benefitType === 1 ){
        //折扣
        if(this.selectedCoupon.randomPromotion){
          res += (this.selectedCoupon.minPromotion || 0) + '% - '
          res += (this.selectedCoupon.maxPromotion || 0) + '%'
        }else{
          res += (this.selectedCoupon.benefitPercent || 0) + '%'
        }
      }else if(this.selectedCoupon.benefitType === 2 ){
        //金额
        let currencySymbol = this.selectedCoupon.currencySymbol || '$';
        if(this.selectedCoupon.randomPromotion){
          res += currencySymbol + (this.selectedCoupon.minPromotion || 0) + '-';
          res += currencySymbol + (this.selectedCoupon.maxPromotion || 0)
        }else{
          res += currencySymbol + (this.selectedCoupon.benefitMoney || 0);
        }
      }
      return res
    },
    goBack() {
      this.$router.push({name: 'usercoupon'});
    },
    submit() {
      api.saveUserCoupon(this, this.query).then(() => this.goBack());
    },
    getCouponsNopage() {
      // couponType: 4  运营赠送优惠券
      api.getCouponsNopage(this, {countryId: this.query.memberCountryId, couponType: 4}).then(coupons => {
        coupons.forEach(item => {
          item.label = item.name;
          item.value = item.id;
        })
        if(coupons.length > 0) {
          this.query.couponId = coupons[0].id;
          this.selectedCoupon = coupons[0];
        } else {
          this.query.couponId = null;
          this.selectedCoupon = {};
        }
      })
    },
    handleCouponChange(value) {
      this.query.couponId = value;
      for(let i = 0, len = this.coupons.length; i < len; i++) {
        if(this.coupons[i].id === value) {
          this.selectedCoupon = this.coupons[i];
          // this.query.memberCountryId = this.coupons[i].countryId;
          break;
        }
      }
    },
  },

}
</script>
