<template>
<div class="evs-order-detail-view">
  <h4>{{ $t('evsOrderDetail.info.name') }}</h4>
  <div class="box box-info">
    <div class="box-header">
      {{ $t('evsOrderDetail.info.orderNo')+': '+ order.orderNo}}
    </div>

    <div class="box-body no-padding">
      <el-form label-width="100px">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th width="100px">{{ $t('evsOrderDetail.info.orderStatus') }}</th>
              <td colspan='3'>
                <el-select style="width: 180px;" v-model="order.orderStatus">
                  <el-option
                    v-for="item in orderStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td colspan='4'>
                {{ $t('evsOrderDetail.info.createdAt') }}： {{ computedOrder.createdAtString }}
              </td>
            </tr>

            <tr>
              <th rowspan="2" width="100px">{{ $t('evsOrderDetail.info.pay') }}</th>
              <td>{{ $t('evsOrderDetail.info.deposit') }}</td>
              <td>{{ $t('evsOrderDetail.info.payTime') }}： {{ computedOrder.evAccountLogDeposit.payTimeString }}</td>
              <td>{{ $t('evsOrderDetail.info.payMethod') }}： {{ computedOrder.evAccountLogDeposit.payMethodString }}</td>

              <td v-if="order.evAccountLogDeposit.payMethod === 1">{{ $t('evsOrderDetail.info.amount') }}： {{ computedOrder.evAccountLogDeposit.amountString }}</td>
              <td v-if="order.evAccountLogDeposit.payMethod === 1">{{ $t('evsOrderDetail.info.statementNo') }}： {{ order.evAccountLogDeposit.statementNo }}</td>
              <td v-if="order.evAccountLogDeposit.payMethod === 1"></td>
              <td v-if="order.evAccountLogDeposit.payMethod === 1">{{ $t('evsOrderDetail.info.payStatus') }}： {{ computedOrder.evAccountLogDeposit.payStatusString }}</td>

              <td v-if="order.evAccountLogDeposit.payMethod !== 1">
                {{ $t('evsOrderDetail.info.amount') }} ：
                <el-input style="width: 100px;" type="number" min="0" v-if="order.evAccountLogDeposit.payStatus" v-model.number="order.evAccountLogDeposit.coinNum"></el-input>
              </td>
              <td v-if="order.evAccountLogDeposit.payMethod !== 1">
                {{ $t('evsOrderDetail.info.walletAddress') }}：
                <el-input style="width: 100px;" v-if="order.evAccountLogDeposit.payStatus" v-model="order.evAccountLogDeposit.walletAddress"></el-input>
              </td>
              <td v-if="order.evAccountLogDeposit.payMethod !== 1">
                {{ $t('evsOrderDetail.info.tradeNo') }}：
                <el-input style="width: 100px;" v-if="order.evAccountLogDeposit.payStatus" v-model="order.evAccountLogDeposit.tradeNo"></el-input>
              </td>
              <td v-if="order.evAccountLogDeposit.payMethod !== 1">
                {{ $t('evsOrderDetail.info.payStatus') }}：
                <el-select style="width: 140px;" v-model="depositPayStatus" :disabled="!order.evAccountLogDeposit.payMethod || order.evAccountLogDeposit.payStatus === 1">
                  <el-option
                    v-for="item in payStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>

            <tr>
              <td>{{ $t('evsOrderDetail.info.leftPart') }}</td>
              <td>{{ $t('evsOrderDetail.info.payTime') }}： {{ computedOrder.evAccountLogLeftPart.payTimeString }}</td>
              <td>{{ $t('evsOrderDetail.info.payMethod') }}： {{ computedOrder.evAccountLogLeftPart.payMethodString }}</td>

              <td v-if="order.evAccountLogLeftPart.payMethod === 1">{{ $t('evsOrderDetail.info.amount') }}： {{ computedOrder.evAccountLogLeftPart.amountString }}</td>
              <td v-if="order.evAccountLogLeftPart.payMethod === 1">{{ $t('evsOrderDetail.info.statementNo') }}： {{ order.evAccountLogLeftPart.statementNo }}</td>
              <td v-if="order.evAccountLogLeftPart.payMethod === 1"></td>
              <td v-if="order.evAccountLogLeftPart.payMethod === 1">{{ $t('evsOrderDetail.info.payStatus') }}： {{ computedOrder.evAccountLogLeftPart.payStatusString }}</td>

              <td v-if="order.evAccountLogLeftPart.payMethod !== 1">
                {{ $t('evsOrderDetail.info.amount') }} ：
                <el-input style="width: 100px;" type="number" min="0" v-if="order.evAccountLogLeftPart.payStatus" v-model.number="order.evAccountLogLeftPart.coinNum"></el-input>
              </td>
              <td v-if="order.evAccountLogLeftPart.payMethod !== 1">
                {{ $t('evsOrderDetail.info.walletAddress') }}：
                <el-input style="width: 100px;" v-if="order.evAccountLogLeftPart.payStatus" v-model="order.evAccountLogLeftPart.walletAddress"></el-input>
              </td>
              <td v-if="order.evAccountLogLeftPart.payMethod !== 1">
                {{ $t('evsOrderDetail.info.tradeNo') }}：
                <el-input style="width: 100px;" v-if="order.evAccountLogLeftPart.payStatus" v-model="order.evAccountLogLeftPart.tradeNo"></el-input>
              </td>
              <td v-if="order.evAccountLogLeftPart.payMethod !== 1">
                {{ $t('evsOrderDetail.info.payStatus') }}：
                <el-select style="width: 140px;" v-model="order.evAccountLogLeftPart.payStatus" :disabled="!order.evAccountLogLeftPart.payMethod">
                  <el-option
                    v-for="item in payStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>

            <tr>
              <th rowspan="2" width="100px">{{ $t('evsOrderDetail.info.receivedInfo') }}</th>
              <td colspan='2'>{{ $t('evsOrderDetail.info.recipientName') }}：{{ order.recipientName }}</td>
              <td colspan='2'>{{ $t('evsOrderDetail.info.mobileNumber') }}：{{ computedOrder.mobileNumberString }}</td>
              <td colspan='1'>{{ $t('evsOrderDetail.info.countryName') }}：{{ order.countryName }}</td>
              <td colspan='1'>{{ $t('evsOrderDetail.info.stateName') }}：{{ order.stateName }}</td>
              <td colspan='1'>{{ $t('evsOrderDetail.info.cityName') }}：{{ order.cityName }}</td>
            </tr>

            <tr>
              <td colspan='4'>{{ $t('evsOrderDetail.info.homeAddress') }}：{{ order.homeAddress }}</td>
              <td colspan='3'>{{ $t('evsOrderDetail.info.postalCode') }}：{{ order.postalCode }}</td>
            </tr>

            <tr>
              <th width="100px">{{ $t('evsOrderDetail.info.goodsInfo') }}</th>
              <td colspan='2'>{{ $t('evsOrderDetail.info.earlyBirdPrice') }}：{{ computedOrder.evGoods.earlyBirdPriceString }}</td>
              <td colspan='5'>{{ $t('evsOrderDetail.info.goodsContent') }}：{{ order.evGoods.remark }}</td>
            </tr>

            <tr>
              <th width="100px">{{ $t('evsOrderDetail.info.remark') }}</th>
              <td colspan='7'>
                <el-input style="width: 400px;" v-model="order.remark"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
        <el-form-item label="">
          <el-button type="primary" @click="save" :disabled="saveDisabled || saveDisabledDeposit">{{ $t('evsPayway.form.save') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    const orderNo = this.$route.params.no;
    this.getEvsOrderDetail(orderNo);
  },
  data() {
    return {
      depositPayStatus: null,
      order: {
        evAccountLogDeposit: {},
        evAccountLogLeftPart: {},
        evGoods: {},
        remark: null,
      }, 
      orderStatusOptions:[
        {label: this.$t('evsOrder.js.orderStatus0'), value: 0},
        {label: this.$t('evsOrder.js.orderStatus1'), value: 1},
        {label: this.$t('evsOrder.js.orderStatus2'), value: 2},
        {label: this.$t('evsOrder.js.orderStatus3'), value: 3},
      ],
      payStatusOptions: [
        {label: this.$t('evsOrderDetail.js.payStatus0'), value: 0},
        {label: this.$t('evsOrderDetail.js.payStatus1'), value: 1},
        {label: this.$t('evsOrderDetail.js.payStatus2'), value: 2},
        {label: this.$t('evsOrderDetail.js.payStatus3'), value: 3},
      ]
    }
  },
  computed: {
    computedOrder() {
      return {
        // ...this.order,
        createdAtString: this.order.createdAt ? moment(this.order.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
        orderStatusString: this.order.orderStatus != null ? this.$t('evsOrder.js.orderStatus'+this.order.orderStatus) : '',
        mobileNumberString: this.order.mobilePrefix ? "+" + this.order.mobilePrefix + " " + this.order.mobileNumber : this.order.mobileNumber,
        evAccountLogDeposit: {
          ...this.order.evAccountLogDeposit,
          payTimeString: this.order.evAccountLogDeposit.payTime ? moment(this.order.evAccountLogDeposit.payTime).format("YYYY-MM-DD HH:mm:ss") : '',
          payMethodString: this.order.evAccountLogDeposit.payMethod ? this.$t('evsOrderDetail.js.payMethod'+this.order.evAccountLogDeposit.payMethod) : '',
          amountString: this.order.currencySymbol ? this.order.currencySymbol + ' ' + this.order.evAccountLogDeposit.amount : this.order.evAccountLogDeposit.amount,
          payStatusString: this.order.evAccountLogDeposit.payStatus ? this.$t('evsOrderDetail.js.payStatus'+this.order.evAccountLogDeposit.payStatus) : '',
        },
        evAccountLogLeftPart: {
          ...this.order.evAccountLogDeposit,
          payTimeString: this.order.evAccountLogLeftPart.payTime ? moment(this.order.evAccountLogLeftPart.payTime).format("YYYY-MM-DD HH:mm:ss") : '',
          payMethodString: this.order.evAccountLogLeftPart.payMethod ? this.$t('evsOrderDetail.js.payMethod'+this.order.evAccountLogLeftPart.payMethod) : '',
          amountString: this.order.currencySymbol ? this.order.currencySymbol + ' ' + this.order.evAccountLogLeftPart.amount : this.order.evAccountLogLeftPart.amount,
          payStatusString: this.order.evAccountLogLeftPart.payStatus ? this.$t('evsOrderDetail.js.payStatus'+this.order.evAccountLogLeftPart.payStatus) : '',
        },
        evGoods: {
          earlyBirdPriceString: this.order.evGoods.currencySymbol ? this.order.evGoods.currencySymbol + ' ' + this.order.evGoods.earlyBirdPrice : this.order.evGoods.earlyBirdPrice,
        }
      }
    },
    saveDisabled() {
      return !((this.order.evAccountLogDeposit.payMethod && this.order.evAccountLogDeposit.payMethod !== 1 && this.order.evAccountLogDeposit.payStatus !== 3 && this.depositPayStatus !== 3 ? this.order.evAccountLogDeposit.coinNum > 0 : true) &&
              (this.order.evAccountLogLeftPart.payMethod && this.order.evAccountLogLeftPart.payMethod !== 1 && this.order.evAccountLogLeftPart.payStatus !== 3 ? this.order.evAccountLogLeftPart.coinNum > 0 : true)) &&
              !(this.depositPayStatus === 0 ? true : false)
    },
    saveDisabledDeposit() {
      // 预付款交易失败按钮置灰控制
      return (this.order.orderStatusDeposit === 3 && this.order.orderStatusLeftPart === 0 && this.depositPayStatus === 1 && this.order.evAccountLogDeposit.coinNum === 0) ||
        (this.order.evAccountLogLeftPart.payMethod === 1 && this.order.evAccountLogDeposit.payMethod === 1 && (this.order.orderStatus === 0 || this.order.orderStatus === 2))
    }
  },
  methods: {
    getEvsOrderDetail(orderNo) {
      api.getEvsOrderDetail(this, {orderNo}).then((res) => {
        this.depositPayStatus = res.evAccountLogDeposit.payStatus
      })
    },
    save() {
      this.order.evAccountLogDeposit.payStatus = this.depositPayStatus
      api.saveEvsOrderDetail(this, this.order)
    }
  }
}

</script>