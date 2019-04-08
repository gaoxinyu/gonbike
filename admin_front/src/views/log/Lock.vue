<template>
  <div class="lock-log">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('locklog.query.title') }}
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.createdAt')">
                <el-date-picker v-model="createdAt" type="daterange" :placeholder="$t('locklog.query.chooseTime')" @change="handleCreatedAt" style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.countryId')">
                <el-select v-model="query.countryId">
                  <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
  
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.bikeId')">
                <el-input type="text" v-model="query.bikeId"></el-input>
              </el-form-item>
            </div>
  
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.phone')">
                <el-input type="text" v-model="query.phone"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.tradeNo')">
                <el-input type="text" v-model="query.tradeNo"></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('lock.query.manufacture')">
                <el-select v-model="query.manufacture">
                  <el-option
                    v-for="item in manufactureOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.transtype')">
                <el-select v-model="query.transtype">
                  <el-option v-for="item in transtypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.action')">
                <el-select v-model="query.action" @change="handleActionChange">
                  <el-option v-for="item in actions" :key="item.paramKey" :label="item.paramValue" :value="item.paramKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('locklog.query.subAction')" v-if="subaction.length > 1">
                <el-select v-model="query.subAction">
                  <el-option v-for="item in subaction" :key="item.paramKey" :label="item.paramValue" :value="item.paramKey">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('locklog.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
  
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedLockLogs" border style="width: 100%">
            <el-table-column prop="id" :label="$t('locklog.table.id')" width="70"></el-table-column>
            <el-table-column prop="countryName" :label="$t('locklog.table.countryName')"></el-table-column>
            <el-table-column prop="bikeId" :label="$t('locklog.table.bikeId')"></el-table-column>
            <el-table-column prop="lockNo" :label="$t('locklog.table.lockNo')" width="120"></el-table-column>
            <el-table-column prop="diffLockString" :label="$t('locklog.table.diffLock')"></el-table-column>
            <el-table-column prop="manufactureString" :label="$t('lock.table.manufacture')" width="100"></el-table-column>
            <el-table-column prop="lockLevelString" :label="$t('locklog.table.lockLevel')"></el-table-column>
            <el-table-column prop="transtypeString" :label="$t('locklog.table.transtype')"></el-table-column>
            <el-table-column prop="actionName" :label="$t('locklog.table.actionName')" width="140"></el-table-column>
            <el-table-column prop="subActionName" :label="$t('locklog.table.subAction')" v-if="subaction.length > 1"></el-table-column>
            <el-table-column prop="createAtString" :label="$t('locklog.table.createAt')" width="140"></el-table-column>
            <el-table-column prop="infoTimeString" :label="$t('locklog.table.infoTime')" width="140"></el-table-column>
            <el-table-column prop="phoneString" :label="$t('locklog.table.phone')" width="150"></el-table-column>
            <el-table-column prop="deviceName" :label="$t('locklog.table.deviceName')" width="140"></el-table-column>
            <el-table-column prop="appVersion" :label="$t('locklog.table.versionNo')"></el-table-column>
            <el-table-column prop="scopeString" :label="$t('locklog.table.scope')"></el-table-column>
            <el-table-column prop="tradeNo" :label="$t('locklog.table.tradeNo')" width="140"></el-table-column>
          </el-table>
  
          <div class="row text-center">
            <div class="col-md-12">
              <el-pagination layout="total, prev, pager, next" :total="page.count" :page-size="page.per" :current-page="page.current" @current-change="handleCurrentChange"></el-pagination>
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
  created() {
    const { startDate, endDate, startTimestamp, endTimestamp } = this.getDefaultDate();   // query.js
    this.createdAt = [startDate, endDate];
    this.query.startTime = startTimestamp;
    this.query.endTime = endTimestamp;
  },
  mounted() {
    api.getLockLogList(this, this.query);
    api.getLockErrParamList(this, {foreignKey: 0}).then(() => {
      this.actions.unshift({paramKey: null, paramValue: this.$t('locklog.js.all')})
    });
  },
  data() {
    return {
      loading: false,
      locklogs: [],
      createdAt: null,
      query: {
        startTime: null,
        endTime: null,
        countryId: null,
        bikeId: null,
        phone: null,
        tradeNo: null,
        transtype: null,
        action: null,
        subAction: null,
        manufacture: null,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      actions: [],
      subaction: [],
      transtypeOptions: [
        { label: this.$t('locklog.js.all'), value: null},
        { label: this.$t('locklog.js.translock'), value: 1 },
        { label: this.$t('locklog.js.transunlock'), value: 0 },
      ],
      manufactureOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('lock.js.manufacture1'), value: 1},
        {label: this.$t('lock.js.manufacture2'), value: 2},
      ]
    }
  },
  computed: {
    computedLockLogs() {
      return this.locklogs.map((item) => {
        return {
          ...item,
          phoneString: item.phone ? ((item.code ? ('+' + item.code) : '') + ' ' + item.phone) : '',
          createAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          transtypeString: item.transtype === 1 ? this.$t('locklog.js.translock') : (item.transtype === 0 ? this.$t('locklog.js.transunlock') : ''),
          infoTimeString: item.infoTime ? moment(item.infoTime).format("YYYY-MM-DD HH:mm:ss") : "",
          diffLockString: item.diffLock ? (this.$t('locklog.js.yes') + (item.bikeLockNo ? this.$t('locklog.js.bikeLockNo', {bikeLockNo: item.bikeLockNo}) : this.$t('locklog.js.unknown'))) : this.$t('locklog.js.no'),
          lockLevelString: (!item.lockLevel || item.lockLevel == 0) ? this.$t('locklog.js.empty') : this.$t('locklog.js.lockLevel', {lockLevel: item.lockLevel}),
          scopeString: item.scope == 1 ? this.$t('locklog.js.admin') : (item.scope == 0 ? this.$t('locklog.js.customer') : this.$t('locklog.js.others')),
          manufactureString: item.manufacture ? this.$t('lock.js.manufacture' + item.manufacture) : '',
        }
      })
    }
  },
  methods: {
    handleQuery() {
      this.query.pageNum = 1;
      api.getLockLogList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getLockLogList(this, this.query);
      }
    },
    handleCreatedAt(datas) {
      if (datas) {
        this.query.startTime = datas[0].getTime();
        this.query.endTime = datas[1].getTime();
      } else {
        this.query.startTime = '';
        this.query.endTime = '';
      }
    },
    handleActionChange(val) {
      this.query.subAction = null;
      this.subaction = [];
      api.getLockErrParamList(this, {foreignKey: val ? val : 0}).then(() => {
        val ? this.subaction.unshift({paramKey: null, paramValue: this.$t('locklog.js.all')}) 
        : this.actions.unshift({paramKey: null, paramValue: this.$t('locklog.js.all')});
      });
    }
  }
}
</script>