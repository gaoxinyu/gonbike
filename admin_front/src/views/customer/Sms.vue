<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('sms.box.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('sms.box.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.beginTime')">
              <el-date-picker
                v-model="query.beginTime"
                type="date"
                :placeholder="$t('sms.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('sms.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.sender')">
              <el-input v-model="query.sender"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.countryId')">
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
            <el-form-item :label="$t('sms.query.provider')">
              <el-select v-model="query.provider">
                <el-option
                  v-for="item in providerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.action')">
              <el-select v-model="query.action">
                <el-option
                  v-for="item in actionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('sms.query.success')">
              <el-select v-model="query.success">
                <el-option
                  v-for="item in successOptions"
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
            <el-form-item :label="$t('sms.query.type')">
               <el-select v-model="query.type">
                 <el-option
                   v-for="item in typeOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            
          </div>
          <div class="col-md-3 col-xs-12">
            
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery()" :loading="loading">{{ $t('sms.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedSmsList" border style="width: 100%">
        <el-table-column prop="id" :label="$t('sms.table.id')" width="70"></el-table-column>
        <el-table-column prop="phone" :label="$t('sms.table.phone')" min-width="150"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('sms.table.createdAt')" min-width="130"></el-table-column>
        <el-table-column prop="sender" :label="$t('sms.table.sender')" min-width="80"></el-table-column>
        <el-table-column prop="context" :label="$t('sms.table.context')" min-width="240"></el-table-column>
        <el-table-column prop="provider" :label="$t('sms.table.provider')" min-width="120"></el-table-column>
        <el-table-column prop="action" :label="$t('sms.query.action')" min-width="120"></el-table-column>
        <el-table-column prop="type" :label="$t('sms.table.type')" min-width="120"></el-table-column>
        <el-table-column prop="ip" :label="$t('sms.table.ip')" min-width="120"></el-table-column>
        <el-table-column prop="successString" :label="$t('sms.table.success')" min-width="90"></el-table-column>
        <el-table-column prop="resultInfoString" :label="$t('sms.table.resultInfo')" min-width="180"></el-table-column>
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
  created() {
    const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
    this.beginTime = startDate;
    this.endTime = endDate;
    this.query.beginTime = startDateStr;
    this.query.endTime = endDateStr;
  },
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      smsList: [],
      phone: null,
      query: {
        pageNum: 1,
        beginTime: null,
        endTime: null,
        phone: null,
        sender: null,
        countryId: null,
        provider: null,
        action: null,
        success: null,
        type: null
      },
      page: {
        count: 0
      },
      providerOptions: [
        {label: this.$t("sms.js.all"), value: null},
        {label: 'blueAward', value: 'blueAward'},
        {label: 'ChuangLan', value: 'ChuangLan'},
        {label: 'chuangLanGuoji', value: 'chuangLanGuoji'},
        {label: 'ite2', value: 'ite2'},
        {label: 'silverstreet', value: 'silverstreet'},
        {label: 'twilio', value: 'twilio'},
        {label: 'operationtwilio', value: 'operationtwilio'},
        {label: 'ym', value: 'ym'},
      ],
      actionOptions: [
        {label: this.$t("sms.js.all"), value: null},
        {label: '注册', value: '注册'},
        {label: '订单超时通知', value: '订单超时通知'},
        {label: '通知学生身份认证审核', value: '通知学生身份认证审核'},
        {label: '重置密码', value: '重置密码'},
        {label: 'Binding facebook', value: 'Binding facebook'},
      ],
      successOptions: [
        {label: this.$t("sms.js.all"), value: null},
        {label: '发送成功', value: 1},
        {label: '发送失败', value: 0},
      ],
      typeOptions: [
         { label: this.$t("sms.js.all"), value: null },
         { label: this.$t("sms.js.sms"), value: 1 },
         { label: this.$t("sms.js.voice"), value: 2 }
	
       ],
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedSmsList() {
      return this.smsList.map((item) => {
        return {
            ...item,
            successString: item.success === null ? this.$t("sms.js.inprocess") : item.success ? this.$t("sms.js.success") : this.$t("sms.js.fail"),
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
            type: item.type === 1 ?  this.$t("sms.js.sms") : this.$t("sms.js.voice"),
            resultInfoString: !item.success ? item.resultInfo : '',
          }
      })
    }
  },
  methods: {
    goAdd() {
      // this.$router.push({name: "addsms"});
      // window.open(location.href + "/add");
      window.open(location.href.split(location.pathname)[0] + "/customer/sms/add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        this.handleQuery(val);
      }
    },
    handleQuery(page) {
      this.query.pageNum = page || 1;
      api.getSmsList(this, this.query);
    },
  }
}
</script>