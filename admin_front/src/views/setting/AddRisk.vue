<template>
<div class="view-add-risk">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addRisk.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <el-form label-position="left" label-width="140px">
        <div class="row">
          <div class="col-md-4  col-xs-12">
            <el-form-item :label="$t('addRisk.form.countryId')">
              <el-select v-model="form.countryId" @change="getCountryInfo">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addRisk.form.hours')" class="required">
              <el-input v-model="form.hours" type="number">
                <template slot="append">{{ $t('addRisk.form.hoursUnit') }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-form label-position="left" label-width="140px">
        <div class="row">
          <div class="col-md-4  col-xs-12">
            <el-form-item :label="$t('addRisk.form.limitedAmount')" class="required">
              <el-input v-model="form.limitedAmount" type="number">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>
            
            <el-form-item :label="$t('addRisk.form.limitedPayTimes')" class="required">
              <el-input v-model="form.limitedPayTimes" type="number">
                <template slot="append">{{ $t('addRisk.form.timesUnit') }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('addRisk.form.limitedChargeBackTimes')">
              <el-radio-group v-model="form.limitedChargeBackTimes">
                <el-radio :label="true">{{ $t('common.yes') }}</el-radio>
                <el-radio :label="false">{{ $t('common.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>


  <div class="box box-solid">
    <div class="box-body">
      <el-form label-position="left" label-width="140px">
        <div class="row">
          <div class="col-md-4  col-xs-12">
            <el-form-item :label="$t('addRisk.form.forbiddenAmount')" class="required">
              <el-input v-model="form.forbiddenAmount" :min="form.limitedAmount" type="number" :placeholder="$t('addRisk.form.forbiddenAmountPlaceholder')">
                <template slot="append">{{ country.currency }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('addRisk.form.forbiddenPayTimes')" class="required">
              <el-input v-model="form.forbiddenPayTimes" :min="form.limitedPayTimes" type="number" :placeholder="$t('addRisk.form.forbiddenPayTimesPlaceholder')">
                <template slot="append">{{ $t('addRisk.form.timesUnit') }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-form label-position="left" label-width="140px">
        <div class="row">
          <div class="col-md-4  col-xs-12">
            <el-form-item :label="$t('addRisk.form.frozenChargeBackTimes')" class="required">
              <el-input v-model="form.frozenChargeBackTimes" type="number">
                <template slot="append">{{ $t('addRisk.form.timesUnit') }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addRisk.form.submit') }}</el-button>
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
    const risk = sessionStorage.risk;
    if(this.$route.name === 'editrisk' && risk) {
      this.form = JSON.parse(risk);
    }
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      country: {},
      form: {
        countryId: 153,
        hours: null,
        frozenChargeBackTimes: null,
        limitedAmount: null,
        limitedPayTimes: null,
        limitedChargeBackTimes: true,
        forbiddenAmount: null,
        forbiddenPayTimes: null,
      },
      areaOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    submitDisabled() {
      return !(+this.form.hours > 0 && +this.form.frozenChargeBackTimes > 0 && +this.form.limitedAmount > 0 && 
              +this.form.limitedPayTimes > 0 && +this.form.forbiddenAmount > 0 && +this.form.forbiddenPayTimes > 0 &&
              +this.form.forbiddenAmount >= +this.form.limitedAmount && +this.form.forbiddenPayTimes >= +this.form.limitedPayTimes);
    },
  },
  methods: {
    goBack() {
      this.$router.push({name: 'risk'});
    },
    submit() {
      if(this.$route.name === 'addrisk') {
        api.savePaymentRisk(this, this.form).then(() => this.goBack());
      } else {
        api.updatePaymentRisk(this, this.form).then(() => this.goBack());
      }
    },

    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId}).then(country => {});
    },
  }
}

</script>