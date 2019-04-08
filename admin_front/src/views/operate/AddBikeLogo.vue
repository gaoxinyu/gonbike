<template>
  <div class="add-bike-logo">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ this.$route.name === 'editbikelogo' ? $t('bikelogo.form.title0') : $t('bikelogo.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backBikeLogo"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>

      <div class="box box-solid">
        <div class="box-body row">
          <div class="col-md-8 col-xs-12">
            <!-- 基本信息 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('bikelogo.form.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="70px">
                  <div class="row">
                    <div class="col-md-4 col-xs-12">
                      <el-form-item :label="$t('bikelogo.form.countryId')" v-if="this.$route.name === 'addbikelogo'">
                        <el-select v-model="form.countryId" @change="getCountryInfo">
                          <el-option
                            v-for="item in areaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('bikelogo.form.countryId')" v-if="this.$route.name === 'editbikelogo'">
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
                          :disabled="disabledStart"
                          :picker-options="pickerStartOption"
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
                    <div class="col-md-4 col-xs-12">
                      <el-form-item :label="$t('bikelogo.form.type')">
                        <el-select v-model="form.type" :disabled="chooseFlag">
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
                {{ $t('bikelogo.form.setting') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="70px">
                  <el-form-item :label="$t('bikelogo.form.upload')" class="required">
                    <el-upload
                      class="avatar-uploader"
                      action="/api/v1/upload/file"
                      :accept="accepts"
                      :headers="headers"
                      :show-file-list="false"
                      :multiple="false"
                      :on-success="uploadSuccess"
                      :on-error="uploadError">
                      <img v-if="form.iconUrl" :src="form.iconUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                      <div slot="tip" class="el-upload__tip">{{$t('bikelogo.form.uploadTip')}}</div>
                    </el-upload>
                  </el-form-item>

                  <el-form-item :label="$t('bikelogo.form.remark')">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      :placeholder="$t('bikelogo.form.remarkTip')"
                      v-model="form.remark">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="backBikeLogo">{{ $t('bikelogo.form.cancel') }}</el-button>
                    <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('bikelogo.form.submit') }}</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xs-12">
            <iphone>
              <div class="bg-logo">
                <img v-if="form.iconUrl" :src="form.iconUrl" class="bike-logo">
              </div>
            </iphone>
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
import {getStorage} from '../../services/auth';
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption],
  mounted() {
    const bikeicon = sessionStorage.bikeicon;
    if(this.$route.name === 'editbikelogo' && bikeicon) {
      this.form = JSON.parse(bikeicon);
      this.dateTimeRange.startDateTime = this.form.startDate ? moment(this.form.startDate).toDate() : null;
      this.dateTimeRange.endDateTime = this.form.endDate ? moment(this.form.endDate).toDate() : null;
    }
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      form: {
        countryId: 153,
        // cityId: null,
        type: null,
        iconUrl: ''
      },
      areaOptions: this.getAreaOnlyOptions(),
      cityOptions: [],
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      accepts: '.jpg, .png',
    }
  },
  computed: {
    typeOnlyOptions() {
      // 根据时间动态改变可选择状态
      let curTime = (new Date()).getTime();
      if(curTime < moment(this.dateTimeRange.startDateTime).toDate().getTime()) {
        this.form.type = -1;
        return [{ label: this.$t('bikelogo.js.type_1'), value: -1 }];
      }
      else if(moment(this.dateTimeRange.endDateTime).toDate().getTime() < curTime) {
        this.form.type = 2;
        return [{ label: this.$t('bikelogo.js.type2'), value: 2 }];
      }
      else {
        this.form.type = 0;
        return [{ label: this.$t('bikelogo.js.type0'), value: 0 },
                { label: this.$t('bikelogo.js.type1'), value: 1 }];
      }
    },
    submitDisabled() {
      return !(this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime && this.form.iconUrl);
    },
    chooseFlag() {
      return !(this.typeOnlyOptions.length > 1);
    }
  },
  methods: {
    backBikeLogo() {
      this.$router.push({name: 'bikelogo'});
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.form.countryId});
      // api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
      //   this.cityOptions = this.citys.map(city => {
      //     return {
      //       label: city.name,
      //       value: city.id,
      //     }
      //   });
      //   this.form.cityId = (this.cityOptions.length > 0) ? this.cityOptions[0].value : '';
      // })
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editbikelogo' ? false : this.handleStartDateChange(val);
    // },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.form.iconUrl = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'success' });
      }
    },
    uploadError(err, response, file) {

    },
    submit() {
      this.form.startDate = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.form.endDate = moment(this.dateTimeRange.endDateTime).toDate().getTime();
      this.$route.name === 'addbikelogo'
        ? api.saveBikeLogo(this, this.form)
        : api.updateBikeLogo(this, this.form);
      ;
    }
  },
  components: {
    Iphone
  }
}
</script>
