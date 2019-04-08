<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      其他活动
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('free.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('free.query.time')">
              <el-date-picker
                v-model="time"
                type="date"
                :placeholder="$t('free.query.chooseTime')"
                @change="handleTime"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('free.query.countryId')">
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
            <el-form-item :label="$t('free.query.status')">
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

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('free.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedActivitys" border style="width: 100%">
        <el-table-column prop="id" :label="$t('free.table.id')" width="60"></el-table-column>
        <el-table-column prop="updateAtString" :label="$t('free.table.updateAt')" width="130"></el-table-column>
        <el-table-column prop="activityTypeString" :label="$t('free.table.activityType')"></el-table-column>
        <el-table-column prop="title" :label="$t('free.table.title')"></el-table-column>
        <el-table-column prop="content" :label="$t('free.table.content')"></el-table-column>
        <el-table-column prop="statusString" :label="$t('free.table.status')"></el-table-column>
        <el-table-column prop="areaString" :label="$t('free.table.country')"></el-table-column>
        <el-table-column prop="startTimeString" :label="$t('free.table.startTime')"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('free.table.endTime')"></el-table-column>
        <el-table-column fixed="right" :label="$t('free.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('free.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('free.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('free.table.detail') }}</el-button>
              <br>
              <!--<el-button type="text" size="small" @click="goUser(scope.$index, scope.row)">{{ $t('free.table.goUser') }}</el-button>-->
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
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      activitys: [],
      time: null,
      query: {
        pageNum: 1,
        time: null,
        countryId: null,
        activityType: this.$route.query.activityType || 6 ,
        status: 1,
      },
      page: {
        count: 0
      },
      statusOptions: [
        {label: this.$t('free.js.all'), value: null},
        {label: this.$t('free.js.status0'), value: 0},
        {label: this.$t('free.js.status1'), value: 1},
        {label: this.$t('free.js.status2'), value: 2},
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedActivitys() {
      return this.activitys.map((item) => {
        return {
            ...item,
            activityTypeString: '其他活动',
            updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
            startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
            statusString: item.status === 0 ? this.$t('free.js.status0') : item.status === 1 ? this.$t('free.js.status1') : item.status === 2 ? this.$t('free.js.status2') : '',
            areaString: item.countryName + (item.cityName ? ' - ' + item.cityName : ''),
          }
      })
    }
  },
  methods: {
    goAdd() {
      // window.open(location.href + "add");
      window.open(location.href.split(location.pathname)[0] + "/discount/otheradd");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getActivityList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getActivityList(this, this.query);
    },
    handleTime(time) {
      this.query.time = time;
    },
    edit(index, row) {
      sessionStorage.other = JSON.stringify(row);
      this.$router.push({name: "editother"});
    },
    detail(index, row) {
      sessionStorage.other = JSON.stringify(row);
      window.open(location.href + "/" + row.id);
    },
    goUser(index, row) {

    },
  },
}
</script>

<style lang="scss">
// .user-info-view {
  .no-min-with {
    min-width: initial !important;
  }
// }
</style>