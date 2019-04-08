<template>
<div class="view-paypal">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('payfee.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('payfee.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('payfee.query.countryId')">
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
            <el-form-item :label="$t('payfee.query.payMethodId')">
              <el-select v-model="query.payMethodId">
                <el-option
                  v-for="item in payMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('payfee.query.open')">
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
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedpayfees" border style="width: 100%">
        <el-table-column prop="id" :label="$t('payfee.table.id')" width="65"></el-table-column>
        <el-table-column prop="countryName" :label="$t('payfee.table.countryName')"></el-table-column>
        <el-table-column prop="payMethodName" :label="$t('payfee.table.payMethodName')"></el-table-column>
        <el-table-column prop="openString" :label="$t('payfee.table.open')"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('payfee.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="open(scope.$index, scope.row)" v-if="!scope.row.open">{{ $t('payfee.table.doOpen') }}</el-button></div>
              <div><el-button type="text" size="small" @click="close(scope.$index, scope.row)" v-if="scope.row.open">{{ $t('payfee.table.close') }}</el-button></div>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('payfee.table.detail') }}</el-button></div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="row text-center">
        <div class="col-md-12">
          <el-pagination 
            layout="total, prev, pager, next" 
            :total="page.count"
            :page-size="page.per"
            :current-page="page.current"
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div> -->
      
    </div>
  </div>

  <el-dialog :title="!isEdit ? $t('payfee.dialog.title') : $t('payfee.dialog.title2')" :visible.sync="configFeeVisible">
    <el-form label-position="left" label-width="80px">
      <div class="row" v-if="!isEdit">
        <div class="col-md-6">
          <el-form-item :label="$t('payfee.dialog.countryId')">
            <el-select v-model="form.countryId" :placeholder="$t('common.choose')"  @change="getCountryInfo" :disabled="this.isEdit">
              <el-option
                v-for="item in countryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <el-form-item v-else :label="$t('payfee.dialog.countryId')">
        {{ form.countryName }}
      </el-form-item>
      
      <div class="row">
        <div class="col-md-6">
          <el-form-item :label="$t('payfee.dialog.countryCurrency')">
            {{ form.countryCurrency }}
          </el-form-item>
        </div>
      </div>
      
      <div class="row" v-if="!isEdit">
        <div class="col-md-6">
          <el-form-item :label="$t('payfee.dialog.payMethodId')">
            <el-select v-model="form.payMethodId" :placeholder="$t('common.choose')" :disabled="this.isEdit">
              <el-option
                v-for="item in payMethodOnlyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <el-form-item v-else :label="$t('payfee.dialog.payMethodId')">
        {{ form.payMethodName }}
      </el-form-item>
      
      <el-form-item :label="$t('payfee.dialog.range')">
        <p><span class="text-yellow">{{ $t('payfee.dialog.tips') }}</span></p>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>{{ $t('payfee.dialog.minAmount') }}</th>
              <th>{{ $t('payfee.dialog.maxAmount') }}</th>
              <th>{{ $t('payfee.dialog.fee') }}</th>
              <th width="120px"></th>
            </tr>
            <tr v-for="(item, index) in payFeeConfigurations" :key="index">
              <td>
                <el-input 
                  v-model.number="item.minAmount" 
                  type="number" 
                  :min="index === 0 ? 0 : payFeeConfigurations[index - 1].maxAmount + 1"
                  :disabled="index !== payFeeConfigurations.length - 1"
                  >
                  <template slot="append">{{ form.countryCurrency }}</template>
                </el-input>
              </td>
              <td>
                <el-input 
                  v-model.number="item.maxAmount" 
                  type="number" 
                  :min="item.minAmount + 1"
                  :disabled="index !== payFeeConfigurations.length - 1"
                  >
                  <template slot="append">{{ form.countryCurrency }}</template>
                </el-input>
              </td>
              <td>
                <el-input 
                  v-model.number="item.fee" 
                  type="number" 
                  :max="item.minAmount" 
                  :disabled="!item.minAmount || 
                             !item.maxAmount || 
                             item.minAmount >= item.maxAmount || 
                             (index > 0 && item.minAmount <= payFeeConfigurations[index - 1].maxAmount) ||
                             index !== payFeeConfigurations.length - 1">
                  <template slot="append">{{ form.countryCurrency }}</template>
                </el-input>
              </td>
              <td width="140px">
                <el-button type="danger" icon="el-icon-minus" 
                  @click="deleteLastRangeLine"  
                  :disabled="index !== payFeeConfigurations.length - 1"
                  v-if="index > 0"
                ></el-button>
                <el-button type="primary" icon="el-icon-plus" 
                  @click="addNewRangeLine" 
                  v-if="index === payFeeConfigurations.length - 1"
                  :disabled="item.fee <= 0 || 
                            item.minAmount >= item.maxAmount || 
                            (index > 0 && item.minAmount <= payFeeConfigurations[index - 1].maxAmount)"
                ></el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="configFeeVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="commit" :disabled="computedDisabled" :loading="loading">{{ $t('common.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('payfee.dialog.title1')" :visible.sync="detailFeeVisible">
    <el-form label-position="left" label-width="80px">
      <el-form-item :label="$t('payfee.dialog.countryId')">
        {{ selectedRow.countryName }}
      </el-form-item>
      
      <el-form-item :label="$t('payfee.dialog.countryCurrency')">
        {{ selectedRow.countryCurrency }}
      </el-form-item>
      
      <el-form-item :label="$t('payfee.dialog.payMethodId')">
        {{ selectedRow.payMethodName }}
      </el-form-item>
      
      <el-form-item :label="$t('payfee.dialog.range')">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <th>{{ $t('payfee.dialog.minAmount') }}</th>
              <th>{{ $t('payfee.dialog.maxAmount') }}</th>
              <th>{{ $t('payfee.dialog.fee') }}</th>
            </tr>
            <tr v-for="(item, index) in selectedRow.payFeeConfigurations" :key="index">
              <td>
                {{item.minAmount}} {{ selectedRow.countryCurrency }}
              </td>
              <td>
                {{item.maxAmount}} {{ selectedRow.countryCurrency }}
              </td>
              <td>
                {{item.fee}} {{ selectedRow.countryCurrency }}
              </td>
            </tr>
          </tbody>
        </table>
      </el-form-item>

      <el-form-item :label="$t('payfee.dialog.open')">
        {{ selectedRow.open ?  $t('payfee.js.opentrue') : $t('payfee.js.openfalse')}}
      </el-form-item>

    </el-form>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
    this.getPayMethods();
  },
  data() {
    return {
      loading: false,
      payfees: [],
      configFeeVisible: false,
      detailFeeVisible: false,
      isEdit: false,
      currency: null,
      query: {
        countryId: null,
        payMethodId: null,
        open: null,
      },
      form: {
        countryId: 169,
        countryCurrency: null,
        payMethodId: null,
        open: 1,  // 默认开启
        payFeeConfigurations: [],
      },
      payFeeConfigurations: [{
        minAmount: null,
        maxAmount: null,
        fee: null,
      }],
      selectedRow: {},
      areaOptions: this.getAreaOptions(),
      countryOptions: this.getAreaOnlyOptions(),
      openOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("payfee.js.opentrue"), value: true},
        {label: this.$t("payfee.js.openfalse"), value: false},
      ],
      payMethodOptions: [
        {label: this.$t("common.all"), value: null},
      ],
      payMethodOnlyOptions: [],
      deletedRangeLines: [],
    }
  },
  computed: {
    computedpayfees() {
      return this.payfees.map((item) => {
        return {
          ...item,
         openString: item.open ? this.$t("payfee.js.opentrue") : this.$t("payfee.js.openfalse"),
        //  actionType: 0,   // 0 修改， 1 新增， 2 删除
        }
      })
    },
    computedDisabled() {
      return !(this.form.countryId && this.form.payMethodId && 
               this.payFeeConfigurations[this.payFeeConfigurations.length - 1].fee > 0 &&
               this.payFeeConfigurations[this.payFeeConfigurations.length - 1].minAmount < this.payFeeConfigurations[this.payFeeConfigurations.length - 1].maxAmount &&
               (this.payFeeConfigurations.length <= 1 || this.payFeeConfigurations[this.payFeeConfigurations.length - 1].minAmount > this.payFeeConfigurations[this.payFeeConfigurations.length - 2].maxAmount));
    }
  },
  methods: {
    goAdd() {
      this.isEdit = false;
      this.clear();
      this.getCountryInfo();
      this.configFeeVisible = true;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getPayFeeList(this, this.query);
      }
    },
    handleQuery() {
      // this.query.pageNum = 1;
      api.getPayFeeList(this, this.query)
    },
    getPayMethods() {
      api.getPayMethod(this, {}).then(payMethods => {
        payMethods.map(method => {
          this.$set(this.payMethodOptions, this.payMethodOptions.length, {label: method.name, value: method.id})
        })
      })
    },
    getPayMethodByCountry() {
      api.getPayMethodByCountry(this, {countryId: this.form.countryId}).then(payMethods => {
        this.payMethodOnlyOptions = [];
        payMethods.map(method => {
          this.$set(this.payMethodOnlyOptions, this.payMethodOnlyOptions.length, {label: method.name, value: method.id})
        })
      })
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId}).then(country => {
        if(country) {
          this.form.countryCurrency = country.currency;
          this.form.payMethodId = null;
          this.getPayMethodByCountry();
        }
      });
    },
    edit(index, row) {
      this.isEdit = true;
      this.form = row;
      // this.getPayMethodByCountry();
      this.payFeeConfigurations = [...this.form.payFeeConfigurations].sort((a, b) => a.minAmount - b.minAmount);
      this.configFeeVisible = true;
      this.deletedRangeLines = [];
    },
    open(index, row) {
      api.openPayFee(this, {countryId: row.countryId, payMethodId: row.payMethodId, open: true}).then(() => {
        this.handleQuery();
      })
    },
    close(index, row) {
      api.closePayFee(this, {countryId: row.countryId, payMethodId: row.payMethodId, open: false}).then(() => {
        this.handleQuery();
      })
    },
    detail(index, row) {
      this.selectedRow = row;
      this.detailFeeVisible = true;
    },
    addNewRangeLine() {
      this.payFeeConfigurations.push({
        minAmount: null,
        maxAmount: null,
        fee: null,
        actionType: 1,  // 新增
      })
    },
    deleteLastRangeLine() {
      const last = {...this.payFeeConfigurations[this.payFeeConfigurations.length - 1]};
      last.actionType = 2;  // 删除
      this.deletedRangeLines.push(last); //暂存已删除的数据
      this.payFeeConfigurations.splice(this.payFeeConfigurations.length - 1, 1);
    },
    commit() {
      if(!this.isEdit) {
        this.form.payFeeConfigurations = [...this.payFeeConfigurations];
        api.savePayFee(this, this.form).then(() => {
          this.handleQuery();
          this.clear();
          this.configFeeVisible = false;
        });
      } else {
        this.form.payFeeConfigurations = [...this.payFeeConfigurations, ...this.deletedRangeLines.filter(l => l.id)];
        api.updatePayFee(this, this.form).then(() => {
          this.handleQuery();
          this.clear();
          this.configFeeVisible = false;
        });
      }
      
    },
    clear() {
      this.payFeeConfigurations = [{
        minAmount: null,
        maxAmount: null,
        fee: null,
      }];
    },
  },


}

</script>