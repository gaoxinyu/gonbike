<template>
  <div class="setting-refund-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('refund.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('common.add') }}</button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="80px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('refund.query.countryId')">
                <el-select v-model="query.countryId">
                  <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('refund.query.needCommission')">
                <el-select v-model="query.needCommission">
                  <el-option v-for="item in needCommissionOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
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
        <el-table v-loading="loading" :data="computeDdpstrefund" border style="width: 100%">
          <el-table-column prop="id" :label="$t('refund.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('refund.table.countryName')"></el-table-column>
          <el-table-column prop="needCommissionString" :label="$t('refund.table.chargeCommission')"></el-table-column>
          <el-table-column prop="fromRefundNum" :label="$t('refund.table.fromRefundNum')"></el-table-column>
          <el-table-column prop="commissionRateString" :label="$t('refund.table.commissionRatePercent')"></el-table-column>

          <el-table-column fixed="right" :label="$t('common.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
                <div>
                  <el-button type="text" size="small" @click="goEdit(scope.$index, scope.row)">{{ $t('common.edit') }}</el-button>
                </div>
                <div>
                  <el-button type="text" size="small" @click="goView(scope.$index, scope.row)">{{ $t('common.view') }}</el-button>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="row text-center">
          <div class="col-md-12">
            <el-pagination layout="total, prev, pager, next" :total="page.count" :page-size="page.per" :current-page="page.current" @current-change="handleCurrentChange"></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="isEdit ? $t('refund.dialog.title1') : $t('refund.dialog.title2')" width="30%" :visible.sync="configrefundVisible">
      <el-form label-position="left" label-width="120px">
        <el-form-item :label="$t('refund.dialog.countryId')" class="required">
          <el-select v-model="form.countryId" @change="handleCountryId" v-if="!isEdit">
            <el-option 
              v-for="item in areaOnlyOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="form.countryName" :disabled="isEdit" type="text" v-if="isEdit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('refund.dialog.needCommission')" class="required">
          <el-radio-group v-model="form.needCommission">
            <el-radio :label="true">{{ $t('refund.js.yes') }}</el-radio>
            <el-radio :label="false">{{ $t('refund.js.no') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('refund.dialog.fromRefundNum')" class="required" v-show="form.needCommission">
          <el-input v-model="form.fromRefundNum" type="number" min="1">
            <template slot="prepend">{{ $t('refund.dialog.beforetimes') }}</template>
            <template slot="append">{{ $t('refund.dialog.times') }}</template>
          </el-input>
          <p class="error" v-show="regFromRefundNum">{{ $t('refund.dialog.mustint') }}</p>
        </el-form-item>
        <el-form-item :label="$t('refund.dialog.commissionRate')" class="required" v-show="form.needCommission">
          <el-input v-model="form.commissionRate" type="number" min="0">
            <template slot="append">{{ $t('refund.dialog.percent') }}</template>
          </el-input>
          <p class="error" v-show="regCommissionRate">{{ $t('refund.dialog.mustint2') }}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configrefundVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="submit" :disabled="computedDisabled" :loading="loading">{{ $t('common.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: true,
      needCommissionOptions: [
        { label: this.$t('common.all'), value: null },
        { label: this.$t('refund.js.yes'), value: true },
        { label: this.$t('refund.js.no'), value: false },
      ],
      dpstrefund: [],
      query: {
        pageNum: 1,
        countryId: null,
        needCommission: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      areaOnlyOptions: this.getAreaOnlyOptions(),
      form: {
        countryId: null,
        countryName: null,
        needCommission: false,
        fromRefundNum: null,
        commissionRate: null
      },
      isEdit: false,
      configrefundVisible: false
    }
  },
  computed: {
    computeDdpstrefund() {
      return this.dpstrefund.map(item => {
        return {
          ...item,
          commissionRateString: item.commissionRate ? (item.commissionRate + '%') : '',
          needCommissionString: item.needCommission ? this.$t('refund.js.yes') : this.$t('refund.js.no')
        }
      })
    },
    regFromRefundNum() {
      return !(!this.form.fromRefundNum || (/^[1-9]\d*$/.test(this.form.fromRefundNum)));
    },
    regCommissionRate() {
      return !(!this.form.commissionRate || (this.form.commissionRate <= 100 && this.form.commissionRate >=0));
    },
    computedDisabled() {
      return !((this.form.countryId + '') && (!this.form.needCommission || (this.form.needCommission && this.form.fromRefundNum && this.form.commissionRate > 0 && this.form.commissionRate < 100)));
    }
  },
  methods: {
    goAdd() {
      this.clear();
      this.isEdit = false;
      this.configrefundVisible = true;
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getDepositRefund(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getDepositRefund(this, this.query)
      }
    },
    handleCountryId(id) {
      this.form.countryName = this.getNameById(this.areaOnlyOptions, id);
    },
    goEdit(index, row) {
      this.isEdit = true;
      this.form = { ...row };
      this.configrefundVisible = true;
    },
    goView(index, row) {
      this.$router.push({name: 'deprfdinfo', params: { id: row.id }})
    },
    submit() {
      if(!this.form.needCommission) {
        this.form.fromRefundNum = null;
        this.form.commissionRate = null;
      }
      if (this.isEdit) {
        api.updateDepositRefund(this, this.form)
          .then(() => {
            this.configrefundVisible = false;
            this.handleQuery();
          })
      }
      else {
        api.saveDepositRefund(this, this.form)
          .then(() => {
            this.configrefundVisible = false;
            this.handleQuery();
          })
      }
    },
    clear() {
      this.form = {
        countryId: null,
        needCommission: false,
        fromRefundNum: null,
        commissionRate: null
      }
    }
  }
}

</script>