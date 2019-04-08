<template>
  <div class="log-upload-loc-view">
    <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('putBike.query.title') }}
      <div class="pull-right box-tools">
        <el-button class="pull-right" type="primary" size="small" @click="exportExcel('/api/v1/bikeOperationLog/list/7/file', query)">{{ $t('putBike.query.exportExcel') }}</el-button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putBike.query.countryId')">
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
            <el-form-item :label="$t('putBike.query.cityId')">
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
            <el-form-item :label="$t('putBike.query.bikeId')">
              <el-input v-model="query.bikeId"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putBike.query.lockNo')">
              <el-input v-model="query.lockNo"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putBike.query.createdAt')">
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
            <el-form-item :label="$t('putBike.query.createdByName')">
              <el-input v-model="query.createdByName"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putBike.query.success')">
              <el-select v-model="query.isSuccess">
                <el-option
                  v-for="item in successOptions"
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
      <el-table v-loading="loading" :data="computedOptLogs" border style="width: 100%">
        <el-table-column prop="id" :label="$t('putBike.table.id')" width="80"></el-table-column>
        <el-table-column prop="countryName" :label="$t('putBike.table.countryName')" width="100"></el-table-column>
        <el-table-column prop="cityName" :label="$t('putBike.table.cityName')" width="120"></el-table-column>
        <el-table-column prop="bikeId" :label="$t('putBike.table.bikeId')" width="100"></el-table-column>
        <el-table-column prop="lockNo" :label="$t('putBike.table.lockNo')" width="100"></el-table-column>
        <el-table-column prop="createdByNameString" :label="$t('putBike.table.createdByName')" min-width="160">
          <template slot-scope="scope">
            <el-button @click="handleClickCreatedByName(scope.row.createdByName)" v-if="scope.row.createdByName" type="text" size="small">{{scope.row.createdByName}}</el-button>
            <el-button @click="handleClickCreatedByName(scope.row.createdByPhone)" v-if="scope.row.createdByPhone" type="text" size="small">{{scope.row.createdByPhone}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createdAtString" :label="$t('putBike.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="address" :label="$t('putBike.table.address')"></el-table-column>
        <el-table-column prop="tag" :label="$t('putBike.table.tag')"></el-table-column>
        <el-table-column prop="helmetString" :label="$t('putBike.table.helmet')"></el-table-column>
        <el-table-column prop="successString" :label="$t('putBike.table.success')" width="100"></el-table-column>
        <el-table-column prop="defeatReason" :label="$t('putBike.table.defeatReason')"></el-table-column>
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
        apiId: 7,   // 单车投放
        pageNum: 1,
        countryId: null,
        cityId: null,
        bikeId: null,
        lockNo: null,
        beginDate: null,
        endDate: null,
        createdByName: null,
        isSuccess: null,
      },
      page: {
        count: 0
      },
      cityOptions: [
        {label: this.$t('common.all'), value: null},
      ],
      areaOptions: this.getAreaOptions(),
      successOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('common.yes'), value: 1},
        {label: this.$t('common.no'), value: 0},
      ]
    }
  },
  computed: {
    computedOptLogs() {
      return this.optLogList.map(item => {
        return {
          ...item,
          createdByNameString: `${item.createdByName} | ${item.createdByPhone}`,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          helmetString: this.$t('putBike.js.helmet' + item.helmet),
          successString: item.success ? this.$t('common.yes') : this.$t('common.no'),
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