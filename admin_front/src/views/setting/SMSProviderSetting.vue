<template>
<div class="pay-way">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('appsms.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goCountryProvider">{{ $t('appsms.query.goCountryProvider') }}</button>
      </div>
    </div>

    <!-- <div class="box-body">
      <div class="row">
        <div class="col-md-3 col-xs-12"></div>
        <div class="col-md-3 col-xs-12"></div>
        <div class="col-md-3 col-xs-12"></div>
        <div class="col-md-3 col-xs-12">
          <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('appsms.query.query') }}</el-button>
        </div>
      </div>
    </div> -->

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedSmsSettings" border style="width:100%">
          <el-table-column prop="countryCode" :label="$t('appsms.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('appsms.table.country')"></el-table-column>
          <el-table-column prop="smsCodeProvidersString" :label="$t('appsms.table.smsCodeProviders')"></el-table-column>
          <el-table-column prop="operationProvidersString" :label="$t('appsms.table.operationProviders')"></el-table-column>
          <el-table-column prop="voiceMessage" :label="$t('appsms.table.voice')"></el-table-column>
          <el-table-column prop="remark" :label="$t('appsms.table.remark')"></el-table-column>
          <el-table-column fixed="right" :label="$t('common.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with" v-if="scope.row.countryCode !== 0">
                <el-button slot="reference" type="text"   size="small">{{ $t('common.operate')}}</el-button>
                <el-button type="text" size="small"  @click="editSmsSetting(scope.$index, scope.row)">{{ $t('appsms.table.edit') }}</el-button>
                <div><el-button type="text" size="small"  @click="detail(scope.$index, scope.row)">{{ $t('appsms.table.detail') }}</el-button></div>
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
  <el-dialog :title="$t('appsms.dialog.title')" :visible.sync="smsLogVisible" size='large'>
      <el-table v-loading="loading" :data="computedSmsLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('appsms.dialog.createdAt')" width="130px"></el-table-column>
        <el-table-column prop="adminName" :label="$t('appsms.dialog.admin')" width="130px"></el-table-column>
        <el-table-column prop="actionType" :label="$t('appsms.dialog.type')" width="130px"></el-table-column>
        <el-table-column prop="remark" :label="$t('appsms.dialog.remark')"></el-table-column>
      </el-table>
    </el-dialog>
</div>
</template>

<script>
import api from '../../api';
import moment from "moment";

export default {
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      smsSettings: [],
      loading: true,
      smsLogVisible: false,
      smsLogs: [],
      page: {
        count: 0
      },
      query: {
        pageNum: 1,
      },
    }
  },
  computed: {
    computedSmsSettings() {
      return this.smsSettings.map((item, index) => {
        return {
          ...item,
          voiceMessage: item.voiceMessageOpen ? this.$t('common.on') : this.$t('common.off'),
          remarkString: item.smsCodeProviders.length > 0 ? item.smsCodeProviders[0].remark : '',
        }
      });
    },
    submitDisabled() {
      return !(this.smsrate.rate || this.smsrate.rate === 0);
    },
    computedSmsLogs() {
      return this.smsLogs.map((item) => {
        return {
          ...item,
          actionType: item.action === 1 ? this.$t('appsms.dialog.type1') : this.$t('appsms.dialog.type2'),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    goCountryProvider() {
      this.$router.push({name: "countryprovider"});
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getSmsExtList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getSmsExtList(this, this.query);
      }
    },
    editSmsSetting(index, row) {
      sessionStorage.smsSetting = JSON.stringify(row);
      this.$router.push({name: "editsmssetting"});
    },
    // 根据国家展示sms日志
    detail (index, row) {
      api.getSmsLogList(this, {countryCode: row.countryCode}).then(() => {
        this.smsLogVisible = true;
      })
    }
  }
}
</script>
