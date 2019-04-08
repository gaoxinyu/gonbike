<template>
<div class="evs-order-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('evsOrder.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.startDate')">
              <el-date-picker
                v-model="query.startDate"
                type="date"
                :placeholder="$t('trade.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.endDate')">
              <el-date-picker
                v-model="query.endDate"
                type="date"
                :placeholder="$t('trade.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.recipientMobileNumber')">
              <el-input v-model="query.mobileNumber"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.orderNo')">
              <el-input v-model="query.orderNo"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.orderStatus')">
              <el-select v-model="query.orderStatus">
                <el-option
                  v-for="item in orderStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.countryId')">
              <el-select v-model="query.countryCode" filterable>
                <el-option
                  v-for="item in countrys"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('evsOrder.query.payMethod')">
              <el-select v-model="query.payMethod">
                <el-option
                  v-for="item in payMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>

    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedOrders" border style="width: 100%">
        <!-- <el-table-column prop="id" :label="$t('evsOrder.table.id')"></el-table-column> -->
        <el-table-column prop="countryName" :label="$t('evsOrder.table.countryName')"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('evsOrder.table.createdAt')"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('evsOrder.table.phone')"></el-table-column>
        <el-table-column prop="mobileNumberString" :label="$t('evsOrder.table.mobileNumber')"></el-table-column>
        <el-table-column prop="orderNo" :label="$t('evsOrder.table.orderNo')"></el-table-column>
        <el-table-column prop="orderStatusString" :label="$t('evsOrder.table.orderStatus')"></el-table-column>
        <el-table-column prop="orderStatusDepositString" :label="$t('evsOrder.table.orderStatusDeposit')"></el-table-column>
        <el-table-column prop="orderStatusLeftPartString" :label="$t('evsOrder.table.orderStatusLeftPart')"></el-table-column>

        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)" :loading="loading">{{ $t('trade.table.detail') }}</el-button></div>
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
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.query],
  created() {
    // if(!this.$route.query.phone && !this.$route.query.statementNo) {
    //   const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
    //   this.startDate = startDate;
    //   this.endDate = endDate;
    //   this.query.startDate = startDateStr;
    //   this.query.endDate = endDateStr;
    // }
  },
  mounted() {
    this.handleQuery();
    this.getAllCountrys();
  },
  data() {
    return {
      loading: false,
      orders: [],
      query: {
        pageNum: 1,
        startDate: null,
        endDate: null,
        phone: null,
        mobileNumber: null,
        orderNo: null,
        orderStatus: null,
        countryCode: null,
        payMethod: null,
      },
      page: {
        count: 0
      },
      orderStatusOptions:[
        {label: this.$t('common.all'), value: null},
        {label: this.$t('evsOrder.js.orderStatus0'), value: 0},
        {label: this.$t('evsOrder.js.orderStatus1'), value: 1},
        {label: this.$t('evsOrder.js.orderStatus2'), value: 2},
        {label: this.$t('evsOrder.js.orderStatus3'), value: 3},
      ],
      payMethodOptions:[
        {label: this.$t('common.all'), value: null},
        {label: this.$t('evsOrder.js.payMethod1'), value: 1},
        {label: this.$t('evsOrder.js.payMethod2'), value: 2},
      ],
      countrys: [],
    }
  },
  computed: {
    computedOrders() {
      return this.orders.map(item => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          phoneString: item.countryCode ? "+" + item.countryCode + " " + item.phone : item.phone,
          mobileNumberString: item.mobilePrefix ? "+" + item.mobilePrefix + " " + item.mobileNumber : item.mobileNumber,
          orderStatusString: item.orderStatus != null ? this.$t('evsOrder.js.orderStatus'+item.orderStatus) : '',
          orderStatusDepositString: item.orderStatusDeposit != null ? this.$t('evsOrder.js.orderStatusDeposit'+item.orderStatusDeposit) : '',
          orderStatusLeftPartString: item.orderStatusLeftPart != null ? this.$t('evsOrder.js.orderStatusLeftPart'+item.orderStatusLeftPart) : '',
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getEvsOrderList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getEvsOrderList(this, this.query)
    },
    detail(index, row) {
      // this.$router.push({path: '/evs/order/' + row.orderNo})
      window.open(location.href.split(location.pathname)[0] + "/evs/order/" + row.orderNo);
    },
    getAllCountrys() {
      api.getCountryList(this).then(() => { 
        this.countrys.unshift({code: null, name: this.$t('city.js.all')}); 
      });
    }
  }


}


</script>
