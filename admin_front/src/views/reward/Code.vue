<template>
  <div class="reward-coupon-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('rwcode.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('rwcode.query.add') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcode.query.merchantCode')">
                <el-select v-model="query.merchantCode">
                  <el-option
                    v-for="item in rwmerchantOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcode.query.countryId')">
                <el-select v-model="query.countryId" @change="getCountryInfo">
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
              <el-form-item :label="$t('rwcode.query.cityId')">
                <el-select v-model="query.cityId" :disabled="cityOptions.length === 0">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcode.query.name')">
                <el-input v-model="query.name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('rwcode.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedCodeList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('rwcode.table.id')" width="60"></el-table-column>
            <el-table-column prop="merchantCode" :label="$t('rwcode.table.merchantCode')"></el-table-column>
            <el-table-column prop="name" :label="$t('rwcode.table.name')"></el-table-column>
            <el-table-column :label="$t('rwcode.table.file')">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="exportCodeExcel(scope.row.id)"> {{ $t('rwcode.table.fileUrl') }} </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="area" :label="$t('rwcode.table.area')"></el-table-column>
            <el-table-column prop="usage" :label="$t('rwcode.table.usage')"></el-table-column>
            <el-table-column fixed="right" :label="$t('rwcode.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('rwcode.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editCode(scope.$index, scope.row)">{{ $t('rwcode.table.edit') }}</el-button>
                  <br>
                  <el-button type="text" size="small" @click="viewCode(scope.$index, scope.row)">{{ $t('rwcode.table.view') }}</el-button>
                  <br>
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
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import moment from 'moment'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
    this.getMerchant();
  },
  data() {
    return {
      loading: false,
      rwcode: [],
      query: {
        merchantCode: null,
        countryId: null,
        cityId: null,
        name: null,
        id: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      rwmerchantOptions: []
    }
  },
  computed: {
    computedCodeList() {
      return this.rwcode.map((item) => {
        return {
          ...item,
          usage: Number.isInteger(item.excessInventory) && Number.isInteger(item.inventoryQuantity) 
                  ? (item.inventoryQuantity - item.excessInventory) + '/'+ item.inventoryQuantity 
                  : '',
          area: (item.countryName ? item.countryName : '') + '-' + (item.cityName ? item.cityName : '')
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'rwaddcode' });
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        // 添加一个所有
        this.cityOptions.unshift({ label: this.$t('rwcode.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    getMerchant() {
      api.getMerchant(this).then(rwmerchants => {
        this.rwmerchantOptions = this.rwmerchants.map(rwmerchant => {
          return {
            label: rwmerchant.name,
            value: rwmerchant.merchantCode
          }
        });
        this.rwmerchantOptions.unshift({ label: this.$t('rwcode.js.all'), value: null });
      });
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getRwCode(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwCode(this, this.query);
      }
    },
    editCode(index, row) {
      sessionStorage.editRwCode = JSON.stringify(row);
      this.$router.push({ name: 'rweditcode', query: { id: row.id } });
    },
    viewCode(index, row) {
      sessionStorage.viewRwCode = JSON.stringify(row);
      this.$router.push({ name: 'rwinfocode', query: { id: row.id } });
    },
    exportCodeExcel(id) {
      this.query.id = id
      this.exportExcel(
        `/api/v1/reward/rewards/code/export/file`
      );
    }
  }
}
</script>
