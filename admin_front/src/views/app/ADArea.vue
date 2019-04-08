<template>
  <div class="ad-info-view">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('adarea.query.title') }}
        <div class="pull-right box-tools">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              {{ $t('adarea.query.add') }}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">{{ $t('adarea.query.addad1') }}</el-dropdown-item>
              <el-dropdown-item command="2">{{ $t('adarea.query.addad2') }}</el-dropdown-item>
              <el-dropdown-item command="3">{{ $t('adarea.query.addad3') }}</el-dropdown-item>
              <el-dropdown-item command="4">{{ $t('adarea.query.addad4') }}</el-dropdown-item>
              <el-dropdown-item command="5">{{ $t('adarea.query.addad5') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('adarea.query.type')">
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
              <el-form-item :label="$t('adarea.query.name')">
                <el-select v-model="query.name">
                  <el-option
                    v-for="item in nameOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('adarea.query.countryId')">
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
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('adarea.query.activityDate')">
                <el-date-picker
                  v-model="activityDate"
                  type="date"
                  :placeholder="$t('adarea.query.chooseTime')"
                  @change="handleActivityDate"
                  :clearable="false"
                  :editable="false"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('adarea.query.status')">
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
            </div>
            <div class="col-md-3 col-xs-12">
            </div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('adarea.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedADArea" border style="width: 100%">
          <el-table-column prop="id" :label="$t('adarea.table.id')" width="60"></el-table-column>
          <el-table-column prop="typeString" :label="$t('adarea.table.type')" width="120"></el-table-column>
          <el-table-column prop="nameString" :label="$t('adarea.table.name')" width="120"></el-table-column>
          <el-table-column prop="countryName" :label="$t('adarea.table.countryId')" width="80"></el-table-column>
          <el-table-column prop="dateString" :label="$t('adarea.table.date')" width="140"></el-table-column>
          <el-table-column prop="repeatString" :label="$t('adarea.table.repeat')" width="80"></el-table-column>
          <el-table-column prop="statusString" :label="$t('adarea.table.status')" width="80"></el-table-column>
          <el-table-column prop="languages" :label="$t('adarea.table.languages')" width="200">
            <template slot-scope="scope">
              <a v-for="(lang, index) in scope.row.languages" 
                :key = index
                @click="scope.row.languageIndex = index" 
                style="padding-right: 10px; display: inline-block;" 
                :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}" 
                href="javascript:void(0);"
                >{{ $t('common.languages.' + lang.language ) }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="title" :label="$t('adarea.table.title')" width="90">
            <template slot-scope="scope">
              <span 
                v-for="(lang, index) in scope.row.languages" 
                :key = index
                v-show="scope.row.languageIndex === index"
                >{{ lang.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" :label="$t('adarea.table.content')" width="200">
            <template slot-scope="scope">
              <span 
                v-for="(lang, index) in scope.row.languages" 
                :key = index
                v-show="scope.row.languageIndex === index"
                >{{ lang.content }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="picString" :label="$t('adarea.table.pic')" width="140">
            <template slot-scope="scope">
              <a href="javascript:void(0)" @click="handlePic(scope.row)">
                <img :src="scope.row.picString" style="width:120px;">
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="linkString" :label="$t('adarea.table.link')" width="120">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ scope.row.linkString }}</el-button>
                <h5 v-if="!(scope.row.jumpType == 3) && scope.row.jumpTo">{{ $t('adarea.table.linkAddr' + scope.row.jumpType) + (scope.row.jumpType == 2 ? getNameById(jumpToOptions, scope.row.jumpTo) : scope.row.jumpTo) }}</h5>
                <h5 v-if="(scope.row.jumpType == 3) && scope.row.appStoreAndroid">{{ $t('adarea.table.AndroidAddr') + scope.row.appStoreAndroid }}</h5>
                <h5 v-if="(scope.row.jumpType == 3) && scope.row.appStoreIos">{{ $t('adarea.table.iOSAddr') + scope.row.appStoreIos }}</h5>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column fixed="right" :label="$t('adarea.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('adarea.table.operate') }}</el-button>
                <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('adarea.table.edit') }}</el-button>
                <br>
                <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('adarea.table.detail') }}</el-button>
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
    <el-dialog :title="getNameById(typeOptions, showPic.type)" :visible.sync="bigPicVisible" width="30%">
      <div class="box box-solid">
        <div class="box-body no-padding">
          <img :src="showPic.type == 4 ? showPic.icon : showPic.picture" style="width: 100%;">
          <div class="icon-position" v-if="showPic.type == 4" style="display: flex;">
            <h5>{{ $t('adarea.dialog.longitude') + showPic.iconLongitude }}</h5>
            <h5 style="margin-left: 20px;">{{ $t('adarea.dialog.latitude') + showPic.iconLatitude }}</h5>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import api from '../../api'
import Mixins from '../../mixins/index.js'
export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    api.getADAreaList(this, this.query);
  },
  data() {
    return {
      loading: false,
      bigPicVisible: false,
      showPic: {},
      activityDate: null,
      page: {
        count: 0
      },
      query: {
        type: null,
        name: null,
        countryId: null,
        activityDate: null,
        status: 1
      },
      typeOptions: [
        { label: this.$t('adarea.js.all'), value: null },
        { label: this.$t('adarea.js.type1'), value: 1 },
        { label: this.$t('adarea.js.type2'), value: 2 },
        { label: this.$t('adarea.js.type3'), value: 3 },
        { label: this.$t('adarea.js.type4'), value: 4 },
        { label: this.$t('adarea.js.type5'), value: 5 }
      ],
      nameOptions: [
        { label: this.$t('adarea.js.all'), value: null },
        { label: this.$t('adarea.js.name1'), value: 1 },
        { label: this.$t('adarea.js.name2'), value: 2 },
        { label: this.$t('adarea.js.name3'), value: 3 },
        { label: this.$t('adarea.js.name4'), value: 4 },
        { label: this.$t('adarea.js.name5'), value: 5 },
        { label: this.$t('adarea.js.name6'), value: 6 }
      ],
      areaOptions: this.getAreaOptions(),
      statusOptions: [
        { label: this.$t('adarea.js.all'), value: null },
        { label: this.$t('adarea.js.status1'), value: 1 },
        { label: this.$t('adarea.js.status2'), value: 2 },
        { label: this.$t('adarea.js.status3'), value: 3 },
      ],
      adareas: [],
      jumpToOptions: ['myInfo', 'editStudentCertification', 'successfulCertification',
                      'failedCertification', 'rechargeMember', 'memberInfo', 'myWallet',
                      'couponList', 'creditPoints', 'invitationReward', 'negativeRecord',
                      'transactionDetails', 'gainCredibility', 'myTrip'].map(page => { return {label: this.$t('adadd.js.' + page), value: page} }),
    }
  },
  computed: {
    computedADArea() {
      return this.adareas.map((item) => {
        return {
          ...item,
          typeString: item.type ? this.getNameById(this.typeOptions, item.type) : '',
          nameString: item.name ? this.getNameById(this.nameOptions, item.name) : '',
          dateString: item.startTime && item.endTime ? (moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") + ' - ' + moment(item.endTime).format("YYYY-MM-DD HH:mm:ss")) : '',
          repeatString: item.repeatTimes == 0 ? this.$t('adarea.js.repeat0') : (item.repeatTimes == 1 ? this.$t('adarea.js.repeat1') : ''),
          statusString: item.status ? this.getNameById(this.statusOptions, item.status) : '',
          picString: item.type == 4 ? item.icon : item.picture,
          linkString: item.jumpType == 1 ? this.$t('adarea.js.jumpType1') : (item.jumpType == 2 ? this.$t('adarea.js.jumpType2') : (item.jumpType == 3 ? this.$t('adarea.js.jumpType3') : '')),
          languageIndex: 0
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getADAreaList(this, this.query)
      }
    },
    handleActivityDate(time) {
      this.query.activityDate = time ? time.getTime() : null;
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getADAreaList(this, this.query);
    },
    handleCommand(command) {
      this.$router.push({
        path: `/app/adarea/add/${command}`
      });
    },
    edit(index, row) {
      sessionStorage.editad = JSON.stringify(row);
      this.$router.push({
        path: `/app/adarea/edit/${row.type}`,
        query: {
          id: row.id
        }
      });
    },
    detail(index, row) {
      sessionStorage.adinfo = JSON.stringify(row);
      this.$router.push({
        path: `/app/adarea/info/${row.type}`,
        query: {
          id: row.id
        }
      });
    },
    handlePic(row) {
      this.showPic = row;
      this.bigPicVisible = true;
    },
  }
}
</script>
