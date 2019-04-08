<template>
  <div class="log-upload-loc-view">
    <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('punchcard.query.title') }}
      <div class="pull-right box-tools">
        <el-button class="pull-right" type="primary" size="small" @click="exportExcelOther" :loading="loading">{{ $t('punchcard.query.exportExcel') }}</el-button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('punchcard.query.countryId')" label-width="90px">
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
            <el-form-item :label="$t('punchcard.query.cityId')" label-width="90px">
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
            <el-form-item :label="$t('punchcard.query.clockOnTime')" label-width="90px">
              <el-date-picker
                v-model="OnAt"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleOnAt"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('punchcard.query.clockOffTime')" label-width="90px">
              <el-date-picker
                v-model="OffAt"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleOffAt"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('punchcard.query.createdByName')" label-width="90px">
              <el-input v-model="query.createdByName"></el-input>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
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
      <el-table v-loading="loading" :data="computedPunchcardLogs" border style="width: 100%">
        <el-table-column prop="id" :label="$t('punchcard.table.id')" width="80"></el-table-column>
        <el-table-column prop="countryName" :label="$t('punchcard.table.countryName')" width="100"></el-table-column>
        <el-table-column prop="cityName" :label="$t('punchcard.table.cityName')" width="120"></el-table-column>
        <el-table-column prop="createdByNameString" :label="$t('punchcard.table.createdByName')" min-width="200">
          <template slot-scope="scope">
            <el-button @click="handleClickCreatedByName(scope.row.createdByName)" v-if="scope.row.createdByName" type="text" size="small">{{scope.row.createdByName}}</el-button>
            <el-button @click="handleClickCreatedByName(scope.row.createdByAccount)" v-if="scope.row.createdByAccount" type="text" size="small">{{scope.row.createdByAccount}}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="onTimeString" :label="$t('punchcard.table.clockOnTime')" width="260"></el-table-column>
        <el-table-column prop="clockOnAddress" :label="$t('punchcard.table.clockOnAddress')" min-width="200"></el-table-column>

        <el-table-column prop="offTimeString" :label="$t('punchcard.table.clockOffTime')" width="260"></el-table-column>
        <el-table-column prop="clockOffAddress" :label="$t('punchcard.table.clockOffAddress')" ></el-table-column>

        <el-table-column prop="workDuration" :label="$t('punchcard.table.workDuration')"></el-table-column>
        <el-table-column fixed="right" :label="$t('punchcard.table.track')" width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="detail(scope.$index, scope.row)" :loading="dialogLoading">{{ $t('punchcard.table.detail') }}</el-button>
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
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
    </div>
  </div>
  <el-dialog :title="$t('punchcard.dialog.title')" :visible.sync="trackLogVisible" :width="'60%'">
      <el-table v-loading="dialogLoading" :data="computedTrackLogs" border style="width: 100%">
        <el-table-column prop="indexString" :label="'#'" width="40px"></el-table-column>
        <el-table-column prop="createdByName" :label="$t('punchcard.dialog.createdByName')" width="100px"></el-table-column>
        <el-table-column prop="timeStr" :label="$t('punchcard.dialog.createdTime')" width="150px"></el-table-column>
        <el-table-column prop="latitude" :label="$t('punchcard.dialog.latitude')" width="100px"></el-table-column>
        <el-table-column prop="longitude" :label="$t('punchcard.dialog.longitude')" width="100px"></el-table-column>
        <el-table-column prop="address" :label="$t('punchcard.dialog.address')"></el-table-column>
      </el-table>
      <div class="row text-center">
        <div class="col-md-12">
          <el-pagination
            layout="total, prev, pager, next"
            :total="dialogPage.count"
            :page-size="dialogPage.per"
            :current-page="dialogPage.current"
            @current-change="handleDialogCurrentChange"
            ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="exportTrackExcel" :loading="dialogLoading">{{$t('punchcard.query.exportExcel')}}<i class="el-icon-document el-icon--right"></i></el-button>
        <el-button type="primary" @click="trackLogVisible = false" :loading="dialogLoading">{{$t('common.ok')}}</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import api from "../../api";
import Mixins from "../../mixins/index.js";
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: true,
      punchcardLogList: [],
      OnAt: null,
      OffAt: null,
      query: {
        pageNum: 1,
        countryId: null,
        cityId: null,
        createdByName: null,
        onStartTime: null,
        onEndTime: null,
        offStartTime: null,
        offEndTime: null
      },
      page: {
        count: 0,
        per: 0,
        current: 0
      },
      cityOptions: [{ label: this.$t("common.all"), value: null }],
      areaOptions: this.getAreaOptions(),
      successOptions: [
        { label: this.$t("common.all"), value: null },
        { label: this.$t("common.yes"), value: 1 },
        { label: this.$t("common.no"), value: 0 }
      ],
      //for track dialog
      trackId: null,
      trackOffsetBase: 0,
      trackLogs: [],
      trackLogVisible: false,
      dialogLoading: false,
      dialogPage: {
        count: 0
      },
    };
  },
  computed: {
    computedPunchcardLogs() {
      return this.punchcardLogList.map(item => {
        return {
          ...item,
          createdByNameString: `${item.createdByName} | ${item.createdByAccount}`,
          onTimeString: item.onTimeStr,
          offTimeString: item.offTimeStr
        };
      });
    },
    computedTrackLogs(){
      return this.trackLogs.map((item, index) => {
        return {
          ...item,
          indexString: Number.parseInt((index + this.dialogPage.per * (this.dialogPage.current - 1) + 1), 10)
        }
      })
    }
  },
  methods: {
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api
        .getCitysByCountry(this, { countryId: this.query.countryId })
        .then(citys => {
          this.cityOptions = [];
          this.$set(this.cityOptions, 0, {
            label: this.$t("common.all"),
            value: null
          });
          this.citys.forEach(city => {
            this.$set(this.cityOptions, this.cityOptions.length, {
              label: city.name,
              value: city.id
            });
          });
          this.query.cityId = null;
        });
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getPunchcardLogList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getPunchcardLogList(this, this.query);
      }
    },
    handleDialogCurrentChange(val) {
      if (!this.dialogLoading) {
        this.dialogPage.pageNum = val;
        api.getPunchcardTrack(this, {id: this.trackId, pageNum: val});
      }
    },
    handleOnAt(dates) {
      if (dates) {
        this.query.onStartTime = moment(dates[0]+' GMT+11').format('x');
        this.query.onOffTime =moment(dates[1]+' GMT-11').format('x');
      } else {
        this.query.onStartTime = "";
        this.query.onOffTime = "";
      }
    },
    handleOffAt(dates) {
      if (dates) {
        this.query.offStartDate = moment(dates[0]+' GMT+11').format('x');
        this.query.offOffDate =moment(dates[1]+' GMT-11').format('x');
      } else {
        this.query.offStartDate = "";
        this.query.offOffDate = "";
      }
    },
    exportExcelOther() {
      this.exportExcel(
        `/api/v1/punchCard/queryCard/file`,
        this.query
      );
    },
    handleClickCreatedByName(createdByName) {
      this.query.createdByName = createdByName;
      this.handleQuery();
    },
    //查看轨迹
    detail (index, row) {
      this.trackLogs = [];
      this.trackId = row.id;
      api.getPunchcardTrack(this, {id: this.trackId}).then(() => {
        this.trackLogVisible = true;
      })
    },
    //导出轨迹
    exportTrackExcel(){
      this.exportExcel(
        `/api/v1/punchCard/queryTrack/${this.trackId}/file`
      );
    }
  }
};
</script>