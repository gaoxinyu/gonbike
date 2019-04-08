<template>
<div class="view-add-risk">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addSmsSetting.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-4  col-xs-12">
            <el-form-item :label="$t('addSmsSetting.form.countryId')">
              <!-- <el-select v-model="form.countryCode" @change="getCountryInfo">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <span>{{ setting.countryName }}</span>
            </el-form-item>
          </div>
        </div>
        <el-form-item class="row" label-width="0">
          <div class="col-md-12  col-xs-12">
            <h5>{{ $t('addSmsSetting.form.smsCodeProviders') }} <span class="text-red">{{ $t('addSmsSetting.form.smsCodeTips') }}</span></h5>
          </div>
        </el-form-item>
        <el-form-item class="row" v-for="(s, index) in form" :key="index" v-if="s.type === 1" label-width="0">
          <div class="col-md-4 col-xs-12">
            <div class="row">
              <div class="col-md-4">
                <el-checkbox v-model="s.selected" @change="s.rate = 0">{{ s.provider }}</el-checkbox>
              </div>
              <div class="col-md-8">
                <el-slider v-model="s.rate" show-input :disabled="!s.selected"></el-slider>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-form label-position="left" label-width="0">
        <el-form-item class="row">
          <div class="col-md-12  col-xs-12">
            <h5>{{ $t('addSmsSetting.form.operationProviders') }} <span class="text-red">{{ $t('addSmsSetting.form.operationTips') }}</span></h5>
          </div>
        </el-form-item>
        <el-form-item class="row" v-for="(s, index) in form" :key="index" v-if="s.type === 2" label-width="0">
          <div class="col-md-4 col-xs-12">
            <div class="row">
              <div class="col-md-4">
                <el-checkbox v-model="s.selected" @change="s.rate = 0">{{ s.provider }}</el-checkbox>
              </div>
              <div class="col-md-8">
                <el-slider v-model="s.rate" show-input :disabled="!s.selected"></el-slider>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
           <div class="col-md-4  col-xs-12">
             <el-form-item :label="$t('addSmsSetting.form.voice')">
               <el-switch v-model="voiceMessageOpen">
               </el-switch>
             </el-form-item>
           </div>
        </div>
        <div class="row">
          <div class="col-md-4  col-xs-12">
            <el-form-item :label="$t('addSmsSetting.form.remark')">
              <el-input v-model="remark" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addSmsSetting.form.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</div>
</template>

<script>
import api from "../../api"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country],
  mounted() {
    const smsSetting = sessionStorage.smsSetting;
    if(this.$route.name === 'editsmssetting' && smsSetting) {
      this.setting = JSON.parse(smsSetting);
    }
    this.getCountrySmsInfo();
  },
  data() {
    return {
      loading: false,
      country: {},
      form: [],
      voiceMessageOpen: false,
      remark: null,
      areaOptions: this.getAreaOnlyOptions(),
      setting: {},
      countrySettings: [],
    }
  },
  computed: {
    submitDisabled() {
      let smsCodeTotleRate = 0;
      let operationTotleRate = 0;
      this.form.map(s => {
        if(s.type === 1) {
          smsCodeTotleRate += s.rate;
        } else if(s.type === 2) {
          operationTotleRate += s.rate;
        }
      })
      return !(smsCodeTotleRate === 100 && operationTotleRate === 100);
    },
  },
  methods: {
    goBack() {
      this.$router.push({name: 'appsms'});
    },
    submit() {
      this.form.forEach((item) => {
        if(item.rate === 0) {
          item.rate = null;
        }
        item.voiceMessageOpen = this.voiceMessageOpen;
        item.remark = this.remark;
      });
      if(this.$route.name === 'addsmssetting') {
        // api.saveSmsExt(this, this.form).then(() => this.goBack());
      } else {
        api.updateCountrySms(this, this.form).then(() => this.goBack());
      }
    },

    getCountrySmsInfo() {
      api.getCountrySmsInfo(this, {countryCode: this.setting.countryCode}).then(() => {
        if (this.countrySettings) {
          this.remark = this.countrySettings[0].remark;
          this.voiceMessageOpen = this.countrySettings[0].voiceMessageOpen;
        }
        this.form = this.countrySettings.map((item, index) => {
          return {
            ...item,
            selected: item.rate > 0,
          }
        });
      });
    },
  }
}

</script>