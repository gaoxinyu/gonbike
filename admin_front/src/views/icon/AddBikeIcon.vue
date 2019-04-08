<template>
  <div class="add-bike-icon">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ this.$route.name === 'editbikeicon' ? $t('addbikeicon.form.title0') : $t('addbikeicon.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backBikeIcon">
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
                {{ $t('addbikeicon.form.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <!-- 国家 -->
                      <el-form-item :label="$t('addbikeicon.form.countryId')" class="required">
                        <el-select v-model="form.countryId" @change="getCountryInfo" v-if="!(this.$route.name === 'editbikeicon')">
                          <el-option
                            v-for="item in areaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="form.countryName" type="text" :disabled="true" v-if="this.$route.name === 'editbikeicon'"></el-input>
                      </el-form-item>
                      <!-- 城市 -->
                      <el-form-item :label="$t('addbikeicon.form.cityId')" class="required">
                        <el-select v-model="form.cityId" @change="getBikeValidCount" :disabled="cityOptions.length === 0" v-if="!(this.$route.name === 'editbikeicon')">
                          <el-option
                            v-for="item in cityOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input v-model="form.cityName" type="text" :disabled="true" v-if="this.$route.name === 'editbikeicon'"></el-input>
                        {{ $t('addbikeicon.dialog.validnum') + ': ' + validnum }}
                      </el-form-item>
                      <!-- 开始时间 -->
                      <el-form-item :label="$t('addbikeicon.form.startDateTime')" class="required">
                        <el-date-picker 
                          v-model="dateTimeRange.startDateTime" 
                          type="datetime" 
                          :disabled="disabledStart" 
                          :picker-options="pickerStartOption" 
                          @change="handleStartDateChange"
                          :clearable="false"
                          :editable="false"
                          :placeholder="$t('addbikeicon.form.startPlaceholder')">
                        </el-date-picker>
                      </el-form-item>
                      <!-- 结束时间 -->
                      <el-form-item :label="$t('addbikeicon.form.endDateTime')" class="required">
                        <el-date-picker 
                          v-model="dateTimeRange.endDateTime" 
                          type="datetime" 
                          :picker-options="pickerEndOption" 
                          @change="handleEndDateChange" 
                          :clearable="false"
                          :editable="false"
                          :placeholder="$t('addbikeicon.form.endPlaceholder')">
                        </el-date-picker>
                      </el-form-item>
                      <!-- 状态 -->
                      <el-form-item :label="$t('addbikeicon.form.type')">
                        <el-select 
                          v-model="form.iconStatus" 
                          disabled>
                          <el-option 
                            v-for="item in typeOnlyOptions" 
                            :key="item.value" 
                            :label="item.label" 
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <!-- logo配置 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('addbikeicon.form.setting') }}
              </div>
              <div class="box-body">
                <el-button type="primary" :disabled="addDisabled" @click="addSetting" v-if="!(this.$route.name === 'editbikeicon')">{{ $t('addbikeicon.form.addSetting') }}</el-button>
                <el-row style="margin: 10px 0;">
                  <el-col :span="16" v-for="(item, index) in bikeicons" :key="index">
                    <el-card :body-style="{ padding: '10px' }">
                      <el-col :span="6">
                        <img :src="item.iconUrl" class="image">
                      </el-col>
                      <el-col :span="18" style="position: relative">
                        <el-button type="text" class="button" @click="editSetting(index)" style="position: absolute; right: 0; z-index: 2;" v-if="($route.name == 'editbikeicon')">{{$t('addbikeicon.form.edit')}}</el-button>
                        <el-form>
                          <el-form label-position="left" label-width="140px">
                            <!-- 图标名称 -->
                            <el-form-item :label="$t('addbikeicon.table.iconName')">
                              {{ item.iconName }}
                            </el-form-item>
                            <!-- 影响单车数量 -->
                            <el-form-item :label="$t('addbikeicon.table.confBikeCount')" v-show="Number.isInteger(item.currentBikeCount)">
                              {{ item.currentBikeCount }}
                            </el-form-item>

                            <div v-if="item.confType == 3">
                              <el-form-item :label="$t('addbikeicon.table.days3')" v-show="!!item.days">
                                {{ item.days }} {{ $t('addbikeicon.dialog.days') }}
                              </el-form-item>
                              <el-form-item :label="$t('addbikeicon.table.times3')" v-show="!!item.minutes">
                                {{ item.minutes }} {{ $t('addbikeicon.dialog.minutes') }}
                              </el-form-item>
                            </div>

                            <div v-if="item.confType == 4">
                              <el-form-item :label="$t('addbikeicon.table.days4')" v-show="!!item.days">
                                {{ item.days }} {{ $t('addbikeicon.dialog.days') }}
                              </el-form-item>
                              <el-form-item :label="$t('addbikeicon.table.times4')" v-show="!!item.times">
                                {{ item.times }} {{ $t('addbikeicon.dialog.times') }}
                              </el-form-item>
                            </div>
                            <!-- 奖励内容名称 -->
                            <el-form-item :label="$t('addbikeicon.table.contentName')">
                              {{ item.activityName || '' }}
                            </el-form-item>
                            <!-- <el-form-item :label="$t('addbikeicon.table.immediateEffect')" v-show="(item.confType == 3 || item.confType == 4)">
                              {{ item.immediateEffect ? $t('addbikeicon.js.yes') : $t('addbikeicon.js.no') }}
                            </el-form-item> -->
                          </el-form>
                        </el-form>
                      </el-col>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <iphone>
              <div class="bg-logo">
                <img v-if="bikeicons.length > 0 ? bikeicons[bikeicons.length-1].iconUrl : form.iconUrl" :src="bikeicons.length > 0 ? bikeicons[bikeicons.length-1].iconUrl : form.iconUrl" class="bike-logo">
              </div>
            </iphone>
          </div>
        </div>
      </div>
      <el-dialog :title="$t('addbikeicon.dialog.title')" :visible.sync="newSettingVisiable" :before-close="handleClose">
        <el-form label-position="left" label-width="100px">
          <el-form-item :label="$t('addbikeicon.dialog.validnum')">
            {{ validnum }}
          </el-form-item>
          <small class="hint">{{$t('addbikeicon.dialog.validnumHelper')}}</small>
          <el-form-item :label="$t('addbikeicon.dialog.iconName')" class="required row" style="margin-left: 0;">
            <div class="col-md-4 col-xs-12" style="padding-left: 0;">
              <el-input v-model="form.iconName"></el-input>
            </div>
          </el-form-item>
          <el-form-item :label="$t('addbikeicon.dialog.iconUrl')" class="required">
            <el-upload
              class="avatar-uploader"
              action="/api/v1/upload/file"
              :accept="iconAccepts"
              :multiple="false"
              :headers="headers"
              :show-file-list="false"
              :on-success="iconSuccess"
              :on-error="iconError">
              <img v-if="form.iconUrl" :src="form.iconUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
              <!-- <div slot="tip" class="el-upload__tip">{{$t('addbikeicon.dialog.uploadTip')}}</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('addbikeicon.dialog.confType')" class="required">
            <el-radio-group v-model="form.confType" style="width: 100%;" @change="HandleRadioChange" :disabled="(this.$route.name == 'editbikeicon')">
              <el-radio :label="1">{{ $t('addbikeicon.dialog.confType1') }}</el-radio>
              <el-radio :label="2">{{ $t('addbikeicon.dialog.confType2') }}</el-radio>
              <el-radio :label="3">{{ $t('addbikeicon.dialog.confType3') }}</el-radio>
              <el-radio :label="4">{{ $t('addbikeicon.dialog.confType4') }}</el-radio>
              <!-- <el-radio :label="5">{{ $t('addbikeicon.dialog.confType5') }}</el-radio> -->
            </el-radio-group>
            <div v-show="form.confType == 1 && ((validnum > 0 && this.$route.name != 'editbikeicon') || true)">
              <el-upload 
                ref="upload"
                action="/api/v1/promotion/icon/upload"
                name="file"
                :accept="accepts"
                :data="submit"
                :multiple="false"
                :headers="headers"
                :on-success="importsSuccess"
                :on-error="importsError"
                :on-exceed="uploadExceed"
                :auto-upload="false"
                :limit="1">
                <el-button slot="trigger" type="primary" size="small">{{ $t('addbikeicon.dialog.choose') }}</el-button>
                <div class="el-upload__tip" slot="tip">{{ $t('addbikeicon.dialog.uploadTip') }}</div>
              </el-upload>
            </div>
            <div v-show="form.confType == 2" class="row">
              <div class="col-md-6">
                <el-input v-model.number="form.confBikeCount" type="number" :min="1" style="margin-bottom: 10px;" >
                  <template slot="append">{{ $t('addbikeicon.dialog.confBikeCount') }}</template>
                </el-input>
              </div>
            </div>
            <div v-show="form.confType == 3" class="row">
              <div class="col-md-3">
                <el-input v-model.number="form.days" type="number" @blur="form.days = form.days === '' ? 0 : form.days" :min="1" style="margin-bottom: 10px;" :disabled="!!form.minutes">
                  <template slot="append">{{ $t('addbikeicon.dialog.days') }}</template>
                </el-input>
              </div>
              <div class="col-md-1">
                <div class="el-input el-input-group el-input-group--append" style="width: 30px; padding: 10px;">{{ $t('addbikeicon.dialog.or') }}</div>
              </div>
              <div class="col-md-3">
                <el-input v-model.number="form.minutes" type="number"  @blur="form.minutes = form.minutes === '' ? 0 : form.minutes" :min="1" style="margin-bottom: 10px;" :disabled="!!form.days">
                  <template slot="append">{{ $t('addbikeicon.dialog.minutes') }}</template>
                </el-input>
              </div>
              <!-- <div class="col-md-1">
                <el-checkbox v-model="form.immediateEffect" :disabled="isEdit && form.immediateEffect">{{ $t('addbikeicon.dialog.immediateEffect') }}</el-checkbox>
              </div> -->
            </div>
            <div v-show="form.confType == 4" class="row">
              <div class="col-md-3">
                <el-input v-model.number="form.days" type="number" :min="1" style="margin-bottom: 10px;">
                  <template slot="append">{{ $t('addbikeicon.dialog.days') }}</template>
                </el-input>
              </div>
              <div class="col-md-3">
                <el-input v-model.number="form.times" type="number" :min="1" style="margin-bottom: 10px;">
                  <template slot="append">{{ $t('addbikeicon.dialog.times') }}</template>
                </el-input>
              </div>
              <!-- <div class="col-md-3">
                <el-checkbox v-model="form.immediateEffect" :disabled="isEdit && form.immediateEffect">{{ $t('addbikeicon.dialog.immediateEffect') }}</el-checkbox>
              </div> -->
            </div>
              
          </el-form-item>
          <el-form-item :label="$t('addbikeicon.dialog.contentType')" class="required row" style="margin-left: 0;">
            <div class="col-md-4 col-xs-12" style="padding-left: 0;">
              <el-select v-model="form.contentType" @change="getContentName">
                <el-option
                  v-for="item in contentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item :label="$t('addbikeicon.dialog.contentName')" class="required row" style="margin-left: 0;">
            <div class="col-md-4 col-xs-12" style="padding-left: 0;">
              <el-select v-model="form.promotionActivityId" @change="handleSelectCoupon" :disabled="coupons.length == 0" :placeholder="coupons.length == 0 ? $t('fence.query.contentNamePlaceHolder0') : $t('fence.query.contentNamePlaceHolder1')">
                <el-option
                  v-for="item in coupons"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="col-md-4 col-xs-12" style="padding-left: 0;">
              {{ $t('addbikeicon.dialog.residualContentCount') }}: 
              {{ selectedCoupon.contentType === 5 && !selectedCoupon.limited ?  $t('addbikeicon.dialog.unlimited') : selectedCoupon.residualContentCount}}
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">{{ $t('addbikeicon.dialog.cancel') }}</el-button>
          <el-button type="primary" :disabled="stopSaveDisabled" :loading="loading" @click="stopAndSave">{{ $t('addbikeicon.dialog.ok') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from '../../api';
import Iphone from '../../components/Iphone';
import Mixins from '../../mixins/index.js'
import { getStorage } from '../../services/auth';
import moment from "moment";
// import ElObikeUpload from 'element-upload'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    if (this.$route.name == 'editbikeicon') {
      this.initEdit();
    }else{
      this.initAdd();
    }
  },
  data() {
    return {
      loading: false,
      isEdit: this.$route.name == 'editbikeicon',
      form: {
        id: this.$route.query.id || null,
        countryId: null,     // 国家
        cityId: null,       // 城市
        startTime: null,    // 开始时间
        endTime: null,      // 结束时间
        iconStatus: null,       // 状态
        iconName: null,     // 图标名称
        iconUrl: null,      // 图标地址
        confType: 1,     // 单车类型
        days: null,         // 天
        times: null,        // 次
        minutes: null,      // 分钟
        confBikeCount: null, // 随机数量
        currentBikeCount: null, //当前数量
        contentType: null,  // 奖励名称
        promotionActivityId: null, // 优惠券
        activityName: null,   //活动名称
        immediateEffect: true
      },
      selectedCoupon: {},
      submit: {},
      validnum: 0,
      areaOptions: this.getAreaOnlyOptions(),
      cityOptions: [],
      newSettingVisiable: false,
      accepts: '.xls, .xlsx',
      contentOptions: [
        { label: this.$t('addbikeicon.js.contentType0'), value: null },
        { label: this.$t('addbikeicon.js.contentType1'), value: 1 },
        { label: this.$t('addbikeicon.js.contentType5'), value: 5 },
      ],
      confTypeOptions: [
        { label: this.$t('addbikeicon.dialog.confType1'), value: 1 },
        { label: this.$t('addbikeicon.dialog.confType2'), value: 2 },
        { label: this.$t('addbikeicon.dialog.confType3'), value: 3 },
        { label: this.$t('addbikeicon.dialog.confType4'), value: 4 }
      ],
      coupons: [],
      // contentType: null,
      bikeicons: [],
      bikeicon: {},
      headers: { 'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : '' },
      iconAccepts: '.jpg, .png',
    }
  },
  watch: {
    'form.countryId': function(){
      if(!this.isEdit){
        this.form.contentType = null;
        this.form.promotionActivityId = null;
        this.coupons = [];
      }
    },
    'form.cityId': function(){
      if(!this.isEdit){
        this.form.contentType = null;
        this.form.promotionActivityId = null;
        this.coupons = [];
      }
    }
  },
  computed: {
    typeOnlyOptions() {
      // 根据时间动态改变可选择状态
      let curTime = (new Date()).getTime();
      if (curTime < moment(this.dateTimeRange.startDateTime).toDate().getTime()) {
        this.form.iconStatus = 0;
        return [{ label: this.$t('addbikeicon.js.status0'), value: 0 }];
      }
      else if (moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
        this.form.iconStatus = 2;
        return [{ label: this.$t('addbikeicon.js.status2'), value: 2 }];
      }
      else {
        this.form.iconStatus = 1;
        // return [{ label: this.$t('addbikeicon.js.status3'), value: 3 },
        return [{ label: this.$t('addbikeicon.js.status1'), value: 1 }];
      }
    },
    stopSaveDisabled() {
      return !(this.form.iconName && this.form.iconUrl && !!(!this.form.contentType || this.form.promotionActivityId)
        && ((this.form.confType == 1) 
        || (this.form.confType == 2 && (this.$route.name == 'addbikeicon' ? (this.form.confBikeCount > 0 && this.form.confBikeCount <= this.validnum) : true))
        || (this.form.confType == 3 && ((this.form.days > 0 && (this.form.days + '').indexOf('.') < 0) || this.form.minutes > 0))
        || (this.form.confType == 4 && this.form.days > 0 && this.form.times > 0)));
    },
    addDisabled() {
      return !(this.form.countryId 
              && this.dateTimeRange.startDateTime 
              && this.dateTimeRange.endDateTime 
              && this.validnum > 0);
    },
    BikeCount() {
      return this.$route.name === 'addbikeicon' ? this.form.confBikeCount : this.form.currentBikeCount;
    }
  },
  methods: {
    initEdit(){
      api.getBikeIconById(this, {id: this.form.id})
      .then((data) => {
        this.form = this.bikeicon;
        this.bikeicons[0] = this.bikeicon;
        this.dateTimeRange.startDateTime = this.bikeicon.startTime ? moment(this.bikeicon.startTime).toDate() : null;
        this.dateTimeRange.endDateTime = this.bikeicon.endTime ? moment(this.bikeicon.endTime).toDate() : null;

        // 编辑时，指定未骑行时间 & 骑行频率 需要立即生效
        // @update: immediateEffect永远是true
        // this.form.immediateEffect = (this.form.confType == 3) || (this.form.confType == 4);
        this.getBikeValidCount();
      });
    },
    initAdd(){
      this.getCountryInfo();
    },
    backBikeIcon() {
      this.$router.push({ name: 'bikeicon' });
    },
    getCountryInfo() {
      if(!this.form.countryId){
        return;
      }
      api.getCountryInfo(this, { id: this.form.countryId });
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      this.form.cityId = null;
      this.getBikeValidCount();
      return api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('report.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
      });
    },
    getBikeValidCount() {
      api.getBikeValidNum(this, { countryId: this.form.countryId, cityId: this.form.cityId });
    },
    // handleStartDate(val) {
    //   return this.$route.name == 'editbikeicon' ? false : this.handleStartDateChange(val);
    // },
    addSetting(index) {
      this.newSettingVisiable = true;
    },
    editSetting(index) {
      this.bikeicons[index].index = index;
      this.form = this.bikeicons[index];
      this.getContentName(this.form.contentType, true);
      this.newSettingVisiable = true;
    },
    stopAndSave() {
      // 需要重新置空一下
      if(this.form.confType !== 1) {
        this.submit = {};
      }
      this.form.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.form.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      if(this.$route.name === 'addbikeicon') {
        if(this.form.confType === 1 || this.form.confType === 3 || this.form.confType === 4) {
          this.form.confBikeCount = null;
        }else{
          this.form.currentBikeCount = this.form.confBikeCount;;
        }
      }

      const bikeicons = JSON.parse(JSON.stringify(this.form));
      
      // 过滤
      Object.keys(this.form).forEach((key) => {
        if(key == 'contentType' && this.form[key] === null){
          delete this.submit[key];
        }
        if(this.form[key] != null && key != 'index') {
          this.submit[key] = this.form[key];
        }
      });
      // 编辑
      if(this.$route.name == 'editbikeicon') {
        if(this.form.confType == 1) {
          if(this.$refs.upload.$children[0].fileList.length == 0) {
            api.updateBikeIcon(this, this.submit)
            .then((data) => {
              this.bikeicons[0] = bikeicons;
              this.newSettingVisiable = false;
              this.initEdit();
            })
            .catch((err) => {err});
          }
          this.loading = true;
          this.$refs.upload.submit();
        }
        else {
          api.updateBikeIcon(this, this.submit)
          .then((data) => {
            this.bikeicons[0] = bikeicons;
            this.newSettingVisiable = false;
            this.reset();
            this.initEdit();
          })
          .catch((err) => {err});
        }
      }
      // 新增
      else {
        if(this.form.confType == 1) {
          if(this.$refs.upload.$children[0].fileList.length == 0) {
            this.$message({ message: this.$t('addbikeicon.js.uploadWarning'), type: 'warning' });
            return;
          }
          this.loading = true;
          this.$refs.upload
          .submit();
        }
        else {
          api.saveBikeIcon(this, this.submit).then((data) => {
            this.bikeicons.push(bikeicons);
            this.getBikeValidCount();
          }).then(() => {
            this.reset();
            this.newSettingVisiable = false;
          }).catch((err) => {

          });
        }
      }
    },
    iconSuccess(response, file, fileList) {
      if(response.success) {
        this.form.iconUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'error' });
      }
    },
    iconError(err, response, file) {
    },
    importsSuccess(res) {
      this.loading = false;
      if(res.success) {
        const bikeicons = JSON.parse(JSON.stringify(this.form));
        this.$refs.upload.clearFiles();
        this.$message({ message: res.data.message, type: 'success' });
        this.rstNameUrl();
        this.reset();
        this.newSettingVisiable = false;
        if(this.$route.name == 'editbikeicon') {
          this.bikeicons[0] = bikeicons;
          this.initEdit();
        }
        else {
          this.bikeicons.push(bikeicons);
        }
      }
      else {
        this.$refs.upload.clearFiles();
        this.$message({ message: res.data.error, type: 'error' });
      }
    },
    importsError(res) {
      this.loading = false;
      this.$message({ message: this.$t('bikearea.js.failure'), type: 'error' });
      this.$refs.upload.clearFiles();
      this.newSettingVisiable = false;
    },
    uploadExceed(file, fileList) {
      // file：当前选择的文件，fileList: 已选择的文件列表
      this.$message({ message: this.$t('bikearea.js.uploadOnly'), type: 'warn' });
    },
    getContentName(val, callFromEditSetting = false) {
      this.coupons = [];
      if(!val){
        this.selectedCoupon = {};
        this.form.contentType = null;
        this.form.promotionActivityId = null;
        this.form.activityName = null;
        return;
      }
      let query = {
        contentType: this.form.contentType,
        countryId: this.form.countryId,
        cityId: this.form.cityId
      };
      api.getRedbagNopage(this, query).then(() => {
        if(callFromEditSetting) {
          this.handleSelectCoupon(this.form.promotionActivityId);
        } else {
          this.selectedCoupon = {};
          this.form.promotionActivityId = null;
          this.form.activityName = null;
        }
      });
    },
    HandleRadioChange() {
      this.form.confBikeCount = null;
      this.rstByConf();
    },
    handleSelectCoupon(couponId) {
      if(!couponId) return
      for(let i = 0; i < this.coupons.length; i++) {
        if(this.coupons[i].id === couponId) {
          this.selectedCoupon = this.coupons[i];
          this.form.activityName = this.selectedCoupon.name;
          return;
        }
      }
      this.$message({message: this.$t('addbikeicon.js.expired'), type: 'warning'});
      this.form.promotionActivityId = null;
    },
    handleClose() {
      if(this.newSettingVisiable) this.newSettingVisiable = false;
    },
    reset() {
      this.rstNameUrl();
      this.rstByConf();
      this.selectedCoupon = {};
    },
    rstNameUrl() {
      this.form.contentType = null;
      this.form.promotionActivityId = null;
      this.form.iconName = null;
      this.form.iconUrl = null;
    },
    rstByConf() {
      this.form.days = null;
      this.form.times = null;
      this.form.minutes = null;
      this.form.immediateEffect = true; 
      this.form.confBikeCount = null;
      this.form.currentBikeCount = null;
    }
  },
  components: {
    Iphone,
    // ElObikeUpload
  }
}
</script>

<style lang="scss" scoped>
.hint{
  color: #a2a4a8;
}
</style>
