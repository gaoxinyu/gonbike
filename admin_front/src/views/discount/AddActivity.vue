<template>
  <div class="add-activity-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('addActivity.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="100px">
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('addActivity.form.countryId')">
                <el-select v-model="query.countryId" @change="getCountryInfo"
                           v-if="this.$route.name !== 'editactivity'">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input v-model="query.countryName" type="text" :disabled="true"
                          v-if="this.$route.name === 'editactivity'"></el-input>
              </el-form-item>

              <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
                <el-date-picker
                  v-model="dateTimeRange.startDateTime"
                  type="datetime"
                  :picker-options="pickerStartOption"
                  :disabled="disabledStart"
                  :clearable="false"
                  :editable="false"
                  @change="handleStartDateChange"
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

              <el-form-item :label="$t('addActivity.form.type')">
                {{ $t('addActivity.form.typeName') }}
              </el-form-item>

              <el-form-item :label="$t('addActivity.form.backMoneys')">
                <p v-for="(num, index) in nums" :key="index">
                  <el-input v-model="backMoneys[index]" type="number">
                    <template slot="prepend">{{ $t('addActivity.form.charge') }} {{ num }} {{ country.currency }} {{
                      $t('addActivity.form.give') }}
                    </template>
                    <template slot="append">{{ country.currency }}</template>
                  </el-input>
                </p>
              </el-form-item>
            </div>

            <div class="col-md-4 col-xs-12">
              <iphone v-if="isEdit && radioChoose === 1">
                <div class="mask iphone-notify center">
                  <div>
                    <div class="box box-solid">
                      <div class="box-body">
                        <img v-show="query.bannerUrl" :src="query.bannerUrl" alt="">
                        <h5 class="text-center">{{ query.title || $t('addActivity.form.mTitle') }}</h5>
                        <p>{{ query.content || $t('addActivity.form.mContent') }}</p>
                      </div>
                    </div>
                    <div class="close-model text-center"><i class="fa fa-close"></i></div>
                  </div>
                </div>
              </iphone>
            </div>

            <div class="col-md-4 col-xs-12">

            </div>
          </div>

          <div class="row" v-if="isEdit && radioChoose === 1">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('deposit.form.showHomePage')">
                <el-radio-group v-model="radioChoose">
                  <el-radio :label="1">{{ $t('deposit.form.yes') }}</el-radio>
                  <el-radio :label="0">{{ $t('deposit.form.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('addActivity.form.bannerUrl')">
                <img v-if="query.bannerUrl" :src="query.bannerUrl" width="50%">
                <el-upload
                  action="/api/v1/upload/file"
                  :headers="headers"
                  :multiple="false"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError">
                  <el-button size="small" type="primary">{{ $t('addActivity.form.upload') }}</el-button>
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
                    <el-input v-model="item.title" type="text"
                              :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('addPushMessage.form.notiContent')" :class="{'required': radioChoose === 1}">
                    <el-input v-model="item.content" type="textarea" :autosize="{ minRows: 6, maxRows: 10}"
                              :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                  </el-form-item>
                </el-tab-pane>
              </el-tabs>

              <el-form-item :label="$t('addActivity.form.h5Url')">
                <el-input v-model="query.h5Url" type="text"></el-input>
              </el-form-item>
            </div>

            <div class="col-md-4 col-xs-12">
            </div>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled || backMoneyDisabled"
                       :loading="loading">{{
              $t('addActivity.form.submit') }}
            </el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../api"
  import moment from "moment"
  import {getStorage} from '../../services/auth'
  import Iphone from '../../components/Iphone'
  import Mixins from '../../mixins/index.js'

  export default {
    mixins: [Mixins.country, Mixins.language, Mixins.pickerStartOption],
    mounted() {
      const activity = sessionStorage.activity;
      if (this.$route.name === 'editactivity' && activity) {
        this.query = JSON.parse(activity);
        for (let i = 0, langs = this.query.activityLanguages; i < langs.length; i++) {
          if (langs[i].language !== 'en') {
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
        this.radioChoose = this.query.showHomePage === true ? 1 : 0;
        this.dateTimeRange.startDateTime = this.query.startTime ? moment(this.query.startTime).toDate() : null;
        this.dateTimeRange.endDateTime = this.query.endTime ? moment(this.query.endTime).toDate() : null;
        this.backMoneys = this.query.backMoney ? this.query.backMoney.split('|').map(money => +money) : [];
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
      this.getCountryInfo();
    },
    data() {
      return {
        loading: false,
        nums: [],
        backMoneys: [],
        country: {},
        citys: [],
        isEdit: this.$route.name === 'editactivity',
        query: {
          activityType: 1,
          countryId: 153,
          startTime: null,
          endTime: null,
          backMoney: null,
          bannerUrl: null,
          content: null,
          title: null,
          h5Url: null,
          activityLanguages: []
        },
        activityLanguages: [],
        currentLangs: [],
        subjectOptions: [],
        cityOptions: [],
        areaOptions: this.getAreaOnlyOptions(),
        language: 'en',
        languageOptions: this.getLangOnlyOptions(),
        currentLangTab: 'en',
        radioChoose: 0,
        headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      }
    },
    computed: {
      submitDisabled() {
        return this.radioChoose === 1 ? !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime
          && this.activityLanguages[0].title && this.activityLanguages[0].content) : !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
      },
      backMoneyDisabled() {
        return !this.backMoneys.some((item) => {
          if (+item !== 0) {
            return true
          }
        })
      },
      isRequired() {
        return this.radioChoose === 1 ? true : false;
      }
    },
    methods: {
      goBack() {
        this.$router.push({name: 'activity'});
      },
      submit() {
        this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
        this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
        this.query.showHomePage = this.radioChoose === 1 ? true : false;
        // this.query.backMoney = this.backMoneys.filter(m => !!m).join('|');
        this.query.backMoney = this.backMoneys.join('|');
        this.query.title = this.activityLanguages[0].title;
        this.query.content = this.activityLanguages[0].content;
        for (let i = 0, langs = this.activityLanguages.filter(item => item.language != 'en'); i < langs.length; i++) {
          if (!langs[i].id) {
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
        this.query.activityLanguages = this.currentLangs;
        if (this.$route.name === 'addactivity') {
          api.saveActivity(this, this.query).then(() => this.$router.push({name: "activity"}));
        } else if (this.$route.name === 'editactivity') {
          api.updateActivity(this, this.query).then(() => this.$router.push({name: "activity"}));
        }
      },
      getCountryInfo() {
        api.getCountryInfo(this, {id: this.query.countryId}).then(country => {
          if (country && country.topUpStandard) {
            this.nums = country.topUpStandard ? country.topUpStandard.split('|') : [];
            if (this.$route.name === 'addactivity') {
              let backMoneysArr = [];
              const numsLenght = this.nums.length;
              for (let i = 0; i < numsLenght; i++) {
                backMoneysArr.push(0)
              }
              this.backMoneys = backMoneysArr
            }
          }
        });
        // this.getCitysByCountry();
      },
      getCitysByCountry() {
        api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
          this.cityOptions = this.citys.map(city => {
            return {
              label: city.name,
              value: city.id,
            }
          });
          this.query.cityId = this.cityOptions.length > 0 ? this.cityOptions[0].value : null;
        })
      },
      // handleStartDate(val) {
      //   return this.$route.name === 'editactivity' ? false : this.handleStartDateChange(val);
      // },
      uploadSuccess(response, file, fileList) {
        if (response.success) {
          this.query.bannerUrl = response.data.message;
        } else {
          this.$message({message: response.data.message, type: 'success'});
        }
      },
      uploadError(err, response, file) {

      },
      handleLanguageChange(lang) {
        if (this.activityLanguages.map(m => m.language).indexOf(lang) >= 0) {

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
            updateAt: null,
            actionType: 1
          }
          this.$set(this.activityLanguages, this.activityLanguages.length, langs);

        }
        this.currentLangTab = lang;
      },
      removeTab(lang) {
        if (lang === 'en') {
          return false;
        }
        if (this.activityLanguages.length > 1) {
          this.activityLanguages = this.activityLanguages.filter(langs => langs.language !== lang);
          for (let i = 0, cl = this.currentLangs; i < cl.length; i++) {
            if (cl[i].language === lang) {
              cl[i].actionType = 2;
            }
          }
          if (lang === this.currentLangTab) {
            this.language = this.currentLangTab = this.activityLanguages[0].language;
          }
        }
      },
    },
    components: {
      Iphone
    }

  }
</script>

<style lang="scss">
  .add-activity-view {
    .el-upload {
      width: 100%;
    }
  }
</style>
