<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('recharge.query.title') }}
      <!--
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">添加</button>
      </div>
      -->
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('recharge.query.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('recharge.query.code')">
              <el-input v-model="query.code"></el-input>
            </el-form-item>
          </div>
          

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('recharge.query.open')">
              <el-select v-model="query.open">
                <el-option
                  v-for="item in openOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('recharge.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
        
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCountrys" border style="width: 100%">
        <el-table-column prop="id" :label="$t('recharge.table.id')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('recharge.table.name')"></el-table-column>
        <el-table-column prop="code" :label="$t('recharge.table.code')"></el-table-column>
        <el-table-column prop="openString" :label="$t('recharge.table.open')" width="96"></el-table-column>
        <el-table-column prop="currency" :label="$t('recharge.table.currency')"></el-table-column>
        <el-table-column prop="currencySymbol" :label="$t('recharge.table.currencySymbol')" width="70"></el-table-column>
        <el-table-column prop="depositString" :label="$t('recharge.table.deposit')"></el-table-column>
        <el-table-column prop="depositToBalanceString" :label="$t('editRecharge.form.depositToBalance')"></el-table-column>
        <el-table-column prop="studentDepositString" :label="$t('recharge.table.studentDeposit')" ></el-table-column>
        <el-table-column prop="bonusString" :label="$t('recharge.table.bonus')"></el-table-column>
        <el-table-column prop="withOutDepositNumString" :label="$t('recharge.table.withOutDepositNum')" width="90"></el-table-column>
        <el-table-column prop="negativeBalanceRefundString" :label="$t('recharge.table.negativeBalanceRefund')" width="100"></el-table-column>
        <el-table-column prop="topUpStandardString" :label="$t('recharge.table.topUpStandard')" width="240"></el-table-column>
        <el-table-column fixed="right" :label="$t('recharge.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('recharge.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('recharge.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('recharge.table.detail') }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <!--<el-table-column fixed="right" :label="$t('price.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('price.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('price.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('price.table.detail') }}</el-button>
            </el-popover>
          </template>
        </el-table-column>-->
      </el-table>
      <div class="row text-center">
        <div class="col-md-12">
          <el-pagination 
            layout="total, prev, pager, next" 
            :total="countryPage.count"
            :page-size="countryPage.per"
            :current-page="countryPage.current"
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
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      countrys: [],
      query: {
        pageNum: 1,
        open: true,
        code: null,
        name: null,
      },
      countryPage: {
        count: 0
      },
      openOptions: [
        {label: this.$t('recharge.js.all'), value: null},
        {label: this.$t('recharge.js.open1'), value: true},
        {label: this.$t('recharge.js.open0'), value: false},
      ],
    }
  },
  computed: {
    computedCountrys() {
      return this.countrys.map((item) => {
        return {
          ...item,
          openString: item.open ? this.$t('recharge.js.open1') : this.$t('recharge.js.open0'),
          depositString: item.needDeposit ? (item.deposit ? item.currencySymbol + ' ' + item.deposit : '') : this.$t('recharge.js.none'),
          depositToBalanceString: !item.needDeposit && item.depositToBalance ? this.$t('common.yes') : this.$t('common.no'),
          studentDepositString: item.openStudent ? (item.studentDeposit ? item.currencySymbol + ' ' + item.studentDeposit : '') : this.$t('recharge.js.none'),
          bonusString: item.needDeposit || item.openStudent ? (item.bonus ? item.currencySymbol + ' ' + item.bonus : '') : this.$t('recharge.js.none'),
          topUpStandardString: item.topUpStandard ? item.topUpStandard.split('|').map(charge => item.currencySymbol + ' ' + charge).join(', ') : '',
          withOutDepositNumString: item.withOutDepositOpen ? item.withOutDepositNum : this.$t('recharge.js.none'),
          negativeBalanceRefundString: item.negativeBalanceRefund ? this.$t('common.yes') : this.$t('common.no'),
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCountryList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCountryList(this, this.query);
    },
    edit(index, row) {
      sessionStorage.country = JSON.stringify(row);
      this.$router.push({name: "editrecharge"});
    },
    detail(index, row) {
      sessionStorage.country = JSON.stringify(row);
      window.open(location.href + "/" + row.id);
    },
  }
}
</script>