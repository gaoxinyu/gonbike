<template>
  <div class="reward-coupon-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('rwcredit.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('rwcredit.query.add') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcredit.query.name')">
                <el-input v-model="query.name"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwcredit.query.changeType')">
                <el-select v-model="query.changeType">
                  <el-option
                    v-for="item in changeTypesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('rwcredit.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedCreditList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('rwcredit.table.id')" width="60"></el-table-column>
            <el-table-column prop="name" :label="$t('rwcredit.table.name')"></el-table-column>
            <el-table-column prop="changeTypeString" :label="$t('rwcredit.table.changeType')"></el-table-column>
            <el-table-column prop="credit" :label="$t('rwcredit.table.score')"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('rwcredit.table.createdAt')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('rwcredit.table.adminName')"></el-table-column>
            <el-table-column fixed="right" :label="$t('rwcredit.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('rwcredit.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editCredit(scope.$index, scope.row)">{{ $t('rwcredit.table.edit') }}</el-button>
                  <br>
                  <el-button type="text" size="small" @click="viewCredit(scope.$index, scope.row)">{{ $t('rwcredit.table.view') }}</el-button>
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
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: false,
      rwcredit: [],
      query: {
        name: null,
        changeType: null
      },
      page: {
        count: 0
      },
      changeTypesOptions: [
        { label: this.$t('rwcredit.js.all'), value: null },
        { label: this.$t('rwcredit.js.changeType1'), value: 1 },
        { label: this.$t('rwcredit.js.changeType2'), value: 2 }
      ]
    }
  },
  computed: {
    computedCreditList() {
      return this.rwcredit.map((item) => {
        return {
          ...item,
          changeTypeString: item.credit > 0 ? this.$t('rwcredit.js.changeType1') : (item.credit < 0 ? this.$t('rwcredit.js.changeType2') : ''),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          credit: Math.abs(item.credit)
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'rwaddcredit' });
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
        this.cityOptions.unshift({ label: this.$t('rwcredit.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getRwCredit(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwCredit(this, this.query);
      }
    },
    editCredit(index, row) {
      sessionStorage.editRwCredit = JSON.stringify(row);
      this.$router.push({ name: 'rweditcredit', query: { id: row.id } });
    },
    viewCredit(index, row) {
      sessionStorage.viewRwCredit = JSON.stringify(row);
      this.$router.push({ name: 'rwinfocredit', query: { id: row.id } });
    }
  }
}
</script>
