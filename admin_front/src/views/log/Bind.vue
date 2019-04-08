<template>
  <div class="bind-log">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('bind.query.title') }}
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bind.query.countryId')">
                <el-select v-model="query.countryId">
                  <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
  
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bind.query.createdAt')">
                <el-date-picker v-model="createdAt" type="daterange" :placeholder="$t('bind.query.chooseTime')" @change="handleCreatedAt" style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
  
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bind.query.phone')">
                <el-input type="text" v-model="query.phone"></el-input>
              </el-form-item>
            </div>
  
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('bind.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
  
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBindLogs" border style="width: 100%">
            <el-table-column prop="id" :label="$t('bind.table.id')" width="60"></el-table-column>
            <el-table-column prop="createAtString" :label="$t('bind.table.createAt')" width="140"></el-table-column>
            <el-table-column prop="countryName" :label="$t('bind.table.countryName')" width="100"></el-table-column>
            <el-table-column prop="memberId" :label="$t('bind.table.memberId')" width="80"></el-table-column>
            <el-table-column prop="phoneString" :label="$t('bind.table.phone')" width="150"></el-table-column>
            <el-table-column prop="logInfo" :label="$t('bind.table.logInfo')"></el-table-column>
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
    api.getBindLogList(this, this.query);
  },
  data() {
    return {
      loading: false,
      bindlogs: [],
      createdAt: null,
      query: {
        countryId: null,
        startTime: null,
        endTime: null,
        phone: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedBindLogs() {
      return this.bindlogs.map((item) => {
        return {
          ...item,
          phoneString: item.phone ? ((item.code ? ('+' + item.code) : '') + ' ' + item.phone) : '',
          createAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    handleQuery() {
      api.getBindLogList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getBindLogList(this, this.query);
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
  }
}
</script>