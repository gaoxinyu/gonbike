<template>
  <div class="view-fence">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ `${$t('fenceInfo.query.title')} - ${fence.countryName} - ${fence.cityName} - ${fence.typeString}` }}
        <div class="pull-right box-tools">
          <el-button class="pull-right" type="primary" size="small" @click="exportExcel">{{ $t('fenceInfo.query.exportExcel') }}</el-button>
          <el-button class="pull-right magin-r-10" type="primary" size="small" @click="goAdd">{{ $t('fenceInfo.query.goAdd') }}</el-button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fenceInfo.query.id')">
                <el-input v-model="query.id"></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fenceInfo.query.name')">
                <el-input v-model="query.name"></el-input>
              </el-form-item>
            </div>


            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fence.query.useable')">
                <el-select v-model="query.useable">
                  <el-option
                    v-for="item in useableOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fenceInfo.query.longitude')" v-if="fence.style === 2">
                <el-input v-model="query.longitude"></el-input>
              </el-form-item>
            </div>
            
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fenceInfo.query.latitude')" v-if="fence.style === 2">
                <el-input v-model="query.latitude"></el-input>
              </el-form-item>
            </div>
            
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fenceInfo.query.hasPile')" v-if="fence.style === 2">
                <el-select v-model="query.hasPile">
                  <el-option
                    v-for="item in hasPileOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fenceInfo.query.pileNo')" v-if="fence.style === 2">
                <el-input v-model="query.pileNo"></el-input>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQueryFenceInfo" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>

        </el-form>
      </div>
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedfenceinfos" border style="width: 100%">
          <el-table-column prop="id" :label="$t('fenceInfo.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('tag.table.countryName')"></el-table-column>
          <el-table-column prop="cityName" :label="$t('tag.table.cityName')"></el-table-column>
          <el-table-column prop="typeString" :label="$t('fence.table.type')"></el-table-column>
          <el-table-column prop="name" :label="$t('fenceInfo.table.name')"></el-table-column>
          <el-table-column prop="useableString" :label="$t('fence.table.useable')"></el-table-column>
          <el-table-column prop="points" :label="$t('fenceInfo.table.points')" width="230">
            <template slot-scope="scope">
              <div v-for="(point, index) in scope.row.points" :key="index">
                {{ `(${point.latitude}, ${point.longitude})` }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="hasPileString" :label="$t('fenceInfo.table.hasPile')" v-if="fence.type === 3"></el-table-column>
          <el-table-column prop="pileNo" :label="$t('fenceInfo.table.pileNo')" v-if="fence.type === 3"></el-table-column>
          <el-table-column prop="subTypeString" :label="$t('fenceInfo.table.subType')" v-if="fence.type === 3"></el-table-column>

          <el-table-column fixed="right" :label="$t('common.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
                <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('fenceInfo.table.edit') }}</el-button></div>
                <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('fenceInfo.table.detail') }}</el-button></div>
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

    <el-dialog :title="$t('fence.query.title2')" :visible.sync="fenceLogVisible">
      <el-table v-loading="loading" :data="computedfenceLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('fence.dialog.createdAt')" width="130px"></el-table-column>
        <el-table-column prop="name" :label="$t('fence.dialog.admin')" width="130px"></el-table-column>
        <el-table-column prop="remark" :label="$t('fence.dialog.remark')"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"
import {getStorage} from '../../services/auth'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    const fence = sessionStorage.fence;
    this.fence = JSON.parse(fence);
    this.query.countryId = this.fence.countryId;
    this.query.cityId = this.fence.cityId;
    this.query.type = this.fence.type;

    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      fenceLogVisible: false,
      fence: {},
      fenceInfos: [],
      fenceLogs: [],
      query: {
        pageNum: 1,
        countryId: null,
        cityId: null,
        type: null,
        useable: null,
        visiable: null,
        id: null,
        name: null,
        longitude: null,
        latitude: null,
        hasPile: null,
        pileNo: null,
      },
      
      page: {
        count: 0
      },
      
      useableOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('fence.js.useable1'), value: true},
        {label: this.$t('fence.js.useable0'), value: false},
      ],
      visiableOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('common.yes'), value: true},
        {label: this.$t('common.no'), value: false},
      ],
      hasPileOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('fenceInfo.js.has'), value: true},
        {label: this.$t('fenceInfo.js.nothas'), value: false},
      ],
    }
  },
  computed: {
    computedfenceinfos() {
      return this.fenceInfos.map((item) => {
        return {
          ...item,
          typeString: item.type ? this.$t('fence.js.type' + item.type) : item.type,
          useableString: item.useable ? this.$t('fence.js.useable1') : this.$t('fence.js.useable0'),
          visiableString: item.visiable ? this.$t('common.yes') : this.$t('common.no'),
          hasPileString: item.hasPile ? this.$t('fenceInfo.js.has') : this.$t('fenceInfo.js.nothas'),
          subTypeString: item.subType ? this.$t('fenceInfo.js.subType' + item.subType) : '',
          // pointsString: item.points.map(point => `(${point.latitude}, ${point.longitude})`).join(', \n\r'),
        }
      })
    },
    computedfenceLogs() {
      return this.fenceLogs.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    },
    submitDisabled() {
      return !(this.form.countryId && this.form.cityId && this.form.type &&
              this.form.useable !== null && this.form.visiable !== null && this.form.radius > 0);     
    }
  },
  methods: {
    goAdd() {
      this.$router.push({name: 'addfence'});
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getFenceInfoList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getFenceInfoList(this, this.query)
    },
    
    edit(index, row) {
      sessionStorage.fenceInfo = JSON.stringify(row);
      this.$router.push({name: 'editfence'});
    },
    detail(index, row) {
      // table:1 围栏详情日志  2 围栏配置日志
      api.getFenceLogList(this, {id: row.id, table: 1}).then(() => {
        this.fenceLogVisible = true;
      })  
    },
    exportExcel() {
      let parms = [];
      for(let key in this.query) {
        if(this.query[key] !== null && this.query[key] !== '' && this.query[key] !== undefined && key !== 'pageNum') {
          parms.push(key + '=' + this.query[key]);
        }
      }

      const token = getStorage('token');
      if(token) {
        parms.push("Authorization=Bearer " + token.accessToken);
      }

      let iframe = document.createElement("iframe");
      iframe.id = 'iframeRequest';
      iframe.style.display = 'none';
      iframe.src = '/api/v1/elec-fence/export/file?' + parms.join('&');
      document.body.appendChild(iframe);
    },
    resetQueryFenceInfo() {
      this.query.useable = null;
      this.query.visiable = null;
      this.query.id = null;
      this.query.name = null;
      this.query.longitude = null;
      this.query.latitude = null;
      this.query.hasPile = null;
      this.query.pileNo = null;
    }
  }
}
</script>

