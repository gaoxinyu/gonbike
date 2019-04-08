<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('activity.query.title') }}
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
      <el-table v-loading="loading" :data="computedActivitys" border style="width: 100%">
        <el-table-column prop="id" :label="$t('activity.table.id')" width="60"></el-table-column>
        <el-table-column prop="updateAtString" :label="$t('activity.table.updateAt')" width="130"></el-table-column>
        <el-table-column prop="activityTypeString" :label="$t('activity.table.activityType')" width="100"></el-table-column>
        <el-table-column prop="language" :label="$t('pushMessage.table.languages')">
          <template slot-scope="scope">
            <a v-for="(lang, index) in scope.row.activityLanguages"
              :key="index"
              @click="scope.row.languageIndex = index"
              style="padding-right: 10px; display: inline-block;"
              :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}"
              href="javascript:void(0);"
              >{{ $t('common.languages.' + lang.language ) }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('pushMessage.table.notiTitle')" width="100" >
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.activityLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="$t('pushMessage.table.notiContent')" >
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.activityLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.content }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="title" :label="$t('activity.table.title')"></el-table-column>
        <el-table-column prop="content" :label="$t('activity.table.content')"></el-table-column> -->
        <el-table-column prop="statusString" :label="$t('activity.table.status')" width="80"></el-table-column>
        <el-table-column prop="startTimeString" :label="$t('activity.table.startTime')" width="140"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('activity.table.endTime')" width="140"></el-table-column>
        <el-table-column prop="countryName" :label="$t('activity.table.area')" width="80"></el-table-column>
        <el-table-column prop="bannerUrl" :label="$t('activity.table.bannerUrl')">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="handlePic(scope.row.bannerUrl)">
              <img :src="scope.row.bannerUrl" alt="" style="width:100px;">
            </a>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('activity.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('activity.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('activity.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('activity.table.detail') }}</el-button>
              <br>
              <!--<el-button type="text" size="small" @click="goUser(scope.$index, scope.row)">{{ $t('activity.table.goUser') }}</el-button>-->
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

  <el-dialog :title="$t('activity.table.bannerUrl')" :visible.sync="bigPicVisible">
    <div class="box box-solid">
      <div class="box-body no-padding">
        <img :src="showPic" alt="" style="width:100%;">
      </div>
    </div>
  </el-dialog>
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
      bigPicVisible: false,
      showPic: '',
      query: {
        pageNum: 1,
        time: null,
        countryId: null,
        activityType: 1,
        status: 1,
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
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedActivitys() {
      return this.activitys.map((item) => {
        return {
            ...item,
            languageIndex: 0,
            activityTypeString: this.$t('activity.js.activityType'),
            updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
            startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
            statusString: item.status === 0 ? this.$t('activity.js.status0') : item.status === 1 ? this.$t('activity.js.status1') : item.status === 2 ? this.$t('activity.js.status2') : '',
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
        api.getActivityList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getActivityList(this, this.query);
    },
    handlePic(url) {
      this.showPic = url;
      this.bigPicVisible = true;
    },
    edit(index, row) {
      sessionStorage.activity = JSON.stringify(row);
      this.$router.push({name: "editactivity"});
    },
    detail(index, row) {
      sessionStorage.activity = JSON.stringify(row);
      window.open(location.href + "/" + row.id);
    },
    goUser(index, row) {

    },
  },
}
</script>
