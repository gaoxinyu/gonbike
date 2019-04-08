<template>
<div class="view-paypal">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('paypal.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('paypal.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('paypal.query.createdAt')">
              <el-date-picker
                v-model="createdAt"
                type="daterange"
                :placeholder="$t('paypal.query.chooseTime')"
                @change="handleCreatedAt"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('paypal.query.countryId')">
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
            <el-form-item :label="$t('paypal.query.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
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
      <el-table v-loading="loading" :data="computedrecords" border style="width: 100%">
        <el-table-column prop="id" :label="$t('paypal.table.id')" width="65"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('paypal.table.createdAt')"></el-table-column>
        <el-table-column prop="adminName" :label="$t('paypal.table.adminName')"></el-table-column>
        <el-table-column prop="countryName" :label="$t('paypal.table.countryName')"></el-table-column>
        <el-table-column prop="intoAccount" :label="$t('paypal.table.intoAccount')"></el-table-column>
        <el-table-column prop="amount" :label="$t('paypal.table.amount')"></el-table-column>
        <el-table-column prop="currency" :label="$t('paypal.table.currency')"></el-table-column>
        <el-table-column prop="statusString" :label="$t('paypal.table.status')"></el-table-column>
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

  <el-dialog :title="$t('paypal.dialog.title')" width="30%" :visible.sync="transferVisible">
    <el-form label-position="left" label-width="80px">
      <el-form-item :label="$t('paypal.dialog.countryCode')">
        <el-select v-model="form.countryCode" @change="getPaypalAccountList">
          <el-option
            v-for="item in countryCodeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('paypal.dialog.accountCode')">
        <el-select v-model="form.accountCode" :placeholder="$t('common.choose')">
          <el-option
            v-for="item in accountCodeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('paypal.dialog.amount')">
        <el-input v-model="form.amount" type="number">
          <template slot="append">{{ currency }}</template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('paypal.dialog.password')">
        <el-input v-model="form.password" type="password" :placeholder="$t('paypal.dialog.passwordPlaceholder')"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="transferVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="commit" :disabled="computedDisabled" :loading="loading">{{ $t('common.ok') }}</el-button>
    </div>
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
    this.getPaypalCountryList();
  },
  data() {
    return {
      loading: false,
      records: [],
      createdAt: null,
      transferVisible: false,
      currency: null,
      query: {
        pageNum: 1,
        countryId: null,
        startTime: null,
        endTime: null,
        status: null,
      },
      form: {
        countryCode: null,
        accountCode: null,
        amount: null,
        password: null,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      statusOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("paypal.js.statussuccess"), value: 'success'},
        {label: this.$t("paypal.js.statuserror"), value: 'error'},
      ],
      paypalCountrys: [],
      paypalAccounts: [],
      countryCodeOptions: [],
      accountCodeOptions: [],
    }
  },
  computed: {
    computedrecords() {
      return this.records.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: this.$t("paypal.js.status" + item.status),
        }
      })
    },
    computedDisabled() {
      return !(this.form.countryCode && this.form.accountCode && this.form.amount && this.form.password);
    }
  },
  methods: {
    goAdd() {
      this.transferVisible = true;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getPaypalRecordList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getPaypalRecordList(this, this.query)
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.startTime = datas[0].getTime();
        this.query.endTime = datas[1].getTime();
      } else {
        this.query.startTime = '';
        this.query.endTime = '';
      }
    },
    getPaypalCountryList() {
      api.getPaypalCountryList(this, {}).then(countrys => {
        countrys.forEach(country => {
          this.$set(this.countryCodeOptions, this.countryCodeOptions.length, {label: country.countryName, value: country.countryCode});
        })
        if(countrys.length > 0) {
          this.form.countryCode = countrys[0].countryCode;
          this.getPaypalAccountList();
        }
      });
    },
    getPaypalAccountList() {
      this.form.accountCode = null;
      api.getPaypalAccountList(this, {countryCode: this.form.countryCode}).then(accounts => {
        this.accountCodeOptions = [];
        accounts.forEach(account => {
          this.$set(this.accountCodeOptions, this.accountCodeOptions.length, {label: account.accountValue, value: account.accountCode});
        })
      })
    },
    commit() {
      api.savePaypalMessPay(this, this.form).then(() => {
        this.transferVisible = false;
        this.clear();
        this.handleQuery();
      })
    },
    clear() {
      this.form.accountCode = null;
      this.form.amount = null;
      this.form.password = null;
    },
  },


}

</script>