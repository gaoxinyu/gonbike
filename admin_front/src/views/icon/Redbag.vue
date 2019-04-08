<template>
  <div class="red-bag-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('redbag.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('redbag.query.add') }}</el-button>
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
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <!-- <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redbag.query.beginTime')">
                <el-date-picker
                  v-model="beginTime"
                  type="date"
                  :placeholder="$t('redbag.query.chooseTime')"
                  @change="handleBeginTime"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redbag.query.endTime')">
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  :placeholder="$t('redbag.query.chooseTime')"
                  @change="handleEndTime"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row"> -->
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redbag.query.countryId')">
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
            <!-- <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redbag.query.cityId')">
                <el-select v-model="query.cityId" :disabled="cityOptions.length === 0">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redbag.query.status')">
                <el-select v-model="query.status">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div> -->
            <div class="col-md-3 col-xs-12"></div>

            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('redbag.query.query') }}</el-button>
              <!-- <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button> -->
            </div>
          </div>
        </el-form>
      </div>

      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedRedbagList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('redbag.table.id')" width="60"></el-table-column>
            <el-table-column prop="name" :label="$t('redbag.table.name')" width="180"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('redbag.table.createdAt')" width="180"></el-table-column>
            <!-- <el-table-column prop="startTimeString" :label="$t('redbag.table.startTime')" width="80"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('redbag.table.endTime')" width="150"></el-table-column>
            <el-table-column prop="statusString" :label="$t('redbag.table.status')"></el-table-column> -->
            <el-table-column prop="countryName" :label="$t('redbag.table.countryId')"></el-table-column>
            <!-- <el-table-column prop="cityName" :label="$t('redbag.table.cityId')"></el-table-column> -->
            <el-table-column prop="contentCount" :label="$t('redbag.table.num')"></el-table-column>
            <!-- 2017.11.28 zhu 注释：上线时间没规划 -->
            <!-- <el-table-column prop="gaveNum" :label="$t('redbag.table.gaveNum')"></el-table-column> -->
            <!-- <el-table-column prop="residualContentCount" :label="$t('redbag.table.remainNum')"></el-table-column> -->
            <el-table-column prop="remark" :label="$t('redbag.table.remark')"></el-table-column>
            <el-table-column fixed="right" :label="$t('redbag.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('redbag.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editRedbag(scope.$index, scope.row)">{{ $t('redbag.table.edit') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="viewRedbag(scope.$index, scope.row)">{{ $t('redbag.table.view') }}</el-button>
                  </br>
                  <!-- <el-button type="text" size="small" @click="deleteRedbag(scope.$index, scope.row)">{{ $t('redbag.table.delete') }}</el-button> -->
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
      createdAt: null,
      beginTime: null,
      endTime: null,
      redbaglist: [],
      query: {
        countryId: null,
        // cityId: null,
        createdAtBegin: null,
        createdAtEnd: null,
        // startTime: null,
        // endTime: null,
        // status: null
        contentType: 1
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      statusOptions: [
        { label: this.$t('redbag.js.all'), value: null }
      ]
    }
  },
  computed: {
    computedRedbagList() {
      return this.redbaglist.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: item.status ? this.getNameById(this.statusOptions, item.status) : '',
          gaveNum: item.contentCount - item.residualContentCount
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'addredbag' });
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getRedbagList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRedbagList(this, this.query);
      }
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.createdAtBegin = datas[0].getTime();
        this.query.createdAtEnd = datas[1].getTime();
      } else {
        this.query.createdAtBegin = null;
        this.query.createdAtEnd = null;
      }
    },
    editRedbag(index, row) {
      sessionStorage.editRedbag = JSON.stringify(row);
      this.$router.push({ name: 'editredbag' });
    },
    viewRedbag(index, row) {
      sessionStorage.viewRedbag = JSON.stringify(row);
      this.$router.push({ name: 'inforedbag' });
    },
    deleteRedbag(index, row) {
      this.$confirm(this.$t('redbag.js.deleteMessage', {name: row.name}), this.$t('redbag.js.tip'), {
        confirmButtonText: this.$t('redbag.js.ok'),
        cancelButtonText: this.$t('redbag.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteRedbag(this, {id: row.id}).then(() => {
          api.getRedbagList(this, this.query);
        });
      }).catch(() => {
           
      });
    }
  }
}
</script>