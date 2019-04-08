<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('codeRecord.query.title') }}
      <!--<div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('codeRecord.query.goAdd') }}</button>
      </div>-->
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('codeRecord.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.countryId')">
              <el-select v-model="query.countryId" @change="getCitysByCountry">
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
            <el-form-item :label="$t('report.query.cityId')">
              <el-select v-model="query.cityId">
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
            <el-form-item :label="$t('codeRecord.query.exchangeCode')">
              <el-input v-model="query.exchangeCode"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('codeRecord.query.exchangedDate')">
              <el-date-picker
                v-model="exchangedDate"
                type="daterange"
                @change="handleExchangedDate"
                :placeholder="$t('codeRecord.query.chooseTime')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <!--<el-form-item :label="$t('codeRecord.query.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>-->
          </div>

          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('codeRecord.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedRecords" border style="width: 100%">
        <el-table-column prop="id" :label="$t('codeRecord.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('codeRecord.table.countryName')"></el-table-column>
        <el-table-column prop="cityName" :label="$t('codeRecord.table.cityName')"></el-table-column>
        <el-table-column prop="phone" :label="$t('codeRecord.table.phone')"></el-table-column>
        <el-table-column prop="exchangedDateString" :label="$t('codeRecord.table.exchangedDate')"></el-table-column>
        <el-table-column prop="exchangeCode" :label="$t('codeRecord.table.exchangeCode')"></el-table-column>
        <el-table-column prop="activityTypeString" :label="$t('code.table.activityType')"></el-table-column>
        <el-table-column prop="exchangedCouponRecord" :label="$t('codeRecord.table.exchangedCouponRecord')"></el-table-column>
        
        <!--<el-table-column fixed="right" :label="$t('codeRecord.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('codeRecord.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('codeRecord.table.edit') }}</el-button></div>
            </el-popover>
          </template>
        </el-table-column>-->
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
  },
  data () {
    return {
      loading: false,
      exchangedDate: null,
      query: {
        pageNum: 1,
        phone: null,
        countryId: null,
        cityId: null,
        exchangeCode: null,
        startTime: null,
        endTime: null,
      },
      page: {
        count: 0
      },
      records: [],
      statusOptions: [
        // {label: this.$t('codeRecord.js.all'), value: null},
        // {label: this.$t('codeRecord.js.status1'), value: 1},
        // {label: this.$t('codeRecord.js.status2'), value: 2},
      ],
      cityOptions: [
        {label: this.$t('report.js.all'), value: null}
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedRecords() {
      return this.records.map((item) => {
        return {
          ...item,
          exchangedDateString: item.exchangedDate ? moment(item.exchangedDate).format("YYYY-MM-DD HH:mm:ss") : "",
          activityTypeString: item.activityType ? this.$t('code.js.activityType'+item.activityType) : '',
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCodesRecord(this, this.query);
      }
    },
    
    handleQuery() {
      this.query.pageNum = 1;
      api.getCodesRecord(this, this.query);
    },
    handleExchangedDate(datas) {
      if(datas) {
        this.query.startTime = datas[0].getTime();
        this.query.endTime = datas[1].getTime();
      } else {
        this.query.startTime = '';
        this.query.endTime = '';
      }
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('report.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
      })
    },
  },
}
</script>
