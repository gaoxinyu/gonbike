<template>
<div class="country-provider-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('countryProvider.table.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('countryProvider.table.goAdd') }}</button>
      </div>
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedProvSettings" border style="width:100%">
          <el-table-column prop="countryCode" :label="$t('countryProvider.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('countryProvider.table.country')"></el-table-column>
          <el-table-column prop="providersString" :label="$t('countryProvider.table.providers')"></el-table-column>
          <el-table-column fixed="right" :label="$t('common.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" v-if="scope.row.countryCode !== 0"  size="small">{{ $t('common.operate') }}</el-button>
                <el-button type="text" size="small" v-if="scope.row.countryCode !== 0"  @click="editSmsSetting(scope.$index, scope.row)">{{ $t('countryProvider.table.edit') }}</el-button>
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

  <el-dialog :title="$t('countryProvider.dialog.title')" width="30%" :visible.sync="settingVisible">
    <el-form label-position="left" label-width="80px">
      <el-form-item :label="$t('countryProvider.dialog.countryCode')">
        <el-select v-model="form.countryCode" @change="getCountryProviderByCode" :disabled="!this.isAdd">
          <el-option
            v-for="item in openCountryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <h5>{{ $t('countryProvider.dialog.countryProviders') }}</h5>
      <div class="row" style="padding-left: 80px;">
        <div class="col-md-6" v-for="(v, key) in provSetting" :key="key">
          <el-checkbox :disabled="v > 0" v-model="provSelected[key]">{{ key }}</el-checkbox>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="settingVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="commit" :disabled="submitDisabled">{{ $t('common.ok') }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api';

export default {
  mounted() {
    this.handleQuery();
    this.getOpenCountryList();
  },
  data() {
    return {
      settingVisible: false,
      isAdd: true,
      provSettings: [],
      loading: true,
      query: {
        pageNum: 1,
      },
      form: {
        countryCode: null,
        countryProviders: {},
      },
      page: {
        count: 0
      },
      openCountryOptions:[
        // {label: '默认', value: 0},
      ],
      countrys: [],
      provSetting: {},
      provSelected: {},
    }
  },
  computed: {
    computedProvSettings() {
      return this.provSettings.map((item, index) => {
        return {
          ...item,
        }
      });
    },
    submitDisabled() {
      let selectedOne = false;
      for(let key in this.provSelected) {
        selectedOne = selectedOne || this.provSelected[key];
      }
      return !(selectedOne);
    }
  },
  methods: {
    goAdd() {
      this.clear();
      this.settingVisible = true;
      this.isAdd = true;
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCountryProviderList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCountryProviderList(this, this.query);
      }
    },
    editSmsSetting(index, row) {
      this.clear();
      this.settingVisible = true;
      this.isAdd = false;
      this.form.countryCode = row.countryCode;
      this.getCountryProviderByCode(this.form.countryCode);
    },
    getOpenCountryList() {
      api.getCountryList(this, {open: true}).then(countrys => {
        countrys.map(country => {
          this.$set(this.openCountryOptions, this.openCountryOptions.length, {label: country.name, value: country.code});
        })
      });
    },
    getCountryProviderByCode(code) {
      if(code !== null) {
        api.getCountryProviderByCode(this, {countryCode: code}).then(() => {
          for(let prov in this.provSetting) {
            this.$set(this.provSelected, prov, this.provSetting[prov] !== -1)
          }
        })
      }
    },
    clear() {
      this.provSetting = {};
      this.provSelected = {};
      this.form.countryProviders = {};
    },
    commit() {
      // -1:未配置   null:能去勾   大于0:不能去勾 不存在等于0
      for(let key in this.provSelected) {
        if(this.provSelected[key] && this.provSetting[key] === -1) {
          this.provSetting[key] = null;
        }
        if(!this.provSelected[key] && this.provSetting[key] === null) {
          this.provSetting[key] = -1;
        }
      }
      this.form.countryProviders = this.provSetting;
      api.updateCountryProvider(this, this.form).then(() => {
        this.settingVisible = false;
        this.handleQuery();
      });
    },
  }
}
</script>
