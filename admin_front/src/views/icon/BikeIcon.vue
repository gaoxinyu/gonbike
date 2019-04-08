<template>
  <div class="bike-icon-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('bikeicon.query.title') }}
        <el-button class="pull-right" type="primary" @click="goAdd">{{ $t('bikeicon.query.add') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('code.query.createdAt')">
                <el-date-picker
                  v-model="createdAt"
                  type="daterange"
                  :placeholder="$t('code.query.chooseTime')"
                  @change="handleCreatedAt"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bikeicon.query.beginTime')">
                <el-date-picker
                  v-model="beginTime"
                  type="date"
                  :placeholder="$t('bikeicon.query.chooseTime')"
                  :picker-options="pickerStartOption"
                  @change="handleBeginTime"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bikeicon.query.endTime')">
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  :placeholder="$t('bikeicon.query.chooseTime')"
                  :picker-options="pickerEndOption"
                  @change="handleEndTime"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bikeicon.query.countryId')">
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
              <el-form-item :label="$t('bikeicon.query.cityId')">
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
              <el-form-item :label="$t('bikeicon.query.status')">
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
              <el-button class="pull-right" type="primary" :loading="loading" @click="handleQuery">{{ $t('bikeicon.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>

      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBikeIconList" border style="width: 100%">
            <el-table-column prop="id" :label="$t('bikeicon.table.id')" width="60"></el-table-column>
            <el-table-column prop="iconName" :label="$t('bikeicon.table.name')" width="120"></el-table-column>
            <el-table-column prop="confTypeString" :label="$t('bikeicon.table.confType')" width="100"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('bikeicon.table.createdAt')" width="140"></el-table-column>
            <el-table-column prop="startTimeString" :label="$t('bikeicon.table.startTime')" width="150"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('bikeicon.table.endTime')" width="140"></el-table-column>
            <el-table-column prop="statusString" :label="$t('bikeicon.table.status')"></el-table-column>
            <el-table-column prop="countryName" :label="$t('bikeicon.table.countryId')"></el-table-column>
            <el-table-column prop="cityName" :label="$t('bikeicon.table.cityId')"></el-table-column>
            <el-table-column prop="currentBikeCount" :label="$t('bikeicon.table.confBikeCount')" width="100"></el-table-column>
            <el-table-column prop="iconUrl" :label="$t('bikeicon.table.iconstyle')" width="120">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="handlePic(scope.row.iconUrl)">
                  <img class="icon-img" :src="scope.row.iconUrl">
                </a>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="remark" :label="$t('bikeicon.table.remark')"></el-table-column> -->
            <el-table-column fixed="right" :label="$t('bikeicon.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('bikeicon.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="editBikeIcon(scope.$index, scope.row)">{{ $t('bikeicon.table.edit') }}</el-button>
                  <br>
                  <el-button type="text" size="small" @click="viewBikeIcon(scope.$index, scope.row)">{{ $t('bikeicon.table.view') }}</el-button>
                  <br>
                  <!-- <el-button type="text" size="small" @click="deleteBikeIcon(scope.$index, scope.row)">{{ $t('bikeicon.table.delete') }}</el-button> -->
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
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <el-dialog :title="$t('message.dialog.title2')" width="30%" :visible.sync="bigPicVisible">
        <div class="box box-solid">
          <div class="box-body no-padding">
            <img :src="showPic" alt="" style="width:100%;">
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import moment from 'moment'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      loading: false,
      createdAt: null,
      beginTime: null,
      endTime: null,
      bikeiconlist: [],
      query: {
        countryId: null,
        cityId: null,
        createdAtBegin: null,
        createdAtEnd: null,
        startTime: null,
        endTime: null,
        status: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      statusOptions: [
        { label: this.$t('bikeicon.js.all'), value: null },
        { label: this.$t('bikeicon.js.status0'), value: 0 },
        { label: this.$t('bikeicon.js.status1'), value: 1 },
        { label: this.$t('bikeicon.js.status2'), value: 2 },
        // { label: this.$t('bikeicon.js.status3'), value: 3 }
      ],
      bigPicVisible: false,
      showPic: '',
      pickerStartOption: {
        disabledDate(time) {

        }
      },
      pickerEndOption: {
        disabledDate(time) {

        }
      }
    }
  },
  computed: {
    computedBikeIconList() {
      return this.bikeiconlist.map((item) => {
        return {
          ...item,
          confTypeString: item.confType ? this.$t('bikeinfo.table.confType' + item.confType) : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : '',
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
          statusString: item.iconStatus != null ? this.getNameById(this.statusOptions, item.iconStatus) : '',
        }
      })
    }
  },
  methods: {
    goAdd() {
      this.$router.push({ name: 'addbikeicon' });
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getBikeIconList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getBikeIconList(this, this.query);
      }
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.createdAtBegin = datas[0].getTime();
        this.query.createdAtEnd = datas[1].getTime();
      } else {
        this.query.createdAtBegin = null;
        this.query.createdAtEnd = null;
      }
    },
    handleBeginTime(date) {
      let that = this;
      this.query.startTime = moment(this.beginTime).toDate().getTime() || null;
      if(this.beginTime) {
        this.pickerEndOption = {
          disabledDate(time) {
            return time.getTime() < moment(that.beginTime).toDate().getTime();
          }
        }
      }
    },
    handleEndTime(date) {
      let that = this;
      this.query.endTime = moment(this.endTime).toDate().getTime() || null;
      if(this.endTime) {
        this.pickerStartOption = {
          disabledDate(time) {
            return time.getTime() > moment(that.endTime).toDate().getTime();
          }
        }
      }
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
        this.cityOptions.unshift({ label: this.$t('bikeicon.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    handlePic(url) {
      this.showPic = url;
      this.bigPicVisible = true;
    },
    editBikeIcon(index, row) {
      this.$router.push({ name: 'editbikeicon', query: { id: row.id } });
    },
    viewBikeIcon(index, row) {
      sessionStorage.viewBikeIcon = JSON.stringify(row);
      this.$router.push({ name: 'infobikeicon', query: { id: row.id } });
    },
    deleteBikeIcon(index, row) {
      this.$confirm(this.$t('bikeicon.js.deleteMessage', {name: row.iconName}), this.$t('bikeicon.js.tip'), {
        confirmButtonText: this.$t('bikeicon.js.ok'),
        cancelButtonText: this.$t('bikeicon.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteBikeIcon(this, {id: row.id}).then(() => {
          api.getBikeIconList(this, this.query);
        });
      }).catch(() => {
           
      });
    }
  }
}
</script>

<style>
.icon-img {
  width: 100%;
}
</style>
