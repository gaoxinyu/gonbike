<template>
  <div class="add-reward-code">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ this.$route.name === 'rweditcode' ? $t('rweditcode.form.title') : $t('rweditcode.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backRwCode">
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
                {{ $t('rweditcode.form.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rweditcode.form.merchant')" class="required">
                        <el-select 
                          v-model="form.merchantCode" 
                          v-if="!(this.$route.name === 'rweditcode')"
                          @change="handleMerchantChange">
                          <el-option
                            v-for="item in rwmerchantOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                          </el-option>
                        </el-select>
                        <el-input v-model="form.merchantCode" type="text" :disabled="true" v-if="this.$route.name === 'rweditcode'"></el-input>
                      </el-form-item>

                      <el-form-item :label="$t('rweditcode.form.merchantCode')" class="required">
                        {{ form.merchantCode }}
                      </el-form-item>

                      <el-form-item :label="$t('rweditcode.form.countryId')">
                        <el-select 
                          v-model="form.countryId" 
                          @change="getCountryInfo" 
                          :filterable="true"
                          v-if="!(this.$route.name === 'rweditcode')">
                          <el-option
                            v-for="item in areaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="form.countryName" type="text" :disabled="true" v-if="this.$route.name === 'rweditcode'"></el-input>
                      </el-form-item>

                      <el-form-item :label="$t('rweditcode.form.cityId')">
                        <el-select v-model="form.cityId" :disabled="cityOptions.length === 0" v-if="!(this.$route.name === 'rweditcode')">
                          <el-option
                            v-for="item in cityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="form.cityName" type="text" :disabled="true" v-if="this.$route.name === 'rweditcode'"></el-input>
                      </el-form-item>

                      <el-form-item :label="$t('rweditcode.form.codeName')" class="required">
                        <el-input v-model="form.name" type="text"></el-input>
                      </el-form-item>

                      <el-form-item :label="$t('rweditcode.form.uploadExcel')" class="required">
                        <el-upload
                          action="/api/v1/upload/file"
                          :disabled='!form.merchantCode'
                          :headers="headers"
                          :multiple="false"
                          :accept="accepts"
                          :on-success="uploadFileSuccess"
                          :on-remove="handleExcelRemove"
                          :on-error="uploadError"
                          :on-exceed="uploadExceed"
                          :limit="1" ref="excelUploader">
                          <el-button slot="trigger" type="primary" size="small" :disabled='!form.merchantCode'>{{ $t('rweditcode.form.choose') }}</el-button>
                          <div class="el-upload__tip" slot="tip">{{ $t('rweditcode.js.uploadTip1') }}</div>
                        </el-upload>
                      </el-form-item>
                      
                      <el-form-item :label="$t('rweditcode.form.needPhone')" class="required">
                        <el-radio-group v-model="form.needPhone">
                          <el-radio :label="true">{{ $t('rweditcode.form.yes') }}</el-radio>
                          <el-radio :label="false">{{ $t('rweditcode.form.no') }}</el-radio>
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
                {{ $t('rweditcode.form.setting') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rweditcode.form.upload')">
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
                          <div slot="tip" class="el-upload__tip">{{$t('rweditcode.form.uploadTip')}}</div>
                        </el-upload>
                      </el-form-item>
                      <el-form-item :label="$t('rweditcode.form.logoName')">
                        <el-input type="text" v-model="form.logoName"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('rweditcode.form.link')" >
                        <el-input type="text" v-model="form.h5Url"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="backRwCode">{{ $t('rweditcode.form.cancel') }}</el-button>
                        <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('rweditcode.form.submit') }}</el-button>
                      </el-form-item>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <div class="coupon-list">
                        <div class="item">
                          <h4><span>{{ $t('rweditcode.form.default') }}</span></h4>
                          <div class="item-con">
                            <div class="left">
                              <img  class="logo" src="http://image.o.bike/image/5cd327b81d6d2b1a13eef94b147f8d00.png" />
                            </div>
                            <div class="right">
                              <h3>OBIKE{{new Date().getYear() + 1900}}</h3>
                              <p class="item-name">{{ $t('rweditcode.form.defaultLogo') }}</p>
                              <span class="detail">{{ $t('rweditcode.form.detail') }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="item">
                          <h4><span>{{ $t('rweditcode.form.set') }}</span></h4>
                          <div class="item-con">
                            <div class="left">
                              Logo
                              <img class="logo" :src="form.logoUrl" />
                            </div>
                            <div class="right">
                              <h3>OBIKE{{new Date().getYear() + 1900}}</h3>
                              <p class="item-name">{{ form.logoName || '--' }}</p>
                              <span class="detail" v-show="form.h5Url">{{ $t('rweditcode.form.detail') }}</span>
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
    const editRwCode = sessionStorage.editRwCode;
    if (this.$route.name == 'rweditcode' && editRwCode) {
      this.form = JSON.parse(editRwCode);
      this.form.fileUrl = null;
    }
    this.getMerchant();
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      selectedCoupon: {},
      form: {
        merchantCode: null,
        countryId: null,
        cityId: null,
        name: null,
        fileUrl: null,
        needPhone: false,
        logoUrl: null,
        logoName: null,
        h5Url: null
      },
      accepts: '.xls, .xlsx',
      areaOptions: this.getAreaOnlyOptions(),
      cityOptions: [],
      rwmerchantOptions: [],
      cpbymerchants: [],
      headers: { 'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : '' }
    }
  },
  computed: {
    submitDisabled() {
      return !(this.form.merchantCode 
            && (this.form.name && this.form.name.search(/\s/) < 0)
            && (this.form.fileUrl || this.$route.name == 'rweditcode')
            && (!this.form.h5Url || URL_REG.test(this.form.h5Url))
            );
    }
  },
  methods: {
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        this.form.cityId = (this.cityOptions.length > 0) ? this.cityOptions[0].value : null;
      })
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
    backRwCode() {
      this.$router.push({ name: 'rwcode' });
    },
    handleExcelRemove() {
      this.form.fileUrl = null;
    },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.form.logoUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'warning' });
      }
    },
    uploadFileSuccess(response, file, fileList) {
      if(response.success) {
        this.form.fileUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'warning' });
      }
    },
    uploadError(err, response, file) {

    },
    uploadExceed(file, fileList) {
      // file：当前选择的文件，fileList: 已选择的文件列表
      this.$message({ message: this.$t('rweditcode.js.uploadOnly'), type: 'warn' });
    },
    submit() {
      if(this.$route.name == 'rweditcode') {
        api.updateRwCode(this, this.form).then((data) => {
          if(data.data.success){
            this.$message({ message: data.data.message, type: 'success' });
          }else{
            this.$message({ message: data.data.message, type: 'warning' });
          }
          if(!data.err) this.$router.push({ name: 'rwcode' })
        });
      }
      else {
        api.saveRwCode(this, this.form).then((data) => {
          if(data.data.success){
            this.$message({ message: data.data.message, type: 'success' });
          }else{
            this.$message({ message: data.data.message, type: 'warning' });
          }
          if(!data.err) this.$router.push({ name: 'rwcode' })
        });
      }
    },
    handleMerchantChange() {
      this.$refs.excelUploader.clearFiles();
      this.form.fileUrl = null;
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
