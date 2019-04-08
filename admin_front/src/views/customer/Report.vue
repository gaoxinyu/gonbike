<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('report.box.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('report.box.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.beginTime')">
              <el-date-picker
                v-model="query.beginTime"
                type="date"
                :placeholder="$t('report.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('report.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.assignTo')">
              <el-select v-model="query.assignTo">
                <el-option
                  v-for="item in assignToOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.status')">
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
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.type')">
              <el-select v-model="query.type">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.priority')">
              <el-select v-model="query.priority">
                <el-option
                  v-for="item in priorityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.bikeId')">
              <el-input v-model="query.bikeId"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.phone')">
              <el-input v-model="query.memberName"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('report.query.countryId')">
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
            <el-form-item :label="$t('report.query.faultId')">
              <el-input v-model="query.faultId"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('report.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            <el-button class="pull-right" type="warning" @click="exportQuery" :loading="loading" :plain="true">{{ $t('common.exportQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-header with-border">
      <el-button type="primary" @click="showMultiApply" :disabled="multipleSelection.length === 0">{{ $t('report.box.title1') }}</el-button>
      <el-button type="primary" @click="showMultiScore" :disabled="multiplePlusScore.length === 0">{{ $t('report.box.title2') }}</el-button>
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedFaultBikes" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" :label="$t('report.table.id')" width="70"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('report.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="typeString" :label="$t('report.table.type')" width="140"></el-table-column>
        <el-table-column prop="memberNameString" :label="$t('report.table.phone')" width="150">
          <template slot-scope="scope">
            <a v-if="scope.row.type === 30 || scope.row.type === 31 || scope.row.type === 32" :href="'/customer/report?phone=' + scope.row.onlyPhone" target="_blank">{{scope.row.userPhone}}</a>
            <a v-else :href="'/customer/report?phone=' + scope.row.memberName" target="_blank">{{ scope.row.code ? "+" + scope.row.code + " " + scope.row.memberName : scope.row.memberName }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="bikeId" :label="$t('report.table.bikeId')" width="80">
          <template slot-scope="scope">
            <a :href="'/customer/report?bikeId=' + scope.row.bikeId" target="_blank">{{scope.row.bikeId}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="geoAddress" :label="$t('report.table.address')" width="150"></el-table-column>
        <el-table-column prop="assignToString" :label="$t('report.table.assignTo')" width="110"></el-table-column>
        <el-table-column prop="statusString" :label="$t('report.table.status')" width="100"></el-table-column>
        <el-table-column prop="priorityString" :label="$t('report.table.priority')" width="80"></el-table-column>
        <el-table-column prop="remarkString" :label="$t('report.table.remark')"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="60">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('report.table.detail') }}</el-button></div>
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
            @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
      </div>
      
    </div>
  </div>

  <el-dialog :title="$t('report.dialog.title')" :visible.sync="multiApplyVisible">
    <p>{{ $t('report.dialog.bikeIds') }}：{{ dialogObj.bikeIds }}</p>
    <p>{{ $t('report.dialog.faults', {faults: dialogObj.faults}) }}</p>
    <p v-for="(value, key) in dialogObj.faultObj" :key="key">{{ key }}：{{ value }} {{ $t('report.dialog.count') }}</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="multiApplyVisible = false">{{ $t('report.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="handleMultiIgnore">{{ $t('report.dialog.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('report.dialog.title1')" :visible.sync="multiPlusVisible">
    <p>{{ $t('report.dialog.bikeIds') }}：{{ dialogObj.bikeIds }}</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="multiPlusVisible = false">{{ $t('report.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="handleMultiPlus">{{ $t('report.dialog.ok') }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"
import { getLocalLanguage } from '../../services/auth'

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    if(!this.$route.query.phone && !this.$route.query.bikeId) {
      const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.beginTime = startDate;
      this.endTime = endDate;
      this.query.beginTime = startDateStr;
      this.query.endTime = endDateStr;
    }
  },
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      page: {
        count: 0
      },
      faultBikes: [],
      multipleSelection: [],
      multiplePlusScore: [],
      multiApplyVisible: false,
      multiPlusVisible: false,
      dialogObj: this.initDialogObj(),
      query: {
        pageNum: 1,
        beginTime: null,
        endTime: null,
        memberName: this.$route.query.phone,
        bikeId: this.$route.query.bikeId,
        type: this.$route.query.type ? +this.$route.query.type : null,
        status: 0,
        assignTo: null,
        priority: null,
        countryId: null,
        cityId: null,
        faultId: null,
      },
      typeOptions: [
        {label: this.$t("report.js.all"), value: null},
        {label: this.$t("report.js.type2"), value: 2},
        {label: this.$t("report.js.type5"), value: 5},
        {label: this.$t("report.js.type1"), value: 1},
        {label: this.$t("report.js.type3"), value: 3},
        {label: this.$t("report.js.type4"), value: 4},

        {label: this.$t("report.js.type13"), value: 13},
        {label: this.$t("report.js.type30"), value: 30},
        {label: this.$t("report.js.type31"), value: 31},
        {label: this.$t("report.js.type32"), value: 32},
      ],
      statusOptions: [
        {label: this.$t("report.js.all"), value: null},
        {label: this.$t("report.js.status0"), value: 0},
        {label: this.$t("report.js.status1"), value: 1},
        {label: this.$t("report.js.status2"), value: 2},
        {label: this.$t("report.js.status3"), value: 3},
      ],
      assignToOptions: [
        {label: this.$t("report.js.all"), value: null},
        {label: this.$t("report.js.assignTo1"), value: 1},
        {label: this.$t("report.js.assignTo2"), value: 2},
      ],
      priorityOptions: [
        {label: this.$t("report.js.all"), value: null},
        {label: this.$t("report.js.priority1"), value: 1},
        {label: this.$t("report.js.priority2"), value: 2},
        {label: this.$t("report.js.priority3"), value: 3},
        {label: this.$t("report.js.priority0"), value: 0},
      ],
      cityOptions: [
        {label: this.$t('report.js.all'), value: null}
      ],
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedFaultBikes() {
      return this.faultBikes.map((item) => {
        return {
          ...item,
          optStatusString: item.status === "1" ? this.$t("report.js.optStatus1") : item.status === "2" ? this.$t("report.js.optStatus2")
                      : item.status === "3" ? this.$t("report.js.optStatus3") : "",
          // typeString: this.switchType(item.type),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          useTimeString: item.useTime ? moment(item.useTime).format("YYYY-MM-DD HH:mm:ss") : "",
          userPhoneString: item.userId ? item.userPhone : this.$t("report.js.optAdmin"),
          geoAddress: item.longitude + "," + item.latitude,
          memberNameString: item.type === 30 || item.type === 31 || item.type === 32 ? item.userPhone : item.code ? "+" + item.code + " " + item.memberName : item.memberName,
          assignToString: item.assignTo === 1 ? this.$t("report.js.assignTo1") : item.assignTo === 2 ? this.$t("report.js.assignTo2") : '',
          priorityString: item.priority === 1 ? this.$t("report.js.priority1") : item.priority === 2 ? this.$t("report.js.priority2") : item.priority === 3 ? this.$t("report.js.priority3") : item.priority === 0 ? this.$t("report.js.priority0") : '',
          remarkString: item.handleDesc ? item.handleDesc : item.remark,    //item.content
          onlyPhone: item.userPhone && item.userPhone.split(' ')[1] ? item.userPhone.split(' ')[1] : '',
          imgs: item.img ? item.img.split(',') : [],
          // imgs: ["http://image.o.bike/image/7178f40d3b14e9f7a736087061fc9383.jpg", "http://image.o.bike/image/7178f40d3b14e9f7a736087061fc9383.jpg","http://image.o.bike/image/7178f40d3b14e9f7a736087061fc9383.jpg","http://image.o.bike/image/7178f40d3b14e9f7a736087061fc9383.jpg"],
          // reward: item.status === 0 && ( item.type === 3 || item.type === 2 ) ? 1 : item.reward,  // 未处理状态的工单 举报违停or单车故障 默认扣分
        }
      });
    }
  },
  methods: {
    goAdd() {
      window.open(location.href.split(location.pathname)[0] + "/customer/addreport");
    },
    queryAfter() {
      api.getBikeReportList(this, this.query);
    },
    handleQuery() {
      this.query.pageNum = 1;
      this.queryAfter();
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        this.queryAfter();
      }
    },
    getCountryInfo() {
      this.getCitysByCountry();
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
    detail(index, row) {
      sessionStorage.report = JSON.stringify(row);
      // this.$router.push({name: "reportinfo", params: { id: row.id }});
      // window.open(location.href + "/" + row.id);
      window.open(location.href.split(location.pathname)[0] + "/customer/report/" + row.id);
    },
    switchType(type) {
      return this.$t("report.js.type" + type);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multiplePlusScore = val;
    },
    initDialogObj() {
      return {
        bikeIds: null,
        bikeFaultIds: null,
        faults: 0,
        faultObj: {},
      }
    },
    showMultiApply() {
      let bikeFaultIds = [], bikeIds = [];
      this.dialogObj = this.initDialogObj();

      this.multipleSelection.forEach(row => { 
        bikeFaultIds[bikeFaultIds.length] = row.id; 
        bikeIds[bikeIds.length] = row.bikeId;

        this.dialogObj.faultObj[row.typeString] ? this.dialogObj.faultObj[row.typeString]++ : this.dialogObj.faultObj[row.typeString] = 1;
      });
      this.dialogObj.bikeFaultIds = bikeFaultIds.join(',');
      this.dialogObj.bikeIds = bikeIds.join(',');
      this.dialogObj.faults = this.multipleSelection.length;

      this.multiApplyVisible = true;
    },
    showMultiScore() {
      let bikeFaultIds = [], bikeIds = [];
      this.dialogObj = this.initDialogObj();

      this.multiplePlusScore.forEach(row => { 
        bikeFaultIds[bikeFaultIds.length] = row.id; 
        bikeIds[bikeIds.length] = row.bikeId;

        this.dialogObj.faultObj[row.typeString] ? this.dialogObj.faultObj[row.typeString]++ : this.dialogObj.faultObj[row.typeString] = 1;
      });
      this.dialogObj.bikeFaultIds = bikeFaultIds.join(',');
      this.dialogObj.bikeIds = bikeIds.join(',');
      this.dialogObj.faults = this.multiplePlusScore.length;

      this.multiPlusVisible = true;
    },
    handleMultiIgnore() {
      api.updateFaultIgnore(this, { bikeFaultIds: this.dialogObj.bikeFaultIds }).then(() => {
        this.multiApplyVisible = false;
        this.handleQuery();
      });
    },
    handleMultiPlus() {
      api.updateFaultCredits(this, { bikeFaultIds: this.dialogObj.bikeFaultIds, deduct: false, reward: true }).then(() => {
        this.multiPlusVisible = false;
        this.handleQuery();
      });
    },
    exportQuery() {
      let parms = [];
      for(let key in this.query) {
        if(this.query[key] !== null && this.query[key] !== '' && this.query[key] !== undefined) {
          parms.push(key + '=' + this.query[key]);
        }
      }

      let iframe = document.createElement("iframe");
      iframe.id = 'iframeRequest';
      iframe.style.display = 'none';
      iframe.src = '/api/v1/token/bike-fault/export?lang=' + getLocalLanguage() + '&' + parms.join('&');
      document.body.appendChild(iframe);
    }
  },
  components: {
  }
}
</script>
