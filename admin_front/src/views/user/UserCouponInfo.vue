<template>
<div>
  <div class="box box-info">
    <div class="box-header">
      {{ $t('userCouponInfo.table.title1') }}
    </div>
    <div class="box-body no-padding">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>{{ $t('userCouponInfo.table.id') }}</th>
            <th>{{ $t('userCouponInfo.table.phone') }}</th>
            <th>{{ $t('userCouponInfo.table.createdAt') }}</th>
            <th>{{ $t('userCouponInfo.table.used') }}</th>
            <th>{{ $t('userCouponInfo.table.couponType') }}</th>
            <th>{{ $t('userCouponInfo.table.benefitMoney') }}</th>
            <th>{{ $t('userCouponInfo.table.area') }}</th>
            <th>{{ $t('userCouponInfo.table.days') }}</th>
          </tr>
          <tr>
            <td>{{userCoupon.id || "--"}}</td>
            <td>
              <a v-if="userCoupon.phone" :href="'/user/info?phone=' + userCoupon.phone" target="_blank">{{ userCoupon.phoneString }}</a>
              <span v-else>--</span>
            </td>
            <td>{{userCoupon.createdAtString || "--"}}</td>
            <td>{{userCoupon.usedString || "--"}}</td>
            <td>{{userCoupon.couponTypeString || "--"}}</td>
            <td>{{userCoupon.benefitMoneyString || "--"}}</td>
            <td>{{userCoupon.areaString || "--"}}</td>
            <td>{{userCoupon.daysString || "--"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('userCouponInfo.table.title2') }}
    </div>
    <div class="box-body">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th style="width: 100px;">{{ $t('userCouponInfo.table1.couponType') }}</th>
            <th>{{ userCoupon.couponTypeString || "--"}}</th>
          </tr>

          <!--邀请码-->
          <tr v-if="userCoupon.couponType == 1">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.inviteCode') }}</td>
            <td>
              {{ userCoupon.inviteCode }}
              <!--<a v-if="userCoupon.inviteCode" :href="'/discount/code?code=' + userCoupon.inviteCode" target="_blank">{{ userCoupon.inviteCode }}</a>
              <span v-else>--</span>-->
            </td>
          </tr>
          <tr v-if="userCoupon.couponType == 1">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.inviteMemberPhone') }}</td>
            <td>
              <a v-if="userCoupon.inviteMemberPhone" :href="'/user/info?phone=' + userCoupon.inviteMemberPhone" target="_blank">{{ userCoupon.inviteMemberPhoneString }}</a>
              <span v-else>--</span>
            </td>
          </tr>

          <!--优惠码-->
          <tr v-if="userCoupon.couponType == 2">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.exchangeCode') }}</td>
            <td>
              <a v-if="userCoupon.exchangeCode" :href="'/discount/code?code=' + userCoupon.exchangeCode" target="_blank">{{ userCoupon.exchangeCode }}</a>
              <span v-else>--</span>
            </td>
          </tr>
          <tr v-if="userCoupon.couponType == 2">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.exchangeQuantity') }}</td>
            <td>{{userCoupon.exchangeQuantity || "--"}}</td>
          </tr>
          <tr v-if="userCoupon.couponType == 2">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.benefitMoney') }}</td>
            <td>{{userCoupon.benefitMoneyString || "--"}}</td>
          </tr>
          <tr v-if="userCoupon.couponType == 2">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.exchangeDays') }}</td>
            <td>{{userCoupon.exchangeDaysString || "--"}}</td>
          </tr>

          <!--邀请奖励-->
          <tr v-if="userCoupon.couponType == 3">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.inviteCode') }}</td>
            <td>{{userCoupon.inviteCode || "--"}}</td>
          </tr>
          <tr v-if="userCoupon.couponType == 3">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.fromMemberPhone') }}</td>
            <td>
              <a v-if="userCoupon.fromMemberPhone" :href="'/user/info?phone=' + userCoupon.fromMemberPhone" target="_blank">{{ userCoupon.fromMemberPhoneString }}</a>
              <span v-else>--</span>
            </td>
          </tr>
          <tr v-if="userCoupon.couponType == 3">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.ifFinishRide') }}</td>
            <td>
              {{ $t('userCouponInfo.table1.ifFinishRideValue') }}
              <a :href="'/operate/trip?phone=' + userCoupon.fromMemberPhone" target="_blank">{{ $t('userCouponInfo.table1.trip') }}</a>
            </td>
          </tr>

          <!--运营赠送-->
          <tr v-if="userCoupon.couponType == 4">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.sendQuantity') }}</td>
            <td>{{userCoupon.sendQuantity || "--"}}</td>
          </tr>
          <tr v-if="userCoupon.couponType == 4">
            <td style="width: 100px;">{{ $t('userCouponInfo.table1.benefitMoney1') }}</td>
            <td>{{userCoupon.benefitMoneyString || "--"}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>

  <div class="box box-info" v-if="order">
    <div class="box-header with-border">
      {{ $t('userCouponInfo.table.title3') }}
    </div>
    <div class="box-body">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.orderNo') }}</td>
            <td>
              <!--{{ computedOrder.orderNo || "--"}}-->
              <a v-if="computedOrder.id" :href="'/operate/trip?orderNo=' + computedOrder.id" target="_blank">{{ userCoupon.id }}</a>
              <span v-else>--</span>
            </td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.bikeId') }}</td>
            <td>{{ computedOrder.bikeId || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.minutes') }}</td>
            <td>{{ computedOrder.minutes !== null ? computedOrder.minutes + ' min' : "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.distance') }}</td>
            <td>{{ computedOrder.distance !== null ? computedOrder.distance + ' m' : "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.price') }}</td>
            <td>{{ computedOrder.priceString || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.actualPrice') }}</td>
            <td>{{ computedOrder.actualPriceString || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.reason') }}</td>
            <td>{{ computedOrder.reasonString || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.startTime') }}</td>
            <td>{{ computedOrder.startTimeString || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 100px;">{{ $t('userCouponInfo.table2.endTime') }}</td>
            <td>{{ computedOrder.endTimeString || "--"}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    
  },
  data() {
    return {
      userCoupon: JSON.parse(sessionStorage.getItem('userCoupon')) || {}, 
      order: JSON.parse(sessionStorage.getItem('userCoupon')).order,
    }
  },
  computed: {
    computedOrder() {
      return {
        ...this.order,
        priceString: this.order.currencySymbol ? this.order.currencySymbol + " " + this.order.price : this.order.price,
        actualPriceString: this.order.currencySymbol ? this.order.currencySymbol + " " + this.order.actualPrice : this.order.actualPrice,
        reasonString: this.order.activityId ? this.$t('userCouponInfo.js.reason1') : this.order.couponId ? this.$t('userCouponInfo.js.reason2') : this.order.clubcardId ? this.$t('userCouponInfo.js.reason3') : '',
        startTimeString: this.order.status === 2 ? (this.order.bookTime ? moment(this.order.bookTime).format("YYYY-MM-DD HH:mm:ss") : '') : (this.order.startTime ? moment(this.order.startTime).format("YYYY-MM-DD HH:mm:ss") : ''),
        endTimeString: this.order.status === 2 ? (this.order.cancelBookTime ? moment(this.order.cancelBookTime).format("YYYY-MM-DD HH:mm:ss") : '') : (this.order.endTime ? moment(this.order.endTime).format("YYYY-MM-DD HH:mm:ss") : ''),
      }
    }
  },
  methods: {
    
  }
}

</script>