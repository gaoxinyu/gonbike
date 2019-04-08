<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('code.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('code.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('code.query.createdAt')">
              <el-date-picker
                v-model="createdAt"
                type="daterange"
                :placeholder="$t('code.query.chooseTime')"
                @change="handleCreatedAt"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('code.query.code')">
              <el-input v-model="query.code"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('code.query.tag')">
              <el-input v-model="query.tag"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('code.query.status')">
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
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('code.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCodes" border style="width: 100%">
        <el-table-column prop="id" :label="$t('code.table.id')" width="60"></el-table-column>
        <el-table-column prop="typeString" :label="$t('code.table.type')"></el-table-column>
        <el-table-column prop="code" :label="$t('code.table.code')" width="120"></el-table-column>
        <el-table-column prop="tag" :label="$t('code.table.tag')"></el-table-column>
        <el-table-column prop="useTimesPerOne" :label="$t('code.table.useTimesPerOne')"></el-table-column>
        <el-table-column prop="usedTimes" :label="$t('code.table.usedTimes')"></el-table-column>
        <el-table-column prop="useTimes" :label="$t('code.table.useTime')" width="90"></el-table-column>
        <el-table-column prop="statusString" :label="$t('code.table.status')"></el-table-column>
        <el-table-column prop="startTimeString" :label="$t('code.table.startTime')" width="140"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('code.table.endTime')" width="140"></el-table-column>
        <el-table-column prop="activityTypeString" :label="$t('code.table.activityType')"></el-table-column>
        <el-table-column :label="$t('code.table.content')" width="140">
          <template slot-scope="scope">
            <div class="flex-col">
              <span>{{scope.row.contentString1}}</span>
              <span>{{scope.row.contentString2}}</span>
              <span>{{scope.row.contentString3}}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="daysString" :label="$t('code.table.limitTime')"></el-table-column> -->
        <el-table-column prop="createdAtString" :label="$t('code.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="adminName" :label="$t('code.table.adminName')" width="100"></el-table-column>
        <el-table-column fixed="right" :label="$t('code.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('code.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('code.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('code.table.detail') }}</el-button></div>
              <div><el-button type="text" size="small" @click="exportExcel(scope.$index, scope.row)">{{ $t('code.table.exportExcel') }}</el-button></div>
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
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'
import {getStorage} from '../../services/auth'

export default {
  mixins: [Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      codes: [],
      createdAt: null,
      query: {
        pageNum: 1,
        type: null,
        status: null, // 1,
        createdAt: null,
        code: this.$route.query.code,
        startTime: null,
        endTime: null,
      },
      page: {
        count: 0
      },
      typeOptions: [
        {label: this.$t('code.js.all'), value: null},
        {label: this.$t('code.js.type1'), value: 1},
      ],
      statusOptions: [
        {label: this.$t('code.js.all'), value: null},
        {label: this.$t('code.js.status1'), value: 1},
        {label: this.$t('code.js.status2'), value: 2},
        {label: this.$t('code.js.status3'), value: 3},
      ],
      // areaOptions: Options.areaOptions,
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedCodes() {
      return this.codes.map((item) => {
        return {
          ...item,
          typeString: this.$t('code.js.type'),
          statusString: item.status ? this.$t('code.js.status' + item.status) : '',
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          areaString: (item.countryName ? item.countryName : '') + (item.cityName ? ' - ' + item.cityName : ''),
          couponAreaString: (item.couponCountryName ? item.couponCountryName : '') + (item.couponCityName ? ' - ' + item.couponCityName : ''),
          activityTypeString: item.activityType ? this.$t('code.js.activityType'+item.activityType) : '',
          benefitTypeString: item.benefitType === 1 ? this.$t('code.js.benefitType1') : item.benefitType === 2 ? this.$t('code.js.benefitType2') : '',
          contentString1: (item.quantity || '') + this.$t('code.js.num'),
          contentString2: item.activityType === 2 ? item.couponCountryName : item.endType === 1 ? item.days + ' ' + this.$t('code.js.day') : item.endType === 2 ? moment(item.couponStartTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(item.couponEndTime).format("YYYY-MM-DD HH:mm:ss") : '',
          contentString3: this.transferContentName(item)
        }
      })
    }
  },
  methods: {
    goAdd() {
      window.open(location.href + "add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCodes(this, this.query);
      }
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.startTime = datas[0];
        this.query.endTime = datas[1];
      } else {
        this.query.startTime = '';
        this.query.endTime = '';
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCodes(this, this.query);
    },
    edit(index, row) {
      sessionStorage.code = JSON.stringify(row);
      this.$router.push({name: "editcode"});
    },
    detail(index, row) {
      sessionStorage.code = JSON.stringify(row);
      window.open(location.href + "/info?batchNo=" + row.batchNo);
    },
    exportExcel(index, row) {
      let parm = row.batchNo ? 'batchNo=' + row.batchNo : 'id=' + row.id;
      parm += '&Authorization=' + (getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : '');

      let iframe = document.createElement("iframe");
      iframe.id = 'iframeRequest';
      iframe.style.display = 'none';
      iframe.src = '/api/v1/codes/file?' + parm;
      document.body.appendChild(iframe);
    },
    transferContentName(item) {
      let res = '';
      if(item.activityType === 2){
        res = item.days ? item.days + this.$t('code.js.day') + this.$t('code.js.activityType2'): ''
      }else{
        if(item.randomPromotion){
          if(item.minPromotion === null || item.maxPromotion === null) return '';
          if(item.benefitType === 1){
            res = item.minPromotion + '% - ' + item.maxPromotion + '%' + this.$t('code.js.coupon');
          }else if(item.benefitType === 2){
            res = item.currencySymbol + item.minPromotion + ' - ' + item.currencySymbol + item.maxPromotion + this.$t('code.js.coupon');
          }else{
            res = "";
          }
        }else{
          if(item.benefitType === 1){
            res = item.benefitPercent ? item.benefitPercent + '%' + this.$t('code.js.coupon') : '';
          }else if(item.benefitType === 2){
            res = (item.currencySymbol || '') + (item.benefitMoney || '') + this.$t('code.js.coupon');
          }else{
            res = "";
          }
        }
      }
      return res;
    },
    transferCard(item) {
      return (item.quantity || '') + this.$t('code.js.num') + ' ' + (item.couponCountryName || '') 
            + (item.days || '') + this.$t('code.js.day')
    },
    transferCoupon(item) {
      return (item.quantity || '') + this.$t('code.js.num') + ' '
        + (item.endType === 1 ? item.days + this.$t('code.js.day') + ' ' : item.endType === 2 ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '') + ' '
        + (item.benefitType === 1 ? (item.benefitPercent ? item.currencySymbol + ' ' + item.benefitPercent + '%' + this.$t('code.js.coupon') : '') : item.benefitType === 2 ? (item.currencySymbol || '') + ' ' + (item.benefitMoney || '') + this.$t('code.js.coupon') : '')
    }
  },
}
</script>


<style lang="scss" scoped>
.flex-col{
  display: flex;
  flex-direction: column;
}
</style>
