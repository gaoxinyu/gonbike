<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('trade.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('trade.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.beginTime')">
              <el-date-picker
                v-model="query.beginTime"
                type="date"
                :placeholder="$t('trade.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('trade.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.subject')">
              <el-select v-model="query.subject">
                <el-option
                  v-for="item in subjectOptions"
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
            <el-form-item :label="$t('trade.query.statementNo')">
              <el-input v-model="query.statementNo"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.tradeNo')">
              <el-input v-model="query.tradeNo"></el-input>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('payment.query.payStatus')">
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
            <el-form-item :label="$t('trade.query.countryId')">
              <el-select v-model="query.countryId" @change="getPayMethodByCountry">
                <el-option
                  v-for="item in areaOptions"
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
            <el-form-item :label="$t('payment.query.payMethod')">
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
          <div class="col-md-3 col-xs-12">
          </div>
          
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('trade.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>

      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedAccountLogs" border style="width: 100%">
        <el-table-column prop="id" :label="$t('trade.table.id')" width="70"></el-table-column>
        <el-table-column prop="payTimeStirng" :label="$t('trade.table.payTime')" width="140"></el-table-column>
        <el-table-column prop="statementNo" :label="$t('trade.table.statementNo')" width="140"></el-table-column>
        <el-table-column prop="tradeNo" :label="$t('trade.table.tradeNo')" width="140">
          <template slot-scope="scope">
            <a :href="'/user/payment?tradeNo=' + scope.row.tradeNo" target="_blank">{{scope.row.tradeNo}}</a>
          </template>
        </el-table-column>
        <el-table-column :label="$t('trade.table.phone')" width="135">
          <template slot-scope="scope">
            <el-button @click="handleClickPhone(scope.$index, scope.row)" type="text" size="small">{{scope.row.phoneString}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="currentDepositString" :label="$t('trade.table.currentDeposit')"></el-table-column>
        <el-table-column prop="currentBalanceString" :label="$t('trade.table.currentBalance')"></el-table-column>
        <el-table-column prop="amountString" :label="$t('trade.table.amount')"></el-table-column>
        <el-table-column prop="payFeeString" :label="$t('trade.table.payFee')"></el-table-column>
        <el-table-column prop="subjectName" :label="$t('trade.table.subjectName')"></el-table-column>
        <!-- <el-table-column prop="paidString" :label="$t('trade.table.paid')"></el-table-column> -->
        <el-table-column prop="payStatusString" :label="$t('payment.table.payStatus')"></el-table-column>
        <el-table-column prop="payMethodString" :label="$t('payment.table.payMethod')" width="120"></el-table-column>
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

  <el-dialog :title="$t('trade.dialog.title1')" :visible.sync="detailVisible">
    <p>1. {{ $t('trade.dialog.title2') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>{{ $t('trade.dialog.payTime') }}</th>
              <th>{{ $t('trade.dialog.phone') }}</th>
              <th>{{ $t('trade.dialog.subjectName') }}</th>
              <th>{{ $t('trade.dialog.amount') }}</th>
              <th>{{ $t('trade.dialog.afterChangeBalance') }}</th>
            </tr>
            <tr>
              <td>{{selectRow.payTimeStirng || "--"}}</td>
              <td>{{selectRow.phoneString || "--"}}</td>
              <td>{{selectRow.subjectName || "--"}}</td>
              <td>{{selectRow.amountString}}</td>
              <td>{{selectRow.afterChangeBalanceString}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p> </p>
    <p>2. {{ $t('trade.dialog.title3') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr><td width="120px">{{ $t('payment.dialog.payMethod') }}</td><td>{{selectRow.payMethodString || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.statementNo') }}</td><td>{{selectRow.statementNo || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.tradeNo') }}</td><td>{{selectRow.tradeNo || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.payTime') }}</td><td>{{selectRow.payTimeStirng || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.cardType') }}</td><td>{{selectRow.cardType || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.amount') }}</td><td>{{selectRow.amountString || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.table.payStatus') }}</td><td>{{selectRow.payStatusString || "--"}}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-dialog>

  <el-dialog :title="$t('trade.dialog.title1')" :visible.sync="rideDetailVisible">
    <p>1. {{ $t('trade.dialog.title2') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>{{ $t('trade.dialog.payTime') }}</th>
              <th>{{ $t('trade.dialog.phone') }}</th>
              <th>{{ $t('trade.dialog.subjectName') }}</th>
              <th>{{ $t('trade.dialog.amount') }}</th>
              <th>{{ $t('trade.dialog.afterChangeBalance') }}</th>
            </tr>
            <tr>
              <td>{{selectRow.payTimeStirng || "--"}}</td>
              <td>{{selectRow.phoneString || "--"}}</td>
              <td>{{selectRow.subjectName || "--"}}</td>
              <td>{{selectRow.amountString}}</td>
              <td>{{selectRow.afterChangeBalanceString}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p> </p>
    <p>2. {{ $t('trade.dialog.title4') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr><td width="120px">{{ $t('trade.dialog.orderNo') }}</td><td>{{computedOrder.orderNo || "--"}}</td>
                <td width="120px">{{ $t('trade.dialog.bikeId') }}</td><td>{{computedOrder.bikeId || "--"}}</td></tr>

            <tr><td width="120px">{{ $t('trade.dialog.minutes') }}</td><td>{{computedOrder.minutes + " min" || "--"}}</td>
                <td width="120px">{{ $t('trade.dialog.distance') }}</td><td>{{computedOrder.distance + " m" || "--"}}</td></tr>

            <tr><td width="120px">{{ $t('trade.dialog.price') }}</td><td>{{computedOrder.priceString || "--"}}</td>
                <td width="120px">{{ $t('trade.dialog.actualPrice') }}</td><td>{{computedOrder.actualPriceString || "--"}}</td></tr>

            <tr><td width="120px">{{ $t('trade.dialog.reason') }}</td><td>{{computedOrder.reasonString || "--"}}</td>
                <td width="120px">{{ $t('trade.dialog.lockType') }}</td><td>{{computedOrder.lockTypeString || "--"}}</td></tr>

            <tr><td width="120px">{{ $t('trade.dialog.startTime') }}</td><td>{{computedOrder.startTimeString || "--"}}</td>
                <td width="120px">{{ $t('trade.dialog.tempEndTime') }}</td><td>{{computedOrder.tempEndTimeString || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.endTime') }}</td><td>{{computedOrder.endTimeString || "--"}}</td>
                <td width="120px"></td><td></td></tr>
            <!--
            <tr><td width="120px">{{ $t('trade.dialog.startAddress') }}</td><td>{{order.startAddress || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('trade.dialog.endAddress') }}</td><td>{{order.endAddress || "--"}}</td></tr>
            -->
          </tbody>
        </table>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    if(!this.$route.query.phone && !this.$route.query.statementNo) {
      const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.beginTime = startDate;
      this.endTime = endDate;
      this.query.beginTime = startDateStr;
      this.query.endTime = endDateStr;
    }
  },
  mounted() {
    api.getAccountLogList(this, this.query)
    this.getPayMethodByCountry()
  },
  data () {
    return {
      loading: false,
      detailVisible: false,
      rideDetailVisible: false,
      selectRow: {},
      order: {},
      accountLogs: [],
      query: {
        pageNum: 1,
        countryId: null,
        beginTime: null,
        endTime: null,
        phone: this.$route.query.phone,
        subject: null,
        tradeNo: null,
        statementNo: this.$route.query.statementNo,
        payStatus: null,
        payMethod: null,
      },
      page: {
        count: 0
      },
      paidOptions: [
        {label: this.$t('trade.js.all'), value: null},
        {label: this.$t('trade.js.paid1'), value: 1},
        {label: this.$t('trade.js.paid0'), value: 0},
      ],
      subjectOptions: [
        {label: this.$t('trade.js.all'), value: null},
        {label: this.$t('trade.js.subject1'), value: 1},
        {label: this.$t('trade.js.subject2'), value: 2},
        {label: this.$t('trade.js.subject3'), value: 3},
        {label: this.$t('trade.js.subject4'), value: 4},
        {label: this.$t('trade.js.subject5'), value: 5},
        {label: this.$t('trade.js.subject6'), value: 6},
        {label: this.$t('trade.js.subject7'), value: 7},
        {label: this.$t('trade.js.subject8'), value: 8},
        {label: this.$t('trade.js.subject9'), value: 9},
        {label: this.$t('trade.js.subject10'), value: 10},
        {label: this.$t('trade.js.subject11'), value: 11},
        {label: this.$t('trade.js.subject12'), value: 12},
        {label: this.$t('trade.js.subject13'), value: 13},
        {label: this.$t('trade.js.subject14'), value: 14},
        {label: this.$t('trade.js.subject15'), value: 15},
        {label: this.$t('trade.js.subject16'), value: 16},
      ],
      payMethodOptions: [
        {label: this.$t('payment.js.all'), value: null},
      ],
      payStatusOptions: [
        {label: this.$t('payment.js.all'), value: null},
        ...'0123456'.split('').map(status => { return {label: this.$t('payment.js.payStatus' + status), value: status}}),
      ],
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedAccountLogs() {
      return this.accountLogs.map((item) => {
        return {
            ...item,
            amountString: item.payMethod === 'OCN' ? (`${item.currencySymbol} ${item.amount} (≈ ${item.payCurrency} ${item.payAmount})`) : (item.currencySymbol ? item.currencySymbol + " " + item.amount : item.amount),
            payFeeString: item.payMethod === 'OCN' ? (`${item.payCurrency} ${item.payFee}`) : (item.currencySymbol ? item.currencySymbol + " " + item.payFee : item.payFee),
            payAmountString: item.currencySymbol ? item.currencySymbol + " " + item.payAmount : item.payAmount,
            currentDepositString: item.currencySymbol ? item.currencySymbol + " " + item.currentDeposit : item.currentDeposit,
            currentBalanceString: item.currencySymbol ? item.currencySymbol + " " + item.currentBalance : item.currentBalance,
            afterChangeBalanceString: item.currencySymbol ? item.currencySymbol + " " + item.afterChangeBalance : item.afterChangeBalance,
            phoneString: item.code ? "+" + item.code + " " + item.phone : item.phone,
            payStatusString: this.$t('payment.js.payStatus' + item.payStatus),
            payTimeStirng: item.payTime ? moment(item.payTime).format("YYYY-MM-DD HH:mm:ss") : (item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : ''),
            // isDirtyString: item.isDirty === 1 ? this.$t('trade.js.isDirty1') : item.isDirty === 2 ? this.$t('trade.js.isDirty2') : this.$t('trade.js.isDirty0'),
            payMethodString: item.sparePayMethod ? item.payMethod + ' + ' + item.sparePayMethod : item.payMethod,
          }
      })
    },
    computedOrder() {
      return {
        ...this.order,
        priceString: this.order.currencySymbol ? this.order.currencySymbol + " " + this.order.price : this.order.price,
        actualPriceString: this.order.currencySymbol ? this.order.currencySymbol + " " + this.order.actualPrice : this.order.actualPrice,
        lockTypeString: this.order.lockType == "1" ? this.$t('trade.js.lockType1') : this.order.lockType == "2" ? this.$t('trade.js.lockType2')
                      : this.order.lockType == "3" ? this.$t('trade.js.lockType3') : this.order.lockType == "6" ? this.$t('trade.js.lockType6') : "",

        reasonString: this.order.activityId ? this.$t('trade.js.reason1') : this.order.couponId ? this.$t('trade.js.reason2') : this.order.clubcardId ? this.$t('trade.js.reason3') : '',
        startTimeString: this.order.status === 2 ? (this.order.bookTime ? moment(this.order.bookTime).format("YYYY-MM-DD HH:mm:ss") : '') : (this.order.startTime ? moment(this.order.startTime).format("YYYY-MM-DD HH:mm:ss") : ''),
        endTimeString: this.order.status === 2 ? (this.order.cancelBookTime ? moment(this.order.cancelBookTime).format("YYYY-MM-DD HH:mm:ss") : '') : (this.order.endTime ? moment(this.order.endTime).format("YYYY-MM-DD HH:mm:ss") : ''),
        tempEndTimeString: this.order.tempEndTime ? moment(this.order.tempEndTime).format("YYYY-MM-DD HH:mm:ss") : '',
      }
    }
  },
  methods: {
    goAdd() {
      // this.$router.push({name: "addbalance"});
      window.open(location.href.split(location.pathname)[0] + "/user/trade/add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getAccountLogList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getAccountLogList(this, this.query)
    },
    handleClickPhone(index, row) {
      this.query.phone = row.phone;
      this.handleQuery();
    },
    detail(index, row) {
      this.selectRow = row;
      if(row.subject != 5) {
        this.detailVisible = true;
      } else {
        api.getOrderInfo(this, {tradeNo: row.tradeNo}).then(() => {
          this.rideDetailVisible = true;
        })
      }
    },
    getPayMethodByCountry(countryId = null) {
      this.query.countryId = countryId;
      this.payMethodOptions = [{label: this.$t('payment.js.all'), value: null}];
      this.query.payMethod = null;
      api.getPayMethodByCountry(this, this.query).then(payMethods => {
        payMethods.forEach(payMethod => {
          this.$set(this.payMethodOptions, this.payMethodOptions.length, {label: payMethod.name, value: payMethod.name})
        })
      })
    }
  },
  components: {
  }
}
</script>