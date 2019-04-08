<template>
  <div class="reward-coupon-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('rwcoupon.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('rwcoupon.query.add') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcoupon.query.countryId')">
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
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcoupon.query.cityId')">
                <el-select v-model="query.cityId" :disabled="cityOptions.length === 0">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcoupon.query.benefitType')">
                <el-select v-model="query.benefitType">
                  <el-option
                    v-for="item in typesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcoupon.query.name')">
                <el-input v-model="query.name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcoupon.query.merchantCode')">
                <el-select v-model="query.merchantCode">
                  <el-option
                    v-for="item in rwmerchantOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('rwcoupon.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedCouponList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('rwcoupon.table.id')" width="60"></el-table-column>
            <el-table-column prop="merchantCode" :label="$t('rwcoupon.table.merchantCode')"></el-table-column>
            <el-table-column prop="name" :label="$t('rwcoupon.table.name')"></el-table-column>
            <el-table-column prop="benefitTypeString" :label="$t('rwcoupon.table.benefitType')"></el-table-column>
            <el-table-column prop="benefitContent" :label="$t('rwcoupon.table.benefitContent')"></el-table-column>
            <el-table-column prop="endTypeString" :label="$t('rwcoupon.table.endType')"></el-table-column>
            <el-table-column prop="period" :label="$t('rwcoupon.table.period')" min-width="160"></el-table-column>
            <el-table-column prop="area" :label="$t('rwcoupon.table.area')"></el-table-column>
            <el-table-column fixed="right" :label="$t('rwcoupon.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('rwcoupon.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editCoupon(scope.$index, scope.row)">{{ $t('rwcoupon.table.edit') }}</el-button>
                  <br>
                  <el-button type="text" size="small" @click="viewCoupon(scope.$index, scope.row)">{{ $t('rwcoupon.table.view') }}</el-button>
                  <br>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>

          <div class="row text-center">
            <div class="col-md-12">
              <el-pagination 
                layout="total, prev, pager, next" 
                :total="page.count" 
                :page-size="page.per" 
                :current-page="page.current" 
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import moment from 'moment'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
    this.getMerchant();
  },
  data() {
    return {
      loading: false,
      rwcoupons: [],
      query: {
        countryId: null,
        cityId: null,
        benefitType: null,
        name: null,
        merchantCode: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      typesOptions: [
        // 1：折扣 2：定额
        { label: this.$t('rwcoupon.js.all'), value: null },
        { label: this.$t('rwcoupon.js.discount'), value: 1 },
        { label: this.$t('rwcoupon.js.quota'), value: 2 }
      ],
      rwmerchantOptions: []
    }
  },
  computed: {
    computedCouponList() {
      return this.rwcoupons.map((item) => {
        return {
          ...item,
          benefitTypeString: item.benefitType == 1 ? this.$t('rwcoupon.js.benefitType1') : (item.benefitType == 2 ? this.$t('rwcoupon.js.benefitType2') : ''),
          benefitContent: item.randomPromotion ? (item.benefitType == 1 ? (((item.minPromotion ? item.minPromotion : 0) + '% - ' + (item.maxPromotion ? item.maxPromotion : 0) + '%')) : (item.currencySymbol ? (item.currencySymbol + (item.minPromotion ? item.minPromotion : 0) + ' - ' + item.currencySymbol + (item.maxPromotion ? item.maxPromotion : 0)) : ('$' + (item.minPromotion ? item.minPromotion : 0) + ' - $' + (item.maxPromotion ? item.maxPromotion : 0)))) : (item.benefitType == 1 ? ((item.benefitPercent ? item.benefitPercent : 0) + '%') : (item.currencySymbol ? (item.currencySymbol + (item.benefitMoney ? item.benefitMoney : 0)) : ('$' + (item.benefitMoney ? item.benefitMoney : 0)))),
          endTypeString: item.endType == 1 ? this.$t('rwcoupon.js.endType1') : (item.endType == 2 ? this.$t('rwcoupon.js.endType2') : ''),
          period: item.endType == 1 ? ((item.days ? item.days : 0) + this.$t('rwcoupon.js.day')) : ((item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : '') + ' - ' + (item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '')),
          periodSampleForEditOrInfo: item.endType == 1 ? ((item.days ? moment().format("YYYY-MM-DD") + ' - ' + moment().add(item.days, 'days').format("YYYY-MM-DD") : '')) : ((item.startTime ? moment(item.startTime).format("YYYY-MM-DD") : '') + ' - ' + (item.endTime ? moment(item.endTime).format("YYYY-MM-DD") : '')),
          area: (item.countryName ? item.countryName : '') +  (item.cityName ? ' - ' + item.cityName : '')
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'rwaddcoupon' });
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
        // 添加一个所有
        this.cityOptions.unshift({ label: this.$t('rwcoupon.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    getMerchant() {
      api.getMerchant(this).then(rwmerchants => {
        this.rwmerchantOptions = this.rwmerchants.map(rwmerchant => {
          return {
            label: rwmerchant.name,
            value: rwmerchant.merchantCode
          }
        });
        this.rwmerchantOptions.unshift({ label: this.$t('rwcoupon.js.all'), value: null });
      });
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getRwCoupon(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwCoupon(this, this.query);
      }
    },
    editCoupon(index, row) {
      sessionStorage.editRwCoupon = JSON.stringify(row);
      this.$router.push({ name: 'rweditcoupon', query: { id: row.id } });
    },
    viewCoupon(index, row) {
      sessionStorage.viewRwCoupon = JSON.stringify(row);
      this.$router.push({ name: 'rwinfocoupon', query: { id: row.id } });
    }
  }
}
</script>
