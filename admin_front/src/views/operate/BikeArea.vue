<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('bikearea.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="addBikeArea"><i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="80px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bikearea.query.countryId')">
              <el-select v-model="query.countryId" @change="getCountryInfo">
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
            <el-form-item :label="$t('bikearea.query.cityId')">
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
            <el-form-item :label="$t('bikearea.query.usingFlag')">
              <el-select v-model="query.usingFlag">
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
            <el-form-item :label="$t('bikearea.query.parking')">
              <el-select v-model="query.parking">
                <el-option
                  v-for="item in parkingOptions"
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
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('bikearea.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedBikeArea" border style="width: 100%">
        <el-table-column prop="id" :label="$t('bikearea.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('bikearea.table.country')"></el-table-column>
        <el-table-column prop="cityName" :label="$t('bikearea.table.city')"></el-table-column>
        <el-table-column prop="usingFlagString" :label="$t('bikearea.table.state')"></el-table-column>
        <el-table-column prop="parkingString" :label="$t('bikearea.table.parking')"></el-table-column>
        <el-table-column prop="stationNum" :label="$t('bikearea.table.areaNum')"></el-table-column>
        <el-table-column :label="$t('bikearea.table.file')">
          <template slot-scope="scope">
            <a v-if="scope.row.download" :href="scope.row.lastFile" target="_blank"> {{ $t('bikearea.table.download') }} </a>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('bikearea.table.remark')"></el-table-column>
        <el-table-column fixed="right" :label="$t('bikearea.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('bikearea.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="editBikeArea(scope.$index, scope.row)">{{ $t('bikearea.table.edit') }}</el-button>
              </br>
              <el-button type="text" size="small" @click="viewBikeArea(scope.$index, scope.row)">{{ $t('bikearea.table.view') }}</el-button>
              </br>
              <el-button type="text" size="small" @click="importBikeArea(scope.$index, scope.row)">{{ $t('bikearea.table.import') }}</el-button>
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
  <!-- addBikeArea dialog -->
  <el-dialog :title="$t('bikearea.dialog.title')" :visible.sync="addVisible" :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item :label="$t('bikearea.form.countryId')" class="required">
        <el-select v-model="form.countryId" @change="getCountryInfo1">
          <el-option
            v-for="item in addOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('bikearea.form.cityId')" class="required">
        <el-select v-model="form.cityId" :disabled="cityOptions1.length === 0">
          <el-option
            v-for="item in cityOptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('bikearea.form.usingFlag')">
        <el-select v-model="form.usingFlag">
          <el-option
            v-for="item in statusOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('bikearea.form.importUsing')" v-if="form.usingFlag === 1" class="required">
        <el-upload
          ref="upload"
          action="/api/v1/bikeStation/configurationAndImport"
          :headers="headers"
          :multiple="false"
          :data="form"
          name="file"
          :accept="accepts"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-exceed="uploadExceed"
          :auto-upload="false"
          :limit="1">
          <el-button slot="trigger" type="primary" size="small">{{ $t('bikearea.form.choose') }}</el-button>
          <div class="el-upload__tip" slot="tip">{{ $t('bikearea.js.uploadTip') }}</div>
        </el-upload>
      </el-form-item>

      <el-form-item :label="$t('bikearea.form.usingNotFlag')">
        <el-select v-model="form.usingFlagNoparking">
          <el-option
            v-for="item in statusOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('bikearea.form.importNotUsing')" v-if="form.usingFlagNoparking === 1" class="required">
        <el-upload
          ref="uploadNP"
          action="/api/v1/bikeStation/configurationAndImport"
          :headers="headers"
          :multiple="false"
          :data="formNP"
          name="file"
          :accept="accepts"
          :on-success="uploadNPSuccess"
          :on-error="uploadNPError"
          :on-exceed="uploadExceed"
          :auto-upload="false"
          :limit="1">
          <el-button slot="trigger" type="primary" size="small">{{ $t('bikearea.form.choose') }}</el-button>
          <div class="el-upload__tip" slot="tip">{{ $t('bikearea.js.uploadTip') }}</div>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('bikearea.form.remark')">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :placeholder="$t('bikearea.form.remarkTip')"
          v-model="form.remark">
        </el-input>
        <label class="error" v-if="form.remark.length > 500">{{ $t('bikearea.form.remarkError') }}</label>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('bikearea.form.cancel') }}</el-button>
      <el-button type="primary" @click="addSubmit" :disabled="addSubmitDisabled">{{ $t('bikearea.form.submit') }}</el-button>
    </span>
  </el-dialog>
  <!-- editBikeArea -->
  <el-dialog :title="$t('bikearea.edit.title')" :visible.sync="editVisible">
    <el-form label-position="left" label-width="70px">
      <el-form-item :label="$t('bikearea.edit.countryId')">
        <el-input :disabled="true" :value="edit.countryName"></el-input>
      </el-form-item>

      <el-form-item :label="$t('bikearea.edit.cityId')">
        <el-input :disabled="true" v-model="edit.cityName"></el-input>
      </el-form-item>

      <el-form-item :label="$t('bikearea.edit.usingFlag')" class="required">
        <el-select v-model="edit.usingFlag">
          <el-option
            v-for="item in statusOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('bikearea.edit.remark')">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :placeholder="$t('bikearea.form.remarkTip')"
          v-model="edit.remark">
        </el-input>
        <label class="error" v-if="!editSubmitFlag">{{ $t('bikearea.form.remarkError') }}</label>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editVisible = false">{{ $t('bikearea.form.cancel') }}</el-button>
      <el-button type="primary" @click="editSubmit" :disabled="!editSubmitFlag">{{ $t('bikearea.form.submit') }}</el-button>
    </span>
  </el-dialog>
  <!-- importBikeArea dialog -->
  <el-dialog :title="$t('bikearea.imports.title')" :visible.sync="importsVisible" :before-close="handleClose">
    <el-form label-position="left" label-width="70px">
      <el-form-item :label="$t('bikearea.imports.countryId')">
        <el-input :disabled="true" :value="imports.countryName"></el-input>
      </el-form-item>

      <el-form-item :label="$t('bikearea.imports.cityId')">
        <el-input :disabled="true" v-model="imports.cityName"></el-input>
      </el-form-item>

      <el-form-item :label="$t('bikearea.imports.import')" class="required">
        <el-upload
          ref="uploads"
          action="/api/v1/bikeStation/station"
          :headers="headers"
          :multiple="false"
          :data="imports"
          name="file"
          :accept="accepts"
          :on-success="importsSuccess"
          :on-error="importsError"
          :on-exceed="uploadExceed"
          :auto-upload="false"
          :limit="1">
          <el-button slot="trigger" type="primary" size="small">{{ $t('bikearea.form.choose') }}</el-button>
          <div class="el-upload__tip" slot="tip">{{ $t('bikearea.js.uploadTip') }}</div>
        </el-upload>
      </el-form-item>

      <!-- <el-form-item :label="$t('bikearea.imports.remark')">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="imports.remark">
        </el-input>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">{{ $t('bikearea.imports.cancel') }}</el-button>
      <el-button type="primary" @click="importsSubmit" :loading="importsloading">{{ $t('bikearea.imports.submit') }}</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import {getStorage} from '../../services/auth'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    api.getBikeAreaList(this, this.query)
    this.getCountryInfo();
    this.getCountryInfo1();
  },
  data () {
    return {
      // toolbar
      query: {
        countryId: null,
        cityId: null,
        usingFlag: null,
        parking: null
      },
      cityOptions: [],
      countries: [],
      areaOptions: this.getAreaOptions(),
      addOptions: this.getAreaOnlyOptions(),
      statusOptions: [
        {label: this.$t('bikearea.js.status'), value: null},
        {label: this.$t('bikearea.js.status0'), value: 0},
        {label: this.$t('bikearea.js.status1'), value: 1}
      ],
      statusOnlyOptions: [
        {label: this.$t('bikearea.js.status0'), value: 0},
        {label: this.$t('bikearea.js.status1'), value: 1}
      ],
      loading: true,
      // table
      bikearea: [],
      page: {
        count: 0
      },
      // dialog
      cityOptions1: [],
      addVisible: false,
      editVisible: false,
      importsVisible: false,
      importsloading: false,
      form: {
        countryId: null,
        cityId: null,
        usingFlag: 0,
        usingFlagNoparking: 0,
        remark: '',
        parking: '1'
      },
      edit: {},
      imports: {},
      importsres: {},
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      parkingOptions: [
        {label: this.$t('bikearea.js.all'), value: null},
        {label: this.$t('bikearea.js.parking0'), value: 2},
        {label: this.$t('bikearea.js.parking1'), value: 1}
      ],
      accepts: '.xls, .xlsx',
      message: {},
      needmsg: false, // 是否调用saveBikeArea
    }
  },
  computed: {
    computedBikeArea() {
      return this.bikearea.map((item) => {
        return {
            ...item,
            usingFlagString: this.getNameById(this.statusOptions, item.usingFlag),
            parkingString: item.parking === '1' ? this.$t('bikearea.js.parking1') : item.parking === '2' ? this.$t('bikearea.js.parking0') : '',
            download: item.lastFile ? true : false
          }
      })
    },
    addSubmitDisabled() {
      return !(this.form.countryId && this.form.cityId && this.form.remark.length <= 500);
    },
    formNP() {
      return JSON.parse(JSON.stringify(this.form));
    },
    editSubmitFlag() {
      return !(this.edit.remark && this.edit.remark.length > 500);
    }
  },
  methods: {
    // toolbar
    addBikeArea() {
      this.addVisible = true;
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.query.countryId});
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        // 添加一个所有
        this.cityOptions.unshift({ label: this.$t('bikelogo.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getBikeAreaList(this, this.query);
    },
    // table
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getBikeAreaList(this, this.query)
      }
    },
    editBikeArea(index, row) {
      sessionStorage.editBikeArea = JSON.stringify(this.bikearea[index]);
      this.edit = JSON.parse(sessionStorage.editBikeArea);
      this.editVisible = true;
    },
    viewBikeArea(index, row) {
      sessionStorage.viewBikeArea = JSON.stringify(this.bikearea[index]);
      this.$router.push({name: "bikeareainfo"});
    },
    importBikeArea(index, row) {
      sessionStorage.importsBikeArea = JSON.stringify(this.bikearea[index]);
      let importres = JSON.parse(sessionStorage.importsBikeArea);
      this.imports = {
        id: importres.id,
        countryId: importres.countryId,
        countryName: importres.countryName,
        cityId: importres.cityId,
        cityName: importres.cityName,
        parking: importres.parking
      };
      this.importsVisible = true;
    },
    // dialog
    getCountryInfo1() {
      api.getCountryInfo(this, {id: this.form.countryId});
      this.getCitysByCountry1();
    },
    getCitysByCountry1() {
      api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityOptions1 = this.citys.map(city => {
          return {
            label: city.name,
            value: city.id,
          }
        });
        this.form.cityId = (this.cityOptions1.length > 0) ? this.cityOptions1[0].value : '';
      })
    },
    addSubmit() {
      this.formNP.parking = '2';
      if(this.form.usingFlag !== 1 && this.form.usingFlagNoparking  !== 1) {
        let message = '';
        api.saveBikeArea(this, this.form)
          .then(() => {
            message += this.message.data.message;
          })
          .then(() => {
            api.saveBikeArea(this, this.formNP).then(() => {
              message += '\n' + this.message.data.message;
              alert(message);
              api.getBikeAreaList(this, this.query);
            })
          })
          .then(() => {
            this.addVisible = this.addVisible ? false : this.addVisible;
            this.form = {
              countryId: null,
              cityId: null,
              usingFlag: 0,
              usingFlagNoparking: 0,
              remark: '',
              parking: '1'
            };
          });
      }
      else if(this.form.usingFlag === 1 && this.form.usingFlagNoparking  !== 1) {
        if(this.$refs.upload.$children[0].fileList.length > 0) {
          if(this.$refs.upload.$children[0].fileList.length > 1) {
            this.$message({ message: this.$t('bikearea.js.uploadOnly'), type: 'error' });
            return false;
          }
          else {
            this.needmsg = true;
            api.saveBikeArea(this, this.formNP)
              .then(() => {this.$refs.upload.submit()})
              .then(() => {
              this.addVisible = this.addVisible ? false : this.addVisible;
              this.form = {
                countryId: null,
                cityId: null,
                usingFlag: 0,
                usingFlagNoparking: 0,
                remark: '',
                parking: '1'
              };
            });
          }
        }
        else {
          this.$message({ message: this.$t('bikearea.js.uploadMust'), type: 'error' });
          return false;
        }
      }
      else if(this.form.usingFlag !== 1 && this.form.usingFlagNoparking  === 1) {
        if(this.$refs.uploadNP.$children[0].fileList.length > 0) {
          if(this.$refs.uploadNP.$children[0].fileList.length > 1) {
            this.$message({ message: this.$t('bikearea.js.uploadOnly'), type: 'error' });
            return false;
          }
          else {
            this.needmsg = true;
            api.saveBikeArea(this, this.form)
              .then(() => {this.$refs.uploadNP.submit()})
              .then(() => {
                this.addVisible = this.addVisible ? false : this.addVisible;
                this.form = {
                  countryId: null,
                  cityId: null,
                  usingFlag: 0,
                  usingFlagNoparking: 0,
                  remark: '',
                  parking: '1'
                };
              });
          }
        }
        else {
          this.$message({ message: this.$t('bikearea.js.uploadMust'), type: 'error' });
          return false;
        }
      }
      else {
        if(this.$refs.upload.$children[0].fileList.length > 0 && this.$refs.uploadNP.$children[0].fileList.length > 0) {
          if(this.$refs.uploadNP.$children[0].fileList.length > 1 || this.$refs.upload.$children[0].fileList.length > 1) {
            this.$message({ message: this.$t('bikearea.js.uploadOnly'), type: 'error' });
            return false;
          }
          else {
            this.needmsg = false;
            this.$refs.upload.submit();
            this.$refs.uploadNP.submit();
            this.addVisible = this.addVisible ? false : this.addVisible;
            this.form = {
              countryId: null,
              cityId: null,
              usingFlag: 0,
              usingFlagNoparking: 0,
              remark: '',
              parking: '1'
            };
          }
        }
        else {
          this.$message({ message: this.$t('bikearea.js.uploadMust'), type: 'error' });
          return false;
        }
      }
    },
    uploadSuccess(res) {
      if(res.success) {
        alert(res.data.message + '\n' + (this.needmsg ? this.message.data.message : ''));
      }
      else {
        alert(res.data.error + '\n' + (this.needmsg ? this.message.data.message : ''));
      }
      api.getBikeAreaList(this, this.query);
    },
    uploadNPSuccess(res) {
      if(res.success) {
        alert(res.data.message + '\n' + (this.needmsg ? this.message.data.message : ''));
      }
      else {
        alert(res.data.error + '\n' + (this.needmsg ? this.message.data.message : ''));
      }
      api.getBikeAreaList(this, this.query);
    },
    uploadError(res) {
      alert(this.$t('bikearea.js.failure') + '\n' + (this.needmsg ? this.message.data.message : ''));
      api.getBikeAreaList(this, this.query);
    },
    uploadNPError(res) {
      alert(this.$t('bikearea.js.failure') + '\n' + (this.needmsg ? this.message.data.message : ''));
      api.getBikeAreaList(this, this.query);
    },
    editSubmit() {
      this.editVisible = false;
      api.updateBikeArea(this, this.edit).then(() => api.getBikeAreaList(this, this.query));
    },
    importsSubmit() {
      if(this.$refs.uploads.$children[0].fileList.length > 0) {
        if(this.$refs.uploads.$children[0].fileList.length > 1) {
          this.$message({ message: this.$t('bikearea.js.uploadOnly'), type: 'error' });
          return false;
        }
        else {
          this.importsloading = true;
          this.$refs.uploads.submit();
        }
      }
      else {
        this.$message({ message: this.$t('bikearea.js.uploadMust'), type: 'error' });
        return false;
      }
    },
    importsSuccess(res) {
      this.importsloading = false;
      this.$refs.uploads.clearFiles();
      if(res.success) {
        this.$message({ message: res.data.message, type: 'success' });
      }
      else {
        this.$message({ message: res.data.error, type: 'error' });
      }
      this.importsVisible = false;
      api.getBikeAreaList(this, this.query);
    },
    importsError(res) {
      this.importsloading = false;
      this.$message({ message: this.$t('bikearea.js.failure'), type: 'error' });
      this.$refs.uploads.clearFiles();
      this.importsVisible = false;
      api.getBikeAreaList(this, this.query);
    },
    handleClose() {
      if(this.$refs.upload) {
        this.$refs.upload.clearFiles();
      }
      if(this.$refs.uploadNP) {
        this.$refs.uploadNP.clearFiles();
      }
      if(this.$refs.uploads) {
        this.$refs.uploads.clearFiles();
      }
    
      if(this.addVisible) this.addVisible = false; 
      if(this.importsVisible) this.importsVisible = false;

      this.form = {
        countryId: null,
        cityId: null,
        usingFlag: 0,
        usingFlagNoparking: 0,
        remark: '',
        parking: '1'
      };
    },
    uploadExceed(file, fileList) {
      // file：当前选择的文件，fileList: 已选择的文件列表
      this.$message({ message: this.$t('bikearea.js.uploadOnly'), type: 'warn' });
    }
  }
}
</script>

<style>
  .error {
    font-size: 12px;
    color: #f00;
  }
</style>
