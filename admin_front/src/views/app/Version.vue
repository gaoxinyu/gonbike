<template>
<div class="version">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('version.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd"><i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('version.query.version')">
              <el-input v-model="query.version"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('version.query.force')">
              <el-select v-model="query.force">
                <el-option
                  v-for="item in upgOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('version.query.name')">
              <el-select v-model="query.name">
                <el-option
                  v-for="item in appOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('version.query.status')">
              <el-select v-model="query.open">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('version.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedVersions" border style="width: 100%">
        <el-table-column prop="id" :label="$t('version.table.id')" width="60"></el-table-column>
        <el-table-column prop="version" :label="$t('version.table.version')" width="80"></el-table-column>
        <el-table-column prop="force" :label="$t('version.table.force')" width="100"></el-table-column>
        <el-table-column prop="openString" :label="$t('version.table.status')" width="80"></el-table-column>
        <el-table-column prop="name" :label="$t('version.table.name')" width="80"></el-table-column>

        <el-table-column prop="appVersionLanguages" :label="$t('version.table.language')" width="240">
          <template slot-scope="scope">
            <a v-for="(lang, index) in scope.row.appVersionLanguages"
              :key="index"
              @click="scope.row.languageIndex = index"
              style="padding-right: 10px; display: inline-block;"
              :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}"
              href="javascript:void(0);"
              >{{ $t('common.languages.' + lang.language ) }}</a>
          </template>
        </el-table-column>

        <el-table-column prop="title" :label="$t('version.table.title')" width="90">
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.appVersionLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.title }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="describe" :label="$t('version.table.describe')" width="160">
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.appVersionLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.describe }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" :label="$t('version.table.address')"
        width="130">
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.appVersionLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.address }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" :label="$t('version.table.remark')" width="200"></el-table-column>
        <el-table-column prop="createdAt" :label="$t('version.table.createdAt')" width="130"></el-table-column>
        <el-table-column prop="updatedAt" :label="$t('version.table.updatedAt')" width="130"></el-table-column>
        <el-table-column fixed="right" :label="$t('version.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('version.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="editVersion(scope.$index, scope.row)">{{ $t('version.table.edit') }}</el-button>
              </br>
              <el-button type="text" size="small" @click="viewVersion(scope.$index, scope.row)">{{ $t('version.table.view') }}</el-button>
              </br>
              <el-button type="text" size="small" @click="deleteVersion(scope.$index, scope.row)">{{ $t('version.table.delete') }}</el-button>
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
import api from "../../api"
// import * as Options from '../../services/options/index.js';
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query, Mixins.common, Mixins.language],
  mounted() {
    api.getAppVersionList(this, this.query);
  },
  data () {
    return {
      loading: true,
      versionList: [],
      popoverVisible: true,
      query: {
        pageNum: 1,
        force: null,
        name: null,
        open: null
      },
      page: {
        count: 0
      },
      appOptions: [
        {label: this.$t('version.js.app1'), value: "android"},
        {label: this.$t('version.js.app2'), value: "ios"},
        {label: this.$t('version.js.all'), value: null}
      ],
      upgOptions: [
        {label: this.$t('version.js.upg1'), value: true},
        {label: this.$t('version.js.upg0'), value: false},
        {label: this.$t('version.js.all'), value: null}
      ],
      statusOptions: [
        { label: this.$t('version.js.all'), value: null},
        { label: this.$t('version.js.status0'), value: false},
        { label: this.$t('version.js.status1'), value: true},
      ],
      defaultIndex: 'en',
      activeIndex: '',
      langOptions: this.getLangOnlyOptions()
    }
  },
  computed: {
    computedVersions() {
      return this.versionList.map((version) => {
        return {
          ...version,
          languageIndex: 0,
          force: version.force ? this.$t('version.js.upg1') : this.$t('version.js.upg0'),
          openString: version.open == true ? this.statusOptions[2].label : this.statusOptions[1].label,
          createdAt: version.createdAt ? moment(version.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updatedAt: version.updatedAt ? moment(version.updatedAt).format("YYYY-MM-DD HH:mm:ss") : ""
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({name: "addversion"});
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getAppVersionList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getAppVersionList(this, this.query);
      }
    },
    editVersion(index, row) {
      sessionStorage.version = JSON.stringify(this.versionList[index]);
      this.$router.push({name: "editversion"});
    },
    viewVersion(index, row) {
      sessionStorage.viewVersion = JSON.stringify(this.versionList[index]);
      this.$router.push({name: "versioninfo"});
    },
    deleteVersion(index, row) {
      const params = {
        id: row.id,
        name: row.name,
      };
      this.$confirm(this.$t('version.js.message'), this.$t('version.js.tip'), {
        confirmButtonText: this.$t('version.js.ok'),
        cancelButtonText: this.$t('version.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteAppVersion(this, params).then(() => {
          this.handleQuery();
        });
      }).catch(() => {

      });
    }
  },
  components: {
  }
}
</script>
