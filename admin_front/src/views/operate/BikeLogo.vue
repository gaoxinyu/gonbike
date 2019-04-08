<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('bikelogo.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goAddBikeLogo"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bikelogo.query.date')">
                <el-date-picker
                  v-model="validDate"
                  type="date"
                  :placeholder="$t('bikelogo.query.chooseTime')"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('bikelogo.query.type')">
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
              <el-form-item :label="$t('bikelogo.query.countryId')">
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
              <el-form-item :label="$t('bikelogo.query.cityId')">
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

          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('bikelogo.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>

      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedBikeLogos" border style="width: 100%">
            <el-table-column prop="id" :label="$t('bikelogo.table.id')" width="80"></el-table-column>
            <el-table-column prop="operateTimeString" :label="$t('bikelogo.table.operateTime')"></el-table-column>
            <el-table-column prop="typeString" :label="$t('bikelogo.table.type')"></el-table-column>
            <el-table-column prop="countryName" :label="$t('bikelogo.table.countryName')"></el-table-column>
            <!-- <el-table-column prop="cityName" :label="$t('bikelogo.table.cityName')"></el-table-column> -->
            <el-table-column prop="startTimeString" :label="$t('bikelogo.table.startTime')"></el-table-column>
            <el-table-column prop="endTimeString" :label="$t('bikelogo.table.endTime')"></el-table-column>
            <el-table-column prop="iconUrl" :label="$t('bikelogo.table.iconUrl')">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="handlePic(scope.row.iconUrl)">
                  <img class="icon-img" :src="scope.row.iconUrl">
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="remark" :label="$t('bikelogo.table.remark')"></el-table-column>
            <el-table-column fixed="right" :label="$t('bikelogo.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('bikelogo.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="viewBikeLogo(scope.$index, scope.row)">{{ $t('bikelogo.table.view') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="updateBikeLogo(scope.$index, scope.row)">{{ $t('bikelogo.table.edit') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="deleteBikeLogo(scope.$index, scope.row)">{{ $t('bikelogo.table.delete') }}</el-button>
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
                >
              </el-pagination>
            </div>
          </div>

        </div>
      </div>

      <el-dialog :title="$t('message.dialog.title2')" :visible.sync="bigPicVisible">
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
import api from '../../api';
// import * as Options from '../../services/options/index.js';
import Mixins from '../../mixins/index.js'
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    api.getBikeLogoList(this, this.query);
    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      bikelogos: [],
      validDate: null,
      query: {
        type: null,
        countryId: null,
        cityId: null,
        validDate: null,
      },
      page: {
        count: 0
      },
      // pickerOptions: Options.pickerOptions,
      typeOptions: [
        { label: this.$t('bikelogo.js.all'), value: null },
        { label: this.$t('bikelogo.js.type_1'), value: -1 },
        { label: this.$t('bikelogo.js.type0'), value: 0 },
        { label: this.$t('bikelogo.js.type1'), value: 1 },
        { label: this.$t('bikelogo.js.type2'), value: 2 }
      ],
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      bigPicVisible: false,
      showPic: ''
    }
  },
  computed: {
    computedBikeLogos() {
      return this.bikelogos.map((item) => {
        return {
          ...item,
          operateTimeString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
          typeString: item.type === -1 ? this.typeOptions[1].label : item.type === 0 ? this.typeOptions[2].label : item.type === 1 ? this.typeOptions[3].label : item.type === 2 ? this.typeOptions[4].label : '',
          startTimeString: item.startDate ? moment(item.startDate).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endDate ? moment(item.endDate).format("YYYY-MM-DD HH:mm:ss") : ""
        }
      });
    }
  },
  methods: {
    goAddBikeLogo() {
      this.$router.push({name: 'addbikelogo'});
    },
    handleQuery() {
      this.query.pageNum = 1;
      this.query.validDate = this.validDate ? this.validDate.getTime() : null;
      api.getBikeLogoList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getBikeLogoList(this, this.query);
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
        this.cityOptions.unshift({ label: this.$t('bikelogo.js.all'), value: null })
        this.query.cityId = null; //(this.cityOptions.length > 0) ? this.cityOptions[0].value : '';
      })
    },
    handlePic(url) {
      this.showPic = url;
      this.bigPicVisible = true;
    },
    viewBikeLogo(index, row) {
      sessionStorage.viewbikeicon = JSON.stringify(this.bikelogos[index]);
      this.$router.push({name: "bikelogoinfo"});
    },
    updateBikeLogo(index, row) {
      sessionStorage.bikeicon = JSON.stringify(this.bikelogos[index]);
      this.$router.push({name: "editbikelogo"});
    },
    deleteBikeLogo(index, row) {
      this.$confirm(this.$t('bikelogo.js.message', {lockNo: row.lockNo}), this.$t('bikelogo.js.tip'), {
        confirmButtonText: this.$t('bikelogo.js.ok'),
        cancelButtonText: this.$t('bikelogo.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteBikeLogo(this, {id: row.id}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {

      });
    },
  }
}
</script>

<style>
  .icon-img {
    height: 30px;
  }
</style>
