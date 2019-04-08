<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('depositusers.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goDeposit"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-table v-loading="loading" :data="computedPartInUsers" border style="width: 100%">
          <el-table-column prop="id" :label="$t('depositusers.table.id')" width="60"></el-table-column>
          <el-table-column prop="activityTypeString" :label="$t('depositusers.table.activityType')"></el-table-column>
          <el-table-column prop="userMobile" :label="$t('depositusers.table.userMobile')"></el-table-column>
          <el-table-column prop="originDepositString" :label="$t('depositusers.table.countryDeposit')"></el-table-column>
          <el-table-column prop="depositString" :label="$t('depositusers.table.deposit')"></el-table-column>
          <el-table-column prop="joinTimeString" :label="$t('depositusers.table.startTime')"></el-table-column>
          <el-table-column fixed="right" :label="$t('depositusers.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('depositusers.table.operate') }}</el-button>
                <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('depositusers.table.detail') }}</el-button>
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
  </div>
</template>
<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    api.getPartInUsers(this, this.query);
  },
  data() {
    return {
      loading: false,
      partinusers: [],
      query: {
        activityType: 4
      },
      page: {
        count: 0
      },
      statusOptions: [
        {label: this.$t('deposit.js.all'), value: null},
        {label: this.$t('deposit.js.status0'), value: 0},
        {label: this.$t('deposit.js.status1'), value: 1},
        {label: this.$t('deposit.js.status2'), value: 2},
      ],
    }
  },
  computed: {
    computedPartInUsers() {
      return this.partinusers.map((item) => {
        return {
          ...item,
          activityTypeString: item.activityType === 1 ? this.$t('deposit.js.activityType1') : item.activityType === 2 ? this.$t('deposit.js.activityType2') : item.activityType === 3 ? this.$t('deposit.js.activityType3') : item.activityType === 4 ? this.$t('deposit.js.activityType4') : '',
          userMobile: '+' + item.countryCode + ' ' + item.phone,
          originDepositString: item.student ? (item.countryStudentDeposit  ? item.currencySymbol + item.countryStudentDeposit : '') : (item.countryDeposit ? item.currencySymbol + item.countryDeposit : ''),
          depositString: item.student ? (item.studentDeposit  ? item.currencySymbol + item.studentDeposit : '') : (item.countryDeposit ? item.currencySymbol + item.countryDeposit : ''),
          joinTimeString: item.joinTime ? moment(item.joinTime).format("YYYY-MM-DD HH:mm:ss") : '',
        }
      })
    }
  },
  methods: {
    goDeposit() {
      this.$router.push({name: "deposit"});
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getPartInUsers(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getPartInUsers(this, this.query);
      }
    },
    detail(index, row) {
      sessionStorage.depositinfo = JSON.stringify(row);
      this.$router.push({name: "depositinfo"});
    }
  }
}
</script>
