<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('device.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('device.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('device.query.countryId')">
              <el-select v-model="query.countryId">
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
            <el-form-item :label="$t('device.query.firebaseToken')">
              <el-input v-model="query.firebaseToken"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('device.query.deviceName')">
              <el-input v-model="query.deviceName"></el-input>
            </el-form-item>
          </div>

        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('device.query.version')">
              <el-input v-model="query.version"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('device.query.language')">
              <el-input v-model="query.language"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading" :disabled="queryDisabled">{{ $t('device.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedDevices" border style="width: 100%">
        <el-table-column prop="id" :label="$t('device.table.id')" width="70"></el-table-column>
        <el-table-column prop="phone" :label="$t('device.table.phone')" width="150"></el-table-column>
        <el-table-column prop="country" :label="$t('device.table.country')" width="80"></el-table-column>
        <el-table-column prop="deviceName" :label="$t('device.table.deviceName')" width="120"></el-table-column>
        <el-table-column prop="deviceId" :label="$t('device.table.deviceId')" width="160"></el-table-column>
        <el-table-column prop="appVersion" :label="$t('device.table.appVersion')" width="90"></el-table-column>
        <el-table-column prop="version" :label="$t('device.table.version')" width="80"></el-table-column>
        <el-table-column prop="language" :label="$t('device.table.language')" width="80"></el-table-column>
        <el-table-column prop="firebaseToken" :label="$t('device.table.firebaseToken')"></el-table-column>
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
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    if(this.query.phone) {
      this.handleQuery();
    }
  },
  data () {
    return {
      loading: false,
      devices: [],
      query: {
        pageNum: 1,
        phone: this.$route.query.phone,
        countryId: null,
        firebaseToken: null,
        deviceName: null,
        version: null,
        language: null,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedDevices() {
      return this.devices.map((item) => {
        return {
            ...item,
            
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          }
      })
    },
    queryDisabled() {
      return !(this.query.phone || this.query.countryId || this.query.firebaseToken
            || this.query.deviceName || this.query.version || this.query.language)
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getDeviceList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getDeviceList(this, this.query)
    },
  },
  components: {
  }
}
</script>

<style lang="scss">
// .user-info-view {
  .no-min-with {
    min-width: initial !important;
  }
// }
</style>