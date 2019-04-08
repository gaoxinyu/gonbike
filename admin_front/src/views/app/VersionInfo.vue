<template>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('versioninfo.table.title0') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goVersion"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="box">
        <div class="box-header with-border">
          {{ $t('versioninfo.table.basic') }}
        </div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedVersionInfo" border style="width: 100%">
            <el-table-column prop="id" :label="$t('versioninfo.table.id')"></el-table-column>
            <el-table-column prop="openString" :label="$t('versioninfo.table.isOpen')"></el-table-column>
            <el-table-column prop="force" :label="$t('versioninfo.table.force')"></el-table-column>
            <el-table-column prop="title" :label="$t('versioninfo.table.title')"></el-table-column>
            <el-table-column prop="describe" :label="$t('versioninfo.table.describe')"></el-table-column>
            <el-table-column prop="address" :label="$t('versioninfo.table.address')"></el-table-column>
            <el-table-column prop="name" :label="$t('versioninfo.table.name')"></el-table-column>
            <el-table-column prop="version" :label="$t('versioninfo.table.version')"></el-table-column>
            <el-table-column prop="remark" :label="$t('versioninfo.table.remark')"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box">
        <div class="box-header with-border">
          {{ $t('versioninfo.table.langsetting') }}
        </div>
        <div class="box-body">
          <el-tabs type="card">
            <el-tab-pane
              v-for="(item, index) in appVersionLanguages"
              :key="item.name"
              :label="item.tabName"
              :name="item.name"
            >
            <div class="row">
              <div class="col-md-8 col-xs-12">
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width:120px;">
                    {{ $t('addVersion.form.title') }}
                  </label>
                  <div class="el-form-item__content" style="margin-left: 120px !important;">
                    <div class="el-input">
                      <label>{{ item.title }}</label>
                    </div>
                  </div>
                </div>
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width:120px;">
                    {{ $t('addVersion.form.describe') }}
                  </label>
                  <div class="el-form-item__content" style="margin-left: 120px !important;">
                    <div class="el-textarea" max-length="100">
                      <label>{{ item.describe }}</label>
                    </div>
                  </div>
                </div>
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width:120px;">
                    {{ $t('addVersion.form.address') }}
                  </label>
                  <div class="el-form-item__content" style="margin-left: 120px !important;">
                    <div class="el-input">
                      <label>{{ item.address }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <div class="box">
        <div class="box-header with-border">
          {{ $t('versioninfo.table.operator') }}
        </div>
        <div class="box-body">
          <el-table v-loading="loading" :data="computedVersionLogList" border style="width: 100%">
            <el-table-column prop="operateTimeString" :label="$t('versioninfo.table.operateTime')"></el-table-column>
            <el-table-column prop="action" :label="$t('versioninfo.table.activity')"></el-table-column>
            <el-table-column prop="operater" :label="$t('versioninfo.table.operater')"></el-table-column>
            <el-table-column prop="remark" :label="$t('versioninfo.table.operate')"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api';
// import * as Options from '../../services/options/index.js';
import moment from "moment";
import Mixins from '../../mixins/index.js'

export default{
  mixins: [Mixins.common, Mixins.language],
  mounted() {
    const versioninfo = sessionStorage.viewVersion;
    if(this.$route.name === 'versioninfo' && versioninfo) {
      this.current = JSON.parse(versioninfo);
      for(let i = 0, langs = this.current.appVersionLanguages; i < langs.length; i++) {
        this.appVersionLanguages.push({
          title: langs[i].title,
          describe: langs[i].describe,
          address: langs[i].address,
          language: langs[i].language,
          name: i + '',
          tabName: this.getNameById(this.langOptions, langs[i].language)
        })
      }
    }

    api.getAppVersionLogList(this, {appVersionId: this.current.id});
  },
  data() {
    return {
      loading: false,
      current: {},
      versioninfo: [],
      statusOptions: [
        { label: this.$t('versioninfo.js.all'), value: null},
        { label: this.$t('versioninfo.js.status0'), value: false},
        { label: this.$t('versioninfo.js.status1'), value: true},
      ],
      upgOptions: [
        {label: this.$t('versioninfo.js.upg1'), value: true},
        {label: this.$t('versioninfo.js.upg0'), value: false},
        {label: this.$t('versioninfo.js.all'), value: null}
      ],
      tabIndex: 0,
      appVersionLanguages: [],
      langOptions: this.getLangOnlyOptions(),
      versionLogList: []
    }
  },
  computed: {
    computedVersionInfo() {
      this.versioninfo = [this.current];
      return this.versioninfo.map((version) => {
        return {
          ...version,
          force: version.force ? this.$t('version.js.upg1') : this.$t('version.js.upg0'),
          openString: version.open == true ? this.statusOptions[1].label : this.statusOptions[2].label
        }
      });
    },
    computedVersionLogList() {
      return this.versionLogList.map((item) => {
        return {
          ...item,
          operateTimeString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          action: item.dealType === 1 ? "创建" : "编辑",
          operater: item.adminName ? item.adminName : "",
          remark: item.remark ? item.remark : ""
        }
      })
    }
  },
  methods: {
    goVersion() {
      this.$router.push({name: 'version'})
    }
  }
}
</script>
