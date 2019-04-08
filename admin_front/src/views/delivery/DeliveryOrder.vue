<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('delivery.name') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.orderNo')">
              <el-input v-model="query.orderNo"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.countryId')">
              <el-select v-model="query.countryId">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.uidSender')">
              <el-input v-model="query.uidSender"></el-input>
            </el-form-item>
          </div> -->
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.senderPhone')">
              <el-input v-model="query.senderPhone"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.driverPhone')">
              <el-input v-model="query.driverPhone"></el-input>
            </el-form-item>
          </div>

        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.sendforPhone')">
              <el-input v-model="query.sendforPhone"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.receiverPhone')">
              <el-input v-model="query.receiverPhone"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.uidDriver')">
              <el-input v-model="query.uidDriver"></el-input>
            </el-form-item>
          </div> -->
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.beginCreateTime')">
              <el-date-picker
                v-model="beginCreateTimeStr"
                type="datetime"
                :placeholder="$t('delivery.query.chooseTime')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.endCreateTime')">
              <el-date-picker
                v-model="endCreateTimeStr"
                type="datetime"
                :placeholder="$t('delivery.query.chooseTime')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.status')">
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
            <el-form-item :label="$t('delivery.query.stautsBad')">
              <el-select v-model="query.stautsBad">
                <el-option
                  v-for="item in stautsBadOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="'异常状态'">
              <el-select v-model="query.countryId">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div> -->
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('delivery.query.senderPaystatus')">
              <el-select v-model="query.senderPaystatus">
                <el-option
                  v-for="item in senderPaystatusOptions"
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
      <el-table v-loading="loading" :data="computedorders" border style="width: 100%">
        <el-table-column prop="orderNo" :label="$t('delivery.list.orderNo')" width="130"></el-table-column>
        <el-table-column prop="countryName" :label="$t('delivery.list.countryName')" min-width="70"></el-table-column>
        <el-table-column prop="statusStr" :label="$t('delivery.list.statusStr')" min-width="100"></el-table-column>
        <el-table-column prop="stautsBadStr" :label="$t('delivery.list.stautsBadStr')" min-width="100"></el-table-column>
        <el-table-column prop="senderPaystatusStr" :label="$t('delivery.list.senderPaystatusStr')" min-width="110"></el-table-column>
        <!-- <el-table-column prop="stautsBad" :label="'异常状态'" min-width="100"></el-table-column> -->
        <!-- <el-table-column prop="uidSender" :label="$t('delivery.list.uidSender')" min-width="80"></el-table-column> -->
        <el-table-column prop="senderPhoneStr" :label="$t('delivery.list.senderPhone')" min-width="120"></el-table-column>
        <el-table-column prop="sendforPhoneStr" :label="$t('delivery.list.sendforPhone')" min-width="120"></el-table-column>
        <el-table-column prop="receiverPhoneStr" :label="$t('delivery.list.receiverPhone')" min-width="120"></el-table-column>
        <!-- <el-table-column prop="uidDriver" :label="$t('delivery.list.uidDriver')" min-width="70"></el-table-column> -->
        <el-table-column prop="driverPhoneStr" :label="$t('delivery.list.driverPhone')" min-width="120"></el-table-column>
        <el-table-column prop="createTimeStr" :label="$t('delivery.list.createTimeStr')" 
        min-width="80"></el-table-column>
        <el-table-column prop="sendTimeStr" :label="$t('delivery.list.sendTimeStr')" min-width="80"></el-table-column>
        <el-table-column prop="driverGrabTimeStr" :label="$t('delivery.list.driverGrabTimeStr')" min-width="80"></el-table-column>
        <el-table-column prop="driverGetTimeStr" :label="$t('delivery.list.driverGetTimeStr')" min-width="80"></el-table-column>
        <el-table-column prop="driverSendtoTimeStr" :label="$t('delivery.list.driverSendtoTimeStr')" min-width="80"></el-table-column>
        <el-table-column prop="packetWeightStr" :label="$t('delivery.list.packetWeight')" min-width="100"></el-table-column>
        <el-table-column prop="milesStr" :label="$t('delivery.list.miles')" min-width="100"></el-table-column>
        <el-table-column prop="priceSenderAllStr" :label="$t('delivery.list.priceSenderAll')" min-width="100"></el-table-column>
        <el-table-column prop="packetRemark" :label="$t('delivery.list.packetRemark')" min-width="110"></el-table-column>
        <el-table-column fixed="right" :label="$t('delivery.list.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('delivery.list.operate') }}</el-button>
              <div><el-button @click="detail(scope.$index, scope.row)" type="text" size="small" >{{ $t('delivery.list.check') }}</el-button></div>
              <div v-if="scope.row.status<3">
                <el-button type="text" size="small" @click="cancel(scope.$index, scope.row)">{{ $t('delivery.list.cancel') }}</el-button>
              </div>
              <div v-if="scope.row.status>=2 && scope.row.status<=4">
                <el-button type="text" size="small" @click="setAbnormal(scope.$index, scope.row)">{{ $t('delivery.list.setAbnormal') }}</el-button>
              </div>
              <div v-if="scope.row.status===44">
                <div><el-button type="text" size="small" @click="abnormalRefund(scope.$index, scope.row)">{{ $t('delivery.list.abnormalRefund') }}</el-button></div>
              </div>
              <!-- <div><el-button type="text" size="small" @click="abnormal(scope.$index, scope.row)">{{ '置为异常/取消异常' }}</el-button></div> -->
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="row text-center">
        <div class="col-md-12">
          <el-pagination 
            layout="total, prev, pager, next" 
            :total="data.count"
            :page-size="data.per"
            :current-page="data.current"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    :title="$t('delivery.refundQuery.title')"
    :visible.sync="abnormalDialogVisible"
    width="30%">
    <el-form :model='abnormalDialogData' v-loading="loading">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th width="100px">{{$t('delivery.refundQuery.orderNo')}}</th><td>{{abnormalDialogData.orderNo}}</td>
        </tr>
        <tr>
          <th width="100px">{{$t('delivery.refundQuery.uidSender')}}</th><td>{{abnormalDialogData.uidSender}}</td>
        </tr>
        <tr>
          <th width="100px">{{$t('delivery.refundQuery.senderPhoneStr')}}</th><td>{{abnormalDialogData.senderPhoneStr}}</td>
        </tr>
        <tr>
          <th width="100px">{{$t('delivery.refundQuery.priceSenderAllStr')}}</th><td style="vertical-align: middle;">{{abnormalDialogData.priceSenderAllStr}}</td>
        </tr>
        <tr>
          <th width="100px" style="vertical-align: middle;">{{$t('delivery.refundQuery.refundAmount')}}</th>
          <td>
            <el-form-item
              :prop="'refundAmount'"
              :rules="[
                { required: true, message: $t('delivery.refundQuery.nonEmptyHelper')},
                { type: 'number', min: 0, 
                  max: abnormalDialogData.priceSenderAll, 
                  message: abnormalDialogData.validateHelperSingle}
              ]">
              <el-input v-model.number="abnormalDialogData.refundAmount" type="number">
                <template slot="prepend">{{abnormalDialogData.currencySymbol}}</template>
              </el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th width="100px" style="vertical-align: middle;">{{$t('delivery.refundQuery.driverRefundAmount')}}</th>
          <td>
            <el-form-item
              :prop="'driverRefundAmount'"
              :show-message='true'
              :rules="[
                { required: true, message: $t('delivery.refundQuery.nonEmptyHelper')},
                { type: 'number', min: 0, 
                  max: abnormalDialogData.priceSenderAll, 
                  message: abnormalDialogData.validateHelperSingle}
              ]">
              <el-input v-model.number="abnormalDialogData.driverRefundAmount" type="number">
                <template slot="prepend">{{abnormalDialogData.currencySymbol}}</template>
              </el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="right"><em>*<sub>{{abnormalDialogData.validateHelperAll}}</sub></em></td>
        </tr>
      </tbody>
    </table>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="abnormalDialogVisible = false">{{$t('delivery.js.no')}}</el-button>
      <el-button type="primary" @click="handleAbnormalRefund" :disabled="!isAbnormalFormValide">{{$t('delivery.js.yes')}}</el-button>
    </span>
     
  </el-dialog>


</div>
</template>

<script>
import api from "../../api";
import moment from "moment";
// import * as Options from '../../services/options/index.js'
import Mixins from "../../mixins/index.js";

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    // if (!this.$route.query.phone) {
    //   const {
    //     startDate,
    //     endDate,
    //     startDateStr,
    //     endDateStr
    //   } = this.getDefaultDate(); // query.js
    //   this.createdAt = startDate;
    //   this.endTime = endDate;
    //   this.query.createdAt = startDateStr;
    //   this.query.endTime = endDateStr;
    // }
  },
  mounted() {
    // api.getDeliveryList(this, this.query);
  },
  data() {
    return {
      loading: false,
      abnormalDialogVisible: false,
      abnormalDialogData: {},
      abnormalDialogDataDefault: {
        priceSenderAll: 0,
        refundAmount: 0,
        driverRefundAmount: 0,
        validateHelperSingle: this.$t('delivery.refundQuery.validateHelperSingle'),
        validateHelperAll: this.$t('delivery.refundQuery.validateHelperAll')
      },
      data: {
        list: []
      },
      beginCreateTimeStr: null,
      endCreateTimeStr: null,
      query: {
        orderNo: null,
        countryId: null,
        uidSender: null,
        senderPhone: null,
        sendforPhone: null,
        receiverPhone: null,
        uidDriver: null,
        driverPhone: null,
        status: null,
        stautsBad: null,
        senderPaystatus: null,
        pageNum: 1,
        beginCreateTime: null,
        endCreateTime: null,
      },
      page: {
        count: 0
      },
      areaOptions:  [
        {label: this.$t('common.all'), value: null, currency: 'USD'},
        {label: 'Singapore', value: 153, currency: 'S$'},
        {label: 'China', value: 37, currency: '¥'},
      ],
      statusOptions: [
        {
          value: null,
          label: this.$i18n.t("delivery.statusOptions.op1")
        },
        {
          value: 0,
          label: this.$i18n.t("delivery.statusOptions.op2")
        },
        {
          value: 1,
          label: this.$i18n.t("delivery.statusOptions.op3")
        },
        {
          value: 2,
          label: this.$i18n.t("delivery.statusOptions.op4")
        },
        {
          value: 3,
          label: this.$i18n.t("delivery.statusOptions.op5")
        },
        {
          value: 4,
          label: this.$i18n.t("delivery.statusOptions.op6")
        },
        {
          value: 8,
          label: this.$i18n.t('delivery.statusOptions.op7')
        },
        {
          value: 44,
          label: this.$i18n.t('delivery.statusOptions.op44')
        },
        {
          value: 45,
          label: this.$i18n.t('delivery.statusOptions.op45')
        }
      ],
      stautsBadOptions: [
        {
          value: null,
          label: this.$i18n.t("delivery.stautsBadOptions.op1")
        },
        {
          value: 0,
          label: this.$i18n.t("delivery.stautsBadOptions.op2")
        },
        {
          value: 1,
          label: this.$i18n.t("delivery.stautsBadOptions.op3")
        },
        {
          value: 2,
          label: this.$i18n.t("delivery.stautsBadOptions.op4")
        },
        {
          value: 3,
          label: this.$i18n.t("delivery.stautsBadOptions.op5")
        }
      ],
      senderPaystatusOptions: [
        {
          value: null,
          label: this.$i18n.t("delivery.senderPaystatusOptions.op1")
        },
        {
          value: 0,
          label: this.$i18n.t("delivery.senderPaystatusOptions.op2")
        },
        {
          value: 1,
          label: this.$i18n.t("delivery.senderPaystatusOptions.op3")
        },
        {
          value: 3,
          label: this.$i18n.t("delivery.senderPaystatusOptions.op4")
        }
      ],
      packetTypeOptions: [
        {
          value: null,
          label: this.$i18n.t("delivery.packetTypeOptions.op1")
        },
        {
          value: 0,
          label: this.$i18n.t("delivery.packetTypeOptions.op2")
        },
        {
          value: 1,
          label: this.$i18n.t("delivery.packetTypeOptions.op3")
        },
        {
          value: 2,
          label: this.$i18n.t("delivery.packetTypeOptions.op4")
        },
        {
          value: 3,
          label: this.$i18n.t("delivery.packetTypeOptions.op5")
        },
        {
          value: 4,
          label: this.$i18n.t("delivery.packetTypeOptions.op6")
        },
        {
          value: 5,
          label: this.$i18n.t("delivery.packetTypeOptions.op7")
        },
        {
          value: 6,
          label: this.$i18n.t("delivery.packetTypeOptions.op8")
        }
      ]
    };
  },
  watch: {
    beginCreateTimeStr(newVal){
      if(newVal) {
        this.query.beginCreateTime = newVal.getTime()
      }else {
        this.query.beginCreateTime = null
      }
    },
    endCreateTimeStr(newVal){
      if(newVal) {
        this.query.endCreateTime = newVal.getTime()
      }else {
        this.query.endCreateTime = null
      }
    }
  },
  computed: {
    computedorders() {
      return this.data.list.map(item => {
        return {
          ...item,
          countryName: this.type2LabelStr(this.areaOptions, item.countryId),
          statusStr: this.type2LabelStr(this.statusOptions, item.status),
          stautsBadStr: this.type2LabelStr(
            this.stautsBadOptions,
            item.stautsBad
          ),
          senderPaystatusStr: this.type2LabelStr(
            this.senderPaystatusOptions,
            item.senderPaystatus
          ),
          packetTypeStr: this.type2LabelStr(
            this.packetTypeOptions,
            item.packetType
          ),

          createTimeStr: this.timeStamp2Str(item.createTime),
          sendTimeStr: this.timeStamp2Str(item.sendTime),
          senderPaytimeStr: this.timeStamp2Str(item.senderPaytime),
          driverGrabTimeStr: this.timeStamp2Str(item.driverGrabTime),
          driverGetTimeStr: this.timeStamp2Str(item.driverGetTime),
          driverSendtoTimeStr: this.timeStamp2Str(item.driverSendtoTime),
          cancelTimeStr: this.timeStamp2Str(item.cancelTime),

          senderPhoneStr: this.phoneStr(
            item.senderPhonePrefix,
            item.senderPhone
          ),
          sendforPhoneStr: this.phoneStr(
            item.sendforPhonePrefix,
            item.sendforPhone
          ),
          driverPhoneStr: this.phoneStr(
            item.driverPhonePrefix,
            item.driverPhone
          ),
          receiverPhoneStr: this.phoneStr(
            item.receiverPhonePrefix,
            item.receiverPhone
          ),

          milesStr: (item.miles / 1000).toFixed(2),
          priceSenderAllStr: item.currencySymbol
            ? item.currencySymbol + item.priceSenderAll
            : item.priceSenderAll,

          packetWeightStr: item.packetWeight  < 0 ? '< ' + -item.packetWeight : item.packetWeight
        };
      });
    },
    isAbnormalFormValide() {
      let data = this.abnormalDialogData
      return data.priceSenderAll >= (data.refundAmount + data.driverRefundAmount)
              && data.refundAmount >= 0
              && data.refundAmount !== ''
              && data.driverRefundAmount >= 0
              && data.driverRefundAmount !== ''
    }
  },
  methods: {
    phoneStr(prefix, phone) {
      return prefix ? "+" + prefix + " " + phone : phone;
    },
    type2LabelStr(options, value) {
      return (options.find(s => s.value === value) || { label: "" }).label;
    },
    timeStamp2Str(timeStamp) {
      return timeStamp
        ? moment(timeStamp)
            .utcOffset("+08:00")
            .format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getDeliveryList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getDeliveryList(this, this.query);
    },
    detail(index, row) {
      // 已退款订单
      sessionStorage.deliveryOrder = JSON.stringify(row);
      window.open(location.href + "/" + row.orderNo);
    },
    cancel(index, row) {
      this.$confirm(
        this.$i18n.t("delivery.js.cencelHelper"),
        this.$i18n.t("delivery.js.hint"),
        {
          confirmButtonText: this.$i18n.t("delivery.js.yes"),
          cancelButtonText: this.$i18n.t("delivery.js.no"),
          type: "warning"
        }
      ).then(() => {
        let cancel = {
          orderNo: row.orderNo
        };
        api.cancelDeliveryOrder(this, cancel).then(() => {
          this.data.list.find(
            order => order.orderNo === row.orderNo
          ).status = 8;
        });
      });
    },
    setAbnormal(index, row) {
      this.$confirm(
        this.$i18n.t("delivery.js.abnormalHelper"),
        this.$i18n.t("delivery.js.hint"),
        {
          confirmButtonText: this.$i18n.t("delivery.js.yes"),
          cancelButtonText: this.$i18n.t("delivery.js.no"),
          type: "warning"
        }
      ).then(() => {
        let query = {
          orderNo: row.orderNo
        };
        api.abnormalDeliveryOrder(this, query).then(() => {
          this.data.list.find(
            order => order.orderNo === query.orderNo
          ).status = 44;
        });
      });
    },
    abnormalRefund(index, row) {
      this.abnormalDialogData = Object.assign({},this.abnormalDialogDataDefault, row)
      this.abnormalDialogVisible = true
    },
    handleAbnormalRefund(){
      this.$confirm(
        this.$i18n.t("delivery.js.abnormalRefundHelper"),
        this.$i18n.t("delivery.js.hint"),
        {
          confirmButtonText: this.$i18n.t("delivery.js.yes"),
          cancelButtonText: this.$i18n.t("delivery.js.no"),
          type: "warning"
        }
      ).then(() => {
        let query = {
          orderNo: this.abnormalDialogData.orderNo,
          refundAmount: this.abnormalDialogData.refundAmount,
          driverRefundAmount: this.abnormalDialogData.driverRefundAmount
        };
        api.AbnormalRefund(this, query).then(() => {
          this.abnormalDialogVisible = false
          let data = this.data.list.find(
            order => order.orderNo === query.orderNo
          )
          data.status = 45
          data.refundAmount = this.abnormalDialogData.refundAmount
          this.abnormalDialogData = {}
        });
      });
    },
    handleAbnormalSet(index, row) {
      this.$confirm(
        this.$i18n.t("delivery.js.handleAbnormalHelper"),
        this.$i18n.t("delivery.js.hint"),
        {
          confirmButtonText: this.$i18n.t("delivery.js.yes"),
          cancelButtonText: this.$i18n.t("delivery.js.no"),
          type: "warning"
        }
      ).then(() => {
        let query = {
          orderNo: row.orderNo,
          refundAmount: 0,
          driverRefundAmount: 0
        };
        api.AbnormalHandle(this, query).then(() => {
          this.abnormalDialogVisible = false
          let data = this.data.list.find(
            order => order.orderNo === query.orderNo
          )
          data.status = 45
          data.refundAmount = 0
          this.abnormalDialogData = {}
        });
      });
    }
  },
  components: {}
};
</script>

<style lang="scss">
// .user-info-view {
.no-min-with {
  min-width: initial !important;
}
// }
</style>