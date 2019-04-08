<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('trip.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trip.query.startTime')">
              <el-date-picker
                v-model="query.startTime"
                type="date"
                :placeholder="$t('trip.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trip.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('trip.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trip.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trip.query.bikeId')">
              <el-input v-model="query.bikeId"></el-input>
            </el-form-item>
          </div>

        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.countryId')">
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
            <el-form-item :label="$t('report.query.cityId')">
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
            <el-form-item :label="$t('trip.query.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trip.query.lockType')">
              <el-select v-model="query.lockType">
                <el-option
                  v-for="item in lockTypeOptions"
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
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('trip.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedorders" border style="width: 100%">
        <el-table-column prop="id" :label="$t('trip.table.id')" width="70"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('trip.table.phone')" min-width="150">
          <template slot-scope="scope">
            <a :href="'/operate/trip?phone=' + scope.row.phone" target="_blank">{{scope.row.phoneString}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="bikeId" :label="$t('trip.table.bikeId')" min-width="80">
          <template slot-scope="scope">
            <a :href="'/operate/trip?bikeId=' + scope.row.bikeId" target="_blank">{{scope.row.bikeId}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="tradeNo" :label="$t('trip.table.tradeNo')" min-width="150"></el-table-column>
        <el-table-column prop="minutes" :label="$t('trip.table.minutes')" min-width="60"></el-table-column>
        <el-table-column prop="distance" :label="$t('trip.table.distance')" min-width="60"></el-table-column>
        <el-table-column prop="areaString" :label="$t('trip.table.area')" min-width="140"></el-table-column>
        <el-table-column prop="startTimeString" :label="$t('trip.table.startTime')" min-width="140"></el-table-column>
        <el-table-column prop="tempEndTimeString" :label="$t('trip.table.tempEndTime')" min-width="140"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('trip.table.endTime')" min-width="140"></el-table-column>
        <el-table-column prop="priceString" :label="$t('trip.table.price')" min-width="90"></el-table-column>
        <el-table-column prop="actualPriceString" :label="$t('trip.table.actualPrice')" min-width="90"></el-table-column>
        <el-table-column prop="reasonString" :label="$t('trip.table.reason')" min-width="80"></el-table-column>
        <el-table-column prop="statusString" :label="$t('trip.table.status')" min-width="80"></el-table-column>
        <el-table-column prop="lockTypeString" :label="$t('trip.table.lockType')" min-width="80"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" min-width="60">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button v-if="scope.row.status === 3" type="text" size="small" @click="showStopTrip(scope.$index, scope.row)">{{ $t('trip.table.stopTrip') }}</el-button></div>
              <div><el-button v-if="(scope.row.status === 4 || scope.row.status === 5) && scope.row.actualPrice > 0" type="text" size="small" @click="showPayBack(scope.$index, scope.row)">{{ $t('trip.table.payBack') }}</el-button></div>
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

  <el-dialog :title="$t('trip.dialog.title')" :visible.sync="detailVisible" width="30%">
    <el-form label-position="left" label-width="100px">

      <el-form-item :label="$t('trip.dialog.sendNoti')">
        <el-radio-group v-model="sendNoti">
          <el-radio :label="1">{{ $t('trip.dialog.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('trip.dialog.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailVisible = false">{{ $t('trip.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="stopTrip">{{ $t('trip.dialog.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('trip.dialog.title1')" :visible.sync="payBackVisible" width="30%">
    <el-form label-position="left" label-width="90px">
      <el-form-item :label="$t('trip.dialog.phone')">
        <span>{{ selectRow.phoneString }}</span>
      </el-form-item>

      <el-form-item :label="$t('trip.dialog.amount')" class="required">
        <el-input v-model="amount" type="number" min="0" :max="selectRow.actualPrice"></el-input>
      </el-form-item>

      <el-form-item :label="$t('trip.dialog.remark')">
        <el-input v-model="remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>

      <el-form-item :label="$t('trip.dialog.sendNoti')">
        <el-radio-group v-model="sendNoti">
          <el-radio :label="1">{{ $t('trip.dialog.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('trip.dialog.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <p class="text-yellow">* {{ $t('trip.dialog.amountTips', {actualPrice: selectRow.actualPrice}) }}</p>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="payBackVisible = false">{{ $t('trip.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="payBack" :disabled="amount <= 0 || amount > selectRow.actualPrice">{{ $t('trip.dialog.ok') }}</el-button>
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
    if(!this.$route.query.phone && !this.$route.query.bikeId && !this.$route.query.orderNo) {
      const { startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.query.startTime = startDateStr;
      this.query.endTime = endDateStr;
    }else{
      this.query.orderNo = this.$route.query.orderNo
    }
  },
  mounted() {
    if(this.query.phone || this.query.bikeId || this.query.orderNo) {
      api.getOrderList(this, this.query);
    }
  },
  data () {
    return {
      loading: false,
      detailVisible: false,
      payBackVisible: false,
      selectRow: {},
      orders: [],
      duration: 10, //20, // 结束行程的默认时间
      sendNoti: 1,   // 结束行程后是否发送消息给用户
      amount: null, // 消费退款金额
      remark: null, // 消费退款原因
      query: {
        startTime: null,
        endTime: null,
        phone:  this.$route.query.phone,
        bikeId: this.$route.query.bikeId,
        pageNum: 1,
        lockType: null,
        status: null,
        countryId: null,
        cityId: null,
        reason: null,
      },
      page: {
        count: 0
      },
      statusOptions: [
        {label: this.$t('trip.js.all'), value: null},
        {label: this.$t('trip.js.status1'), value: 1},
        {label: this.$t('trip.js.status2'), value: 2},
        {label: this.$t('trip.js.status3'), value: 3},
        {label: this.$t('trip.js.status4'), value: 4},
      ],
      lockTypeOptions: [
        {label: this.$t('trip.js.all'), value: null},
        {label: this.$t('trip.js.lockType1'), value: 1},
        {label: this.$t('trip.js.lockType2'), value: 2},
        {label: this.$t('trip.js.lockType3'), value: 3},
        {label: this.$t('trip.js.lockType6'), value: 6},
      ],
      cityOptions: [
        {label: this.$t('trip.js.all'), value: null}
      ],
      reasonOptions: [
        {label: this.$t('trip.js.all'), value: null},
        {label: this.$t('trip.js.reason1'), value: 1},
        {label: this.$t('trip.js.reason2'), value: 2},
        {label: this.$t('trip.js.reason3'), value: 3},
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedorders() {
      return this.orders.map((item) => {
        return {
            ...item,
            statusString: item.status == "1" ? this.$t('trip.js.status1') : item.status == "2" ? this.$t('trip.js.status2') : item.status == "3" ? this.$t('trip.js.status3')
                        : item.status == "4" ? this.$t('trip.js.status4') : item.status == "5" ? this.$t('trip.js.status5') : "",
            priceString: item.currencySymbol ? item.currencySymbol + " " + item.price : item.price,
            actualPriceString: item.actualCurrencySymbol ? item.actualCurrencySymbol + " " + item.actualPrice : item.actualPrice,
            phoneString: item.code ? "+" + item.code + " " + item.phone : item.phone,

            lockTypeString: item.lockType == "1" ? this.$t('trip.js.lockType1') : item.lockType == "2" ? this.$t('trip.js.lockType2')
                          : item.lockType == "3" ? this.$t('trip.js.lockType3') : item.lockType == "6" ? this.$t('trip.js.lockType6') : "",
            // reasonString: item.activityId ? this.$t('trip.js.reason1') : item.couponId ? this.$t('trip.js.reason2') : item.clubcardId ? this.$t('trip.js.reason3') : '',
            reasonString: +item.reasonType === 1 ? this.$t('trip.js.reason1') : +item.reasonType === 2 ? this.$t('trip.js.reason2')
                        :+item.reasonType === 3 ? this.$t('trip.js.reason3') :+item.reasonType === 4 ? this.$t('trip.js.reason4')
                        :+item.reasonType === 5 ? this.$t('trip.js.reason5') :+item.reasonType === 6 ? this.$t('trip.js.reason6'):'--',
            startTimeString: item.status === 2 ? (item.bookTime ? moment(item.bookTime).format("YYYY-MM-DD HH:mm:ss") : '') : (item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : ''),
            endTimeString: item.status === 2 ? (item.cancelBookTime ? moment(item.cancelBookTime).format("YYYY-MM-DD HH:mm:ss") : '') : (item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : ''),
            tempEndTimeString: item.tempEndTime ? moment(item.tempEndTime).format("YYYY-MM-DD HH:mm:ss") : '',
            areaString: item.bikeCountryName ? item.bikeCountryName + (item.bikeCityName ? ' - ' + item.bikeCityName : '') : '',
          }
      })
    },
  },
  methods: {
    goAddCredit() {
      this.$router.push({name: "addcredit"});
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getOrderList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getOrderList(this, this.query)
    },
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('trip.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
      })
    },
    showStopTrip(index, row) {
      this.selectRow = row;
      this.detailVisible = true;
    },
    showPayBack(index, row) {
      this.selectRow = row;
      this.payBackVisible = true;
    },
    stopTrip() {
      const params = {
        bikeId: this.selectRow.bikeId,
        userId: this.selectRow.userId,
        orderNo: this.selectRow.orderNo,
        // endTime: moment(this.computedDuration).valueOf(),
        sendNoti: this.sendNoti,
      };
      api.updateUserTrip(this, params).then(() => {
        this.detailVisible = false;
        api.getOrderList(this, this.query);
      });
    },
    payBack() {
      const params = {
        countryId: this.selectRow.countryId,
        phone: this.selectRow.phone,
        amount: this.amount,
        subject: 8,   // 消费退款
        remark: this.remark,
        sendNoti: this.sendNoti,
        orderNo: this.selectRow.orderNo,
      };
      api.updateBalance(this, params).then(() => {
        this.payBackVisible = false;
      })
    }
  },
  components: {
  }
}
</script>
