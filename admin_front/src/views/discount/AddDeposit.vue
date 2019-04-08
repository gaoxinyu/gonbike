<template>
  <div class="add-activity-view">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ this.$route.name === 'adddeposit' ? $t('deposit.form.adddeposit') : $t('deposit.form.editdeposit') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backDeposit"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>

      <div class="box box-solid">
        <div class="box-body row">
          <div class="col-md-8 col-xs-12">
            <el-form label-position="left" label-width="100px">
              <!-- 基本信息 -->
              <div class="box">
                <div class="box-header with-border">
                  {{ $t('deposit.form.basic') }}
                </div>
                <div class="box-body">
                  
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.countryId')" v-if="this.$route.name === 'adddeposit'" class="required">
                        <el-select v-model="form.countryId" @change="handleChangeCoutry">
                          <el-option
                            v-for="item in areaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input
                      </el-form-item>
                      <el-form-item :label="$t('deposit.form.countryId')" v-if="this.$route.name === 'editdeposit'" class="required">
                        <el-input
                          type="text"
                          :disabled="true"
                          v-model="form.countryName">
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 col-xs-12">
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

                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.status')">
                        <el-input v-model="computedStatus" :disabled="true"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  
                </div>
              </div>
              <!-- 活动配置 -->
              <div class="box">
                <div class="box-header with-border">
                  {{ $t('deposit.form.setting') }}
                </div>
                <div class="box-body">
                  <el-form-item :label="$t('deposit.form.activityType')">
                    {{ $t('deposit.form.depositType') }}
                  </el-form-item>
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.countryDeposit')">
                        <label>{{ country.currencySymbol ? country.currencySymbol : 'USD' }} {{ country.deposit ? country.deposit : '0' }}</label>
                      </el-form-item>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.deposit')">
                        <el-input v-model="form.deposit" type="number">
                          <template slot="prepend">{{ country.currencySymbol ? country.currencySymbol : 'USD' }}</template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.countryStudentDeposit')">
                        <label>{{ country.currencySymbol ? country.currencySymbol : 'USD' }} {{ country.studentDeposit ? country.studentDeposit : '0' }}</label>
                      </el-form-item>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.studentDeposit')">
                        <el-input v-model="form.studentDeposit" type="number">
                          <template slot="prepend">{{ country.currencySymbol ? country.currencySymbol : 'USD' }}</template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.remark')">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          :placeholder="$t('deposit.form.remarkTip')"
                          v-model="form.remark">
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
              <!-- APP提示设置 -->
              <div class="box" v-if="isEdit && radioChoose === 1">
                <div class="box-header with-border">
                  {{ $t('deposit.form.APPShow') }}
                </div>
                <div class="box-body">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.showHomePage')">
                        <el-radio-group v-model="radioChoose">
                          <el-radio :label="1">{{ $t('deposit.form.yes') }}</el-radio>
                          <el-radio :label="0">{{ $t('deposit.form.no') }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('deposit.form.bannerUrl')">
                        <el-upload
                          class="avatar-uploader fixed"
                          action="/api/v1/upload/file"
                          :headers="headers"
                          :show-file-list="false"
                          :multiple="false"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <img v-if="form.bannerUrl" :src="form.bannerUrl" class="avatar fixed">
                          <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                          <div slot="tip" class="el-upload__tip">{{ $t('deposit.form.upload') }}</div>
                        </el-upload>
                      </el-form-item>
                      <el-form-item :label="$t('addPushMessage.form.languages')">
                        <el-select v-model="language" @change="handleLanguageChange">
                          <el-option
                            v-for="item in languageOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-tabs v-model="currentLangTab" type="card" closable @tab-remove="removeTab">
                        <el-tab-pane
                          v-for="(item, index) in activityLanguages"
                          :key="item.language"
                          :label="$t('common.languages.' + item.language )"
                          :name="item.language"
                        >
                          <el-form-item :label="$t('addPushMessage.form.notiTitle')" :class="{'required': radioChoose === 1}">
                            <el-input v-model="item.title" type="text" :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                          </el-form-item>
                          <el-form-item :label="$t('addPushMessage.form.notiContent')" :class="{'required': radioChoose === 1}">
                            <el-input v-model="item.content" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                          </el-form-item>
                        </el-tab-pane>
                      </el-tabs>

                      <el-form-item :label="$t('deposit.form.h5Url')">
                        <el-input v-model="form.h5Url" type="text"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>

              <el-form-item>
                <el-button @click="backDeposit">{{ $t('deposit.form.cancel') }}</el-button>
                <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="xloading">{{ $t('deposit.form.submit') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api';
import Iphone from '../../components/Iphone';
// import * as Options from '../../services/options/index.js';
import Mixins from '../../mixins/index.js'
import {getStorage} from '../../services/auth';
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.language, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    const editdeposit = sessionStorage.editdeposit;
    if(this.$route.name === 'editdeposit' && editdeposit) {
      this.form = JSON.parse(editdeposit);
      for(let i = 0, langs = this.form.activityLanguages; i < langs.length; i++) {
        if(langs[i].language !== 'en') {
          this.currentLangs.push({
            id: langs[i].id,
            language: langs[i].language,
            languageName: this.$t('common.languages.' + langs[i].language),
            title: langs[i].title,
            content: langs[i].content,
            activityType: langs[i].activityType,
            activityId: langs[i].activityId,
            h5Url: langs[i].h5Url,
            createdAt: langs[i].createdAt,
            updateAt: langs[i].updateAt,
            actionType: 0
          });
        }
        this.activityLanguages.push({
          id: langs[i].id,
          language: langs[i].language,
          languageName: this.$t('common.languages.' + langs[i].language),
          title: langs[i].title,
          content: langs[i].content,
          activityType: langs[i].activityType,
          activityId: langs[i].activityId,
          h5Url: langs[i].h5Url,
          createdAt: langs[i].createdAt,
          updateAt: langs[i].updateAt,
          actionType: 0
        });
      }
      this.radioChoose = this.form.showHomePage === true ? 1 : 0;
      api.getCountryInfo(this, {id: this.form.countryId});
      this.dateTimeRange.startDateTime = this.form.startTime ? moment(this.form.startTime).toDate() : null;
      this.dateTimeRange.endDateTime = this.form.endTime ? moment(this.form.endTime).toDate() : null;
    }
    else {
      this.activityLanguages.push({
        language: 'en',
        languageName: this.$t('common.languages.' + 'en'),
        title: null,
        content: null,
        activityType: null,
        activityId: null,
        h5Url: null,
        createdAt: null,
        updateAt: null,
        actionType: 0
      });
    }
  },
  data() {
    return {
      xloading: false,
      isEdit: this.$route.name === 'editdeposit',
      form: {
        activityType: 4,  // 押金折扣
        countryId: null,
        status: null,
        startTime: null,
        endTime: null,
        deposit: null,
        studentDeposit: null,
        content: null,
        title: null,
        activityContent: null,
        h5Url: null,
        bannerUrl: null,
        showHomePage: null,
        activityLanguages: []
      },
      activityLanguages: [],
      currentLangs: [],
      country: {},
      areaOptions: this.getAreaOnlyOptions(),
      statusOnlyOptions: [
        {label: this.$t('deposit.js.status0'), value: 0},
        {label: this.$t('deposit.js.status1'), value: 1},
        {label: this.$t('deposit.js.status2'), value: 2},
      ],
      language: 'en',
      languageOptions: this.getLangOnlyOptions(),
      currentLangTab: 'en',
      radioChoose: 0,
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
    }
  },
  computed: {
    computedStatus() {
      // 根据时间动态改变状态
      let curTime = (new Date()).getTime();
      if(curTime < moment(this.dateTimeRange.startDateTime).toDate().getTime()) {
        this.form.status = 0;
        return this.$t('deposit.js.status0');
      }
      else if(moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
        this.form.status = 2;
        return this.$t('deposit.js.status2');
      }
      else {
        this.form.status = 1;
        return this.$t('deposit.js.status1');
      }
    },
    chooseFlag() {
      return !(this.statusOnlyOptions.length > 1);
    },
    submitDisabled() {
      return this.radioChoose === 1 ? !(this.form.countryId && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime && this.activityLanguages[0].title && this.activityLanguages[0].content) : !(this.form.countryId && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
    },
    isRequired() {
      return this.radioChoose === 1 ? true : false;
    }
   },
  methods: {
    backDeposit() {
      this.$router.push({name: 'deposit'});
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editdeposit' ? false : this.handleStartDateChange(val);
    // },
    handleChangeCoutry() {
      api.getCountryInfo(this, {id: this.form.countryId});
    },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.form.bannerUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'success' });
      }
    },
    uploadError() {},
    submit() {
      this.form.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.form.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      this.xloading = true;
      this.form.showHomePage = this.radioChoose === 1 ? true : false;
      this.form.title = this.activityLanguages[0].title;
      this.form.content = this.activityLanguages[0].content;
      for(let i = 0, langs = this.activityLanguages.filter(item => item.language != 'en'); i < langs.length; i++) {
        if(!langs[i].id) {
          this.currentLangs.push({
            language: langs[i].language,
            languageName: this.$t('common.languages.' + langs[i].language),
            title: langs[i].title,
            content: langs[i].content,
            activityType: langs[i].activityType,
            activityId: langs[i].activityId,
            h5Url: langs[i].h5Url,
            createdAt: langs[i].createdAt,
            updateAt: langs[i].updateAt,
            actionType: 1
          })
        }
        else {
          this.currentLangs.push({
            id: langs[i].id,
            language: langs[i].language,
            languageName: this.$t('common.languages.' + langs[i].language),
            title: langs[i].title,
            content: langs[i].content,
            activityType: langs[i].activityType,
            activityId: langs[i].activityId,
            h5Url: langs[i].h5Url,
            createdAt: langs[i].createdAt,
            updateAt: langs[i].updateAt,
            actionType: 0
          })
        }
      }
      this.form.activityLanguages = this.currentLangs;
      if(this.$route.name === 'adddeposit') {
        api.saveActivity(this, this.form).then(() => this.$router.push({name: "deposit"}));
      } else if (this.$route.name === 'editdeposit') {
        api.updateActivity(this, this.form).then(() => this.$router.push({name: "deposit"}));
      }
    },
    stopAndSave() {
      const card = {...this.form, conflict: true};
      if(this.$route.name === 'adddeposit') {
        api.saveCard(this, card).then(() => this.$router.push({name: "deposit"}));
      } else if (this.$route.name === 'editdeposit') {
        api.updateCard(this, card).then(() => this.$router.push({name: "deposit"}));
      }
    },
    handleLanguageChange(lang) {
      if(this.activityLanguages.map(m => m.language).indexOf(lang) >= 0) {

      } else {
        const langs = {
          language: lang,
          languageName: this.$t('common.languages.' + lang),
          title: '',
          content: '',
          activityType: null,
          activityId: null,
          h5Url: null,
          createdAt: null,
          updateAt: null
        }
        this.$set(this.activityLanguages, this.activityLanguages.length, langs);

      }
      this.currentLangTab = lang;
    },
    removeTab(lang) {
      if(lang === 'en') {
        return false;
      }
      if(this.activityLanguages.length > 1) {
        this.activityLanguages = this.activityLanguages.filter(langs => langs.language !== lang);
        for(let i = 0, cl = this.currentLangs; i < cl.length; i++) {
          if(cl[i].language === lang) {
            cl[i].actionType = 2;
          }
        }
        if(lang === this.currentLangTab) {
          this.language = this.currentLangTab = this.activityLanguages[0].language;
        }
      }
    },
  }
}
</script>
<style>
.add-activity-view .fixed {
  width: 330px;
}
</style>
