<template>
<div class="driver-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('driver.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driver.table.id')">
              <el-input v-model="query.id"></el-input>
            </el-form-item>
          </div>

          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driver.table.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </div> -->

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driver.table.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driver.table.driverStatus')">
              <el-select v-model="query.driverStatus">
                <el-option
                  v-for="item in driverStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driver.table.certificate')">
              <el-select v-model="query.certificate">
                <el-option
                  v-for="item in certificateOptions"
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
            <el-form-item :label="$t('driver.table.workStatus')">
              <el-select v-model="query.workStatus">
                <el-option
                  v-for="item in workStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('driver.table.depositStatus')">
              <el-select v-model="query.depositStatus">
                <el-option
                  v-for="item in depositStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.countryId')">
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
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('common.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedDrivers" border style="width: 100%">
        <el-table-column prop="id" :label="$t('driver.table.id')" width="70"></el-table-column>
        <el-table-column prop="nameString" :label="$t('driver.table.name')" min-width="140"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('driver.table.createdAt')" min-width="150"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('driver.table.phone')" min-width="140"></el-table-column>
        <el-table-column prop="driverStatusString" :label="$t('driver.table.driverStatus')"></el-table-column>
        <el-table-column prop="certificateString" :label="$t('driver.table.certificate')" min-width="140"></el-table-column>
        <el-table-column prop="workStatusString" :label="$t('driver.table.workStatus')"></el-table-column>
        <el-table-column prop="countryName" :label="$t('driver.table.countryName')"></el-table-column>
        <el-table-column prop="depositStatusString" :label="$t('driver.table.depositStatus')"></el-table-column>
        <!-- <el-table-column prop="email" :label="$t('driver.table.email')"></el-table-column> -->
        <el-table-column prop="platform" :label="$t('driver.table.platform')"></el-table-column>
        <el-table-column prop="memo" :label="$t('driver.table.memo')"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('driverVerify.table.updatedAt')" min-width="150"></el-table-column>
        
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <!-- <div><el-button type="text" size="small" @click="payDetail(scope.$index, scope.row)">{{ $t('user.table.pay') }}</el-button></div>
              <div><el-button type="text" size="small" @click="tradeDetail(scope.$index, scope.row)">{{ $t('user.table.trade') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goAddBalance(scope.$index, scope.row)">{{ $t('user.table.goAddBalance') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goAddSms(scope.$index, scope.row)">{{ $t('user.table.sms') }}</el-button></div> -->
              <div><el-button type="text" size="small" @click="frozenAccount(scope.$index, scope.row)">{{scope.row.driverStatus == 1 ? $t('driver.table.driverStatusBtn0') : $t('driver.table.driverStatusBtn1')}}</el-button></div>
              <div><el-button type="text" size="small"
                v-if="scope.row.depositStatus == 3"
                 @click="setAccountDeposit(scope.$index, scope.row)">{{ $t('driver.table.depositStatusBtn0') }}
              </el-button></div>
              <div><el-button type="text" size="small"
                 v-if="scope.row.depositStatus == 0"
                 @click="setAccountDeposit(scope.$index, scope.row)">{{ $t('driver.table.depositStatusBtn1') }}
                 </el-button></div>
              <!-- <div><el-button type="text" size="small" @click="goDevice(scope.$index, scope.row)">{{ $t('user.table.device') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goPushMessage(scope.$index, scope.row)">{{ $t('user.table.goPushMessage') }}</el-button></div> -->
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
      drivers: [],
      query: {
        id: null,
        name: null,
        phone: this.$route.query.phone,
        driverStatus: null,
        certificate: null,
        workStatus: null,
        depositStatus: null,
        countryId: null,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      driverStatusOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("driver.js.driverStatus0"), value: 0},
        {label: this.$t("driver.js.driverStatus1"), value: 1},
      ],
      certificateOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("driver.js.certificate0"), value: 0},
        {label: this.$t("driver.js.certificate1"), value: 1},
        {label: this.$t("driver.js.certificate2"), value: 2},
      ],
      workStatusOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("driver.js.workStatus0"), value: 0},
        {label: this.$t("driver.js.workStatus1"), value: 1},
      ],
      depositStatusOptions: [
        {label: this.$t("common.all"), value: null},
        {label: this.$t("driver.js.depositStatus0"), value: 0},
        {label: this.$t("driver.js.depositStatus1"), value: 1},
        {label: this.$t("driver.js.depositStatus2"), value: 2},
        {label: this.$t("driver.js.depositStatus3"), value: 3},
      ],
    }
  },
  computed: {
    computedDrivers() {
      return this.drivers.map((item) => {
        return {
          ...item,
          phoneString: this.linkPhoneString(item.countryCode, item.phone),
          nameString: item.name || this.linkPhoneString(item.countryCode, item.phone),
          driverStatusString: this.$t('driver.js.driverStatus' + item.driverStatus),
          certificateString: this.$t('driver.js.certificate' + item.certificate),
          workStatusString: item.workStatus === 1 ? this.$t('driver.js.workStatus1') : this.$t('driver.js.workStatus0'),
          depositStatusString: this.$t('driver.js.depositStatus' + item.depositStatus),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    linkPhoneString(countryCode, phone){
      return countryCode ? '+' + countryCode + ' ' + phone : phone;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getDriverList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getDriverList(this, this.query)
    },
    frozenAccount(index, row) {
      const updateApi = row.driverStatus === 0 ? 'updateDriverFrozen' : 'updateDriverAwaken';
      const opt = row.driverStatus === 0 ? this.$t('driver.js.driverStatusString0', {phone: row.phoneString}) : this.$t('driver.js.driverStatusString1', {phone: row.phoneString});

      this.$confirm(opt, this.$t('driver.js.tip'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        api[updateApi](this, {id: row.id}).then(() => this.handleQuery());
      }).catch(() => {
           
      });
    },
    setAccountDeposit(index, row) {
      const updateApi = row.depositStatus === 0 ? 'updateDriverDepositFree' : 'updateDriverDepositNormal';
      const opt = row.depositStatus === 0 ? this.$t('driver.js.depositStatusString0', {phone: row.phoneString}) : this.$t('driver.js.depositStatusString1', {phone: row.phoneString});

      this.$confirm(opt, this.$t('driver.js.tip'), {
        confirmButtonText: this.$t('common.ok'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        api[updateApi](this, {id: row.id}).then(() => this.handleQuery());
      }).catch(() => {
           
      });
    },
    payDetail(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/payment?phone=" + row.phone);
    },
    tradeDetail(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/trade?phone=" + row.phone);
    },
    goAddSms(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/customer/sms/add?phone=" + row.phone + "&countryId=" + row.countryId);
    },
    goDevice(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/info/device?phone=" + row.phone);
    },
    goAddBalance(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/trade/add?phone=" + row.phone + "&countryId=" + row.countryId);
    },
    goAddUserCoupon(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/info/addcoupon?phone=" + row.phone + "&countryId=" + row.countryId);
    },
  },
  components: {
  }
}

</script>