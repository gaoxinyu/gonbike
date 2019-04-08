<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      <!-- 套餐列表 -->
      {{ $t('enterprisePackage.title') }}
      <el-button class="pull-right" type="primary" @click="addPackage">{{ $t('common.add') }}</el-button>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-header with-border">
      {{ enterpriseName }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedPackages" border style="width: 100%">
        <!-- 套餐ID -->
        <el-table-column prop="id" :label="$t('enterprisePackage.table.id')"></el-table-column>
        <!-- 创建日期 -->
        <el-table-column prop="createdAtStr" :label="$t('enterprisePackage.table.createdAtStr')"></el-table-column>
        <!-- 订单名称 -->
        <el-table-column prop="name" :label="$t('enterprisePackage.table.name')"></el-table-column>
        <!-- 国家 -->
        <el-table-column prop="countryName" :label="$t('enterprisePackage.table.countryName')"></el-table-column>
        <!-- 开始时间 -->
        <el-table-column prop="startTimeStr" :label="$t('enterprisePackage.table.startTimeStr')"></el-table-column>
        <!-- 结束时间 -->
        <el-table-column prop="endTimeStr" :label="$t('enterprisePackage.table.endTimeStr')"></el-table-column>
        <!-- 人数 -->
        <el-table-column prop="peopleNum" :label="$t('enterprisePackage.table.peopleNum')"></el-table-column>
        <!-- 总价 -->
        <el-table-column prop="amountStr" :label="$t('enterprisePackage.table.amount')"></el-table-column>
        <!-- 折扣 -->
        <el-table-column prop="discountStr" :label="$t('enterprisePackage.table.discountStr')" min-width="80"></el-table-column>
        <!-- 成交价 -->
        <el-table-column prop="payAmountStr" :label="$t('enterprisePackage.table.payAmount')"
        min-width="80"></el-table-column>
        <!-- <el-table-column fixed="right" :label="'操作'" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('delivery.list.operate') }}</el-button>
              <div>
                编辑
                <el-button @click="editAccount(scope.$index, scope.row)" type="text" size="small" >{{ '编辑' }}</el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
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
  <new-package ref="newPackageDialog" @added="handlePackageAdded"></new-package>
</div>
</template>

<script>
import api from "../../api";
import moment from "moment";
import Mixins from "../../mixins/index.js";
import NewPackage from "./NewPackage";


export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    let params = JSON.parse(sessionStorage.getItem('enterprisepackage'));
    this.enterpriseName = params.enterpriseName || 'Error';
    this.currencySymbol = params.currencySymbol || '$';
    this.query.enterpriseId = params.enterpriseId || 0;
    this.handleQuery();
  },
  data() {
    return {
      loading: false,
      enterpriseName: null,
      data: {
        list: [],
      },
      query: {
        enterpriseId: null,
        pageNum: 0
      },
      areaOptions: this.getAreaOptions(),
      // 新增和更新
      newDialogDisplay: false,
      currencySymbol: '$',
      countryId: null,
    };
  },
  computed: {
    computedPackages() {
      return this.data.list.map(item => {
        return {
          ...item,
          typeStr: item.frozen ? this.$t('enterprise.js.frozenOption1') : this.$t('enterprise.js.frozenOption0'),
          amountStr: this.currencySymbol + item.amount,
          payAmountStr: this.currencySymbol + item.payAmount,
        };
      });
    }
  },
  methods: {
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getEnterprisePackageList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      let query = {...this.query};
      api.getEnterprisePackageList(this, this.query);
    },
    handlePackageAdded() {
      this.handleCurrentChange(this.data.current);
    },
    addPackage() {
      this.$refs.newPackageDialog.new(this.query.enterpriseId, this.currencySymbol);
    },
  },
  components: {
    NewPackage,
  }
};
</script>