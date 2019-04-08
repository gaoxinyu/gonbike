<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      配置其他活动
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="120px">
        <div class="row">
          <div class="col-md-5 col-xs-12">
            <el-form-item :label="$t('addActivity.form.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addCard.form.cityId')">
              <el-select v-model="query.cityId">
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

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

            <el-form-item :label="$t('addFree.form.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addFree.form.type')">
              <el-input v-model="query.activityType" type="text"></el-input>
            </el-form-item>
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

            <el-form-item :label="$t('addFree.form.title')" :class="{required: isRequired}">
              <el-input v-model="query.title" type="text" :placeholder="$t('addFree.form.titlePlaceholder')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('addFree.form.content')">
              <el-input v-model="query.content" type="textarea" :placeholder="$t('addFree.form.contentPlaceholder')" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
            </el-form-item>

            <el-form-item :label="$t('addFree.form.h5Url')">
              <el-input v-model="query.h5Url" type="text"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addFree.form.submit') }}</el-button>
            </el-form-item>
          </div>
          <div class="col-md-5 col-xs-12">
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
import api from "../../api"
import moment from "moment"
import {getStorage} from '../../services/auth'
import Iphone from '../../components/Iphone'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption],
  mounted() {
    const other = sessionStorage.other;
    if(this.$route.name === 'editother' && other) {
      this.query = JSON.parse(other);
      this.radioChoose = this.query.showHomePage === true ? 1 : 0;
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
        activityType: 6,      // 其他活动
        countryId: 153,
        cityId: '',
        status: 0,
        startTime: null,
        endTime: null,
        content: null,
        title: null,
        h5Url: null,
        bannerUrl: null,
      },
      statusOptions: [
        {label: this.$t('addFree.js.status0'), value: 0},
        {label: this.$t('addFree.js.status1'), value: 1},
        {label: this.$t('addFree.js.status2'), value: 2},
      ],
      cityOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
      radioChoose: 1,
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
    }
  },
  computed: {
    submitDisabled() {
      return this.radioChoose === 1 ? !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime
            && this.query.title) : !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
    },
    isRequired() {
      return this.radioChoose === 1 ? true : false;
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: 'other'});
    },
    submit() {
      this.query.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.query.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      this.query.showHomePage = this.radioChoose === 1 ? true : false;
      this.query.coutryId = this.query.countryId;
      if(this.$route.name === 'addother') {
        api.saveActivity(this, this.query).then(() => this.$router.push({name: "other"}));
      } else if (this.$route.name === 'editother') {
        api.updateActivity(this, this.query).then(() => this.$router.push({name: "other"}));
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        if(this.cityOptions.length > 0 && this.$route.name === 'addother') {
          this.query.cityId = this.cityOptions[0].value;
        }
      })
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editother' ? false : this.handleStartDateChange(val);
    // },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.query.bannerUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'success' });
      }
    },
    uploadError(err, response, file) {

    },
  },
  components: {
    Iphone
  }

}
</script>
