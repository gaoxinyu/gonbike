<template>
  <div class="add-reward-coupon">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ this.$route.name === 'rweditcoupon' ? $t('rweditcoupon.form.title') : $t('rweditcoupon.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backRwCoupon">
            <i class="fa fa-mail-reply"></i>
          </button>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body row">
          <div class="col-md-8 col-xs-12">
            <!-- 基本信息 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('rweditcoupon.form.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rweditcoupon.form.merchant')" class="required">
                        <el-select
                          v-model="form.merchantCode" 
                          @change="handleMerchantChange(form.merchantCode)"
                          v-if="!(this.$route.name === 'rweditcoupon')">
                          <el-option
                            v-for="item in rwmerchantOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="form.merchantCode" type="text" :disabled="true" v-if="this.$route.name === 'rweditcoupon'"></el-input>
                      </el-form-item>

                      <el-form-item :label="$t('rweditcoupon.form.merchantCode')" class="required">
                        {{ form.merchantCode }}
                      </el-form-item>

                      <el-form-item :label="$t('rweditcoupon.form.couponId')" class="required">
                        <el-select 
                          v-model="form.rewardParameter"
                          v-if="!(this.$route.name === 'rweditcoupon')">
                          <el-option
                            v-for="item in cpbymerchants"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="form.name" type="text" v-if="this.$route.name === 'rweditcoupon'"></el-input>
                      </el-form-item>
                    </div>
                    <div class="col-md-12 col-xs-12">
                      <el-form-item :label="$t('rweditcoupon.form.couponInfo')" class="required">
                        <table>
                          <tr>
                            <td width="100px">{{ $t('rweditcoupon.js.benefitType1') +'/'+ $t('rweditcoupon.js.benefitType2') }}</td>
                            <td>{{ this.$route.name === 'rweditcoupon' ? (form.benefitTypeString + ' ' + form.benefitContent) : (computedCoupon.contentString || '--') }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('rweditcoupon.form.period') }}</td>
                            <td>{{ this.$route.name === 'rweditcoupon' ? (form.endTypeString + ' ' + form.period) : (computedCoupon.daysString || '--') }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('rweditcoupon.form.area') }}</td>
                            <td>{{ this.$route.name === 'rweditcoupon' ? (form.area) : (computedCoupon.areaString || '--') }}</td>
                          </tr>
                        </table>
                      </el-form-item>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rweditcoupon.form.needPhone')" class="required">
                        <el-radio-group v-model="form.needPhone">
                          <el-radio :label="true">{{ $t('rweditcoupon.form.yes') }}</el-radio>
                          <el-radio :label="false">{{ $t('rweditcoupon.form.no') }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                    
                  </div>
                </el-form>
              </div>
            </div>
            <!-- logo配置 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('rweditcoupon.form.setting') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rweditcoupon.form.upload')">
                        <el-upload
                          class="avatar-uploader"
                          action="/api/v1/upload/file"
                          :headers="headers"
                          :show-file-list="false"
                          :multiple="false"
                          accept="image/*"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                          <div slot="tip" class="el-upload__tip">{{$t('rweditcoupon.form.uploadTip')}}</div>
                        </el-upload>
                      </el-form-item>
                      <el-form-item :label="$t('rweditcoupon.form.couponName')">
                        <el-input type="text" v-model="form.logoName"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('rweditcoupon.form.link')">
                        <el-input type="text" v-model="form.h5Url"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="backRwCoupon">{{ $t('rweditcoupon.form.cancel') }}</el-button>
                        <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('rweditcoupon.form.submit') }}</el-button>
                      </el-form-item>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <div class="coupon-list">
                        <div class="item">
                          <h4><span>{{ $t('rweditcoupon.form.default') }}</span></h4>
                          <div class="item-con">
                            <div class="left">
                              <img  class="logo" src="http://image.o.bike/image/5cd327b81d6d2b1a13eef94b147f8d00.png" />
                            </div>
                            <div class="right">
                              <h3>$<span>3.00</span></h3>
                              <p class="item-name">oBike Coupon</p>
                              <p class="item-date">{{ $t('rweditcoupon.form.couponTime') }}</p>
                              <span class="detail">{{ $t('rweditcoupon.form.detail') }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="item">
                          <h4><span>{{ $t('rweditcoupon.form.set') }}</span></h4>
                          <div class="item-con">
                            <div class="left">
                              Logo
                              <img class="logo" :src="form.logoUrl" />
                            </div>
                            <div class="right">
                              <h3>{{ this.$route.name === 'rweditcoupon' ? (form.benefitTypeString + ' ' + (form.benefitContent ? form.benefitContent.split(' ')[0] : '')) : (computedCoupon.sampleContentString || '--') }}</h3>
                              <p class="item-name">{{ form.logoName || '--' }}</p>
                              <p class="item-date">{{ this.$route.name === 'rweditcoupon' ? form.periodSampleForEditOrInfo : (computedCoupon.daysString || '--') }}</p>
                              <span class="detail" v-show="form.h5Url">{{ $t('rweditcoupon.form.detail') }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api';
import Iphone from '../../components/Iphone';
import Mixins from '../../mixins/index.js'
import { getStorage } from '../../services/auth';
import moment from "moment";
import { URL_REG } from '../../utils/regex';
// import ElObikeUpload from 'element-upload'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    const editRwCoupon = sessionStorage.editRwCoupon;
    this.getMerchant();
    if (this.$route.name == 'rweditcoupon' && editRwCoupon) {
      this.form = JSON.parse(editRwCoupon);
    }
  },
  data() {
    return {
      loading: false,
      form: {
        merchantCode: null,
        rewardParameter: null,
        needPhone: false,
        logoUrl: null,
        logoName: null,
        h5Url: null
      },
      selectedCoupon: null,
      rwmerchantOptions: [],
      cpbymerchants: [],
      headers: { 'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : '' }
    }
  },
  computed: {
    isAdd() {
      return this.$route.name === 'rwaddcoupon'
    },
    computedCoupon() {
      return {
        ...this.selectedCoupon,
        daysString: !this.selectedCoupon ? '' : this.selectedCoupon.endType === 1 ? this.selectedCoupon.days + ' ' + this.$t('rweditcoupon.js.day')
                  : this.selectedCoupon.endType === 2 ? moment(this.selectedCoupon.startTime).format("YYYY-MM-DD") + ' ~ ' + moment(this.selectedCoupon.endTime).format("YYYY-MM-DD") : '',
        contentString: this.getContentString(),
        areaString: !this.selectedCoupon ? '' : (this.selectedCoupon.countryName ? this.selectedCoupon.countryName : '') + (this.selectedCoupon.cityName ? ' - ' + this.selectedCoupon.cityName : ''),
        sampleContentString: this.getSampleContentString()
      }
    },
    submitDisabled() {
      return !((this.selectedCoupon || (this.form.name && this.form.name.search(/\s/) < 0)) 
                && (!this.form.h5Url || URL_REG.test(this.form.h5Url))
              );
    }
  },
  watch: {
    form: {
      handler(newVal) {
        this.selectedCoupon = this.cpbymerchants.find(coupon => {
          return coupon.rewardParameter === this.form.rewardParameter
        })
      },
      deep: true
    }
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
    getSampleContentString() {
      if(!this.selectedCoupon){
        return '';
      }
      let res = "";
      if(this.selectedCoupon.benefitType === 1 ){
        //折扣
        res += this.$t('rweditcoupon.js.benefitType1');
        if(this.selectedCoupon.randomPromotion){
          res += (this.selectedCoupon.maxPromotion || 0) + '%'
        }else{
          res += (this.selectedCoupon.benefitPercent || 0) + '%'
        }
      }else if(this.selectedCoupon.benefitType === 2 ){
        //金额
        res += this.$t('rweditcoupon.js.benefitType2');
        let currencySymbol = this.selectedCoupon.currencySymbol || '$';
        if(this.selectedCoupon.randomPromotion){
          res += currencySymbol + (this.selectedCoupon.maxPromotion || 0);
        }else{
          res += currencySymbol + (this.selectedCoupon.benefitMoney || 0);
        }
      }
      return res
    },
    getMerchant() {
      api.getMerchant(this).then(rwmerchants => {
        this.rwmerchantOptions = this.rwmerchants.map(rwmerchant => {
          return {
            label: rwmerchant.name,
            value: rwmerchant.merchantCode
          }
        });
      });
    },
    handleMerchantChange(merchantCode) {
      api.getCouponByMerchant(this, {merchantCode: merchantCode}).then(cpbymerchants => {
        cpbymerchants.forEach(item => {
          item.label = item.name;
          item.value = item.rewardParameter;
        });
        this.form.rewardParameter = null;
        this.selectedCoupon = null;
      });
    },
    backRwCoupon() {
      this.$router.push({ name: 'rwcoupon' });
    },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.form.logoUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'warning' });
      }
    },
    uploadError(err, response, file) {

    },
    submit() {
      if(this.$route.name == 'rweditcoupon') {
        api.updateRwCoupon(this, this.form).then(() => this.$router.push({ name: 'rwcoupon' }));
      }
      else {
        api.saveRwCoupon(this, Object.assign(this.selectedCoupon, this.form)).then(() => this.$router.push({ name: 'rwcoupon' }));
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar, .avatar-uploader-icon{
  width: 110px;
  height: 110px;
}
</style>
