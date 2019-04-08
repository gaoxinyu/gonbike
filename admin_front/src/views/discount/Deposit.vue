<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('deposit.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="addDeposit"><i class="fa fa-plus"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="70px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('deposit.query.validDate')">
                <el-date-picker
                  v-model="query.time"
                  type="date"
                  :placeholder="$t('deposit.query.chooseTime')"
                  value-format="yyyy-MM-dd"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('deposit.query.countryId')">
                <el-select v-model="query.countryId">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!-- <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('deposit.query.cityId')">
                <el-select v-model="query.cityId" :disabled="cityOptions.length === 0">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div> -->
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('deposit.query.status')">
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
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('deposit.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedActivitys" border style="width: 100%">
          <el-table-column prop="id" :label="$t('deposit.table.id')" width="60"></el-table-column>
          <el-table-column prop="activityTypeString" :label="$t('deposit.table.activityType')" width="100"></el-table-column>
          <el-table-column prop="countryName" :label="$t('deposit.table.countryId')"></el-table-column>
          <el-table-column prop="statusString" :label="$t('deposit.table.status')"></el-table-column>
          <el-table-column prop="language" :label="$t('pushMessage.table.languages')" >
            <template slot-scope="scope">
              <a v-for="(lang, index) in scope.row.activityLanguages"
                :key="index"
                @click="scope.row.languageIndex = index"
                style="padding-right: 10px; display: inline-block;"
                :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}"
                href="javascript:void(0);"
                >{{ $t('common.languages.' + lang.language ) }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="title" :label="$t('pushMessage.table.notiTitle')" width="100">
            <template slot-scope="scope">
              <span
                v-for="(lang, index) in scope.row.activityLanguages"
                :key="index"
                v-show="scope.row.languageIndex === index"
                >{{ lang.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" :label="$t('pushMessage.table.notiContent')" width="200">
            <template slot-scope="scope">
              <span
                v-for="(lang, index) in scope.row.activityLanguages"
                :key="index"
                v-show="scope.row.languageIndex === index"
                >{{ lang.content }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="countryDepositString" :label="$t('deposit.table.countryDeposit')"></el-table-column>
          <el-table-column prop="depositString" :label="$t('deposit.table.deposit')"></el-table-column>
          <el-table-column prop="countryStudentDepositString" :label="$t('deposit.table.countryStudentDeposit')"></el-table-column>
          <el-table-column prop="studentDepositString" :label="$t('deposit.table.studentDeposit')"></el-table-column>

          <el-table-column prop="startTimeString" :label="$t('deposit.table.startTime')" width="140"></el-table-column>
          <el-table-column prop="endTimeString" :label="$t('deposit.table.endTime')" width="140"></el-table-column>
          <el-table-column fixed="right" :label="$t('deposit.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('deposit.table.operate') }}</el-button>
                <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('deposit.table.edit') }}</el-button>
                <br>
                <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('deposit.table.detail') }}</el-button>
                <br>
                <el-button type="text" size="small" @click="goUser(scope.$index, scope.row)">{{ $t('deposit.table.goUser') }}</el-button>
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
import api from '../../api'
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'
import {getStorage} from '../../services/auth'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    api.getActivityList(this, this.query);
    api.getCountryInfo(this, {id: this.query.countryId});
  },
  data() {
    return {
      loading: false,
      activitys: [],
      query: {
        countryId: null,
        // cityId: null,
        time: null,
        status: 1,
        activityType: 4
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      statusOptions: [
        {label: this.$t('deposit.js.all'), value: null},
        {label: this.$t('deposit.js.status0'), value: 0},
        {label: this.$t('deposit.js.status1'), value: 1},
        {label: this.$t('deposit.js.status2'), value: 2},
      ],
    }
  },
  computed: {
    computedActivitys() {
      return this.activitys.map((item) => {
        return {
            ...item,
            languageIndex: 0,
            activityTypeString: item.activityType === 1 ? this.$t('deposit.js.activityType1') : item.activityType === 2 ? this.$t('deposit.js.activityType2') : item.activityType === 3 ? this.$t('deposit.js.activityType3') : item.activityType === 4 ? this.$t('deposit.js.activityType4') : '',
            updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
            startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
            statusString: item.status === 0 ? this.$t('deposit.js.status0') : item.status === 1 ? this.$t('deposit.js.status1') : item.status === 2 ? this.$t('deposit.js.status2') : '',
            countryDepositString: (item.currencySymbol ? item.currencySymbol : '$') + ' ' + (item.countryDeposit ? item.countryDeposit : '0'),
            depositString: (item.currencySymbol ? item.currencySymbol : '$') + ' ' + (item.deposit ? item.deposit : '0'),
            countryStudentDepositString: (item.currencySymbol ? item.currencySymbol : '$') + ' ' + (item.countryStudentDeposit ? item.countryStudentDeposit : '0'),
            studentDepositString: (item.currencySymbol ? item.currencySymbol : '$') + ' ' + (item.studentDeposit ? item.studentDeposit : '0')
          }
      })
    }
  },
  methods: {
    addDeposit() {
      this.$router.push({name: "adddeposit"});
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getActivityList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getActivityList(this, this.query);
      }
    },
    /*getCountryInfo() {
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
        this.query.cityId = (this.cityOptions.length > 0) ? this.cityOptions[0].value : '';
      })
    },*/
    edit(index, row) {
      sessionStorage.editdeposit = JSON.stringify(row);
      this.$router.push({name: "editdeposit"});
    },
    detail(index, row) {
      sessionStorage.depositinfo = JSON.stringify(row);
      this.$router.push({name: "depositinfo"});
    },
    goUser(index, row) {
      this.$router.push({name: "depositusers", params: { id: row.id }});
    }
  }
}

</script>
