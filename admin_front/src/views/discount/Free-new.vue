<template>
  <div class="user-info-view">
    <div class="box box-info">

      <div class="box-header with-border">
        {{ $t('free.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('free.query.goAdd') }}</button>
        </div>
      </div>

      <div class="box-body">
        <el-form label-position="right" label-width="90px">
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('free.query.time')">
                <el-date-picker
                  v-model="query.time"
                  type="datetimerange"
                  range-separator="-"
                  value-format="timestamp"
                  style="width: 100%"
                  class="myDataPicker"
                  :start-placeholder="$t('free.query.chooseStartTime')"
                  :end-placeholder="$t('free.query.chooseEndTime')">
                </el-date-picker>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('free.query.countryId')">
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

            <!-- 城市 -->
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('addFree.form.cityId')" class="required">
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
              <el-form-item :label="$t('free.query.activityDetailType')">
                <el-select v-model="query.activityDetailType">
                  <el-option
                    v-for="item in activityDetailType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('free.query.status')">
                <el-select v-model="query.activityStatus">
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
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{
                $t('free.query.query') }}
              </el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :plain="true">{{
                $t('common.resetQuery') }}
              </el-button>
            </div>
          </div>
        </el-form>
      </div>

    </div>


    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedActivitys" border style="width: 100%">
          <el-table-column prop="id" :label="$t('free.table.id')"></el-table-column>

          <el-table-column prop="activityTypeString" :label="$t('free.table.activityType')"
                           ></el-table-column>

          <el-table-column prop="areaString" :label="$t('free.table.country')"></el-table-column>

          <el-table-column prop="citys" :label="$t('free.table.city')" ></el-table-column>

          <el-table-column prop="startTimeString" :label="$t('free.table.startTime')" ></el-table-column>

          <el-table-column prop="endTimeString" :label="$t('free.table.endTime')" ></el-table-column>

          <el-table-column prop="statusString" :label="$t('free.table.status')"></el-table-column>

          <el-table-column prop="updateAtString" :label="$t('free.table.updateAt')"></el-table-column>

          <el-table-column fixed="right" :label="$t('free.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('free.table.operate') }}</el-button>
                <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('free.table.edit') }}
                </el-button>
                <br>
                <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('free.table.detail')
                  }}
                </el-button>
                <br>
                <!--<el-button type="text" size="small" @click="goUser(scope.$index, scope.row)">{{ $t('free.table.goUser') }}</el-button>-->
              </el-popover>
            </template>
          </el-table-column>


          <!--<el-table-column prop="language" :label="$t('pushMessage.table.languages')">-->
            <!--<template slot-scope="scope">-->
              <!--<a v-for="(lang, index) in scope.row.activityLanguages"-->
                 <!--:key="index"-->
                 <!--@click="scope.row.languageIndex = index"-->
                 <!--style="padding-right: 10px; display: inline-block;"-->
                 <!--:class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}"-->
                 <!--href="javascript:void(0);"-->
              <!--&gt;{{ $t('common.languages.' + lang.language ) }}</a>-->
            <!--</template>-->
          <!--</el-table-column>-->

          <!--<el-table-column prop="title" :label="$t('pushMessage.table.notiTitle')">-->
            <!--<template slot-scope="scope">-->
            <!--<span-->
              <!--v-for="(lang, index) in scope.row.activityLanguages"-->
              <!--:key="index"-->
              <!--v-show="scope.row.languageIndex === index"-->
            <!--&gt;{{ lang.title }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->

          <!--<el-table-column prop="content" :label="$t('pushMessage.table.notiContent')">-->
            <!--<template slot-scope="scope">-->
            <!--<span-->
              <!--v-for="(lang, index) in scope.row.activityLanguages"-->
              <!--:key="index"-->
              <!--v-show="scope.row.languageIndex === index"-->
            <!--&gt;{{ lang.content }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->

          <!-- <el-table-column prop="title" :label="$t('free.table.title')"></el-table-column>
          <el-table-column prop="content" :label="$t('free.table.content')"></el-table-column> -->

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
  // import * as Options from '../../services/options/index.js'
  import Mixins from '../../mixins/index.js'
  import moment from "moment"

  export default {
    mixins: [Mixins.country, Mixins.query],
    mounted() {
      this.handleQuery();
    },
    data() {
      return {
        loading: true,
        activitys: [],
        cityOptions: [],
        query: {
          pageNum: 1,
          time: [],
          activityStartDateTime: null,
          activityEndDateTime: null,
          countryId: null,
          cityId: null,
          // activityType: 3,
          activityStatus: null,
          activityDetailType: null
        },
        page: {
          count: 0
        },
        statusOptions: [
          {label: this.$t('free.js.all'), value: null},
          {label: this.$t('free.js.status0'), value: 3},
          {label: this.$t('free.js.status1'), value: 4},
          {label: this.$t('free.js.status2'), value: 2},
          {label: this.$t('free.js.status3'), value: 1},
        ],
        activityDetailType: [
          {label: this.$t('free.activityDetailType.all'), value: null},
          {label: this.$t('free.activityDetailType.status1'), value: 1},
          {label: this.$t('free.activityDetailType.status2'), value: 2}
        ],
        areaOptions: this.getAreaOptions(),
        // pickerOptions: Options.pickerOptions,
      }
    },
    computed: {
      computedActivitys() {
        console.log(this.activitys);
        return this.activitys.map((item) => {
          return {
            ...item,
            languageIndex: 0,
            activityTypeString: item.type === 1 ? this.$t('free.activityDetailType.status1') : item.type === 2 ? this.$t('free.activityDetailType.status1') : '',
            updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
            startTimeString: item.activityStartDateTime ? moment(item.activityStartDateTime).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.activityEndDateTime ? moment(item.activityEndDateTime).format("YYYY-MM-DD HH:mm:ss") : "",
            statusString: item.activityStatus === 1 ? this.$t('free.js.status3') : item.activityStatus === 2 ? this.$t('free.js.status2') : item.activityStatus === 3 ? this.$t('free.js.status0') : item.activityStatus === 4 ? this.$t('free.js.status1'): '',
            areaString: item.countryId,
            areaString: this.getAreaName(item.countryId),
          }
        })
      }
    },
    methods: {
      goAdd() {
        window.open(location.href + "add");
      },
      handleCurrentChange(val) {
        if (!this.loading) {
          this.query.pageNum = val;
          api.getActivityList(this, this.query);
        }
      },
      handleQuery() {
        if (this.query.time) {
          this.query.activityStartDateTime = this.query.time[0];
          this.query.activityEndDateTime = this.query.time[1];
          delete this.query.time
        }
        this.query.pageNum = 1;
        console.log(this.query);
        api.getActivityList(this, this.query);
      },
      edit(index, row) {
        sessionStorage.free = JSON.stringify(row);
        this.$router.push({name: "editfree"});
      },
      detail(index, row) {
        sessionStorage.free = JSON.stringify(row);
        window.open(location.href + "/" + row.id);
      },
      goUser(index, row) {

      },
      getCountryInfo() {
        api.getCountryInfo(this, {id: this.query.countryId});
        this.getCitysByCountry();
      },
      getCitysByCountry() {
        this.query.cityId = null;
        api
          .getCitysByCountry(this, {countryId: this.query.countryId})
          .then(citys => {
            this.cityOptions = this.citys.map(city => {
              return {
                label: city.name,
                value: city.id
              };
            });
          });
      }
    },
  }
</script>

<style lang="scss">
  // .user-info-view {
  .no-min-with {
    min-width: initial !important;
  }

  // }

  .myDataPicker .el-range-input {
    width: 43% !important;
  }
</style>
