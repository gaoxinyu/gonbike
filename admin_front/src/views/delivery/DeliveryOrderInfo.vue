<template>
<div>
  <h4>{{ $t('delivery.info.name') }}</h4>
  <div class="box box-info">
    <div class="box-header">
      {{ $t('delivery.info.orderNo')+': '+ order.orderNo}}
    </div>
    <div class="box-body no-padding">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th width="7%">{{$t('delivery.info.sender')}}</th>
            <td  width="40%" colspan='2'>{{`${$t('delivery.info.uidSender')}:  ${order.uidSender}`}}</td>
            <td  width="40%" colspan='2'>{{`${$t('delivery.info.senderPhone')}:  ${order.senderPhoneStr}`}}</td>
            <!-- <td colspan='2'>{{`信用分  12314`}}</td> -->
          </tr>
          <tr>
            <th rowspan="2"  width="7%">{{`${$t('delivery.info.sendfor')}`}}</th>
            <td rowspan="1"  width="20%">{{`${$t('delivery.info.sendforName')}: ${order.sendforName}`}}</td>
            <td colspan="3" width="40%">{{`${$t('delivery.info.sendforAddress')}: ${order.sendforAddress}`}}</td>
          </tr>
          <tr>
            <td width="20%">{{`${$t('delivery.info.sendforPhone')}:  ${order.sendforPhoneStr}`}}</td>
            <td colspan="2">{{`${$t('delivery.info.sendforDoorno')}: ${order.sendforDoorno}`}}</td>
            <td width="20%">{{`${$t('delivery.info.sendforPostalCode')}: ${order.sendforPostalCode}`}}</td>
          </tr>
          <tr>
            <th rowspan="2">{{`${$t('delivery.info.receiver')}`}}</th>
            <td>{{`${$t('delivery.info.receiverName')}: ${order.receiverName || ''}`}}</td>
            <td colspan="3">{{`${$t('delivery.info.receiverAddress')}: ${order.receiverAddress}`}}</td>
          </tr>
          <tr>
            <td>{{`${$t('delivery.info.receiverPhone')}:  ${order.receiverPhoneStr}`}}</td>
            <td colspan="2">{{`${$t('delivery.info.receiverDoorno')}: ${order.receiverDoorno}`}}</td>
            <td width="20%">{{`${$t('delivery.info.receiverPostalCode')}: ${order.receiverPostalCode}`}}</td>
          </tr>
          <tr>
            <th >{{`${$t('delivery.info.note')}`}}</th>
            <td colspan='4'>{{`${order.packetRemark}`}}</td>
          </tr>
          <tr>
            <th>{{`${$t('delivery.info.driver')}`}}</th>
            <td>{{`${$t('delivery.info.driverName')}:  ${order.driverName || ''}`}}</td>
            <td>{{`${$t('delivery.info.uidDriver')}:  ${order.uidDriver || ''}`}}</td>
            <td colspan="2">{{`${$t('delivery.info.driverPhone')}:  ${order.driverPhoneStr}`}}</td>
            <!-- <td>{{`信用分  ${order.uidDriver}`}}</td> -->
          </tr>
          <tr>
            <th >{{`${$t('delivery.info.packetType')}`}}</th>
            <td colspan='4'>{{`${order.packetTypeStr}`}}</td>
          </tr>
          <!-- 物品价格 -->
          <!--<tr>-->
          <!--  <th >{{`${$t('delivery.info.packetValue')}`}}</th>-->
          <!--  <td colspan='4'>{{`${order.packetValue}`}}</td>-->
          <!--</tr>-->
          <tr>
            <th>{{`${$t('delivery.info.packet')}`}}</th>
            <td>{{`${$t('delivery.info.packetWeight')}:  ${order.packetWeightStr || ''}kg`}}</td>
            <td>{{`${$t('delivery.info.miles')}:  ${(order.miles / 1000).toFixed(2)}km`}}</td>
            <td colspan="2">{{`${$t('delivery.info.priceSenderAll')}: ${order.currencySymbol ? order.currencySymbol + order.priceSenderAll: order.priceSenderAll}`}}</td>
            <!-- <td>{{`${$t('delivery.info.priceExtra')}: ${order.packetValue}`}}</td> -->
          </tr>
          <tr>
            <th >{{$t('delivery.info.statusStr')}}</th>
            <td colspan='4' v-if="order.status !== 45">{{`${order.statusStr}`}}</td>
            <template v-else>
              <td colspan="2">{{`${order.statusStr}`}}</td>
              <td>{{`${$t('delivery.info.refundAmount')}: ${order.currencySymbol + (order.refundAmount || '')}`}}</td>
              <td>{{`${$t('delivery.info.driverRefundAmount')}: ${order.currencySymbol + (order.driverRefundAmount || '')}`}}</td>
            </template>
          </tr>
          <!-- <tr>
            <th >{{"支付单号"}}</th>
            <td colspan='4'>{{`${order.packetValue}`}}</td>
          </tr>
          <tr>
            <th >{{"交易单号"}}</th>
            <td colspan='4'>{{`${order.packetValue}`}}</td>
          </tr> -->
          <tr>
            <th rowspan="2">{{$t('delivery.info.trackOrder')}}</th>
            <td>{{`${$t('delivery.info.createTimeStr')}:  ${order.createTimeStr}`}}</td>
            <td>{{`${$t('delivery.info.sendTimeStr')}:  ${order.sendTimeStr}`}}</td>
            <td colspan="2">{{`${$t('delivery.info.senderPaytime')}:  ${order.senderPaytimeStr}`}}</td>
            <!-- <td >{{`${$t('delivery.info.driverSendtoTimeStr')}:  ${order.driverSendtoTimeStr}`}}</td> -->
          </tr>
          <tr>
            <td>{{`${$t('delivery.info.driverGrabTimeStr')}:  ${order.driverGrabTimeStr}`}}</td>
            <td>{{`${$t('delivery.info.driverGetTimeStr')}:  ${order.driverGetTimeStr}`}}</td>
            <td>{{`${$t('delivery.info.driverSendtoTimeStr')}:  ${order.driverSendtoTimeStr}`}}</td>
            <td>{{`${$t('delivery.info.cancelTimeStr')}:  ${order.cancelTimeStr}`}}</td>
          </tr>
          <tr>
            <th >{{$t('delivery.info.stautsBadStr')}}</th>
            <td colspan='4'>{{`${order.stautsBadStr}`}}</td>
          </tr>
          <!-- <tr>
            <th >{{"骑手提交"}}</th>
            <td colspan='4'>{{`${order.packetValue}`}}</td>
          </tr>
          <tr>
            <th >{{"用户提交"}}</th>
            <td colspan='4'>{{`${order.packetValue}`}}</td>
          </tr> -->
          <tr>
            <th >{{$t('delivery.info.sendforVerifyno')}}</th>
            <td colspan='4'>{{`${order.sendforVerifyno}`}}</td>
          </tr>
          <tr>
            <th >{{$t('delivery.info.receiverVerifyno')}}</th>
            <td colspan='4'>{{`${order.receiverVerifyno}`}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import api from '../../api'

export default {
  mounted() {
    // api.getCountryLogList(this, this.query);
    if(this.order.status === 45){
      let query = {
        "orderNo":this.order.orderNo
      }
      api.driverAbnormalRefundAmount(this, query)
    }
  },
  data() {
    return {
      loading: false,
      order: {
        ...JSON.parse(sessionStorage.getItem('deliveryOrder')),
        driverRefundAmount: 0
        }, 
    }
  },
}

</script>