<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('payinfo.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>

    <div class="box-body">
      <div class="box box-border">
        <div class="box-header">{{ $t('payinfo.query.basic') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedViewPay" border style="width: 100%">
            <el-table-column prop="countryName" :label="$t('payinfo.table.countryId')"></el-table-column>
            <el-table-column prop="deposit" :label="$t('payway.table.deposit')"></el-table-column>
            <el-table-column prop="balance" :label="$t('payway.table.balance')"></el-table-column>
            <el-table-column prop="delivery" :label="$t('payway.table.delivery')"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box box-border">
        <div class="box-header">{{ $t('payinfo.query.log') }}</div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedPayMethodLog" border style="width: 100%">
            <el-table-column prop="operateTimeString" :label="$t('payinfo.table.operateTime')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('payinfo.table.operater')"></el-table-column>
            <el-table-column prop="deal" :label="$t('payinfo.table.operator')"></el-table-column>
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
    const viewpay = sessionStorage.viewpay;
    if(viewpay && this.$route.name === 'payinfo') {
      this.viewpay = JSON.parse(viewpay);
      this.query.countryId = this.viewpay.countryId;
      api.getPayMethodLog(this, this.query);
    }
  },
  data() {
    return {
      loading: false,
      viewpay: {},
      payMethodLog: [],
      query: {

      },
      page: {
        count: 0
      }
    }
  },
  computed: {
    computedViewPay() {
      return [this.viewpay].map((item) => {
        return {
          ...item
        }
      })
    },
    computedPayMethodLog() {
      return this.payMethodLog.map((item) => {
        return {
          ...item,
          operateTimeString: item.dealTime ? moment(item.dealTime).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: "pay"})
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getPayMethodLog(this, this.query);
    }
  }
}

</script>
