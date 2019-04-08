<template>
  <div class="red-bag-add">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('addRedbag.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="120px">
          <div class="box">
            <div class="box-header with-border">
              {{ $t('addRedbag.form.basic') }}
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-4 col-xs-12">
                  <el-form-item :label="$t('addRedbag.form.countryId')" class="required">
                    <el-select v-model="form.countryId" v-if="!(this.$route.name === 'editredbag')" @change="getCountryInfo">
                      <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="form.countryName" type="text" :disabled="true" v-if="this.$route.name === 'editredbag'"></el-input>
                  </el-form-item>

                  <el-form-item :label="$t('addRedbag.form.countryCurrency')">
                    <el-input v-model="form.currency" type="text" :disabled="true"></el-input>
                  </el-form-item>

                  <!-- <el-form-item :label="$t('addRedbag.form.cityId')">
                    <el-select v-model="form.cityId" filterable :disabled="cityOptions.length === 0" v-if="!(this.$route.name === 'editredbag')">
                      <el-option
                        v-for="item in cityOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input v-model="form.cityName" type="text" :disabled="true" v-if="this.$route.name === 'editredbag'"></el-input>
                  </el-form-item> -->

                  <el-form-item :label="$t('addRedbag.form.label')">
                    <span class="error">*</span><el-button type="text" @click="addThirdPart">{{ $t('addRedbag.form.thirdPart') }}</el-button>
                  </el-form-item>

                  <el-form-item :label="$t('addRedbag.dialog.thirdActivityId')" v-show="form.activityId && !thirdPartVisiable">
                    <el-input v-model="form.activityId" :disabled="true"></el-input>
                  </el-form-item>

                  <el-form-item :label="$t('addRedbag.dialog.thirdBagId')" v-show="form.couponId && !thirdPartVisiable">
                    <el-input v-model="form.couponId" :disabled="true"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="box-header with-border">
              {{ $t('addRedbag.form.baginfo') }}
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-4 col-xs-12">
                  <el-form-item :label="$t('addRedbag.form.name')" class="required">
                    <el-input v-model="form.name" type="text"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('addRedbag.form.num')" class="required">
                    <el-input-number v-model="form.contentCount" :min="1" :step="1"></el-input-number>
                  </el-form-item>
                  <!-- <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
                    <el-date-picker
                      v-model="dateTimeRange.startDateTime"
                      type="datetime"
                      :picker-options="pickerStartOption"
                      :disabled="disabledStart"
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
                      :placeholder="$t('addMessage.form.endPlaceholder')">
                    </el-date-picker>
                  </el-form-item> -->
                  <!-- <el-form-item>
                    <el-radio-group v-model="form.type">
                      <el-radio :label="1">{{ $t('addRedbag.form.type1') }}</el-radio>
                      <el-radio :label="2">{{ $t('addRedbag.form.type2') }}</el-radio>
                    </el-radio-group>
                  </el-form-item> -->
                </div>
              </div>
            </div>
          </div>

          <div class="box">
            <div class="box-header with-border">
              {{ $t('addRedbag.form.rule') }}
            </div>
            <div class="box-body">
              <div class="col-md-4 col-xs-12">
                <el-form-item :label="$t('addRedbag.form.mustTime')" class="required">
                  <el-input v-model.number="form.rideMinutes" type="number" :min="1">
                    <template slot="append">min</template>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('addRedbag.form.freeTime')">
                  <el-input v-model="form.freeTime" type="number" min="1">
                    <template slot="append">min</template>
                  </el-input>
                </el-form-item> -->
                <el-form-item :label="$t('addRedbag.form.limited')" class="required">
                  <el-radio-group v-model="limited">
                    <el-radio :label="1">{{ $t('addRedbag.form.limited1') }}</el-radio>
                    <el-input v-model.number="form.memberDays" type="number" :min="1" style="margin-bottom: 10px;" v-show="limited == 1">
                      <template slot="append">{{ $t('addRedbag.form.memberDays') }}</template>
                    </el-input>
                    <el-input v-model.number="form.memberTimes" type="number" :min="1" style="margin-bottom: 20px;" v-show="limited == 1">
                      <template slot="append">{{ $t('addRedbag.form.memberTimes') }}</template>
                    </el-input>
                    <br>

                    <el-radio :label="2">{{ $t('addRedbag.form.limited2') }}</el-radio>
                    <el-input v-model.number="form.memberTimes" type="number" :min="1" style="margin-bottom: 20px;" v-show="limited == 2">
                      <template slot="append">{{ $t('addRedbag.form.memberTimes') }}</template>
                    </el-input>
                    <br>

                    <el-radio :label="3">{{ $t('addRedbag.form.limited3') }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <el-form-item :label="$t('addRedbag.form.remark')">
                  <el-input v-model="form.remark" type="textarea"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addRedbag.form.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-dialog :title="$t('addRedbag.dialog.thirdPart')" width="30%" :visible.sync="thirdPartVisiable" :show-close="false">
        <el-form label-position="left" label-width="70px">
          <el-form-item :label="$t('addRedbag.dialog.thirdActivityId')">
            <el-input v-model="form.activityId"></el-input>
          </el-form-item>

          <el-form-item :label="$t('addRedbag.dialog.thirdBagId')">
            <el-input v-model="form.couponId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thirdPartCancel">{{ $t('addRedbag.dialog.cancel') }}</el-button>
          <el-button type="primary" @click="thirdPartSubmit" :disabled="thirdPartDisabled">{{ $t('addRedbag.dialog.submit') }}</el-button>
        </span>
      </el-dialog>
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
    const editRedbag = sessionStorage.editRedbag;
    if(this.$route.name == 'editredbag' && editRedbag) {
      this.form = JSON.parse(editRedbag);
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
        contentType: 1,
        countryId: 153,
        currency: 'SGD',
        cityId: null,
        activityId: null,
        couponId: null,
        name: null,
        contentCount: null,
        rideMinutes: null,
        // freeTime: null,
        memberDays: null,
        memberTimes: null,
        remark: null
      },
      areaOptions: this.getAreaOnlyOptions(),
      cityOptions: [],
      thirdPartVisiable: false,
      limited: 3
    }
  },
  computed: {
    submitDisabled() {
      return !(this.form.countryId && !this.thirdPartDisabled && this.form.name && this.form.contentCount && this.form.rideMinutes && ((this.limited == 1 && this.form.memberDays && this.form.memberTimes) || (this.limited == 2 && this.form.memberTimes) || this.limited == 3));
    },
    thirdPartDisabled() {
      return !(this.form.activityId && this.form.couponId);
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'redbag' });
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId})
        .then(() => {
          this.form.currency = this.getCurrencyById(this.form.countryId);
        });
      // this.getCitysByCountry();
    },
    getCitysByCountry() {
      return api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('report.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
      })
    },
    addThirdPart() {
      this.thirdPartVisiable = true;
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editcard' ? false : this.handleStartDateChange(val);
    // },
    submit() {
      if(this.limited == 3) {
        this.form.memberDays = 0;
        this.form.memberTimes = 0;
      }
      if(this.limited == 2) {
        this.form.memberDays = 0;
      }
      if(this.$route.name == 'editredbag') {
        api.updateRedbag(this, this.form)
        .then(() => {
          this.$router.push({ name: 'redbag'});
        });
      }
      else {
        api.saveRedbag(this, this.form)
        .then(() => {
          this.$router.push({ name: 'redbag'});
        });
      }
    },
    thirdPartSubmit() {
      this.thirdPartVisiable = false;
    },
    thirdPartCancel() {
      this.form.activityId = null;
      this.form.couponId = null;
      this.thirdPartVisiable =false;
    }
  }
}
</script>