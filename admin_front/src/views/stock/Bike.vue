<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('bike.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd"><i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.countryId')">
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
            <el-form-item :label="$t('bike.query.cityId')">
              <el-select v-model="query.cityId" @change="getLaunchTags">
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
            <el-form-item :label="$t('bike.query.tagId')">
              <el-select v-model="query.tagId">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.bikeId')">
              <el-input v-model="query.bikeId"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.status')">
              <el-select v-model="query.status">
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
            <el-form-item :label="$t('bike.query.optStatus')">
              <el-select v-model="query.operationStatus">
                <el-option
                  v-for="item in optStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.createdTime')">
              <el-date-picker
                v-model="createdTime"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleCreatedTime"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.activedTime')">
              <el-date-picker
                v-model="activedTime"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleActivedTime"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.lockNo')">
              <el-input v-model="query.lockNo"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.manufacture')">
              <el-select v-model="query.manufacture">
                <el-option
                  v-for="item in manufactureOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.query.helmet')">
              <el-select v-model="query.helmet">
                <el-option
                  v-for="item in helmetOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('bike.table.useTime')">
              <el-date-picker
                v-model="useTime"
                type="daterange"
                :placeholder="$t('bike.query.chooseTime')"
                @change="handleUseTime"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('bike.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <!--<div>{{ $t('bike.table.tip') }}</div>-->
      <el-table v-loading="loading" :data="computedBikes" border style="width: 100%">
        <el-table-column prop="id" :label="$t('bike.table.id')" width="100"></el-table-column>
        <el-table-column prop="lockNo" :label="$t('bike.table.lockNo')" width="100"></el-table-column>
        <el-table-column prop="manufactureString" :label="$t('lock.table.manufacture')" width="90"></el-table-column>
        <el-table-column prop="statusString" :label="$t('bike.table.status')" width="100"></el-table-column>
        <el-table-column :label="$t('bike.table.optStatus')" width="90">
          <template slot-scope="scope">
            <a v-if="scope.row.operationStatus === 2" :href="'/customer/report?bikeId=' + scope.row.id" target="_blank">{{scope.row.optStatusString}}</a>
            <span v-else>{{scope.row.optStatusString}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="areaString" :label="$t('bike.table.area')" width="160"></el-table-column>
        <el-table-column prop="tagName" :label="$t('bike.table.tagName')" width="160"></el-table-column>
        <el-table-column prop="useTimeString" :label="$t('bike.table.useTime')" width="140"></el-table-column>
        <el-table-column prop="createdName" :label="$t('bike.table.createdName')" width="100"></el-table-column>
        <el-table-column prop="activedName" :label="$t('bike.table.jihuo')" width="100"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('bike.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="activitedTimeString" :label="$t('bike.table.activitedTime')" width="140"></el-table-column>
        <el-table-column prop="helmetString" :label="$t('bike.table.helmet')" width="60"></el-table-column>
        <el-table-column fixed="right" :label="$t('bike.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('bike.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="editHelmet(scope.$index, scope.row)">{{ $t('bike.table.editHelmet') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goTrip(scope.$index, scope.row)">{{ $t('bike.table.goTrip') }}</el-button></div>
              <div><el-button type="text" size="small" @click="reset(scope.$index, scope.row)">{{ $t('bike.table.reset') }}</el-button></div>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('bike.table.detail') }}</el-button></div>
              <div v-if="scope.row.status != 5 && scope.row.status != 0"><el-button type="text" size="small" @click="showForbiddenBike(scope.$index, scope.row)">{{ $t('bike.table.forbidden') }}</el-button></div>
              <div v-if="scope.row.status == 5"><el-button type="text" size="small" @click="unForbiddenBike(scope.$index, scope.row)">{{ $t('bike.table.unForbidden') }}</el-button></div>
              <div v-if="scope.row.status == 0"><el-button type="text" size="small" @click="activateBike(scope.$index, scope.row)">{{ $t('bike.table.activateBike') }}</el-button></div>
              <div v-if="!!scope.row.lockNo"><el-button type="text" size="small" @click="unbindBike(scope.$index, scope.row)">{{ $t('bike.table.unbindBike') }}</el-button></div>
              <div><el-button type="text" size="small" @click="showEditCountry(scope.$index, scope.row)">{{ $t('bike.table.showEditCountry') }}</el-button></div>
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

  <el-dialog :title="$t('bike.table.title')" :visible.sync="detailVisible">
    <div class="row">
      <div class="col-md-4">{{ $t('bike.table.id') }}：{{selectRow.id || "--"}}</div>
      <div class="col-md-4">{{ $t('bike.table.status') }}：{{selectRow.statusString || "--"}}</div>
      <div class="col-md-4">{{ $t('bike.table.lockNo') }}：{{selectRow.lockNo || "--"}}</div>
    </div>
    <div class="row">
      <div class="col-md-4">{{ $t('bike.table.createdName') }}：{{selectRow.createdName || "--"}}</div>
      <div class="col-md-4">{{ $t('bike.table.createdAt') }}：{{selectRow.createdAtString || "--"}}</div>
    </div>
  </el-dialog>

  <el-dialog :title="$t('bike.table.title1', {bikeId: this.selectRow.id})" width="30%" :visible.sync="forbiddenVisible">
    <el-form label-position="left" label-width="50px">
      <div class="row">
        <div class="col-md-12">
          <el-form-item :label="$t('bike.table.desc')">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="forbiddenReason"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="forbiddenVisible = false">{{ $t('bike.table.cancel') }}</el-button>
      <el-button type="primary" @click="forbiddenBike">{{ $t('bike.table.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('bike.dialog.title2')" width="30%" :visible.sync="editCountryVisible">
    <el-form label-position="left" label-width="80px">
      <el-form-item :label="$t('bike.dialog.bikeId')">
        {{ selectRow.id }}
      </el-form-item>
      <el-form-item :label="$t('bike.dialog.countryId')">
        <el-select v-model="form.countryId" @change="getCitysByFormCountry">
          <el-option
            v-for="item in areaFormOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('bike.dialog.cityId')">
        <el-select v-model="form.cityId" @change="getFormLaunchTags">
          <el-option
            v-for="item in cityFormOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('bike.dialog.tagId')">
        <el-select v-model="form.tagId">
          <el-option
            v-for="item in tagFormOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editCountryVisible = false">{{ $t('bike.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="eidtBikeCountry" :disabled="submitDisabled">{{ $t('bike.dialog.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('bike.dialog.title3')" width="30%" :visible.sync="editHelmetVisible">
    <el-form label-position="left" label-width="80px">
      <el-form-item :label="$t('bike.dialog.countryId')">
        <el-input v-model="helmetRow.countryName" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('bike.dialog.cityId')">
        <el-input v-model="helmetRow.cityName" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('bike.dialog.helmet')">
        <el-select v-model="helmetRow.helmet">
          <el-option
            v-for="item in helmetRowOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editHelmetVisible = false">{{ $t('bike.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="editHelmetSubmit">{{ $t('bike.dialog.ok') }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    // api.getBikeList(this, this.query)
    // this.getLaunchTags();
    if(this.query.tagId) {
      this.$set(this.tagOptions, this.tagOptions.length, {label: this.$route.query.tagName, value: this.query.tagId});
      api.getBikeList(this, this.query)
    }
  },
  data () {
    return {
      loading: false,
      detailVisible: false,
      forbiddenVisible: false,
      editCountryVisible: false,
      editHelmetVisible: false,
      selectRow: {},
      helmetRow: {},
      bikes: [],
      tags: [],
      activedTime: null,
      createdTime: null,
      useTime: null,
      forbiddenReason: this.$t('bike.js.forbiddenReason'),
      query: {
        countryId: null,
        cityId: null,
        status: null,         // 单车状态
        operationStatus: null,// 运营状态
        bikeId: null,
        lockNo: null,
        helmet: null,
        pageNum: 1,
        beginActivedTime: null,
        endActivedTime: null,
        beginCreatedTime: null,
        endCreatedTime: null,
        beginUseTime: null,
        endUseTime: null,
        tagId: this.$route.query.tagId ? +this.$route.query.tagId : null,
      },
      form: {
        countryId: null,
        cityId: null,
        tagId: null,
        id: null,
      },
      page: {
        count: 0
      },
      statusOptions: [
        {label: this.$t('bike.js.all'), value: null},
        {label: this.$t('bike.js.status0'), value: 0},
        {label: this.$t('bike.js.status1'), value: 1},
        {label: this.$t('bike.js.status2'), value: 2},
        {label: this.$t('bike.js.status3'), value: 3},
        {label: this.$t('bike.js.status4'), value: 4},
        {label: this.$t('bike.js.status5'), value: 5},
      ],
      helmetOptions: [
        {label: this.$t('bike.js.all'), value: null},
        {label: this.$t('bike.js.helmet0'), value: 0},
        {label: this.$t('bike.js.helmet1'), value: 1},
      ],
      optStatusOptions: [
        {label: this.$t('monitor.js.all'), value: null},
        {label: this.$t('monitor.js.optStatus1'), value: 1},
        {label: this.$t('monitor.js.optStatus2'), value: 2},
        {label: this.$t('monitor.js.optStatus3'), value: 3},
        {label: this.$t('monitor.js.optStatus4'), value: 4},
      ],
      manufactureOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('lock.js.manufacture1'), value: 1},
        {label: this.$t('lock.js.manufacture2'), value: 2},
      ],
      cityOptions: [
        {label: this.$t('bike.js.all'), value: null},
      ],
      tagOptions: [
        {label: this.$t('bike.js.all'), value: null},
      ],
      areaOptions: this.getAreaOptions(),
      areaFormOptions: this.getAreaOnlyOptions(),
      cityFormOptions: [],
      tagFormOptions: [],
      helmetRowOptions: []
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedBikes() {
      return this.bikes.map((item) => {
        return {
            ...item,
            manufactureString: item.manufacture ? this.$t('lock.js.manufacture' + item.manufacture) : '',
            statusString: item.status === "0" ? this.$t('bike.js.status0') : item.status === "1" ? this.$t('bike.js.status1') : item.status === "2" ? this.$t('bike.js.status2')
                        : item.status === "3" ? this.$t('bike.js.status3') : item.status === "4" ? this.$t('bike.js.status4') : item.status === "5" ? this.$t('bike.js.status5') : '',
            typeString: this.$t('bike.js.type' + item.type),
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
            useTimeString: item.useTime ? moment(item.useTime).format("YYYY-MM-DD HH:mm:ss") : '',
            activitedTimeString: item.activitedTime ? moment(item.activitedTime).format("YYYY-MM-DD HH:mm:ss") : '',
            helmetString: item.helmet === 1 ? this.$t('bike.js.helmet1') : (item.helmet === 0 ? this.$t('bike.js.helmet0') : ''),
            areaString: item.countryName ? item.countryName + (item.cityName ? ' - ' + item.cityName : '') : '',
            optStatusString: item.operationStatus == 1 ? this.$t('bike.js.optStatus1')
                           : item.operationStatus == 2 ? this.$t('bike.js.optStatus2')
                           : item.operationStatus == 3 ? this.$t('bike.js.optStatus3')
                           : item.operationStatus == 4 ? this.$t('bike.js.optStatus4')
                           : item.operationStatus == 0 ? this.$t('bike.js.optStatus0') : "" ,
          }
      })
    },
    submitDisabled() {
      return !(this.form.countryId && this.form.cityId);
    }
  },
  methods: {
    goAdd() {
      this.$router.push({name: "addbike"});
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getBikeList(this, this.query);
      }
    },
    getCountryInfo() {
      this.getCitysByCountry();
    },
    getCitysByCountry() {
      api.getCitysByCountry(this, {countryId: this.query.countryId}).then(citys => {
        this.cityOptions = [];
        this.$set(this.cityOptions, 0, {label: this.$t('bike.js.all'), value: null});
        this.citys.forEach(city => {
          this.$set(this.cityOptions, this.cityOptions.length, {label: city.name, value: city.id});
        });
        this.query.cityId = null;
        this.getLaunchTags();
      })
    },
    getCitysByFormCountry(value) {
      api.getCitysByCountry(this, {countryId: this.form.countryId}).then(citys => {
        this.cityFormOptions = [];
        this.citys.forEach(city => {
          this.$set(this.cityFormOptions, this.cityFormOptions.length, {label: city.name, value: city.id});
        });
        if(value && this.cityFormOptions.length > 0) {
          this.form.cityId = this.cityFormOptions[0].value;
        } else if(value){
          this.form.cityId = null;
        }
        this.getFormLaunchTags();
      })
    },
    getLaunchTags() {
      api.getLaunchTags(this, {countryId: this.query.countryId, cityId: this.query.cityId}).then(tags => {
        this.tagOptions = [{label: this.$t('bike.js.all'), value: null}];
        this.query.tagId = null;
        tags.forEach(tag => {
          this.$set(this.tagOptions, this.tagOptions.length, {label: tag.name, value: tag.id});
        });
      })
    },
    getFormLaunchTags(value) {
      api.getLaunchTags(this, {countryId: this.form.countryId, cityId: this.form.cityId}).then(tags => {
        this.tagFormOptions = [{label: this.$t('bike.js.none'), value: null}];
        tags.forEach(tag => {
          this.$set(this.tagFormOptions, this.tagFormOptions.length, {label: tag.name, value: tag.id});
        });
        if(value && this.form.tagId !== value && this.tagFormOptions.length > 0) {
          this.form.tagId = this.tagFormOptions[0].value;
        } else if(value){
          this.form.tagId = null;
        }
      })
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getBikeList(this, this.query)
    },
    detail(index, row) {
      this.detailVisible = true;
      this.selectRow = row;
    },
    editHelmet(index, row) {
      this.helmetRowOptions = this.helmetOptions.filter(helmet => helmet.value != null);
      this.helmetRow = row;
      this.editHelmetVisible = true;
    },
    goTrip(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/operate/trip?bikeId=" + row.id);
    },
    handleCreatedTime(datas) {
      if(datas) {
        this.query.beginCreatedTime = datas[0];
        this.query.endCreatedTime = datas[1];
      } else {
        this.query.beginCreatedTime = '';
        this.query.endCreatedTime = '';
      }
    },
    handleActivedTime(datas) {
      if(datas) {
        this.query.beginActivedTime = datas[0];
        this.query.endActivedTime = datas[1];
      } else {
        this.query.beginActivedTime = '';
        this.query.endActivedTime = '';
      }
    },
    handleUseTime(datas) {
      if(datas) {
        this.query.beginUseTime = datas[0];
        this.query.endUseTime = datas[1];
      } else {
        this.query.beginUseTime = '';
        this.query.endUseTime = '';
      }
    },
    showForbiddenBike(index, row) {
      this.selectRow = row;
      this.forbiddenVisible = true;
    },
    forbiddenBike() {
      api.updateBikeForbidden(this, {bikeId: this.selectRow.id, descr: this.forbiddenReason}).then(() => {
        this.handleQuery();
        this.forbiddenVisible = false;
      });
    },
    unForbiddenBike(index, row) {
      this.$confirm(this.$t('bike.js.message', {bikeId: row.id}), this.$t('bike.js.tip'), {
        confirmButtonText: this.$t('bike.js.ok'),
        cancelButtonText: this.$t('bike.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateBikeUnForbidden(this, {bikeId: row.id}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {

      });
    },
    reset(index, row) {
      this.$confirm(this.$t('monitor.js.resetTitle', {bikeId: row.id}), this.$t('monitor.js.tip'), {
        confirmButtonText: this.$t('monitor.js.ok'),
        cancelButtonText: this.$t('monitor.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.resetBike(this, {bikeId: row.id}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {

      });
    },
    activateBike(index, row) {
      this.$confirm(this.$t('bike.js.activateTitle', {bikeId: row.id}), this.$t('bike.js.tip'), {
        confirmButtonText: this.$t('bike.js.ok'),
        cancelButtonText: this.$t('bike.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.activateBike(this, {bikeId: row.id}).then((data) => {
          if(data.success) {
            this.$message({ message: this.$t('bike.js.activateSuccess'), type: 'success' });
          }
          this.handleQuery();
        });
      }).catch(() => {

      });
    },
    unbindBike(index, row) {
      this.$confirm(this.$t('bike.js.unbindTitle', {status: row.statusString}), this.$t('bike.js.tip'), {
        confirmButtonText: this.$t('bike.js.ok'),
        cancelButtonText: this.$t('bike.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.unbindBike(this, {bikeId: row.id, lockNo: row.lockNo}).then((data) => {
          if(data.success) {
            this.$message({ message: this.$t('bike.js.unbindSuccess'), type: 'success' });
          }
          this.handleQuery();
        });
      }).catch(() => {

      });
    },
    showEditCountry(index, row) {
      this.selectRow = row;
      this.form.id = row.id;
      this.form.countryId = row.countryId;
      this.form.cityId = row.cityId;
      this.form.tagId = row.tagId;
      this.getCitysByFormCountry();
      this.editCountryVisible = true;
    },
    eidtBikeCountry() {
      api.updateBikeCountry(this, this.form).then(() => {
        this.handleQuery();
      });
      this.editCountryVisible = false;
    },
    editHelmetSubmit() {
      api.updateBikeHelmetInfo(this, {id: this.helmetRow.id, helmet: this.helmetRow.helmet})
        .then(() => this.editHelmetVisible = false);
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
  .no-min-with {
    min-width: initial !important;
  }
</style>
