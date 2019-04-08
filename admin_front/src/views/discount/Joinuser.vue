<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      参与用户
      <!--<div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">添加</button>
      </div>-->
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item label="开始日期">
              <el-date-picker
                v-model="startTime"
                type="date"
                placeholder="选择日期"
                @change="handleStartTime"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item label="结束日期">
              <el-date-picker
                v-model="endTime"
                type="date"
                placeholder="选择日期"
                @change="handleEndTime"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item label="国家">
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
            <el-form-item label="用户手机号">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item label="活动ID">
              <el-input v-model="query.activityId"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">查询</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedActivitys" border style="width: 100%">
        <el-table-column prop="id" label="活动ID" width="60"></el-table-column>
        <el-table-column prop="" label="活动类型"></el-table-column>
        <el-table-column prop="" label="活动内容"></el-table-column>
        <el-table-column prop="" label="用户手机号"></el-table-column>
        <el-table-column prop="createdAt" label="参与时间" width="130"></el-table-column>
        <el-table-column prop="" label="用户充值金额"></el-table-column>
        <el-table-column prop="" label="赠送金额"></el-table-column>

        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">操作</el-button>
              <el-button type="text" size="small" @click="activDetail(scope.$index, scope.row)">活动详情</el-button>
              <br>
              <el-button type="text" size="small" @click="tradeDetail(scope.$index, scope.row)">交易详情</el-button>
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

export default {
  mixins: [Mixins.country],
  mounted() {
    
  },
  data () {
    return {
      loading: true,
      activitys: [],
      startTime: null,
      endTime: null,
      query: {
        pageNum: 1,
        startTime: null,
        endTime: null,
        countryId: null,
        phone: null,
        activityId: null,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedActivitys() {
      return this.activitys.map((item) => {
        return {
            ...item,
            
          }
      })
    }
  },
  methods: {
    goAdd() {

    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      
    },
    handleStartTime(time) {
      this.query.startTime = time;
    },
    handleEndTime(time) {
      this.query.endTime = time;
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