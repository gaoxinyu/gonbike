<template>
<div>
  <h4>{{ $t('codeInfo.table.title') }}</h4>
  <div class="row">
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          {{ $t('codeInfo.table.title1') }}
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="200px">{{ $t('codeInfo.table.codeType') }}</td><td>{{ $t('codeInfo.table.typeName') }}</td></tr>
              <tr><td width="200px">{{ $t('codeInfo.table.code') }}</td><td>{{ code.code || '--' }}</td></tr>
              <tr><td width="200px">{{ $t('codeInfo.table.startTime') }}</td><td>{{ code.startTimeString || '--' }}</td></tr>
              <tr><td width="200px">{{ $t('codeInfo.table.endTime') }}</td><td>{{ code.endTimeString || '--' }}</td></tr>
              <tr><td width="200px">{{ $t('codeInfo.table.area') }}</td><td>{{ code.areaString || '--' }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header">
          {{ $t('codeInfo.table.title2') }}
        </div>
        <div class="box-body no-padding">
          <table class="table table-bordered">
            <tbody>
              <tr><td width="140px">{{ $t('codeInfo.table.quantity') }}</td><td>{{ code.quantity || '--' }}</td></tr>
              <tr><td width="140px">{{ $t('codeInfo.table.benefitType') }}</td><td>{{ code.benefitTypeString || '--' }}</td></tr>
              <tr><td width="140px">{{ $t('codeInfo.table.content') }}</td><td>{{ code.contentString || '--' }}</td></tr>
              <tr><td width="140px">{{ $t('codeInfo.table.couponArea') }}</td><td>{{ code.couponAreaString || '--' }}</td></tr>
              <tr><td width="140px">{{ $t('codeInfo.table.days') }}</td><td>{{ code.daysString || '--' }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('codeInfo.table.title3') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCodeLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('codeInfo.table.createdAt')" width="130"></el-table-column>
        <el-table-column prop="typeString" :label="$t('codeInfo.table.type')" width="120"></el-table-column>
        <el-table-column prop="adminNameString" :label="$t('codeInfo.table.adminName')" width="200"></el-table-column>
        <el-table-column prop="remark" :label="$t('codeInfo.table.remark')"></el-table-column>
      </el-table>
    </div>

  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    api.getActivityCodeLogList(this, this.query);
  },
  data() {
    return {
      loading: false,
      activityLogs: [],
      code: JSON.parse(sessionStorage.getItem('code')) || {},  
      query: {
        batchNo: this.$route.query.batchNo,
        activityType: 5,
      }
    }
  },
  computed: {
    computedCodeLogs() {
      return this.activityLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('codeInfo.js.type1') : item.type === 2 ? this.$t('codeInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          adminNameString: item.adminName ? (item.adminName + (item.adminRealName ? (' | ' + item.adminRealName) : '')) : ''
        }
      })
    }
  },
  methods: {
    
  }
}

</script>