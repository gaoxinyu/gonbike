<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('payment.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('payment.query.beginTime')">
              <el-date-picker
                v-model="query.beginTime"
                type="date"
                :placeholder="$t('payment.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('payment.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('payment.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
           <el-form-item :label="$t('payment.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            
            <el-form-item :label="$t('payment.query.countryId')">
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
            <el-form-item :label="$t('payment.query.statementNo')">
              <el-input v-model="query.statementNo"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('payment.query.tradeNo')">
              <el-input v-model="query.tradeNo"></el-input>
            </el-form-item>
          </div>

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
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
          </div>

          <div class="col-md-3 col-xs-12">
          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('payment.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedAccountLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('payment.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="payTimeString" :label="$t('payment.table.payTime')" width="140"></el-table-column>
        <el-table-column :label="$t('payment.table.phone')" width="135">
          <template slot-scope="scope">
            <el-button @click="handleClickPhone(scope.$index, scope.row)" type="text" size="small">{{scope.row.phoneString}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="statementNo" :label="$t('payment.table.statementNo')" width="150">
          <template slot-scope="scope">
            <a :href="'/user/trade?statementNo=' + scope.row.statementNo" target="_blank">{{scope.row.statementNo}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="cardType" :label="$t('payment.table.cardType')" width="80"></el-table-column>
        <el-table-column prop="tradeNo" :label="$t('payment.table.tradeNo')" width="140"></el-table-column>
        <el-table-column prop="currency" :label="$t('payment.table.currency')" width="70"></el-table-column>
        <el-table-column prop="amountString" :label="$t('payment.table.amount')" width="70"></el-table-column>
        <el-table-column prop="payFeeString" :label="$t('trade.table.payFee')" width="70"></el-table-column>
        <el-table-column prop="payAccount" :label="$t('payment.table.payAccount')" width="140"></el-table-column>
        <el-table-column prop="subjectName" :label="$t('payment.table.subjectName')" width="90"></el-table-column>
        <!-- <el-table-column prop="paidString" :label="$t('payment.table.paid')" width="80"></el-table-column> -->
        <el-table-column prop="payStatusString" :label="$t('payment.table.payStatus')" width="110"></el-table-column>
        <el-table-column prop="payMethodString" :label="$t('payment.table.payMethod')" width="120"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('payment.table.detail') }}</el-button></div>
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

  <el-dialog :title="$t('payment.dialog.title1')" :visible.sync="detailVisible">
    <p>1. {{ $t('payment.dialog.title2') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>{{ $t('payment.dialog.payTime') }}</th>
              <th>{{ $t('payment.dialog.phone') }}</th>
              <th>{{ $t('payment.dialog.subjectName') }}</th>
              <th>{{ $t('payment.dialog.amount') }}</th>
              <th>{{ $t('payment.dialog.afterChangeBalance') }}</th>
            </tr>
            <tr>
              <td>{{selectRow.payTimeString || "--"}}</td>
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
    <p>2. {{ $t('payment.dialog.title3') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr><td width="120px">{{ $t('payment.dialog.payMethod') }}</td><td>{{selectRow.payMethodString || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.statementNo') }}</td><td>{{selectRow.statementNo || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.tradeNo') }}</td><td>{{selectRow.tradeNo || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.payTime') }}</td><td>{{selectRow.payTimeString || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.cardType') }}</td><td>{{selectRow.cardType || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.amount') }}</td><td>{{selectRow.amountString || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.table.payStatus') }}</td><td>{{selectRow.payStatusString || "--"}}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-dialog>

  <el-dialog :title="$t('payment.dialog.title1')" :visible.sync="rideDetailVisible">
    <p>1. {{ $t('payment.dialog.title2') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>{{ $t('payment.dialog.payTime') }}</th>
              <th>{{ $t('payment.dialog.phone') }}</th>
              <th>{{ $t('payment.dialog.subjectName') }}</th>
              <th>{{ $t('payment.dialog.amount') }}</th>
              <th>{{ $t('payment.dialog.afterChangeBalance') }}</th>
            </tr>
            <tr>
              <td>{{selectRow.payTimeString || "--"}}</td>
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
    <p>2. {{ $t('payment.dialog.title4') }}</p>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <tbody>
            <tr><td width="120px">{{ $t('payment.dialog.orderNo') }}</td><td>{{order.orderNo || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.minutes') }}</td><td>{{order.minutes + " min" || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.distance') }}</td><td>{{order.distance + " m" || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.startTime') }}</td><td>{{order.startTime || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.endTime') }}</td><td>{{order.endTime || "--"}}</td></tr>
            <!--
            <tr><td width="120px">{{ $t('payment.dialog.startAddress') }}</td><td>{{order.startAddress || "--"}}</td></tr>
            <tr><td width="120px">{{ $t('payment.dialog.endAddress') }}</td><td>{{order.endAddress || "--"}}</td></tr>
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
    if(!this.$route.query.phone && !this.$route.query.tradeNo && !this.$route.query.statementNo) {
      const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.beginTime = startDate;
      this.endTime = endDate;
      this.query.beginTime = startDateStr;
      this.query.endTime = endDateStr;
    }
  },
  mounted() {
    api.getAccountLogList(this, this.query);
    this.getPayMethodByCountry();

    // this.isTw = this.current && this.current.countryInfo && this.current.countryInfo.id === 169;
  },
  props: {
    current: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      isTw: true,
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
        payMethod: null,
        pay: true,
        tradeNo: this.$route.query.tradeNo,
        statementNo: this.$route.query.statementNo,
        phone: this.$route.query.phone,
        payStatus: null,
      },
      page: {
        count: 0
      },
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
            payStatusString: this.$t('payment.js.payStatus' + item.payStatus),
            phoneString: item.code ? "+" + item.code + " " + item.phone : item.phone,
            // isDirtyString: item.isDirty === 1 ? this.$t('payment.js.isDirty1') : item.isDirty === 2 ? this.$t('payment.js.isDirty2') : this.$t('payment.js.isDirty0'),
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
            payTimeString: item.payTime ? moment(item.payTime).format("YYYY-MM-DD HH:mm:ss") : "",
            payMethodString: item.sparePayMethod ? item.payMethod + ' + ' + item.sparePayMethod : item.payMethod,
          }
      })
    }
  },
  methods: {
    goAddCredit() {
      // this.$router.push({name: "addcredit"});
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
        this.rideDetailVisible = true;
        // TODO
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