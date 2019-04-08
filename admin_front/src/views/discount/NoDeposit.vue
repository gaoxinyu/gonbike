<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('noDeposit.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('activity.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('activity.query.time')">
              <el-date-picker
                v-model="query.time"
                type="date"
                :placeholder="$t('activity.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('activity.query.countryId')">
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
            <el-form-item :label="$t('activity.query.status')">
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
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('activity.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedNoDeposits" border style="width: 100%">
        <el-table-column prop="id" :label="$t('activity.table.id')" width="80"></el-table-column>
        <el-table-column prop="updateAtString" :label="$t('activity.table.updateAt')"></el-table-column>
        <el-table-column prop="activityTypeString" :label="$t('activity.table.activityType')"></el-table-column>
        <el-table-column prop="statusString" :label="$t('activity.table.status')"></el-table-column>
        <el-table-column prop="countryName" :label="$t('activity.table.area')"></el-table-column>
        <el-table-column prop="startTimeString" :label="$t('activity.table.startTime')"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('activity.table.endTime')"></el-table-column>
        <el-table-column fixed="right" :label="$t('activity.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('activity.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('activity.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('appsms.table.detail') }}</el-button></div>
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

  <el-dialog :title="$t('noDeposit.dialog.title')" :visible.sync="addDialogVisible" width="30%">
    <el-form label-position="left" label-width="90px">
      <el-form-item :label="$t('noDeposit.dialog.countryId')" class="required">
        <el-select v-model="form.countryId" :disabled="isEdit">
          <el-option
            v-for="item in areaOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
        <el-date-picker
          v-model="dateTimeRange.startDateTime"
          type="datetime"
          :picker-options="pickerStartOption"
          :disabled="disabledStart"
          :clearable="false"
          :editable="false"
          @change="handleStartDateChange"
          :placeholder="$t('addMessage.form.startPlaceholder')">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('addMessage.form.endDateTime')" class="required">
        <el-date-picker
          v-model="dateTimeRange.endDateTime"
          type="datetime"
          :picker-options="pickerEndOption"
          @change="handleEndDateChange"
          :clearable="false"
          :editable="false"
          :placeholder="$t('addMessage.form.endPlaceholder')">
        </el-date-picker>
      </el-form-item>

        
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="submit" :disabled="disabled">{{ $t('common.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('appsms.dialog.title')" :visible.sync="logVisible" width="50%">
    <el-table v-loading="loading" :data="computedActivityLogs" border style="width: 100%">
      <el-table-column prop="createdAtString" :label="$t('freeInfo.table.createdAt')" width="130"></el-table-column>
      <el-table-column prop="typeString" :label="$t('freeInfo.table.type')" width="120"></el-table-column>
      <el-table-column prop="adminName" :label="$t('freeInfo.table.adminName')" width="120"></el-table-column>
      <el-table-column prop="remark" :label="$t('freeInfo.table.remark')"></el-table-column>
    </el-table>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.pickerStartOption],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      addDialogVisible: false,
      logVisible: false,
      isEdit: false,
      activitys: [],
      activityLogs: [],
      query: {
        pageNum: 1,
        time: null,
        countryId: null,
        activityType: 9,  // 免押金骑行
        status: 1,
      },
      form: {
        activityType: 9,  // 免押金骑行
        countryId: null,
        startTime: null,
        endTime: null,
      },
      page: {
        count: 0
      },
      statusOptions: [
        {label: this.$t('activity.js.all'), value: null},
        {label: this.$t('activity.js.status0'), value: 0},
        {label: this.$t('activity.js.status1'), value: 1},
        {label: this.$t('activity.js.status2'), value: 2},
      ],
      areaOptions: this.getAreaOptions(),
      areaOnlyOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    computedNoDeposits() {
      return this.activitys.map((item) => {
        return {
          ...item,
          activityTypeString: this.$t('noDeposit.js.activityType9'),
          updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: item.status === 0 ? this.$t('activity.js.status0') : item.status === 1 ? this.$t('activity.js.status1') : item.status === 2 ? this.$t('activity.js.status2') : '',
        }
      })
    },
    disabled() {
      return !(this.form.countryId && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
    },
    computedActivityLogs() {
      return this.activityLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('freeInfo.js.type1') : item.type === 2 ? this.$t('freeInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.isEdit = false;
      this.clear();
      this.addDialogVisible = true;
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
    edit(index, row) {
      this.isEdit = true;
      this.form.id = row.id;
      this.form.countryId = row.countryId;
      this.dateTimeRange.startDateTime = row.startTime ? moment(row.startTime).toDate() : null;
      this.dateTimeRange.endDateTime = row.endTime ? moment(row.endTime).toDate() : null;
      this.addDialogVisible = true;
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId});
    },
    submit() {
      this.form.startTime = moment(this.dateTimeRange.startDateTime).toDate().getTime();
      this.form.endTime = moment(this.dateTimeRange.endDateTime).toDate().getTime();

      let apiStr = this.isEdit ? 'updateActivity' : 'saveActivity';
      api[apiStr](this, this.form).then(() => {
        this.handleQuery();
        this.addDialogVisible = false;
      });

    },
    clear() {
      this.form = {
        activityType: 9,  // 免押金骑行
        countryId: null,
        startTime: null,
        endTime: null,
      };
      this.dateTimeRange.startDateTime = null;
      this.dateTimeRange.endDateTime = null;
    },
    detail(index, row) {
      this.logVisible = true;
      api.getActivityLogList(this, {
        activityId: row.id,
        activityType: 1,
      })
    }
  },
}
</script>
