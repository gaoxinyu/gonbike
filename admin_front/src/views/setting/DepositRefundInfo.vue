<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('deprfdinfo.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <div class="box box-border">
        <div class="box-header">{{ $t('deprfdinfo.query.basic') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedDeprfdinfo" border style="width: 100%">
            <el-table-column prop="id" :label="$t('deprfdinfo.table.id')" width="60"></el-table-column>
            <el-table-column prop="countryName" :label="$t('deprfdinfo.table.countryName')"></el-table-column>
            <el-table-column prop="needCommissionString" :label="$t('deprfdinfo.table.chargeCommission')"></el-table-column>
            <el-table-column prop="fromRefundNum" :label="$t('deprfdinfo.table.fromRefundNum')"></el-table-column>
            <el-table-column prop="commissionRateString" :label="$t('deprfdinfo.table.commissionRatePercent')"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box box-border">
        <div class="box-header">{{ $t('deprfdinfo.query.log') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedDeprfdinfoLog" border style="width: 100%">
            <el-table-column prop="operateTimeString" :label="$t('deprfdinfo.table.operateTime')"></el-table-column>
            <el-table-column prop="actionString" :label="$t('deprfdinfo.table.action')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('deprfdinfo.table.operater')"></el-table-column>
            <el-table-column prop="remark" :label="$t('deprfdinfo.table.operator')"></el-table-column>
          </el-table>
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
    api.getDepositRefundById(this, { id: this.$route.params.id });
  },
  data() {
    return {
      loading: false,
      deprfdinfo: {}
    }
  },
  computed: {
    computedDeprfdinfo() {
      if(this.deprfdinfo.countryDepositRefund) {
        return [this.deprfdinfo.countryDepositRefund].map((item) => {
          return {
            ...item,
            commissionRateString: item.commissionRate ? (item.commissionRate + '%') : '',
            needCommissionString: item.needCommission ? this.$t('refund.js.yes') : this.$t('refund.js.no')
          }
        })
      }
    },
    computedDeprfdinfoLog() {
      if(this.deprfdinfo.logList) {
        return this.deprfdinfo.logList.map((item) => {
          return {
            ...item,
            actionString: item.actionType == 0 ? this.$t('deprfdinfo.js.add') : (item.actionType == 1 ? this.$t('deprfdinfo.js.edit') : ''),
            operateTimeString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          }
        })
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: "depositrefund"})
    }
  }
}

</script>
