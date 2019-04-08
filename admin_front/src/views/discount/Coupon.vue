<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('coupon.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('coupon.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('coupon.query.countryId')">
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
            <el-form-item :label="$t('coupon.query.cityId')">
              <el-select v-model="query.cityId">
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
            <el-form-item :label="$t('coupon.query.couponType')">
              <el-select v-model="query.couponType">
                <el-option
                  v-for="item in couponTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('coupon.query.benefitType')">
              <el-select v-model="query.benefitType">
                <el-option
                  v-for="item in benefitTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('addCoupon.form.name')" class="required">
              <el-input v-model="query.name" type="text"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('coupon.query.endType')">
              <el-select v-model="query.endType">
                <el-option
                  v-for="item in endTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('coupon.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCoupons" border style="width: 100%">
        <el-table-column prop="id" :label="$t('coupon.table.id')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('coupon.table.name')"></el-table-column>
        <el-table-column prop="benefitTypeString" :label="$t('coupon.table.benefitType')" width="90"></el-table-column>
        <el-table-column prop="benefitMoneyString" :label="$t('coupon.table.benefitMoney')" width="100"></el-table-column>
        <el-table-column prop="couponTypeString" :label="$t('coupon.table.couponType')"></el-table-column>
        <el-table-column prop="endTypeString" :label="$t('coupon.table.endType')" width="100"></el-table-column>
        <el-table-column prop="daysString" :label="$t('coupon.table.days')" width="140"></el-table-column>
        <el-table-column prop="areaString" :label="$t('coupon.table.area')"></el-table-column>
        <el-table-column prop="updateAtString" :label="$t('coupon.table.updateAt')" width="140"></el-table-column>
        <el-table-column prop="adminName" :label="$t('coupon.table.adminName')"></el-table-column>
        <el-table-column fixed="right" :label="$t('coupon.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('coupon.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('coupon.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('coupon.table.detail') }}</el-button>
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
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      coupons: [],
      query: {
        countryId: null,
        cityId: null,
        couponType: null,
        benefitType: null,
        name: null,
        pageNum: 1
        // endType: null,
      },
      page: {
        count: 0
      },
      benefitTypeOptions: [
        {label: this.$t('coupon.js.all'), value: null},
        {label: this.$t('coupon.js.benefitType1'), value: 1},
        {label: this.$t('coupon.js.benefitType2'), value: 2},
      ],
      endTypeOptions: [
        {label: this.$t('coupon.js.all'), value: null},
        {label: this.$t('coupon.js.endType1'), value: 1},
        {label: this.$t('coupon.js.endType2'), value: 2},
      ],
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      couponTypeOptions: [
        {label: this.$t('coupon.js.all'), value: null},
        // {label: this.$t('coupon.js.couponType1'), value: 1},
        {label: this.$t('coupon.js.couponType2'), value: 2},
        // {label: this.$t('coupon.js.couponType3'), value: 3},
        {label: this.$t('coupon.js.couponType4'), value: 4},
        {label: this.$t('coupon.js.couponType7'), value: 7}
      ],
    }
  },
  computed: {
    computedCoupons() {
      return this.coupons.map((item) => {
        return {
          ...item,
          benefitTypeString: item.benefitType ? this.$t('coupon.js.benefitType'+ item.benefitType) : '',
          couponTypeString: item.couponType ? this.$t('coupon.js.couponType' + item.couponType) : '',
          benefitMoneyString: item.benefitType === 2 
            ? (item.randomPromotion ? (item.currencySymbol + ' ' + item.minPromotion + ' - ' + item.currencySymbol + ' ' + item.maxPromotion) : (item.currencySymbol + ' ' + item.benefitMoney)) 
            : (item.benefitType === 1 
              ? (item.randomPromotion ? (item.minPromotion + '% - ' + item.maxPromotion + '%') : (item.benefitPercent + '%'))
              : ''),
          endTypeString: item.endType ? this.$t('coupon.js.endType' + item.endType) : '',
          daysString: item.endType === 1 ? item.days + ' ' + this.$t('coupon.js.day') : item.endType === 2 ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
          areaString: item.countryName + (item.cityName ? ' - ' + item.cityName : ''),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    goAdd() {
      window.open(location.href + "add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCoupons(this, this.query);
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      return api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('report.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
      })
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCoupons(this, this.query);
    },
    edit(index, row) {
      sessionStorage.coupon = JSON.stringify(row);
      this.$router.push({name: "editcoupon"});
    },
    detail(index, row) {
      sessionStorage.coupon = JSON.stringify(row);
      window.open(location.href + "/" + row.id);
    },
  },
}
</script>