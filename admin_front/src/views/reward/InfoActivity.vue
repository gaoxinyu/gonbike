<template>
  <div class="info-activity-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ (this.$route.name === 'rweditactivity') ? $t('rweditactivity.form.title') : $t('rweditactivity.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="refresh"><i class="fa fa-refresh"></i></button>
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="100px">
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <!-- 活动名称 -->
              <el-form-item :label="$t('rweditactivity.form.name')" class="required">
                <label>{{ form.name }}</label>
              </el-form-item>
              <!-- 适用国家 -->
              <el-form-item :label="$t('rweditactivity.form.countryId')">
                <label>{{ form.countryName }}</label>
              </el-form-item>
              <!-- 适用城市 -->
              <el-form-item :label="$t('rweditactivity.form.cityId')">
                <label>{{ form.cityName }}</label>
              </el-form-item>
              <!-- 开始时间 -->
              <el-form-item :label="$t('rweditactivity.form.startDateTime')" class="required">
                <label>{{ form.startTime ? moment(form.startTime).format("YYYY-MM-DD HH:mm:ss") : null }}</label>
              </el-form-item>
              <!-- 结束时间 -->
              <el-form-item :label="$t('rweditactivity.form.endDateTime')" class="required">
                <label>{{ form.endTime ? moment(form.endTime).format("YYYY-MM-DD HH:mm:ss") : null }}</label>
              </el-form-item>
            </div>
          </div>
          <!-- 奖励内容 -->
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th width="10%">{{$t('rweditactivity.form.priority')}}</th>
                    <th>{{$t('rweditactivity.form.priorityDetail')}}</th>
                  </tr>
                  <tr v-for="(priorityArray, key) in rewards" :key="key">
                    <th>{{key}}</th>
                    <td>
                      <div class="content-items">
                        <div class="item" 
                          v-for="(item, index) in priorityArray" 
                          :key="index">
                          <h2 v-if="index !== priorityArray.length -  1">+</h2>
                          <h3>{{ item.rewardName || $t('rweditactivity.form.noName') }}</h3>
                          <p>{{ item.limited ? `${item.rewardNumRemained}/${item.rewardNum}`:$t('rweditactivity.form.noLimit') }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 领取规则 -->
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('rweditactivity.form.limited')" class="required">
                <label>{{ form.limitType == 0 ? $t('rwactivity.js.limited0') : (form.limitType == 1 ? $t('rwactivity.js.limited1', { day: form.unitTime || 0, times: form.frequency || 0 }) : (form.limitType == 2 ? $t('rwactivity.js.limited2', {times: form.limitedTimes || 0}) : '')) }}</label>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('cardInfo.table.title2') }}
      </div>
      <div class="box-body">
        <el-table v-loading="loading" :data="computedCodeLogs" border style="width: 100%">
          <el-table-column prop="createdAtString" :label="$t('cardInfo.table.createdAt')" width="130"></el-table-column>
          <el-table-column prop="typeString" :label="$t('cardInfo.table.type')" width="120"></el-table-column>
          <el-table-column prop="adminName" :label="$t('cardInfo.table.adminName')" width="120"></el-table-column>
          <el-table-column prop="remark" :label="$t('cardInfo.table.remark')"></el-table-column>
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
</template>
<script>
import api from '../../api';
import Iphone from '../../components/Iphone';
import Mixins from '../../mixins/index.js'
import { getStorage } from '../../services/auth';
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.common],
  mounted() {
    api.getRwLog(this, this.query);
    this.rewards = this.form.rewardActivitySubList.reduce((r,item) => {
        r[item.priority] = r[item.priority] || []
        r[item.priority].push(item)
        return r
      }, {});
  },
  data() {
    return {
      loading: false,
      rwlogs: [],
      form: JSON.parse(sessionStorage.viewRwActivity),
      query: {
        rewardId: this.$route.query.id,
        operand: 2
      },
      page: {
        count: 0
      },
      rewards: {},
      rwactivity: []
    }
  },
  computed: {
    computedCodeLogs() {
      return this.rwlogs.map((item) => {
        return {
          ...item,
          typeString: item.operationType === 1 ? this.$t('cardInfo.js.type1') : item.operationType === 2 ? this.$t('cardInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    moment: moment,
    refresh() {
      api.getRwActivity(this, {id: this.query.rewardId});
      this.rewards = this.rwactivity[0].rewardActivitySubList.reduce((r,item) => {
        r[item.priority] = r[item.priority] || []
        r[item.priority].push(item)
        return r
      }, {});
    },
    goBack() {
      this.$router.push({ name: 'rwactivity' });
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwLog(this, this.query);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.add-activity-view {
  .el-upload {
    width: 100%;
  }
}
.content-items {
  .item {
    position: relative;
    display: inline-block;
    margin-right: 30px;
    text-align: center;
    height: 70px;
    width: 200px;
    z-index: 1;
    h2 {
      position: absolute;
      right: -25px;
    }
    h3 {
      font-size: 13px;
      margin: 0;
      padding: 10px;
      background-color: #3d8cbc;
      color: #fff;
      border-radius: 5px 5px 1px 1px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    p {
      font-size: 13px;
      line-height: 35px;
      background-color: #fff;
      color: #858585;
      border: #858585 solid 1px;
      border-radius: 0 0 5px 5px;
      z-index: -1;
      position: absolute;
      top: 28px;
      width: 100%;
    }
    span {
      position: absolute;
      right: 0;
      top: 0;
      background-color: #3d8cbc;
      line-height: 14px;
      border-radius: 6px;
      .el-icon-close {
        font-size: 16px;
        color: white;
        cursor: pointer;
      }
    }
  }
}
.margin-t-10 {
  margin-top: 10px;
}
.table{
  th{
    text-align: center;
    vertical-align: middle;
  }
  td {
    vertical-align: middle;
  }
}
</style>
