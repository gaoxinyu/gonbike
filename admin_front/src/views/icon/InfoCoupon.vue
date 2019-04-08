<template>
<div class="red-bag-info">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('iconcpinfo.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <div class="box box-border">
        <div class="box-header">{{ $t('iconcpinfo.query.basic') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBagInfo" border style="width: 100%">
            <el-table-column prop="id" :label="$t('iconcpinfo.table.id')" width="60"></el-table-column>
            <el-table-column prop="name" :label="$t('iconcpinfo.table.name')" width="120"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('iconcpinfo.table.createdAt')" width="120"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('iconcpinfo.table.endTime')" width="150"></el-table-column>
            <el-table-column prop="statusString" :label="$t('iconcpinfo.table.status')"></el-table-column> -->
            <el-table-column prop="countryName" :label="$t('iconcpinfo.table.countryId')"></el-table-column>
            <el-table-column prop="cityName" :label="$t('iconcpinfo.table.cityId')"></el-table-column>
            <el-table-column prop="name" :label="$t('iconcpinfo.table.couponName')" width="120"></el-table-column>
            <el-table-column prop="name" :label="$t('iconcpinfo.table.couponInfo')" width="120"></el-table-column>
            <el-table-column prop="name" :label="$t('iconcpinfo.table.couponRules')" width="120"></el-table-column>
            <el-table-column prop="remark" :label="$t('iconcpinfo.table.remark')"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box box-border">
        <div class="box-header">{{ $t('iconcpinfo.query.log') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedRedbagLog" border style="width: 100%">
            <el-table-column prop="operateTimeString" :label="$t('iconcpinfo.table.operateTime')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('iconcpinfo.table.operater')"></el-table-column>
            <el-table-column prop="deal" :label="$t('iconcpinfo.table.operator')"></el-table-column>
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
  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    // api.getRedbagLogList(this, {id: this.iconcpinfo.id});
  },
  data() {
    return {
      loading: false,
      baginfo: JSON.parse(sessionStorage.getItem('viewIconCoupon')) || {}, 
      bagLog: [],
      page: {
        count: 0
      }
    }
  },
  computed: {
    computedBagInfo() {
      return [this.baginfo].map((item) => {
        return {
          ...item,
          rules: (item.rideMinutes ? this.$t('iconcpinfo.js.rideMinutes', {rideMinutes: item.rideMinutes}) : this.$t('iconcpinfo.js.norideMinutes')) + (item.memberDays ? this.$t('iconcpinfo.js.memberDays', {memberDays: item.memberDays}) : this.$t('iconcpinfo.js.nomemberDays')) + (item.memberTimes ? this.$t('iconcpinfo.js.memberTimes', {memberTimes: item.memberTimes}) : this.$t('iconcpinfo.js.nomemberTimes'))
        }
      })
    },
    computedRedbagLog() {
      return this.bagLog.map((item) => {
        return {
          ...item,
          operateTimeString: item.dealTime ? moment(item.dealTime).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: "iconcoupon"})
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getPayMethodLog(this, this.query);
    }
  }
}

</script>
