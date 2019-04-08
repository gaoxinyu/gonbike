<template>
<div class="view-risk">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('risk.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('risk.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedrisks" border style="width: 100%">
        <el-table-column prop="id" :label="$t('risk.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('risk.table.countryName')"></el-table-column>
        <el-table-column prop="hours" :label="$t('risk.table.hours')" width="130"></el-table-column>
        <el-table-column prop="limitedAmount" :label="$t('risk.table.limitedAmount')"></el-table-column>
        <el-table-column prop="limitedPayTimes" :label="$t('risk.table.limitedPayTimes')"></el-table-column>
        <el-table-column prop="limitedChargeBackTimesStirng" :label="$t('risk.table.limitedChargeBackTimes')" width="120"></el-table-column>
        <el-table-column prop="forbiddenAmount" :label="$t('risk.table.forbiddenAmount')"></el-table-column>
        <el-table-column prop="forbiddenPayTimes" :label="$t('risk.table.forbiddenPayTimes')"></el-table-column>
        <el-table-column prop="frozenChargeBackTimes" :label="$t('risk.table.frozenChargeBackTimes')"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('risk.table.updatedAt')" width="140"></el-table-column>
        
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('risk.table.edit') }}</el-button>
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
    this.handleQuery();
  },
  data() {
    return {
      loading: false,
      risks: [],
      query: {
        
      },
      page: {
        count: 0
      },
    }
  },
  computed: {
    computedrisks() {
      return this.risks.map((item) => {
        return {
          ...item,
          updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
          limitedChargeBackTimesStirng: item.limitedChargeBackTimes ? this.$t('common.yes') : this.$t('common.no'),
        }
      })
    }
  },
  methods: {
    goAdd() {
      window.open(location.href.split(location.pathname)[0] + "/setting/risk/add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getPaymentRiskList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getPaymentRiskList(this, this.query)
    },
    edit(index, row) {
      sessionStorage.risk = JSON.stringify(row);
      this.$router.push({name: "editrisk"});
    }
  },


}

</script>