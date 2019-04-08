<template>
<div class="add-activity-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addPrice.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="120px">
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addPrice.form.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo" v-if="this.$route.name === 'addprice'">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input :disabled="this.$route.name === 'editprice'" v-if="this.$route.name === 'editprice'" v-model="current.countryName"></el-input>
            </el-form-item>

            <el-form-item :label="$t('addPrice.form.cityId')">
              <el-select v-model="query.cityId" v-if="this.$route.name === 'addprice'" :disabled="cityOptions.length === 0">
                <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input :disabled="this.$route.name === 'editprice'" v-if="this.$route.name === 'editprice'" v-model="current.cityName"></el-input>
            </el-form-item>

            <el-form-item :label="$t('addPrice.form.currency')">
              <el-input v-model="query.currency" type="text" disabled></el-input>
            </el-form-item>

            <el-form-item :label="$t('addPrice.form.currencySymbol')">
              <el-input v-model="query.currencySymbol" type="text" disabled></el-input>
            </el-form-item>

            <!-- <el-form-item :label="$t('addPrice.form.bikeCode')">
              <el-input v-model="query.bikeCode" type="text"></el-input>
            </el-form-item> -->

            <el-form-item :label="$t('addPrice.form.freeTimesPerDay')">
              <el-input v-model="query.freeTimesPerDay" type="number">
                <template slot="append">{{ $t('addPrice.form.times') }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('addPrice.form.freeMinutes')">
              <el-input v-model="query.freeMinutes" type="number">
                <template slot="append">{{ $t('addPrice.form.minute') }}</template>
              </el-input>
            </el-form-item>

            <!--允许余额为0的用户骑行-->
            <el-form-item :label="$t('addPrice.form.zeroBalanceRide')">
              <el-switch
                v-model="query.zeroBalanceRide"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

          </div>

          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addPrice.form.unitPrice')" class="required">
              <div class="col-md-6" style="padding:0">
                <el-input v-model="query.levelOne.unitPrice" type="number">
                  <template slot="append">{{ country.currency }}</template>
                </el-input>
              </div>
              <div class="col-md-6" style="padding:0">
                <el-input v-model="query.levelOne.unitMinutes" type="number">
                  <template slot="append">{{ $t('addPrice.form.minute') }}</template>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item :label="$t('addPrice.form.stepPrice')" class="required">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td>{{ $t('addPrice.form.credit') }}</td>
                    <td>{{ $t('addPrice.form.price') }} / {{ query.levelOne.unitMinutes }} min</td>
                  </tr>
                  <tr>
                    <td>&gt;99</td>
                    <td>{{ query.levelOne.unitPrice }} {{ country.currency }}</td>
                  </tr>
                  <tr>
                    <td>80~99</td>
                    <td>
                      <el-input v-model="query.levelTwo.unitPrice" type="number">
                        <template slot="append">{{ country.currency }}</template>
                      </el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>60~79</td>
                    <td>
                      <el-input v-model="query.levelThree.unitPrice" type="number">
                        <template slot="append">{{ country.currency }}</template>
                      </el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>&lt;60</td>
                    <td>
                      <el-input v-model="query.levelFour.unitPrice" type="number">
                        <template slot="append">{{ country.currency }}</template>
                      </el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form-item>
            <el-form-item :label="$t('addPrice.form.others')" class="required">
              <div class="col-md-7 pl-0">
                <el-input v-model="query.noBillingTime" type="number">
                  <template slot="append">{{ $t('addPrice.form.othersNote') }}</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addPrice.form.submit') }}</el-button>
            </el-form-item>
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
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country],
  mounted() {
    const price = sessionStorage.price;
    if(this.$route.name === 'editprice' && price) {
      this.query = JSON.parse(price);
      this.current = JSON.parse(price);
    }
    this.getCountryInfo();
  },
  data() {
    return {
      current: {},
      loading: false,
      country: {},
      query: {
        activityType: 4,
        countryId: 153,
        cityId: '',
        bikeCode: null,
        freeTimesPerDay: null,
        freeMinutes: null,
        currency: null,
        currencySymbol: null,
        levelOne: {unitPrice: 1, unitMinutes: 15},
        levelTwo: {unitPrice: 1, unitMinutes: 15},
        levelThree: {unitPrice: 1, unitMinutes: 15},
        levelFour: {unitPrice: 1, unitMinutes: 15},
        noBillingTimeId: null,
        noBillingTime: 1
      },
      areaOptions: this.getAreaOnlyOptions(),
      cityOptions: []
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.levelOne.unitPrice > 0 && this.query.levelOne.unitMinutes > 0);
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: 'price'});
    },
    submit() {
      this.query.levelTwo.unitMinutes = this.query.levelOne.unitMinutes;
      this.query.levelThree.unitMinutes = this.query.levelOne.unitMinutes;
      this.query.levelFour.unitMinutes = this.query.levelOne.unitMinutes;
      if(this.$route.name === 'addprice') {
        api.saveUnitPrice(this, this.query).then(() => this.goBack());
      } else if (this.$route.name === 'editprice') {
        this.query.countryId = this.current.countryId;
        this.query.cityId = this.current.cityId;
        api.updateUnitPrice(this, this.query).then(() => this.goBack());
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId}).then(() => {
        this.query.currency = this.country.currency;
        this.query.currencySymbol = this.country.currencySymbol;
      });
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
        this.query.cityId = (this.cityOptions.length > 0) ? this.cityOptions[0].value : null;
      })
    },
  },

}
</script>
<style>
.add-activity-view .pl-0 {
  padding-left: 0;
}
</style>
