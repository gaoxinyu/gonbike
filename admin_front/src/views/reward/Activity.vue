<template>
  <div class="reward-coupon-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('rwactivity.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('rwactivity.query.add') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwactivity.query.name')">
                <el-input v-model="query.name"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwactivity.query.expireType')">
                <el-select v-model="query.expireType">
                  <el-option
                    v-for="item in expireTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwactivity.query.rewardsSubNum')">
                <el-select v-model="query.rewardsSubNum">
                  <el-option
                    v-for="item in rewardsSubNumsOptions"
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
              <el-form-item :label="$t('rwactivity.query.startDate')">
                <el-date-picker
                  v-model="query.startDate"
                  type="date"
                  :placeholder="$t('rwactivity.query.chooseDate')"
                  value-format="yyyy-MM-dd"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwactivity.query.endDate')">
                <el-date-picker
                  v-model="query.endDate"
                  type="date"
                  :placeholder="$t('rwactivity.query.chooseDate')"
                  value-format="yyyy-MM-dd"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwactivity.query.createdStartDate')">
                <el-date-picker
                  v-model="query.createdStartDate"
                  type="date"
                  :placeholder="$t('rwactivity.query.chooseDate')"
                  value-format="yyyy-MM-dd"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rwactivity.query.createdEndDate')">
                <el-date-picker
                  v-model="query.createdEndDate"
                  type="date"
                  :placeholder="$t('rwactivity.query.chooseDate')"
                  value-format="yyyy-MM-dd"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('rwactivity.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedActivityList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('rwactivity.table.id')" width="60"></el-table-column>
            <el-table-column prop="name" :label="$t('rwactivity.table.name')"></el-table-column>
            <el-table-column prop="expireTypeString" :label="$t('rwactivity.table.expireType')"></el-table-column>
            <el-table-column prop="rewardsSubNumString" :label="$t('rwactivity.table.rewardsSubNum')"></el-table-column>
            <el-table-column prop="rules" :label="$t('rwactivity.table.rules')"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('rwactivity.table.createdAt')"></el-table-column>
            <el-table-column prop="startTimeString" :label="$t('rwactivity.table.startTime')"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('rwactivity.table.endTime')"></el-table-column>
            <el-table-column prop="adminName" :label="$t('rwactivity.table.adminName')"></el-table-column>
            <el-table-column fixed="right" :label="$t('rwactivity.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('rwactivity.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editActivity(scope.$index, scope.row)">{{ $t('rwactivity.table.edit') }}</el-button>
                  <br>
                  <el-button type="text" size="small" @click="viewActivity(scope.$index, scope.row)">{{ $t('rwactivity.table.view') }}</el-button>
                  <br>
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
                @current-change="handleCurrentChange">
              </el-pagination>
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
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: false,
      rwactivity: [],
      query: {
        name: null,
        rewardsSubNum: null,
        expireType: null,
        startDate: null,
        endDate: null,
        createdStartDate: null,
        createdEndDate: null,
      },
      page: {
        count: 0
      },
      rewardsSubNumsOptions: [
        { label: this.$t('rwactivity.js.all'), value: null },
        { label: this.$t('rwactivity.js.rewardsSubNum1'), value: 1 },
        { label: this.$t('rwactivity.js.rewardsSubNum2'), value: 2 }
      ],
      expireTypeOptions: [
        { label: this.$t('rwactivity.js.all'), value: null },
        { label: this.$t('rwactivity.js.expireType1'), value: 1 },
        { label: this.$t('rwactivity.js.expireType2'), value: 2 },
        { label: this.$t('rwactivity.js.expireType3'), value: 3 }
      ]
    }
  },
  computed: {
    computedActivityList() {
      return this.rwactivity.map((item) => {
        return {
          ...item,
          rewardsSubNumString: item.rewardsSubNum == 1 ? this.$t('rwactivity.js.rewardsSubNum1') : (item.rewardsSubNum >= 2 ? this.$t('rwactivity.js.rewardsSubNum2') : ''),
          rules: item.limitType == 0 ? this.$t('rwactivity.js.limited0') : (item.limitType == 1 ? this.$t('rwactivity.js.limited1', { day: item.unitTime || 0, times: item.frequency || 0 }) : (item.limitType == 2 ? this.$t('rwactivity.js.limited2', {times: item.limitedTimes || 0}) : '')),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : '',
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
          expireTypeString: item.expireType ? this.$t('rwactivity.js.expireType' + item.expireType) : ''
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'rwaddactivity' });
    },
    handleQuery() {
      // let query = {...this.query};      
      api.getRwActivity(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwActivity(this, this.query);
      }
    },
    editActivity(index, row) {
      sessionStorage.editRwActivity = JSON.stringify(row);
      this.$router.push({ name: 'rweditactivity', query: { id: row.id } });
    },
    viewActivity(index, row) {
      sessionStorage.viewRwActivity = JSON.stringify(row);
      this.$router.push({ name: 'rwinfoactivity', query: { id: row.id } });
    }
  }
}
</script>
