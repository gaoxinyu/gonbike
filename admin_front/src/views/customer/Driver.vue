<template>
<div class="driver-verify-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('driverVerify.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driverVerify.table.id')">
              <el-input v-model="query.id"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driverVerify.table.memberId')">
              <el-input v-model="query.memberId"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driverVerify.table.realName')">
              <el-input v-model="query.realName"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driverVerify.table.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driverVerify.table.certificateStatus')">
              <el-select v-model="query.certificateStatus">
                <el-option
                  v-for="item in certificateStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driverVerify.query.countryId')">
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
      <el-table v-loading="loading" :data="computedApplys" border style="width: 100%">
        <el-table-column prop="id" :label="$t('driverVerify.table.id')" width="70"></el-table-column>
        <el-table-column prop="memberId" :label="$t('driverVerify.table.memberId')" width="70"></el-table-column>
        <el-table-column prop="realName" :label="$t('driverVerify.table.realName')"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('driverVerify.table.createdAt')" min-width="150"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('driverVerify.table.phone')"></el-table-column>
        <el-table-column prop="certificateStatusString" :label="$t('driverVerify.table.certificateStatus')"></el-table-column>
        <el-table-column prop="countryName" :label="$t('driverVerify.table.countryName')"></el-table-column>
        <el-table-column prop="certificationNo" :label="$t('driverVerify.table.certificationNo')" min-width="150"></el-table-column>
        <el-table-column prop="imgs" :label="$t('driverVerify.table.imgs')" min-width="120">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="handlePic(url)" v-for="(url, index) in scope.row.imgs" :key="index" >
              <img :src="url" style="dispaly:inline-block; width: 50px;" alt="">
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('driverVerify.table.updatedAt')" min-width="150"></el-table-column>
        
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" v-if="scope.row.certificateStatus === 0" @click="apply(scope.row, 1)">{{ $t('driverVerify.table.apply') }}</el-button></div>
              <div><el-button type="text" size="small" v-if="scope.row.certificateStatus === 0" @click="apply(scope.row, 2)">{{ $t('driverVerify.table.refused') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goDriverInfo(scope.$index, scope.row)">{{ $t('driverVerify.table.goDriverInfo') }}</el-button></div>
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

  <el-dialog width="30%" :visible.sync="bigPicVisible">
    <div class="box box-solid">
      <div class="box-body no-padding">
        <img :src="showPic" alt="" style="width:100%;">
      </div>
    </div>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    
  },
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      applys: [],
      query: {
        id: null,
        memberId: null,
        realName: null,
        phone: null,
        certificateStatus: null,
        countryId: null,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      showPic: null,
      bigPicVisible: false,
      certificateStatusOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("driverVerify.js.certificateStatus0"), value: 0},
        {label: this.$t("driverVerify.js.certificateStatus1"), value: 1},
        {label: this.$t("driverVerify.js.certificateStatus2"), value: 2},
      ]
    }
  },
  computed: {
    computedApplys() {
      return this.applys.map((item) => {
        return {
          ...item,
          phoneString: item.countryCode ? '+' + item.countryCode + ' ' + item.phone : item.phone,
          certificateStatusString: this.$t('driverVerify.js.certificateStatus' + item.certificateStatus),
          imgs: item.picUrl ? item.picUrl.split(',') : [],
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
          countryName: this.areaOptions.find(country => country.value === item.countryId).label
        }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getDriverApplyList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getDriverApplyList(this, this.query);
    },
    apply(row, certificateStatus) {
      this.$confirm(this.$t('driverVerify.js.confirm' + certificateStatus, {phone: row.phoneString}), this.$t('driver.js.tip'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateDriverApply(this, {id: row.id, certificateStatus: certificateStatus}).then(() => this.handleQuery());
      }).catch(() => {
           
      });
    },
    handlePic(url) {
      this.showPic = url;
      this.bigPicVisible = true;
    },
    goDriverInfo(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/driver?phone=" + row.phone);
    },
  },
  components: {
  }
}

</script>