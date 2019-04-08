<template>
  <div class="ad-add-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('adadd.query.title'+ $route.params.id) }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form label-position="left" label-width="120px">
              <el-form-item :label="$t('adadd.form.type')">
                {{ $t('adadd.query.type' + $route.params.id) }}
              </el-form-item>

              <el-form-item :label="$t('adadd.form.name')" class="required">
                <el-select v-model="advert.name" :disabled="this.$route.params.id == 5">
                  <el-option
                    v-for="item in nameOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.countryId')" class="required">
                <el-select v-model="advert.countryId" :disabled="$route.name === 'editad'">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.startDateTime')" class="required">
                <el-date-picker
                  v-model="dateTimeRange.startDateTime"
                  type="datetime"
                  :picker-options="pickerStartOption"
                  :disabled="disabledStart"
                  @change="handleStartDateChange"
                  :clearable="false"
                  :editable="false"
                  :placeholder="$t('adadd.form.startPlaceholder')">
                </el-date-picker>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.endDateTime')" class="required">
                <el-date-picker
                  v-model="dateTimeRange.endDateTime"
                  type="datetime"
                  :picker-options="pickerEndOption"
                  @change="handleEndDateChange"
                  :clearable="false"
                  :editable="false"
                  :placeholder="$t('adadd.form.endPlaceholder')">
                </el-date-picker>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.status')" class="required">
                <el-input v-model="computedStatus" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.icon')" class="required" v-if="$route.params.id == 4">
                <el-upload
                  class="avatar-uploader"
                  action="/api/v1/upload/file"
                  :accept="accepts"
                  :headers="headers"
                  :show-file-list="false"
                  :multiple="false"
                  :on-success="iconSuccess"
                  :on-error="iconError">
                  <img v-if="advert.icon" :src="advert.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                  <div slot="tip" class="el-upload__tip">{{$t('adadd.form.uploadTip') + $t('adadd.form.uploadTipHeightAndWidth'+'.icon')}}</div>
                </el-upload>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.iconpos')" class="required" v-if="$route.params.id == 4">
                <el-row :gutter="10">
                  <el-col :xs="8" :sm="6" :lg="3">
                    {{ $t('adadd.form.latLabel') }}
                  </el-col>
                  <el-col :xs="4" :sm="6" :lg="9">
                    <el-input v-model="advert.iconLatitude" type="text" :placeholder="$t('adadd.form.latiPlaceholder')"></el-input>
                    <p class="error" v-show="isLatitude(advert.iconLatitude)">{{ $t('adadd.form.isNotLat') }}</p>
                  </el-col>
                </el-row>
                <el-row :gutter="10" style="margin-left: 0;">
                  <el-col :xs="8" :sm="6" :lg="3">
                    {{ $t('adadd.form.longLabel') }}
                  </el-col>
                  <el-col :xs="4" :sm="6" :lg="9">
                    <el-input style="margin-right: -2px;" v-model="advert.iconLongitude" type="text" :placeholder="$t('adadd.form.longPlaceholder')"></el-input>
                    <p class="error" v-show="isLongitude(advert.iconLongitude)">{{ $t('adadd.form.isNotLong') }}</p>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.iconPop')" class="required" v-if="$route.params.id == 4">
                <el-radio-group v-model="advert.iconPop">
                  <el-radio :label="true">{{ $t('adadd.form.yes') }}</el-radio>
                  <el-radio :label="false">{{ $t('adadd.form.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.repeatTimes')" class="required" v-if="$route.params.id == 1 || $route.params.id == 2 || $route.params.id == 5">
                <el-radio-group v-model="advert.repeatTimes" :disabled="$route.params.id == 5">
                  <el-radio :label="0">{{ $t('adadd.form.yes') }}</el-radio>
                  <el-radio :label="1">{{ $t('adadd.form.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.repeatHours')" class="required" v-if="$route.params.id == 5">
                <el-input type="number" v-model.number="advert.time">
                  <template slot="append">{{ $t('adadd.form.repeatUnit') }}</template>
                </el-input>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.subType')" class="required" v-if="$route.params.id == 1">
                <el-select v-model="advert.subType">
                  <el-option
                    v-for="item in subTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.upload')" class="required" v-if="!($route.params.id == 4 && !advert.iconPop || $route.params.id == 5)">
                <el-upload
                  class="avatar-uploader"
                  action="/api/v1/upload/file"
                  :accept="accepts"
                  :headers="headers"
                  :show-file-list="false"
                  :multiple="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError">
                  <img v-if="advert.picture" :src="advert.picture" style="width: 200px; height: auto; display: block;">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                  <div slot="tip" class="el-upload__tip">{{$t('adadd.form.uploadTip') + $t('adadd.form.uploadTipHeightAndWidth.type'+ $route.params.id + '_' + advert.subType)}}</div>
                </el-upload>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.jumpType')" class="required" v-if="!($route.params.id == 4 && !advert.iconPop)">
                <el-select v-model="advert.jumpType" :disabled="this.$route.params.id == 5">
                  <el-option
                    v-for="item in jumpTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('adadd.form.link')"  class="required" v-if="advert.jumpType">
                <el-input v-model="advert.h5jumpTo" type="text" :placeholder="$t('adadd.form.linkPlaceholder')" v-if="advert.jumpType == 1"></el-input>
                <el-select v-model="advert.innerJumpTo" v-if="advert.jumpType == 2">
                  <el-option
                    v-for="item in jumpToOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input v-model="advert.appStoreAndroid" type="text" :placeholder="$t('adadd.form.androidPlaceholder')" v-if="advert.jumpType == 3"></el-input>
                <el-input v-model="advert.appStoreIos" type="text" :placeholder="$t('adadd.form.iosPlaceholder')" v-if="advert.jumpType == 3"></el-input>
                <p class="error" v-if="advert.jumpType == 3">{{ $t('adadd.js.linkTip') }}</p>
              </el-form-item>

              <el-form-item :label="$t('adadd.form.languages')" v-if="!((advert.subType == 2 && $route.params.id == 1) || (!advert.iconPop && $route.params.id == 4) || $route.params.id == 3 || $route.params.id == 5)">
                <el-select v-model="language" @change="handleLanguageChange">
                  <el-option
                    v-for="item in languageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-tabs v-model="currentLangTab" type="card" closable @tab-remove="removeTab" @tab-click="handleTabClick(currentLangTab)" v-show="!((advert.subType == 2 && $route.params.id == 1) || (!advert.iconPop && $route.params.id == 4) || $route.params.id == 3 || $route.params.id == 5)">
                <el-tab-pane
                  v-for="item in advert.languages"
                  :key="item.language"
                  :label="$t('common.languages.' + item.language )"
                  :name="item.language">
                  <el-form-item :label="$t('adadd.form.title')"  class="required">
                    <el-input v-model="item.title" type="text" :placeholder="$t('adadd.form.titlePlaceholder')"></el-input>
                    <p class="error">{{ item.title ? item.title.length : 0 }} / 30</p>
                  </el-form-item>
                  <el-form-item :label="$t('adadd.form.content')"  class="required">
                    <el-input v-model="item.content" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" :placeholder="$t('adadd.form.contentPlaceholder')"></el-input>
                    <p class="error">{{ item.content ? item.content.length : 0 }} / 80</p>
                  </el-form-item>
                </el-tab-pane>
              </el-tabs>
              
              <el-form-item>
                <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addMessage.form.submit') }}</el-button>
                <el-button>{{ $t('addMessage.form.cancel') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="col-md-6 col-xs-12">
            <iphone v-if="$route.params.id != 5">
              <div class="mask iphone-notify center">
                <div>
                  <div class="box box-solid">
                    <div class="box-body">
                      <img v-show="advert.picture" :src="advert.picture" />
                      <h5 class="text-center" v-if="!((advert.subType == 2 && $route.params.id == 1) || (!advert.iconPop && $route.params.id == 4) || $route.params.id == 3)">{{ advert.languages.length > 0 ? (advert.languages[currentIndex].title || $t('adadd.form.mTitle')) : $t('adadd.form.mTitle') }}</h5>
                      <p v-if="!((advert.subType == 2 && $route.params.id == 1) || (!advert.iconPop && $route.params.id == 4) || $route.params.id == 3)">{{ advert.languages.length > 0 ? (advert.languages[currentIndex].content || $t('adadd.form.mContent')) : $t('adadd.form.mContent') }}</p>
                    </div>
                  </div>
                  <div class="close-model text-center"><i class="fa fa-close"></i></div>
                </div>
              </div>
            </iphone>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import api from '../../api'
import {getStorage} from '../../services/auth'
import Mixins from '../../mixins/index.js'
import Iphone from '../../components/Iphone'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.language, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    const editad = sessionStorage.editad;
    if(this.$route.name === 'editad' && editad) {
      const advert = JSON.parse(editad);
      // 公共部分
      this.advert.id = advert.id;
      this.advert.type = advert.type;
      this.advert.name = advert.name;
      this.advert.countryId = advert.countryId;
      this.dateTimeRange.startDateTime = advert.startTime ? moment(advert.startTime).toDate() : null;
      this.dateTimeRange.endDateTime = advert.endTime ? moment(advert.endTime).toDate() : null;
      this.advert.picture = advert.picture;
      this.advert.time = advert.time;
      
      // 1, 2
      if(this.$route.params.id == 1 || this.$route.params.id == 2) {
        this.advert.repeatTimes = advert.repeatTimes;
      }
      if(this.$route.params.id == 1) {
        this.advert.subType = advert.subType;
      }
      this.advert.jumpType = advert.jumpType;
      // jumpType跳转类型
      if(advert.jumpType == 1) {
        // H5
        this.advert.h5jumpTo = advert.jumpTo;
      }
      else if(advert.jumpType == 2) {
        // 应用内页面
        this.advert.innerJumpTo = advert.jumpTo;
      }
      else if(advert.jumpType == 3) {
        // 应用商店
        this.advert.appStoreAndroid = advert.appStoreAndroid;
        this.advert.appStoreIos = advert.appStoreIos;
      }
      // !1.2
      if(!(this.$route.params.id == 1 && advert.subType == 2)) {
        // 防止语言模板切换时出现无法读取问题
        this.advert.languages = advert.languages.length > 0 ? advert.languages : [{
          language: 'default',
          languageName: this.$t('common.languages.default'),
          title: null,
          content: null,
        }];
        // 4
        if(this.$route.params.id == 4) {
          this.advert.icon = advert.icon;
          this.advert.iconPop = advert.iconPop;
          this.advert.iconLatitude = advert.iconLatitude;
          this.advert.iconLongitude = advert.iconLongitude;
        }
        // 3
        if(this.$route.params.id == 3) {
          this.advert.languages = [];
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      // 辅助全量
      advert: {
        type: this.$route.params.id,  // 广告位类型
        name: this.$route.params.id == 5 ? 2 : null,                   // 活动名称
        countryId: null,              // 投放国家
        startTime: null,              // 开始时间
        endTime: null,                // 结束时间
        status: null,                 // 广告位状态
        icon: null,                   // 图标
        iconLatitude: null,           // 图标位置经度
        iconLongitude: null,          // 图标位置纬度
        iconPop: true,                // 点击图标是否弹窗
        repeatTimes: 0,               // 是否重复展示
        subType: 1,                   // 模板类型
        picture: null,                // 广告位图片
        jumpType: this.$route.params.id == 5 ? 1 : null,               // 跳转类型
        h5jumpTo: null,               // h5跳转链接
        innerJumpTo: null,            // 应用内页面
        appStoreAndroid: null,        // 应用商店 － 安卓
        appStoreIos: null,            // 应用商店 － iOS
        time: 8,                      // 重复周期
        languages: [
          {
            language: 'default',
            languageName: this.$t('common.languages.default'),
            title: null,
            content: null,
          }
        ]                 // 语言配置
      },
      // 提交
      query: {

      },
      nameOptions: [
        { label: this.$t('adadd.js.name1'), value: 1 },
        { label: this.$t('adadd.js.name2'), value: 2 },
        { label: this.$t('adadd.js.name3'), value: 3 },
        { label: this.$t('adadd.js.name4'), value: 4 },
        { label: this.$t('adadd.js.name5'), value: 5 },
        { label: this.$t('adadd.js.name6'), value: 6 }
      ],
      areaOptions: this.getAreaOnlyOptions(),
      subTypeOptions: [
        { label: this.$t('adadd.js.subType1'), value: 1 },
        { label: this.$t('adadd.js.subType2'), value: 2 },
      ],
      language: 'default',
      languageOptions: this.getLangOnlyOptions(),
      currentLangTab: 'default',
      currentIndex: 0,
      jumpTypeOptions: [
        { label: this.$t('adadd.js.empty'), value: null },
        { label: this.$t('adadd.js.jumpType1'), value: 1 },
        { label: this.$t('adadd.js.jumpType2'), value: 2 },
        { label: this.$t('adadd.js.jumpType3'), value: 3 },
      ],
      jumpToOptions: ['editStudentCertification', 'rechargeMember', 'memberInfo', 'myWallet', 
            'couponList', 'invitationReward', 'myInfo'].map(page => { return {label: this.$t('adadd.js.' + page), value: page} }),
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      accepts: '.jpg, .png',
    }
  },
  computed: {
    computedStatus() {
      // 根据时间动态改变状态
      let curTime = (new Date()).getTime();
      if(curTime < moment(this.dateTimeRange.startDateTime).toDate().getTime()) {
        this.advert.status = 2;
        return this.$t('adadd.js.status2');
      }
      else if(moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
        this.advert.status = 3;
        return this.$t('adadd.js.status3');
      }
      else {
        this.advert.status = 1;
        return this.$t('adadd.js.status1');
      }
    },
    submitDisabled() {
      let advert = this.advert;
      // 公共
      let common = advert.name && advert.countryId && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime;
      // jumpType
      let jumpType = (advert.jumpType == 1 && advert.h5jumpTo)        // H5, 链接必填
                   || (advert.jumpType == 2 && advert.innerJumpTo)    // 应用内, 链接必填
                   || (advert.jumpType == 3 && (advert.appStoreAndroid || advert.appStoreIos))   // 应用商店, 安卓或iOS
                   || !advert.jumpType;  // 无
      // justForth
      let justForth = (advert.icon && advert.iconLongitude && advert.iconLatitude) 
                    && (!advert.iconPop || advert.iconPop && advert.languages[0].title && advert.languages[0].content && advert.picture);

      // type = 1
      if(advert.type == 1) {
        return !(((advert.subType == 1 && advert.languages[0].title && advert.languages[0].content) || (advert.subType == 2)) && common && jumpType && advert.picture);
      }
      // type = 2
      if(advert.type == 2) {
        return !(common && jumpType && advert.picture && advert.languages[0].title && advert.languages[0].content);
      }
      // type = 3
      if(advert.type == 3) {
        return !(common && jumpType && advert.picture)
      }
      // type = 4
      if(advert.type == 4) {
        return !(common && jumpType && justForth);
      }

      if(advert.type == 5) {
        return !(common && jumpType && advert.time > 0 && parseInt(advert.time, 10) === advert.time);
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({'name': 'adarea'});
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editad' ? false : this.handleStartDateChange(val);
    // },
    handleLanguageChange(lang) {
      if(this.advert.languages.map(m => m.language).indexOf(lang) >= 0) {

      } else {
        const langs = {
          language: lang,
          languageName: this.$t('common.languages.' + lang),
          title: null,
          content: null,
        }
        this.$set(this.advert.languages, this.advert.languages.length, langs);

      }
      this.currentLangTab = lang;
      let langs = this.advert.languages;
      for(let i = 0; i < langs.length; i++) {
        if(langs[i].language == lang) {
          this.currentIndex = i;
          break;
        }
      }
    },
    removeTab(lang) {
      if(lang === 'default') {
        return false;
      }
      if(this.advert.languages.length > 1) {
        this.advert.languages = this.advert.languages.filter(langs => langs.language !== lang);
        if(lang === this.currentLangTab) {
          this.language = this.currentLangTab = this.advert.languages[0].language;
        }
      }
    },
    handleTabClick(current) {
      this.language = current;
      let langs = this.advert.languages;
      for(let i = 0; i < langs.length; i++) {
        if(langs[i].language == current) {
          this.currentIndex = i;
          break;
        }
      }
    },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.advert.picture = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'error' });
      }
    },
    uploadError(err, response, file) {

    },
    iconSuccess(response, file, fileList) {
      if(response.success) {
        this.advert.icon = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'error' });
      }
    },
    iconError(err, response, file) {

    },
    submit() {
      // 公共部分
      this.query.type = this.advert.type;
      this.query.name = this.advert.name;
      this.query.countryId = this.advert.countryId;
      this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      this.query.picture = this.advert.picture;
      this.query.time = this.advert.time;
      
      // 1, 2, 5
      if(this.$route.params.id == 1 || this.$route.params.id == 2 || this.$route.params.id == 5) {
        this.query.repeatTimes = this.advert.repeatTimes;
        if(this.$route.params.id == 1) {
          this.query.subType = this.advert.subType;
        }
      }
      this.query.jumpType = this.advert.jumpType;
      // jumpType跳转类型
      if(this.advert.jumpType == 1) {
        // H5
        this.query.jumpTo = this.advert.h5jumpTo;
      }
      else if(this.advert.jumpType == 2) {
        // 应用内页面
        this.query.jumpTo = this.advert.innerJumpTo;
      }
      else if(this.advert.jumpType == 3) {
        // 应用商店
        this.query.appStoreAndroid = this.advert.appStoreAndroid;
        this.query.appStoreIos = this.advert.appStoreIos;
      }
      // !1.2
      if(!(this.$route.params.id == 1 && this.advert.subType == 2)) {
        this.query.languages = this.advert.languages;
        // 4
        if(this.$route.params.id == 4) {
          this.query.icon = this.advert.icon;
          this.query.iconPop = this.advert.iconPop;
          this.query.iconLatitude = this.advert.iconLatitude;
          this.query.iconLongitude = this.advert.iconLongitude;
          if(!this.advert.iconPop) {
            this.query.languages = null;
          }
        }
        // 3
        if(this.$route.params.id == 3) {
          this.query.languages = null;
        }
      }
      else {
        this.query.languages = null;
      }

      if(this.$route.name == 'editad') {
        this.query.id = this.advert.id;
        api.updateADArea(this, this.query);
      }
      else {
        api.saveADArea(this, this.query);
      }
    },
    isLongitude(val) {
      if(!val) {
        return false;
      }
      val = (typeof val == 'string') ? val : val + '';
      let rgx = /^[-\+]?((1[0-7]\d{1}|0?\d{1,2})\.\d{1,6}|180\.0{1,6})$/;
      return !val.match(rgx);
    },
    isLatitude(val) {
      if(!val) {
        return false;
      }
      val = val && (typeof val == 'string') ? val : val + '';
      let rgx = /^[-\+]?([0-8]?\d{1}\.\d{1,6}|90\.0{1,6})$/;
      return !val.match(rgx);
    }
  },
  components: {
    Iphone
  }
}
</script>