<template>
  <div class="log-upload-loc-view">
    <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('putAgain.query.title') }}
      <div class="pull-right box-tools">
        <el-button class="pull-right" type="primary" size="small" @click="exportExcel('/api/v1/bikeOperationLog/list/4/file', query)">{{ $t('putAgain.query.exportExcel') }}</el-button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putAgain.query.countryId')">
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
            <el-form-item :label="$t('putAgain.query.cityId')">
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
            <el-form-item :label="$t('putAgain.query.bikeId')">
              <el-input v-model="query.bikeId"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putAgain.query.lockNo')">
              <el-input v-model="query.lockNo"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putAgain.query.recycleDate')">
              <el-date-picker
                v-model="recycleDate"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleRecycleDate"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('putAgain.query.recyclePerson')">
              <el-input v-model="query.recyclePerson"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <!-- <el-form-item :label="$t('putAgain.query.relaunchDate')">
              <el-date-picker
                v-model="relaunchDate"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleRelaunchDate"
                style="width: 100%">
              </el-date-picker>
            </el-form-item> -->
          </div>
          <div class="col-md-3 col-xs-12">
            <!-- <el-form-item :label="$t('putAgain.query.relaunchPerson')">
              <el-input v-model="query.relaunchPerson"></el-input>
            </el-form-item> -->
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div> -->
        
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedOptLogs" border style="width: 100%">
        <el-table-column prop="id" :label="$t('putAgain.table.id')" width="80"></el-table-column>
        <el-table-column prop="recycle" :label="$t('putAgain.table.recycle')" width="100"></el-table-column>
        <el-table-column prop="countryName" :label="$t('putAgain.table.countryName')" width="100"></el-table-column>
        <el-table-column prop="cityName" :label="$t('putAgain.table.cityName')" width="120"></el-table-column>
        <el-table-column prop="bikeId" :label="$t('putAgain.table.bikeId')" width="100"></el-table-column>
        <el-table-column prop="lockNo" :label="$t('putAgain.table.lockNo')" width="100"></el-table-column>
        <el-table-column prop="recycleAddress" :label="$t('putAgain.table.recycleAddress')" min-width="160"></el-table-column>
        <el-table-column prop="recyclePerson" :label="$t('putAgain.table.recyclePerson')" min-width="160">
          <template slot-scope="scope">
            <el-button @click="handleClickCreatedByName(scope.row.createdByName)" v-if="scope.row.createdByName" type="text" size="small">{{scope.row.createdByName}}</el-button>
            <el-button @click="handleClickCreatedByName(scope.row.createdByPhone)" v-if="scope.row.createdByPhone" type="text" size="small">{{scope.row.createdByPhone}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="recycleAtString" :label="$t('putAgain.table.recycleAt')" width="140"></el-table-column>
        <el-table-column prop="relaunch" :label="$t('putAgain.table.relaunch')"></el-table-column>
        <el-table-column prop="relaunchAddress" :label="$t('putAgain.table.relaunchAddress')"></el-table-column>
        <el-table-column prop="relaunchPerson" :label="$t('putAgain.table.relaunchPerson')" width="150"></el-table-column>
        <el-table-column prop="relaunchAtString" :label="$t('putAgain.table.relaunchAt')" width="140"></el-table-column>
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
      recycleDate: null,
      query: {
        apiId: 4,   // 单车回收再投放
        pageNum: 1,
        countryId: null,
        cityId: null,
        bikeId: null,
        lockNo: null,
        beginDate: null,
        endDate: null,
        recyclePerson: null,
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
          recycleAtString: item.recycleAt ? moment(item.recycleAt).format("YYYY-MM-DD HH:mm:ss") : '',
          relaunchAtString: item.relaunchAt ? moment(item.relaunchAt).format("YYYY-MM-DD HH:mm:ss") : '',
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
    handleRecycleDate(datas) {
      if(datas) {
        this.query.beginDate = datas[0];
        this.query.endDate = datas[1];
      } else {
        this.query.beginDate = '';
        this.query.endDate = '';
      }
    },
    handleClickCreatedByName(createdByName) {
      this.query.recyclePerson = createdByName;
      this.handleQuery();
    },
  }
}

</script>