<template>
  <div class="view-fence">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('fence.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goAdd"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('report.query.countryId')">
                <el-select v-model="query.countryId" @change="getCitysByCountry">
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
              <el-form-item :label="$t('report.query.cityId')">
                <el-select v-model="query.cityId">
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
              <el-form-item :label="$t('fence.query.type')">
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
            
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('fence.query.visiable')">
                <el-select v-model="query.visiable">
                  <el-option
                    v-for="item in visiableOptions"
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
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedfences" border style="width: 100%">
          <el-table-column prop="id" :label="$t('fence.table.id')" width="60"></el-table-column>
          <el-table-column prop="countryName" :label="$t('tag.table.countryName')"></el-table-column>
          <el-table-column prop="cityName" :label="$t('tag.table.cityName')"></el-table-column>
          <el-table-column prop="typeString" :label="$t('fence.table.type')"></el-table-column>
          <el-table-column prop="useableString" :label="$t('fence.table.useable')"></el-table-column>
          <el-table-column prop="num" :label="$t('fence.table.num')" width="160">
            <template slot-scope="scope">
              <el-button @click="handleClickNum(scope.$index, scope.row)" type="primary" size="small">{{scope.row.num}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="radius" :label="$t('fence.table.radius') + '(m)'"></el-table-column>
          <el-table-column prop="visiableString" :label="$t('fence.table.visiable')"></el-table-column>
          <el-table-column prop="contentTypeString" :label="$t('fence.table.contentType')"></el-table-column>
          <el-table-column prop="activityName" :label="$t('fence.table.promotionActivityId')"></el-table-column>
          <el-table-column fixed="right" :label="$t('common.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
                <div><el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('fence.table.edit') }}</el-button></div>
                <div><el-button type="text" size="small" @click="batchAdd(scope.$index, scope.row)">{{ $t('fence.table.batchAdd') }}</el-button></div>
                <div v-if="scope.row.useable"><el-button type="text" size="small" @click="disabled(scope.$index, scope.row)" >{{ $t('fence.table.disabled') }}</el-button></div>
                <div v-if="!scope.row.useable"><el-button type="text" size="small" @click="enabled(scope.$index, scope.row)" >{{ $t('fence.table.enabled') }}</el-button></div>
                <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('fence.table.detail') }}</el-button></div>
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

    <el-dialog :title="$t('fence.query.title1')" width="30%" :visible.sync="configFenceVisible">
      <el-form label-position="left" label-width="100px" class="required">
        <el-form-item :label="$t('radius.table.countryName')">
          <el-select v-model="form.countryId" @change="getCitysOnlyByCountry" v-if="!isEdit">
            <el-option
              v-for="item in areaOnlyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="form.countryName" disabled v-if="isEdit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('radius.table.cityName')" class="required">
          <el-select v-model="form.cityId"  v-if="!isEdit">
            <el-option
              v-for="item in cityOnlyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="form.cityName" disabled v-if="isEdit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fence.query.type')" class="required">
          <el-select v-model="form.type" :disabled="isEdit">
            <el-option
              v-for="item in typeOnlyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('fence.table.radius')" class="required">
          <el-input v-model.number="form.radius" type="number" min="0" max="1000" :placeholder="$t('fence.table.radiusPlaceholder')">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('fence.query.useable')" class="required">
          <el-radio-group v-model="form.useable">
            <el-radio :label="true">{{ this.$t('fence.js.useable1') }}</el-radio>
            <el-radio :label="false">{{ this.$t('fence.js.useable0') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('fence.query.visiable')" class="required">
          <el-radio-group v-model="form.visiable">
            <el-radio :label="true">{{ this.$t('common.yes') }}</el-radio>
            <el-radio :label="false">{{ this.$t('common.no') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item :label="$t('fence.query.contentType')" class="required">
          <el-select v-model="form.contentType" @change="handleContentNameChange()" :disabled="!form.cityId">
            <el-option
              v-for="item in contentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('fence.query.contentName')" class="required">
          <el-select v-model="form.promotionActivityId" @change="handleSelectCoupon" :disabled="coupons.length == 0 || this.loading" :placeholder="coupons.length == 0 ? $t('fence.query.contentNamePlaceHolder0') : $t('fence.query.contentNamePlaceHolder1')">
            <el-option
              v-for="item in coupons"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configFenceVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="save" :disabled="submitDisabled" :loading="loading">{{ $t('common.ok') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('fence.query.title1')" width="30%" :visible.sync="batchAddFenceVisible">
      <el-form label-position="left" label-width="100px" class="required">
        <el-form-item :label="$t('radius.table.countryName')">
          <el-input v-model="selectedRow.countryName" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('radius.table.cityName')" class="required">
          <el-input v-model="selectedRow.cityName" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('fence.query.type')" class="required">
          <el-input v-model="selectedRow.typeString" disabled></el-input>
        </el-form-item>

        <el-form-item :label="$t('fence.dialog.upload')" class="required">
          <el-upload
            class="obike-upload"
            ref="uploads"
            action="/api/v1/upload/file"
            :accept="accepts"
            :headers="headers"
            :on-success="uploadSuccess"
            :on-remove="uploadRemove"
            :on-error="uploadError">
            <el-button size="small" type="primary" v-show="!batchForm.filePath">{{ $t('addActivity.form.upload') }}</el-button>
          </el-upload>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="batchAddFenceVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="saveBatchAdd" :disabled="!this.batchForm.filePath" :loading="loading">{{ $t('common.ok') }}</el-button>
      </div>
    </el-dialog>

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
// import ElObikeUpload from 'element-upload'

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      configFenceVisible: false,
      batchAddFenceVisible: false,
      fenceLogVisible: false,
      isEdit: false,
      fences: [],
      fenceLogs: [],
      selectedRow: {},
      query: {
        pageNum: 1,
        countryId: null,
        cityId: null,
        type: null,
        useable: null,
        visiable: null,
      },
      form: {
        countryId: null,
        cityId: null,
        type: null,
        useable: null,
        visiable: null,
        radius: null,
        contentType: null,
        promotionActivityId: null,
        activityName: null
      },
      batchForm: {
        countryId: null,
        cityId: null,
        type: null,
        filePath: null,
      },
      page: {
        count: 0
      },
      cityOptions: [
        {label: this.$t('common.all'), value: null}
      ],
      areaOptions: this.getAreaOptions(),
      areaOnlyOptions: this.getAreaOnlyOptions(),
      cityOnlyOptions: [],
      typeOptions: [
        {label: this.$t('common.all'), value: null},
        ...'1234'.split('').map(type => { return {label: this.$t('fence.js.type' + type), value: +type} }),
      ],
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
      typeOnlyOptions: '1234'.split('').map(type => { return {label: this.$t('fence.js.type' + type), value: +type} }),
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      accepts: '.xls, .xlsx',
      contentOptions: [
        { label: this.$t('fence.js.contentType0'), value: null },
        { label: this.$t('fence.js.contentType1'), value: 1 },
        { label: this.$t('fence.js.contentType5'), value: 5 }
        // { label: this.$t('fence.js.contentType2'), value: 2 },
        // { label: this.$t('fence.js.contentType3'), value: 3 }
        // { label: this.$t('fence.js.contentType4'), value: 4 },
      ],
      coupons: [],
    }
  },
  watch: {
    'form.countryId': function(){
      if(!this.isEdit){
        this.form.contentType = null;
        this.form.promotionActivityId = null;
        this.coupons = [];
      }
    },
    'form.cityId': function(){
      if(!this.isEdit){
        this.form.contentType = null;
        this.form.promotionActivityId = null;
        this.coupons = [];
      }
    }
  },
  computed: {
    computedfences() {
      return this.fences.map((item) => {
        return {
          ...item,
          typeString: item.type ? this.$t('fence.js.type' + item.type) : item.type,
          useableString: item.useable ? this.$t('fence.js.useable1') : this.$t('fence.js.useable0'),
          visiableString: item.visiable ? this.$t('common.yes') : this.$t('common.no'),
          contentTypeString: item.contentType ? this.$t('fence.js.contentType' + item.contentType) : '',
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
      let r =  !(this.form.countryId 
            && this.form.cityId 
            && this.form.type 
            && !!(!this.form.contentType || this.form.promotionActivityId) // 如果奖励不是无，那么必须有奖励内容
            && this.form.useable !== null 
            && this.form.visiable !== null 
            && this.form.radius > 0);
      return r;
    }
  },
  methods: {
    goAdd() {
      this.isEdit = false;
      this.clear();
      this.configFenceVisible = true;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getFenceList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getFenceList(this, this.query)
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('common.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
      })
    },
    getCitysOnlyByCountry() {
      api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOnlyOptions = [];
        this.citys.forEach(city => {
          this.$set(this.cityOnlyOptions, this.cityOnlyOptions.length, {label: city.name, value: city.id});
        });
        this.form.cityId = null;
      })
    },
    batchAdd (index, row) {
      this.selectedRow = row;
      this.batchForm.countryId = row.countryId;
      this.batchForm.cityId = row.cityId;
      this.batchForm.type = row.type;
      this.batchForm.filePath = null;
      this.$refs.uploads && this.$refs.uploads.clearFiles();

      this.batchAddFenceVisible = true;
    },
    edit (index, row) {
      this.isEdit = true;
      this.form = {...row};
      this.configFenceVisible = true;
      let query;
      if(this.form.contentType === 5){
        query = {
          contentType: this.form.contentType,
          countryId: this.form.countryId,
          cityId: this.form.cityId
        }
      }else{
        query = {
          contentType: this.form.contentType,
        }
      }
      api.getRedbagNopage(this, query).then(() => {
        this.handleSelectCoupon(this.form.promotionActivityId);
      });
    },
    disabled (index, row) {
      this.isEdit = true;
      this.form = {...row};
      this.form.useable = false;
      this.save();
    },
    enabled (index, row) {
      this.isEdit = true;
      this.form = {...row};
      this.form.useable = true;
      this.save();
    },
    detail (index, row) {
      // table:1 围栏详情日志  2 围栏配置日志
      api.getFenceLogList(this, {id: row.id, table: 2}).then(() => {
        this.fenceLogVisible = true;
      })  
    },
    save() {
      const apiString = this.isEdit ? 'updateFence' : 'saveFence';
      api[apiString](this, this.form).then(() => {
        this.configFenceVisible = false;
        this.clear();
        this.handleQuery();
      })
    },
    clear() {
      this.form = {
        countryId: null,
        cityId: null,
        type: null,
        useable: null,
        visiable: null,
        radius: null,
        contentType: null,
        promotionActivityId: null
      }
    },
    handleClickNum(index, row) {
      sessionStorage.fence = JSON.stringify(row);
      window.open(location.href.split(location.pathname)[0] + '/operate/fence/info');
    },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.batchForm.filePath = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'success' });
      }
      
    },
    uploadError(err, response, file) {
      
    },
    uploadRemove(file, fileList) {
      this.batchForm.filePath = null;
    },
    saveBatchAdd() {
      api.saveFenceImport(this, this.batchForm).then(() => {
        this.batchAddFenceVisible = false;
        this.batchForm.filePath = null;
        // this.$refs.uploads && this.$refs.uploads.clearFiles();
        this.handleQuery();
      });
    },
    importsCancel(needclick) {
      this.$router.go({
        path: 'fence',
        query: {
          t: + new Date()
        }
      });
    },
    handleContentNameChange() {
      this.form.promotionActivityId = null;
      this.form.activityName = null;
      this.getContentName();
    },
    getContentName() {
      let query = {};
      query = {
        contentType: this.form.contentType,
        countryId: this.form.countryId,
        cityId: this.form.cityId
      }
      api.getRedbagNopage(this, query)
    },
    handleSelectCoupon(couponId) {
      if(!couponId) return
      for(let i = 0; i < this.coupons.length; i++) {
        if(this.coupons[i].id === couponId) {
          this.form.activityName = this.coupons[i].name
          return;
        }
      }
      this.$message({message: this.$t('fence.js.expired'), type: 'warning'});
      this.form.promotionActivityId = null;
    },
  },
  components: {
    // ElObikeUpload
  }
}
</script>

<style>
.obike-upload {
  display: block !important;
  text-align: left !important;
}
.el-upload__files {
  margin: 0;
  padding: 0;
  list-style: none;
}
.el-upload__file {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  font-size: 14px;
  color: #48576a;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  position: relative;
}
.el-upload__file.el-upload__file {
  margin-top: 10px;
}
.el-upload__file__name {
  color: #48576a;
  margin-right: 40px;
  overflow: hidden;
  padding-left: 4px;
  text-overflow: ellipsis;
  transition: color .3s;
  white-space: nowrap;
}
.el-upload__btn-delete {
  text-align: right;
}
</style>