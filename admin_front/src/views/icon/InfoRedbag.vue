<template>
<div class="red-bag-info">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('baginfo.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <div class="box box-border">
        <div class="box-header">{{ $t('baginfo.query.basic') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBagInfo" border style="width: 100%">
            <el-table-column prop="id" :label="$t('baginfo.table.id')"></el-table-column>
            <el-table-column prop="name" :label="$t('baginfo.table.name')"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('baginfo.table.createdAt')"></el-table-column>
            <el-table-column prop="countryName" :label="$t('baginfo.table.countryId')"></el-table-column>
            <!-- <el-table-column prop="cityName" :label="$t('baginfo.table.cityId')"></el-table-column> -->
            <el-table-column prop="contentCount" :label="$t('baginfo.table.num')"></el-table-column>
            <!-- <el-table-column prop="baginfo" :label="$t('baginfo.table.baginfo')"></el-table-column> -->
            <el-table-column prop="rules" :label="$t('baginfo.table.rules')"></el-table-column>
            <el-table-column prop="remark" :label="$t('baginfo.table.remark')"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box box-border">
        <div class="box-header">{{ $t('baginfo.query.log') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedRedbagLog" border style="width: 100%">
            <el-table-column prop="operateTimeString" :label="$t('baginfo.table.operateTime')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('baginfo.table.operater')"></el-table-column>
            <el-table-column prop="deal" :label="$t('baginfo.table.operator')"></el-table-column>
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
    // api.getRedbagLogList(this, {id: this.baginfo.id});
  },
  data() {
    return {
      loading: false,
      baginfo: JSON.parse(sessionStorage.getItem('viewRedbag')) || {}, 
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
          rules: (item.rideMinutes ? this.$t('baginfo.js.rideMinutes', {rideMinutes: item.rideMinutes}) : this.$t('baginfo.js.norideMinutes')) + (item.memberDays ? this.$t('baginfo.js.memberDays', {memberDays: item.memberDays}) : this.$t('baginfo.js.nomemberDays')) + (item.memberTimes ? this.$t('baginfo.js.memberTimes', {memberTimes: item.memberTimes}) : this.$t('baginfo.js.nomemberTimes'))
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
      this.$router.push({name: "redbag"})
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getPayMethodLog(this, this.query);
    }
  }
}

</script>
