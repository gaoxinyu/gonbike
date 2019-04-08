<template>
<div class="provider-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('providerInfo.table.title') }}
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedProvInfos" border style="width:100%">
          <el-table-column prop="id" :label="$t('providerInfo.table.id')" width="60"></el-table-column> 
          <el-table-column prop="providerName" :label="$t('providerInfo.table.providerName')"></el-table-column>
          <el-table-column prop="balanceVo.balance" :label="$t('providerInfo.table.balance')"></el-table-column>
          <el-table-column prop="balanceVo.remain" :label="$t('providerInfo.table.remain')"></el-table-column>
          <el-table-column prop="total" :label="$t('providerInfo.table.total')"></el-table-column>
          <el-table-column prop="successSms" :label="$t('providerInfo.table.successSms')"></el-table-column>
          <el-table-column prop="failureSms" :label="$t('providerInfo.table.failureSms')"></el-table-column>
          <el-table-column fixed="right" :label="$t('common.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
                <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('providerInfo.table.detail') }}</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>

        <div class="row text-center">
          <div class="col-md-12" v-if="page.count">
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

  <el-dialog :title="$t('providerInfo.dialog.title')" width="30%" :visible.sync="detailVisible">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td style="width: 100px;">{{ $t('providerInfo.dialog.providerName') }} : </td>
          <td>{{ selectedRow.providerName }}</td>
        </tr>
        <!-- <tr>
          <td style="width: 100px;">{{ $t('providerInfo.dialog.countryName') }} : </td>
          <td>{{ selectedRow.countrySms.map(c => c.countryName).join(',') }}</td>
        </tr> -->
        <tr>
          <td style="width: 100px;">{{ $t('providerInfo.dialog.total') }} : </td>
          <td>{{ selectedRow.total }}</td>
        </tr>
        <tr v-for="country in selectedRow.countrySms" :key="country.countryCode" >
          <td style="width: 100px;">{{ country.countryName }} : </td>
          <td>{{ country.smsCount }}</td>
        </tr>
      </tbody>
    </table>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api';

export default {
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      detailVisible: false,
      loading: true,
      query: {
        pageNum: 1,
      },
      page: {
        count: 0
      },
      provInfos: [],
      selectedRow: {
        countrySms: [],
      },
    }
  },
  computed: {
    computedProvInfos() {
      return this.provInfos.map((item, index) => {
        return {
          ...item,
        }
      });
    },
  },
  methods: {
    handleQuery() {
      this.query.pageNum = 1;
      api.getProviderInfoList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getProviderInfoList(this, this.query);
      }
    },
    detail(index, row) {
      this.selectedRow = row;
      this.detailVisible = true;
    },
    
    
  }
}
</script>
