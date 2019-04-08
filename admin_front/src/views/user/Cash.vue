<template>
<div class="view-user-cash">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('cash.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('cash.query.statementNo')">
              <el-input v-model="query.statementNo"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('cash.query.driverId')">
              <el-input v-model="query.driverId"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('cash.query.driverPhone')">
              <el-input v-model="query.driverPhone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('cash.query.updatedAt')">
              <el-date-picker
                v-model="query.updatedAt"
                type="date"
                :placeholder="$t('activity.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('cash.query.payStatus')">
              <el-select v-model="query.payStatus">
                <el-option
                  v-for="item in payStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
          </div>
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
      <el-table v-loading="loading" :data="computedCashs" border style="width: 100%">
        <el-table-column prop="statementNo" :label="$t('cash.query.statementNo')" min-width="140"></el-table-column>
        <el-table-column prop="driverId" :label="$t('cash.query.driverId')"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('cash.table.createdAt')" min-width="150"></el-table-column>
        <el-table-column prop="countryName" :label="$t('cash.table.countryName')"></el-table-column>
        <el-table-column prop="driverPhoneString" :label="$t('cash.query.driverPhone')" min-width="140"></el-table-column>
        <el-table-column prop="amountString" :label="$t('cash.table.amount')"></el-table-column>
        <el-table-column prop="payStatusString" :label="$t('cash.query.payStatus')"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('cash.query.updatedAt')" min-width="150"></el-table-column>
        
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with" v-if="scope.row.payStatus === 5 || scope.row.payStatus === 6">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div v-if="scope.row.payStatus === 5"><el-button type="text" size="small" @click="approve(scope.$index, scope.row)">{{ $t('cash.table.approve') }}</el-button></div>
              <div v-if="scope.row.payStatus === 6"><el-button type="text" size="small" @click="cashOk(scope.$index, scope.row)">{{ $t('cash.table.cashOk') }}</el-button></div>
              <div v-if="scope.row.payStatus === 5"><el-button type="text" size="small" @click="cashRefuse(scope.$index, scope.row)">{{ $t('cash.table.cashRefuse') }}</el-button></div>
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
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    
  },
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      cashs: [],
      query: {
        statementNo: null,
        driverId: null,
        driverPhone: this.$route.query.phone,
        updatedAt: null,
        payStatus: null,
        countryId: null,
      },
      page: {
        count: 0
      },
      // areaOptions: this.getAreaOptions(),
      payStatusOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("cash.js.payStatus5"), value: 5},
        {label: this.$t("cash.js.payStatus6"), value: 6},
        {label: this.$t("cash.js.payStatus7"), value: 7},
        {label: this.$t("cash.js.payStatus8"), value: 8},
      ],
    }
  },
  computed: {
    computedCashs() {
      return this.cashs.map((item) => {
        return {
          ...item,
          driverPhoneString: item.countryCode ? '+' + item.countryCode + ' ' + item.driverPhone : item.driverPhone,
          amountString: item.currencySymbol ? item.currencySymbol + " " + item.amount : item.amount,
          payStatusString: this.$t("cash.js.payStatus" + item.payStatus),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getDriverCashList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getDriverCashList(this, this.query)
    },
    approve(index, row) {
      this.$confirm(this.$t('cash.js.approveTips', {phone: row.driverPhoneString}), this.$t('driver.js.tip'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateDriverCashApprove(this, {statementNo: row.statementNo}).then(() => this.handleQuery());
      }).catch(() => {
           
      });
    },
    cashOk(index, row) {
      this.$confirm(this.$t('cash.js.cashOkTips', {phone: row.driverPhoneString}), this.$t('driver.js.tip'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateDriverCashOk(this, {statementNo: row.statementNo}).then(() => this.handleQuery());
      }).catch(() => {
           
      });
    },
    cashRefuse(index, row) {
      this.$confirm(this.$t('cash.js.cashRefuseTips', {phone: row.driverPhoneString}), this.$t('driver.js.tip'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateDriverCashRefuse(this, {statementNo: row.statementNo}).then(() => this.handleQuery());
      }).catch(() => {
           
      });
    },
   
  },
}

</script>