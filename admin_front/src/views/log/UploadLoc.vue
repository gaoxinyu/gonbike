<template>
  <div class="log-upload-loc-view">
    <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('uploadLoc.query.title') }}
      <div class="pull-right box-tools">
        <el-button class="pull-right" type="primary" size="small" @click="exportExcel('/api/v1/bikeOperationLog/list/9/file', query)">{{ $t('uploadLoc.query.exportExcel') }}</el-button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('uploadLoc.query.countryId')">
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
            <el-form-item :label="$t('uploadLoc.query.cityId')">
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
            <el-form-item :label="$t('uploadLoc.query.bikeId')">
              <el-input v-model="query.bikeId"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('uploadLoc.query.lockNo')">
              <el-input v-model="query.lockNo"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('uploadLoc.query.createdAt')">
              <el-date-picker
                v-model="createdAt"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleCreatedAt"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('uploadLoc.query.createdByName')">
              <el-input v-model="query.createdByName"></el-input>
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
      <el-table v-loading="loading" :data="computedOptLogs" border style="width: 100%">
        <el-table-column prop="id" :label="$t('uploadLoc.table.id')" width="80"></el-table-column>
        <el-table-column prop="countryName" :label="$t('uploadLoc.table.countryName')" width="100"></el-table-column>
        <el-table-column prop="cityName" :label="$t('uploadLoc.table.cityName')" width="140"></el-table-column>
        <el-table-column prop="bikeId" :label="$t('uploadLoc.table.bikeId')" width="100"></el-table-column>
        <el-table-column prop="lockNo" :label="$t('uploadLoc.table.lockNo')" width="100"></el-table-column>
        <el-table-column prop="createdByNameString" :label="$t('uploadLoc.table.createdByName')" min-width="160">
          <template slot-scope="scope">
            <el-button @click="handleClickCreatedByName(scope.row.createdByName)" v-if="scope.row.createdByName" type="text" size="small">{{scope.row.createdByName}}</el-button>
            <el-button @click="handleClickCreatedByName(scope.row.createdByAccount)" v-if="scope.row.createdByAccount" type="text" size="small">{{scope.row.createdByAccount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createdAtString" :label="$t('uploadLoc.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="locString" :label="$t('uploadLoc.table.locString')" width="150"></el-table-column>
        <el-table-column prop="address" :label="$t('uploadLoc.table.address')" min-width="200"></el-table-column>

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
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: true,
      optLogList: [],
      createdAt: null,
      query: {
        apiId: 9,   // 上报位置报表
        pageNum: 1,
        countryId: null,
        cityId: null,
        bikeId: null,
        lockNo: null,
        beginDate: null,
        endDate: null,
        createdByName: null,
      },
      page: {
        count: 0
      },
      cityOptions: [
        {label: this.$t('common.all'), value: null},
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedOptLogs() {
      return this.optLogList.map(item => {
        return {
          ...item,
          createdByNameString: item.createdByName ? `${item.createdByName} | ${item.createdByPhone}` : item.createdByPhone,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          locString: item.latitude ? `${item.latitude}, ${item.longitude}` : '',
        }
      })
    },
  },
  methods: {
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('common.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
      })
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getOptLogList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getOptLogList(this, this.query)
      }
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.beginDate = datas[0];
        this.query.endDate = datas[1];
      } else {
        this.query.beginDate = '';
        this.query.endDate = '';
      }
    },
    handleClickCreatedByName(createdByName) {
      this.query.createdByName = createdByName;
      this.handleQuery();
    },
  }
}

</script>