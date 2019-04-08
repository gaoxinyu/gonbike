<template>
<div>
  <h4>{{ $t('couponInfo.table.title') }}</h4>
  <div class="row">
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          {{ $t('couponInfo.table.title1') }}
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>{{ $t('couponInfo.table.benefitType') }}</th>
                <th>{{ $t('couponInfo.table.benefitMoney') }}</th>
              </tr>
              <tr>
                <td>{{coupon.benefitTypeString || "--"}}</td>
                <td>{{coupon.benefitMoneyString || "--"}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          {{ $t('couponInfo.table.title2') }}
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th>{{ $t('couponInfo.table.endType') }}</th>
                <th>{{ $t('couponInfo.table.days') }}</th>
                <th>{{ $t('couponInfo.table.area') }}</th>
              </tr>
              <tr>
                <td>{{coupon.endTypeString || "--"}}</td>
                <td>{{coupon.daysString || "--"}}</td>
                <td>{{coupon.areaString || "--"}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('couponInfo.table.title3') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCouponLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('couponInfo.table.createdAt')" width="130"></el-table-column>
        <el-table-column prop="typeString" :label="$t('couponInfo.table.type')" width="120"></el-table-column>
        <el-table-column prop="adminName" :label="$t('couponInfo.table.adminName')" width="120"></el-table-column>
        <el-table-column prop="remark" :label="$t('couponInfo.table.remark')"></el-table-column>
      </el-table>
    </div>

  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    api.getCouponLogList(this, this.query);
  },
  data() {
    return {
      loading: false,
      couponLogs: [],
      coupon: JSON.parse(sessionStorage.getItem('coupon')) || {},  
      query: {
        couponId: this.$route.params.id,
      }
    }
  },
  computed: {
    computedCouponLogs() {
      return this.couponLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('couponInfo.js.type1') : item.type === 2 ? this.$t('couponInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    
  }
}

</script>