<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addFree.form.title0') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="120px">
        <!-- 国家 -->
        <div class="row" v-if="!isEdit">
          <div class="col-md-5 col-xs-12">
            <el-form-item :label="$t('addFree.form.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo">
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
        <!-- 城市 -->
        <div class="row" v-if="!isEdit">
          <div class="col-md-5 col-xs-10">
            <el-form-item :label="$t('addFree.form.cityId')" class="required">
              <el-select v-model="cityIds" multiple>
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-2 col-xs-2" style="padding-left: 0;">
            <div class="el-form-item__content">
              <el-button type="primary" @click="selectAll">{{ $t('addFree.form.all') }}</el-button>
            </div>
          </div>
        </div>
        <!-- 编辑时不可修改国家城市 -->
        <div class="row" v-if="isEdit">
          <div class="col-md-5 col-xs-12">
            <el-form-item :label="$t('addFree.form.area')">
              <label>{{ query.areaString }}</label>
            </el-form-item>
          </div>
        </div>
        <!-- 活动时间 -->
        <div class="row" v-if="!isEdit">
          <div class="col-md-11 col-xs-12">
            <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
              <div class="date-area">
                <div class="row" v-for="(item, index) in query.activities" :key="index">
                  <div class="col-md-2 col-xs-6" style="padding-left: 0;">
                    <el-date-picker
                      class="auto-width"
                      v-model="item.startYmd"
                      type="date"
                      :picker-options="pickerStartOption"
                      value-format="yyyy-MM-dd"
                      :clearable="false"
                      :editable="false"
                      :placeholder="$t('addFree.form.startPlaceholder')">
                    </el-date-picker>
                  </div>
                  <div class="col-md-2 col-xs-6">
                    <el-date-picker
                      class="auto-width"
                      v-model="item.endYmd"
                      type="date"
                      :picker-options="pickerStartOption"
                      value-format="yyyy-MM-dd"
                      :clearable="false"
                      :editable="false"
                      :placeholder="$t('addFree.form.endPlaceholder')">
                    </el-date-picker>
                  </div>
                  <div class="col-md-2 col-xs-6">
                    <el-time-picker
                      class="auto-width"
                      :placeholder="$t('addFree.form.startHms')"
                      value-format="HH:mm:ss"
                      v-model="item.startHms">
                    </el-time-picker>
                  </div>
                  <div class="col-md-2 col-xs-6">
                    <el-time-picker
                      class="auto-width"
                      :placeholder="$t('addFree.form.endHms')"
                      value-format="HH:mm:ss"
                      v-model="item.endHms"
                      :picker-options="{
                        minTime: item.startHms
                      }">
                    </el-time-picker>
                  </div>
                  <div class="col-md-2 col-xs-12">
                    <el-button type="danger" @click="removeDateTime(index)" v-if="(index !== 0)">{{ $t('addFree.form.deletedate') }}</el-button>
                    <el-button type="primary" @click="addDateTime" v-if="(index === query.activities.length-1)">{{ $t('addFree.form.adddate') }}</el-button>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>


        <div class="row">
          <div class="col-md-5 col-xs-12">
            <el-form-item :label="$t('addMessage.form.startDateTime')" class="required" v-if="isEdit">
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
            <el-form-item :label="$t('addMessage.form.endDateTime')" class="required" v-if="isEdit">
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
            <el-form-item :label="$t('addFree.form.status')" v-if="isEdit">
              <el-input v-model="computedStatus" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :label="$t('addFree.form.type')" v-if="isEdit">
              {{ $t('addFree.form.typeName') }}
            </el-form-item>

            <div v-if="isEdit && radioChoose === 1">
              <el-form-item :label="$t('deposit.form.showHomePage')">
                <el-radio-group v-model="radioChoose">
                  <el-radio :label="1">{{ $t('deposit.form.yes') }}</el-radio>
                  <el-radio :label="0">{{ $t('deposit.form.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :label="$t('addFree.form.bannerUrl')">
                <img v-if="query.bannerUrl" :src="query.bannerUrl" width="50%">
                <el-upload
                  action="/api/v1/upload/file"
                  :headers="headers"
                  :multiple="false"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError">
                  <el-button size="small" type="primary">{{ $t('addFree.form.upload') }}</el-button>
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
                  v-for="item in activityLanguages"
                  :key="item.language"
                  :label="$t('common.languages.' + item.language )"
                  :name="item.language"
                >
                  <el-form-item :label="$t('addPushMessage.form.notiTitle')"  class="required">
                    <el-input v-model="item.title" type="text" :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('addPushMessage.form.notiContent')"  class="required">
                    <el-input v-model="item.content" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
                  </el-form-item>
                </el-tab-pane>
              </el-tabs>

              <el-form-item :label="$t('addFree.form.h5Url')">
                <el-input v-model="query.h5Url" type="text"></el-input>
              </el-form-item>

            </div>

            <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addFree.form.submit') }}</el-button>
            </el-form-item>

          </div>
          <div class="col-md-5 col-xs-12" v-if="isEdit && radioChoose === 1">
            <iphone>
              <div class="mask iphone-notify center">
                <div>
                  <div class="box box-solid">
                    <div class="box-body">
                      <img v-show="query.bannerUrl" :src="query.bannerUrl" alt="">
                      <h5 class="text-center">{{ query.title || $t('addFree.form.mTitle') }}</h5>
                      <p>{{ query.content || $t('addFree.form.mContent') }}</p>
                    </div>
                  </div>
                  <div class="close-model text-center"><i class="fa fa-close"></i></div>
                </div>
              </div>
            </iphone>
          </div>
        </div>

      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api";
import moment from "moment";
import { getStorage } from "../../services/auth";
import Iphone from "../../components/Iphone";
import Mixins from "../../mixins/index.js";

export default {
  mixins: [Mixins.country, Mixins.language, Mixins.pickerStartOption],
  mounted() {
    const free = sessionStorage.free;
    if (this.$route.name === "editfree" && free) {
      this.query = JSON.parse(free);
      for (
        let i = 0, langs = this.query.activityLanguages;
        i < langs.length;
        i++
      ) {
        if (langs[i].language !== "en") {
          this.currentLangs.push({
            id: langs[i].id,
            language: langs[i].language,
            languageName: this.$t("common.languages." + langs[i].language),
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
          languageName: this.$t("common.languages." + langs[i].language),
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
    } else {
      this.activityLanguages.push({
        language: "en",
        languageName: this.$t("common.languages." + "en"),
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
      country: {},
      citys: [],
      cityIds: [],
      isEdit: this.$route.name === "editfree",
      query: {
        activityType: 3,
        countryId: 153,
        cityIds: "",
        status: 0,
        // startTime: null,
        // endTime: null,
        language: "en",
        content: null,
        title: null,
        h5Url: null,
        bannerUrl: null,
        activityLanguages: [],
        activities: [
          {
            startYmd: moment(new Date()).format('YYYY-MM-DD'),
            endYmd: moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
            startHms: "00:00:00",
            endHms: "23:59:59"
          }
        ]
      },
      activityLanguages: [],
      currentLangs: [],
      statusOptions: [
        { label: this.$t("addFree.js.status0"), value: 0 },
        { label: this.$t("addFree.js.status1"), value: 1 },
        { label: this.$t("addFree.js.status2"), value: 2 }
      ],
      cityOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
      language: "en",
      languageOptions: this.getLangOnlyOptions(),
      currentLangTab: "en",
      radioChoose: 0,
      startOption: {
        disabledDate(time) {
          return time.getTime() < getCurrentDay();
        }
      },
      endOption: {
        disabledDate(time) {
          return time.getTime() < getCurrentDay();
        }
      },
      headers: {
        Authorization: getStorage("token")
          ? "Bearer " + getStorage("token").accessToken
          : ""
      }
    };
  },
  computed: {
    computedStatus() {
      // 根据时间动态改变状态
      let curTime = (new Date()).getTime();
      if(curTime < moment(this.dateTimeRange.startDateTime).toDate().getTime()) {
        this.query.status = 0;
        return this.$t('addFree.js.status0');
      }
      else if(moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
        this.query.status = 2;
        return this.$t('addFree.js.status2');
      }
      else {
        this.query.status = 1;
        return this.$t('addFree.js.status1');
      }
    },
    submitDisabled() {
      // return this.radioChoose === 1 ? !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime
      //       && this.activityLanguages[0].title && this.activityLanguages[0].content) : !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
      return this.radioChoose === 1
        ? !(
            this.activityLanguages[0].title && this.activityLanguages[0].content
          )
        : this.isEdit ? false : this.cityIds.length === 0;
    },
    isRequired() {
      return this.radioChoose === 1 ? true : false;
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "free" });
    },
    submit() {
      this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      if(this.query.startTime >= this.query.endTime) {
        this.$message({ message: this.$t('addFree.js.submitTips'), type: 'error' });
        return;
      }
      this.query.showHomePage = this.radioChoose === 1 ? true : false;
      this.query.cityIds = this.cityIds.toString();
      this.query.title = this.activityLanguages[0].title;
      this.query.content = this.activityLanguages[0].content;
      for (
        let i = 0,
          langs = this.activityLanguages.filter(item => item.language != "en");
        i < langs.length;
        i++
      ) {
        if (!langs[i].id) {
          this.currentLangs.push({
            language: langs[i].language,
            languageName: this.$t("common.languages." + langs[i].language),
            title: langs[i].title,
            content: langs[i].content,
            activityType: langs[i].activityType,
            activityId: langs[i].activityId,
            h5Url: langs[i].h5Url,
            createdAt: langs[i].createdAt,
            updateAt: langs[i].updateAt,
            actionType: 1
          });
        } else {
          this.currentLangs.push({
            id: langs[i].id,
            language: langs[i].language,
            languageName: this.$t("common.languages." + langs[i].language),
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
      }
      this.query.activityLanguages = this.currentLangs;
      if (this.$route.name === "addfree") {
        api
          .saveActivity(this, this.query)
          .then(() => this.$router.push({ name: "free" }));
      } else if (this.$route.name === "editfree") {
        api
          .updateActivity(this, this.query)
          .then(() => this.$router.push({ name: "free" }));
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, { id: this.query.countryId });
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      this.cityIds = [];
      api
        .getCitysByCountry(this, { countryId: this.query.countryId })
        .then(citys => {
          this.cityOptions = this.citys.map(city => {
            return {
              label: city.name,
              value: city.id
            };
          });
        });
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editfree' ? false : this.handleStartDateChange(val);
    // },
    uploadSuccess(response, file, fileList) {
      if (response.success) {
        this.query.bannerUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: "success" });
      }
    },
    uploadError(err, response, file) {},
    handleLanguageChange(lang) {
      if (this.activityLanguages.map(m => m.language).indexOf(lang) >= 0) {
      } else {
        const langs = {
          language: lang,
          languageName: this.$t("common.languages." + lang),
          title: "",
          content: "",
          activityType: null,
          activityId: null,
          h5Url: null,
          createdAt: null,
          updateAt: null
        };
        this.$set(this.activityLanguages, this.activityLanguages.length, langs);
      }
      this.currentLangTab = lang;
    },
    removeTab(lang) {
      if (lang === "en") {
        return false;
      }
      if (this.activityLanguages.length > 1) {
        this.activityLanguages = this.activityLanguages.filter(
          langs => langs.language !== lang
        );
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
    selectAll() {
      this.cityIds = this.cityOptions.map(item => item.value);
    },
    addDateTime() {
      this.query.activities.push({
        startYmd: moment(new Date()).format('YYYY-MM-DD'),
        endYmd: moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
        startHms: "00:00:00",
        endHms: "23:59:59"
      });
    },
    removeDateTime(index) {
      this.query.activities.splice(index, 1);
    }
  },
  components: {
    Iphone
  }
};
</script>
<<style>
.flex {
  display: flex;
}
.auto-width.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
.col-md-3 {
  padding-left: 10px;
  padding-right: 10px;
}
.date-area {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
