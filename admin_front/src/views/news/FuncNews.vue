<template>
  <div class="func-news">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('funcnews.query.title') }}
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('funcnews.query.type')">
                <el-select v-model="query.category">
                  <el-option
                    v-for="item in funcTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('funcnews.query.pushtime')">
                <el-select v-model="query.occasion">
                  <el-option
                    v-for="item in pushTimeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('funcnews.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedFuncNews" border style="width: 100%">
            <el-table-column prop="id" :label="$t('funcnews.table.id')" width="60"></el-table-column>
            <el-table-column prop="funcTypeString" :label="$t('funcnews.table.functype')" width="120"></el-table-column>
            <el-table-column prop="pushTimeString" :label="$t('funcnews.table.pushtime')" width="160"></el-table-column>

            <el-table-column prop="languages" :label="$t('funcnews.table.language')" min-width="160">
              <template slot-scope="scope">
                <a v-for="(lang, index) in scope.row.languages"
                  :key="index"
                  @click="scope.row.languageIndex = index"
                  style="padding-right: 10px; display: inline-block;"
                  :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}"
                  href="javascript:void(0);"
                  >{{ getNameById(langOptions, lang.language) }}</a>
              </template>
            </el-table-column>

            <el-table-column prop="title" :label="$t('funcnews.table.title')" min-width="120">
              <template slot-scope="scope">
                <span
                  v-for="(lang, index) in scope.row.languages"
                  :key="index"
                  v-show="scope.row.languageIndex === index"
                  >{{ lang.title }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="content" :label="$t('funcnews.table.content')" min-width="180">
              <template slot-scope="scope">
                <span
                  v-for="(lang, index) in scope.row.languages"
                  :key="index"
                  v-show="scope.row.languageIndex === index"
                  >{{ lang.content }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="viewControllerTypeString" :label="$t('funcnews.table.linkpage')"></el-table-column>
            <el-table-column :label="$t('funcnews.table.newsspec')">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.notiType"
                  :placeholder="$t('funcnews.js.none')"
                  @change="handleNoticeType(scope.row)">
                  <el-option
                    v-for="item in noticeTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('funcnews.table.ispushtime')">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.pushSwitch"
                  @change="handlePushSwitch(scope.$index, scope.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="$t('funcnews.table.issavelocale')">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.saveMesaage"
                  @change="handleSaveMesaage(scope.$index, scope.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column :label="$t('funcnews.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('funcnews.table.operate') }}</el-button>
                  <div><el-button type="text" size="small" @click="viewNewsTmpl(scope.$index, scope.row)">{{ $t('funcnews.table.newstmpl') }}</el-button></div>
                  <div><el-button type="text" size="small" @click="viewPushRec(scope.$index, scope.row)">{{ $t('funcnews.table.pushrec') }}</el-button></div>
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
  </div>
</template>
<script>
import api from '../../api';
import moment from "moment";
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common, Mixins.language],
  mounted() {
    api.getNotifiBizList(this, this.query)
  },
  data() {
    return {
      loading: false,
      notifiBizList: [],
      query: {
        category: null,
        occasion: null
      },
      page: {
        count: 0
      },
      pushTimeOptions: [
        { label: this.$t('funcnews.js.pushtype0'), value: null },
        ...[...Array(59)].map((item,index) => { return { label: this.$t('funcnews.js.pushtype' + (index+1)), value: index+1 }})
      ],
      funcTypes: [
        { label: this.$t('funcnews.js.functype0'), value: null },
        ...[...Array(15)].map((item,index) => { return { label: this.$t('funcnews.js.functype' + (index+1)), value: index+1 }})
      ],
      noticeTypes: [
        { label: this.$t('funcnews.js.noticetype1'), value: 1 },
        { label: this.$t('funcnews.js.noticetype2'), value: 2 },
        { label: this.$t('funcnews.js.noticetype3'), value: 3 },
        { label: this.$t('funcnews.js.noticetype4'), value: 4 }
      ],
      viewPages: [
        { label: this.$t('funcnews.js.viewpage1'), value: 'myInfo' },
        { label: this.$t('funcnews.js.viewpage2'), value: 'editStudentCertification' },
        { label: this.$t('funcnews.js.viewpage3'), value: 'successfulCertification' },
        { label: this.$t('funcnews.js.viewpage4'), value: 'failedCertification' },
        { label: this.$t('funcnews.js.viewpage5'), value: 'rechargeMember' },
        { label: this.$t('funcnews.js.viewpage6'), value: 'memberInfo' },
        { label: this.$t('funcnews.js.viewpage7'), value: 'myWallet' },
        { label: this.$t('funcnews.js.viewpage8'), value: 'couponList' },
        { label: this.$t('funcnews.js.viewpage9'), value: 'creditPoints' },
        { label: this.$t('funcnews.js.viewpage10'), value: 'invitationReward' },
        { label: this.$t('funcnews.js.viewpage11'), value: 'negativeRecord' },
        { label: this.$t('funcnews.js.viewpage12'), value: 'transactionDetails' },
        { label: this.$t('funcnews.js.viewpage13'), value: 'gainCredibility' },
        { label: this.$t('funcnews.js.viewpage14'), value: 'myTrip' }
      ],
      langOptions: this.getLangByNumOptions()
    }
  },
  computed: {
    computedFuncNews() {
      return this.notifiBizList.map((item) => {
        return {
          ...item,
          languageIndex: 0,
          funcTypeString: item.category ? this.getNameById(this.funcTypes, item.category) : '',
          pushTimeString: item.occasion ? this.getNameById(this.pushTimeOptions, item.occasion) : '',
          saveMesaage: !item.saveMesaage,
          viewControllerTypeString: item.viewControllerType ? this.getNameById(this.viewPages, item.viewControllerType) : ''
        }
      })
    }
  },
  methods: {
    handleQuery() {
      this.query.pageNum = 1;
      api.getNotifiBizList(this, this.query)
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getNotifiBizList(this, this.query)
    },
    viewNewsTmpl(index, row) {
      sessionStorage.newsTmpl = JSON.stringify(row);
      this.$router.push({name: 'functmpl'});
    },
    viewPushRec(index, row) {
      this.$router.push({name: 'funcpush', query: {category: row.category, occasion: row.occasion}});
    },
    handleSaveMesaage(index, row) {
      api.updateNotifiBizTmpl(this, {id: row.id, saveMesaage: !row.saveMesaage});
    },
    handlePushSwitch(index, row) {
      api.updateNotifiBizTmpl(this, {id: row.id, pushSwitch: row.pushSwitch});
    },
    handleViewPage(row) {
      api.updateNotifiBizTmpl(this, {id: row.id, viewControllerType: row.viewControllerType});
    },
    handleNoticeType(row) {
      api.updateNotifiBizTmpl(this, {id: row.id, notiType: row.notiType});
    }
  }
}
</script>
