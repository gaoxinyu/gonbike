<template>
  <div class="red-bag-add">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('addIconCoupon.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="120px">
          <div class="box">
            <div class="box-header with-border">
              {{ $t('addIconCoupon.form.basic') }}
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-4 col-xs-12">
                  <el-form-item :label="$t('addIconCoupon.form.countryId')" class="required">
                    <el-select v-model="form.countryId" v-if="!(this.$route.name === 'editiconcoupon')" @change="getCountryInfo">
                      <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="form.countryName" type="text" :disabled="true" v-if="this.$route.name === 'editiconcoupon'"></el-input>
                  </el-form-item>

                  <el-form-item :label="$t('addIconCoupon.form.cityId')">
                    <el-select v-model="form.cityId" @change="getCouponByCityId" :disabled="cityOptions.length === 0" v-if="!(this.$route.name === 'editiconcoupon')">
                      <el-option
                        v-for="item in cityOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="form.cityName" type="text" :disabled="true" v-if="this.$route.name === 'editiconcoupon'"></el-input>
                  </el-form-item>

                  <el-form-item :label="$t('addIconCoupon.form.name')" class="required">
                    <el-input v-model="form.name" type="text"></el-input>
                  </el-form-item>

                  <el-form-item :label="$t('addIconCoupon.form.couponId')" class="required">
                    <p class="error" v-if="coupons.length == 0">无可用优惠券</p>
                    <el-select v-model="form.activity_coupon_id" @change="handleCouponChange" v-if="coupons.length > 0">
                      <el-option
                        v-for="item in coupons"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item :label="$t('addIconCoupon.form.detail')" v-if="coupons.length > 0">
                    <table>
                      <tbody>
                        <tr><td width="100px">{{ $t('addIconCoupon.form.content') }}</td><td>{{ computedCoupon.contentString || '--' }}</td></tr>
                        <tr><td width="100px">{{ $t('addIconCoupon.form.days') }}</td><td>{{ computedCoupon.daysString || '--' }}</td></tr>
                        <tr><td width="100px">{{ $t('addIconCoupon.form.area') }}</td><td>{{ computedCoupon.areaString || '--' }}</td></tr>
                      </tbody>
                    </table>
                  </el-form-item>

                  <el-form-item :label="$t('addIconCoupon.form.num')" class="required">
                    <el-input-number v-model="form.contentCount" :min="1" :step="1"></el-input-number>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="box" v-if="coupons.length > 0">
            <div class="box-header with-border">
              {{ $t('addIconCoupon.form.rule') }}
            </div>
            <div class="box-body">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addIconCoupon.form.mustTime')" class="required">
                  <el-input v-model.number="form.rideMinutes" type="number" :min="1">
                    <template slot="append">min</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('addIconCoupon.form.limited')" class="required">
                  <el-radio-group v-model="limited">
                    <el-radio :label="1">{{ $t('addIconCoupon.form.limited1') }}</el-radio>
                    <el-input v-model.number="form.memberDays" type="number" :min="1" style="margin-bottom: 10px;" v-show="limited == 1">
                      <template slot="append">{{ $t('addIconCoupon.form.memberDays') }}</template>
                    </el-input>
                    <el-input v-model.number="form.memberTimes" type="number" :min="1" style="margin-bottom: 20px;" v-show="limited == 1">
                      <template slot="append">{{ $t('addIconCoupon.form.memberTimes') }}</template>
                    </el-input>
                    <br>

                    <el-radio :label="2">{{ $t('addIconCoupon.form.limited2') }}</el-radio>
                    <el-input v-model.number="form.memberTimes" type="number" :min="1" style="margin-bottom: 20px;" v-show="limited == 2">
                      <template slot="append">{{ $t('addIconCoupon.form.memberTimes') }}</template>
                    </el-input>
                    <br>

                    <el-radio :label="3">{{ $t('addIconCoupon.form.limited3') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="$t('addIconCoupon.form.remark')">
                  <el-input v-model="form.remark" type="textarea"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addIconCoupon.form.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      
    </div>
  </div>
</template>

<script>
import api from '../../api'
import moment from 'moment'
import { getStorage } from '../../services/auth'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption],
  mounted() {
    const editIconCoupon = sessionStorage.editIconCoupon;
    if(this.$route.name == 'editiconcoupon' && editIconCoupon) {
      this.form = JSON.parse(editIconCoupon);
      if(this.form.memberDays && this.form.memberTimes) {
        this.limited = 1;
      }
      else if(!this.form.memberDays && this.form.memberTimes) {
        this.limited = 2;
      }
      else {
        this.limited = 3;
      }
    }
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      form: {
        contentType: 3,
        countryId: 153,
        cityId: null,
        name: null,
        activity_coupon_id: null, // 
        activity_coupon_type: null, // couponType
        contentCount: null, // 优惠券数量
        rideMinutes: null,
        memberDays: null,
        memberTimes: null,
        remark: null
      },
      areaOptions: this.getAreaOnlyOptions(),
      cityOptions: [],
      thirdPartVisiable: false,
      limited: 3,
      coupons: [],
      selectedCoupon: {},
    }
  },
  computed: {
    submitDisabled() {
      return !(this.form.countryId && this.form.name && this.form.contentCount && this.form.rideMinutes && ((this.limited == 1 && this.form.memberDays && this.form.memberTimes) || (this.limited == 2 && this.form.memberTimes) || this.limited == 3));
    },
    computedCoupon() {
      return {
        ...this.selectedCoupon,
        daysString: this.selectedCoupon.endType === 1 ? this.selectedCoupon.days + ' ' + this.$t('addIconCoupon.js.day')
                  : this.selectedCoupon.endType === 2 ? moment(this.selectedCoupon.startTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(this.selectedCoupon.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
        contentString: this.selectedCoupon.benefitType === 1 ? this.$t('addIconCoupon.js.benefitType1') + ' ' + this.selectedCoupon.benefitPercent + '%' : this.selectedCoupon.benefitType === 2 ? this.$t('addIconCoupon.js.benefitType2') + ' ' + this.selectedCoupon.currencySymbol + ' ' + this.selectedCoupon.benefitMoney : '',
        areaString: (this.selectedCoupon.countryName ? this.selectedCoupon.countryName : '') + (this.selectedCoupon.cityName ? ' - ' + this.selectedCoupon.cityName : ''),
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'iconcoupon' });
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId});
      this.form.cityId = null;
      this.getCitysByCountry();
      this.getCouponsNopage();
    },
    getCitysByCountry() {
      return api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('addIconCoupon.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
      });

    },
    getCouponByCityId() {
      this.getCouponsNopage();
    },
    getCouponsNopage() {
      // couponType: 7  图标活动奖励优惠券
      const parms = {couponType: 7, countryId: this.form.countryId, cityId: this.form.cityId};
      api.getCouponsNopage(this, parms).then(coupons => {
        coupons.forEach(item => {
          item.label = item.name;
          item.value = item.id;
        })
        if(coupons.length > 0 && this.$route.name === 'addiconcoupon') {
          this.selectedCoupon = coupons[0];
          this.form.activity_coupon_id = this.selectedCoupon.id;
          this.form.activity_coupon_type = this.selectedCoupon.couponType;
        } else if(coupons.length > 0 && this.$route.name === 'editiconcoupon') {
          for(let i = 0, len = coupons.length; i < len; i++) {
            if(coupons[i].id === this.form.activity_coupon_id) {
              this.selectedCoupon = coupons[i];
              this.form.activity_coupon_type = this.selectedCoupon.couponType;
              break;
            }
          }
        }
      })
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editiconcoupon' ? false : this.handleStartDateChange(val);
    // },
    submit() {
      if(this.limited == 3) {
        this.form.memberDays = null;
        this.form.memberTimes = null;
      }
      if(this.limited == 2) {
        this.form.memberDays = null;
      }
      if(this.$route.name == 'editiconcoupon') {
        api.updateRedbag(this, this.form)
        .then(() => {
          this.$router.push({ name: 'iconcoupon'});
        });
      }
      else {
        api.saveRedbag(this, this.form)
        .then(() => {
          this.$router.push({ name: 'iconcoupon'});
        });
      }
    },
    thirdPartSubmit() {
      this.thirdPartVisiable = false;
    },
    handleCouponChange(value) {
      this.form.activity_coupon_id = value;
      for(let i = 0, len = this.coupons.length; i < len; i++) {
        if(this.coupons[i].id === value) {
          this.selectedCoupon = this.coupons[i];
          this.form.activity_coupon_type = this.selectedCoupon.couponType;
          break;
        }
      }
    },
  }
}
</script>