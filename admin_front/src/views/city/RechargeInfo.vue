<template>
<div>
  <h4>{{ $t('rechargeInfo.table.title') }}</h4>
  <div class="box box-info">
    <div class="box-header">
      {{ $t('rechargeInfo.table.title1') }}
    </div>
    <div class="box-body no-padding">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>{{ $t('rechargeInfo.table.country') }}</th>
            <th>{{ $t('rechargeInfo.table.code') }}</th>
            <th>{{ $t('rechargeInfo.table.open') }}</th>
            <th>{{ $t('rechargeInfo.table.deposit') }}</th>
            <th>{{ $t('rechargeInfo.table.studentDeposit') }}</th>
            <th>{{ $t('rechargeInfo.table.bonus') }}</th>
            <th>{{ $t('rechargeInfo.table.topUpStandard') }}</th>
          </tr>
          <tr>
            <td>{{country.name || "--"}}</td>
            <td>{{country.code || "--"}}</td>
            <td>{{country.openString || "--"}}</td>
            <td>{{country.depositString || "--"}}</td>
            <td>{{country.studentDepositString || "--"}}</td>
            <td>{{country.bonusString || "--"}}</td>
            <td>{{country.topUpStandardString || "--"}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('rechargeInfo.table.title2') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCountryLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('rechargeInfo.table.createdAt')" width="120"></el-table-column>
        <el-table-column prop="name" :label="$t('rechargeInfo.table.name')" width="120"></el-table-column>
        <el-table-column prop="changeDes" :label="$t('rechargeInfo.table.changeDes')"></el-table-column>
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
    api.getCountryLogList(this, this.query);
  },
  data() {
    return {
      loading: false,
      countryLogs: [],
      country: JSON.parse(sessionStorage.getItem('country')), 
      query: {
        countryId: this.$route.params.id,
      }
    }
  },
  computed: {
    computedCountryLogs() {
      return this.countryLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('rechargeInfo.js.type1') : item.type === 2 ? this.$t('rechargeInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    
  }
}

</script>