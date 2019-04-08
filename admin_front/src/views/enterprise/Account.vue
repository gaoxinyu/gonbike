<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      <!-- 企业信息列表 -->
      {{ $t('enterpriseAccount.query.title') }}
      <el-button class="pull-right" type="primary" @click="addAccount">{{ $t('common.add') }}</el-button>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <!-- 企业简称 -->
            <el-form-item :label="$t('enterpriseAccount.query.abbr')">
              <el-input v-model="query.abbr"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <!-- 企业账号 -->
            <el-form-item :label="$t('enterpriseAccount.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <!-- 国家 -->
            <el-form-item :label="$t('enterpriseAccount.query.countryId')">
              <el-select v-model="query.countryId">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <!-- 状态 -->
            <el-form-item :label="$t('enterpriseAccount.query.frozen')">
              <el-select v-model="query.frozen">
                <el-option
                  v-for="item in frozenOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <!-- 登记开始时间 -->
            <el-form-item :label="$t('enterpriseAccount.query.startTime')">
              <el-date-picker
                v-model="query.startTime"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <!-- 登记结束时间 -->
            <el-form-item :label="$t('enterpriseAccount.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedaccounts" border style="width: 100%">
        <!-- 企业ID -->
        <el-table-column prop="id" :label="$t('enterpriseAccount.table.id')"></el-table-column>
        <!-- 登记日期 -->
        <el-table-column prop="createdAtStr" :label="$t('enterpriseAccount.table.createdAtStr')"></el-table-column>
        <!-- 企业简称 -->
        <el-table-column prop="abbr" :label="$t('enterpriseAccount.table.abbr')"></el-table-column>
        <!-- 企业账号 -->
        <el-table-column prop="phoneStr" :label="$t('enterpriseAccount.table.phoneStr')"></el-table-column>
        <!-- 国家 -->
        <el-table-column prop="countryName" :label="$t('enterpriseAccount.table.countryName')"></el-table-column>
        <!-- 订单名称 -->
        <el-table-column prop="packageName" :label="$t('enterpriseAccount.table.packageNameStr')"></el-table-column>
        <!-- 实际人数 -->
        <el-table-column prop="memberNum" :label="$t('enterpriseAccount.table.memberNum')"></el-table-column>
        <!-- 订单人数 -->
        <el-table-column prop="peopleNum" :label="$t('enterpriseAccount.table.peopleNum')"></el-table-column>
        <!-- 实付金额 -->
        <el-table-column prop="payAmount" :label="$t('enterpriseAccount.table.payAmount')"></el-table-column>
        <!-- 开始日期 -->
        <el-table-column prop="startTimeStr" :label="$t('enterpriseAccount.table.startTimeStr')" 
        min-width="80"></el-table-column>
        <!-- 结束日期 -->
        <el-table-column prop="endTimeStr" :label="$t('enterpriseAccount.table.endTimeStr')" 
        min-width="80"></el-table-column>
        <!-- 状态 -->
        <el-table-column prop="typeStr" :label="$t('enterpriseAccount.table.typeStr')" 
        min-width="80"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div>
                <!-- 编辑 -->
                <el-button @click="editAccount(scope.$index, scope.row)" type="text" size="small" >{{ $t('common.edit') }}</el-button>
              </div>
              <div>
                <!-- 详情 -->
                <el-button @click="detail(scope.$index, scope.row)" type="text" size="small" >{{  $t('common.view') }}</el-button>
              </div>
              <div v-if="scope.row.frozen">
                <!-- 启用 -->
                <el-button @click="activate(scope.$index, scope.row)" type="text" size="small" >{{ $t('enterpriseAccount.table.activate') }}</el-button>
              </div>
              <div v-else>
                <!-- 冻结 -->
                <el-button @click="inactivate(scope.$index, scope.row)" type="text" size="small" >{{ $t('enterpriseAccount.table.inactivate') }}</el-button>
              </div>
              <div>
                <!-- 重置密码 -->
                <el-button @click="resetPassword(scope.$index, scope.row)" type="text" size="small" >{{ $t('enterpriseAccount.table.resetPassword') }}</el-button>
              </div>
              <!-- <div>
                成员管理
                <el-button v-if="scope.row.packageName" @click="manageMembers(scope.$index, scope.row)" type="text" size="small" >{{ '成员管理' }}</el-button>
              </div> -->
              <div>
                <!-- 订单管理 -->
                <el-button @click="manageOrders(scope.$index, scope.row)" type="text" size="small" >{{ $t('enterpriseAccount.table.manageOrders') }}</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="row text-center">
        <div class="col-md-12">
          <el-pagination 
            layout="total, prev, pager, next" 
            :total="data.count"
            :page-size="data.per"
            :current-page="data.current"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
    </div>
  </div>
  <new-account ref="newAccountDialog" @updated="handleAccountUpdate" @added="handleAccountAdd"></new-account>
  <reset-password ref="resetPasswordDialog"></reset-password>
  <info-account ref="infoAccountDialog"></info-account>
</div>
</template>

<script>
import api from "../../api";
import moment from "moment";
// import * as Options from '../../services/options/index.js'
import Mixins from "../../mixins/index.js";
import NewAccount from "./NewAccount";
import ResetPassword from "./ResetPassword";
import InfoAccount from "./InfoAccount";


export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  data() {
    return {
      loading: false,
      data: {
        list: [],
      },
      query: {
        abbr: null,
        phone: null,
        countryId: null,
        frozen: null,
        startTime: null,
        endTime: null,
      },
      frozenOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('enterpriseAccount.js.frozenOption0'), value: 0},
        {label: this.$t('enterpriseAccount.js.frozenOption1'), value: 1},
      ],
      areaOptions: this.getAreaOptions(),
      // 新增和更新
      newDialogDisplay: false,
      // 重置密码
      resetPasswordDisplay: false
    };
  },
  computed: {
    computedaccounts() {
      return this.data.list.map(item => {
        return {
          ...item,
          phoneStr: item.countryCode ? `+${item.countryCode} ${item.phone}` : item.phone,
          typeStr: item.frozen ? this.$t('enterpriseAccount.js.frozenOption1') : this.$t('enterpriseAccount.js.frozenOption0'),
        };
      });
    }
  },
  methods: {
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getEnterpriseList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      let query = {...this.query};
      if(query.startTime) {
        query.startTime = query.startTime.getTime();
      }
      if(query.endTime){ 
        query.endTime.setHours(23);
        query.endTime.setMinutes(59);
        query.endTime.setSeconds(59);
        query.endTime = query.endTime.getTime();
      }
      api.getEnterpriseList(this, this.query);
    },
    handleAccountUpdate() {
      this.handleCurrentChange(this.data.current);
    },
    handleAccountAdd() {
      this.handleQuery();
    },
    addAccount() {
      this.$refs.newAccountDialog.new();
    },
    editAccount(index, row) {
      this.$refs.newAccountDialog.edit(row);
    },
    detail(index, row) {
      this.$refs.infoAccountDialog.info(row.id)
    },
    activate(index, row) {
      let params = {
        id: row.id,
        frozen: 0
      }
      api.freezeEnterpriseAccount(this, params)
      .then(data => {
        if(data.success){
          row.frozen = false;
          row.typeStr = this.$t('enterpriseAccount.js.frozenOption0');
        }
      })
    },
    inactivate(index, row) {
      let params = {
        id: row.id,
        frozen: 1
      }
      api.freezeEnterpriseAccount(this, params)
      .then(data => {
        if(data.success){
          row.frozen = true;
          row.typeStr = this.$t('enterpriseAccount.js.frozenOption1');
        }
      })
    },
    resetPassword(index, row) {
      this.$refs.resetPasswordDialog.resetPassword(row)
    },
    manageMembers(index, row) {
    },
    manageOrders(index, row) {
      let params = { enterpriseId: row.id, enterpriseName: row.name , currencySymbol: row.currencySymbol};
      sessionStorage.setItem('enterprisepackage', JSON.stringify(params));
      let routeData = this.$router.resolve({ path: `/enterprise/account/${row.id}/package` });
      window.open(routeData.href, '_blank');
    },

    
  },
  components: {
    NewAccount,
    ResetPassword,
    InfoAccount
  }
};
</script>