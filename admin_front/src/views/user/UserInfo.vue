<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('user.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.createdAt')">
              <el-date-picker
                v-model="query.createdAt"
                type="date"
                :placeholder="$t('user.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('user.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.memberId')">
              <el-input v-model="query.memberId"></el-input>
            </el-form-item>
          </div> -->

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
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('user.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedUsers" border style="width: 100%">
        <el-table-column prop="memberId" :label="$t('user.table.memberId')" width="70"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('user.table.createdAt')" min-width="150"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('user.table.phone')" min-width="150"></el-table-column>
        <el-table-column prop="name" :label="$t('user.table.name')" min-width="80"></el-table-column>
        <el-table-column prop="cyclingMinutes" :label="$t('user.table.cyclingMinutes')" min-width="100"></el-table-column>
        <el-table-column prop="mileage" :label="$t('user.table.mileage')" min-width="100"></el-table-column>
        <el-table-column prop="cyclingCount" :label="$t('user.table.cyclingCount')" min-width="80"></el-table-column>
        <el-table-column prop="credit" :label="$t('user.table.credit')" min-width="90"></el-table-column>
        <el-table-column prop="depositString" :label="$t('user.table.deposit')" min-width="80"></el-table-column>
        <el-table-column prop="balanceString" :label="$t('user.table.balance')" min-width="80"></el-table-column>
        <el-table-column prop="statusString" :label="$t('user.table.status')" min-width="110"></el-table-column>
        <el-table-column prop="ocnNum" :label="$t('user.table.ocnNum')" min-width="80"></el-table-column>
        <el-table-column prop="sportsAchievement" :label="$t('user.table.sportsAchievement')" min-width="100"></el-table-column>
        <el-table-column prop="carbonEmissions" :label="$t('user.table.carbonEmissions')" min-width="110"></el-table-column>
        <el-table-column fixed="right" :label="$t('user.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('user.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="tripDetail(scope.$index, scope.row)">{{ $t('user.table.trip') }}</el-button></div>
              <div><el-button type="text" size="small" @click="payDetail(scope.$index, scope.row)">{{ $t('user.table.pay') }}</el-button></div>
              <div><el-button type="text" size="small" @click="tradeDetail(scope.$index, scope.row)">{{ $t('user.table.trade') }}</el-button></div>
              <div><el-button type="text" size="small" @click="creditDetail(scope.$index, scope.row)">{{ $t('user.table.creditDetail') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goAddBalance(scope.$index, scope.row)">{{ $t('user.table.goAddBalance') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goAddSms(scope.$index, scope.row)">{{ $t('user.table.sms') }}</el-button></div>
              <div><el-button type="text" size="small" @click="updateAccount(scope.$index, scope.row)">{{scope.row.status == 1 ? $t('user.table.statusBtn1') : $t('user.table.statusBtn0')}}</el-button></div>
              <div><el-button type="text" size="small" @click="goDevice(scope.$index, scope.row)">{{ $t('user.table.device') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goUserCoupon(scope.$index, scope.row)">{{ $t('user.table.userCoupon') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goAddUserCoupon(scope.$index, scope.row)">{{ $t('user.table.addUserCoupon') }}</el-button></div>
              <!-- 查看用户会员 -->
              <div><el-button type="text" size="small" @click="viewVIPusers(scope.$index, scope.row)">{{ $t('user.table.viewVipUsers') }}</el-button></div>
              <!-- 赠送会员 -->
              <div><el-button type="text" size="small" @click="VIPGift(scope.$index, scope.row)">{{ $t('user.table.vipGift') }}</el-button></div>
              <div><el-button type="text" size="small" @click="goPushMessage(scope.$index, scope.row)">{{ $t('user.table.goPushMessage') }}</el-button></div>
              <div><el-button type="text" size="small" @click="showOcoinAccount(scope.$index, scope.row)">{{ $t('user.table.showOcoinAccount') }}</el-button></div>
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
      <el-dialog :title="$t('user.dialog.gift')" :visible.sync="giftVisible" width="30%">
        <el-form label-position="left" label-width="80px">
          <el-form-item :label="$t('user.dialog.countryId')">
            <el-input v-model="giftRow.name" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.dialog.phone')">
            <el-input v-model="giftRow.phoneString" disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('user.dialog.vipLimit')">
            <el-select v-model="giftRow.clubcardId" @change="selectCard">
              <el-option
                v-for="item in countryvipcard"
                :key="item.id"
                :label="item.days + $t('user.dialog.day') + ' ' + (item.cardName ? item.cardName : '')"
                :value="item.id">
              </el-option>
            </el-select>
            <el-collapse v-if="showCardInfo">
              <el-collapse-item :title="$t('user.dialog.cardinfo')" name="1">
                <div v-show="cardInfo.cardName"> {{ $t('user.dialog.name') + (cardInfo.cardName ? cardInfo.cardName : '') }}</div> 
                <div> {{ $t('user.dialog.days') + (cardInfo.days ? cardInfo.days : $t('user.dialog.empty')) }}</div>
                <div> {{ $t('user.dialog.price') + (cardInfo.price ? (cardInfo.currencySymbol ? cardInfo.currencySymbol : '$') + cardInfo.price : $t('user.dialog.empty')) }}</div>
                <div>{{ $t('user.dialog.limited') + (cardInfo.limited ? $t('user.dialog.limitedC', {freeTimes: cardInfo.freeTimes, freeMinutes: cardInfo.freeMinutes}) : $t('user.dialog.nolimited')) }}</div>
                <div>{{ $t('user.dialog.renew') + (cardInfo.renew ? (cardInfo.currencySymbol ? cardInfo.currencySymbol : '$') + cardInfo.renewPrice : $t('user.dialog.empty')) }}</div>
                <div>{{ $t('user.dialog.promotion') + (cardInfo.promotion ? (cardInfo.currencySymbol ? cardInfo.currencySymbol : '$') + cardInfo.promotionPrice : $t('user.dialog.empty')) }}</div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item :label="$t('user.dialog.isSendMessage')">
            <el-radio-group v-model="giftRow.isSendMessage">
              <el-radio :label="1">{{ $t('user.dialog.yes') }}</el-radio>
              <el-radio :label="0">{{ $t('user.dialog.no') }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="giftVisible = false">{{ $t('user.dialog.cancel') }}</el-button>
          <el-button type="primary" @click="editGiftSubmit" :disabled="!giftRow.clubcardId">{{ $t('user.dialog.ok') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

  <el-dialog :title="$t('user.table.ocoinAccount')" :visible.sync="ocoinAccountVisible" width="30%">
    <p>{{ selectRow.ocoinAccount || '--' }}</p>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    if(!this.$route.query.phone) {
      const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.createdAt = startDate;
      this.endTime = endDate;
      this.query.createdAt = startDateStr;
      this.query.endTime = endDateStr;
    }
  },
  mounted() {
    api.getUserList(this, this.query)
  },
  data () {
    return {
      loading: false,
      users: [],
      query: {
        createdAt: null,
        endTime: null,
        phone: this.$route.query.phone,
        status: null,
        countryId: null,
        pageNum: 1,
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      // pickerOptions: Options.pickerOptions,
      giftVisible: false,
      selectRow: {},
      ocoinAccountVisible: false,
      giftRow: {
        name: null,
        phoneString: null,
        clubcardId: null,
        memberId: null,
        isSendMessage: 0
      },
      countryvipcard: [],
      cardInfo: {
        cardName: null,
        days: null,
        price: null,
        currencySymbol: null,
        limited: null,
        freeTimes: null,
        freeMinutes: null,
        renew: null,
        renewPrice: null,
        promotion: null,
        promotionPrice: null
      },
      showCardInfo: false
    }
  },
  computed: {
    computedUsers() {
      return this.users.map((item) => {
        return {
            ...item,
            depositString: item.currencySymbol ? item.currencySymbol + " " + item.deposit : item.deposit,
            balanceString: item.currencySymbol ? item.currencySymbol + " " + item.balance : item.balance,
            statusString: item.status === 0 ? this.$t('user.js.status0') : item.status == 1 ? this.$t('user.js.status1') : "",
            phoneString: item.code ? "+" + item.code + " " + item.phone : item.phone,
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getUserList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getUserList(this, this.query)
    },
    tripDetail(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/operate/trip?phone=" + row.phone);
    },
    payDetail(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/payment?phone=" + row.phone);
    },
    tradeDetail(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/trade?phone=" + row.phone);
    },
    creditDetail(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/credit?phone=" + row.phone);
    },
    goAddBalance(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/trade/add?phone=" + row.phone + "&countryId=" + row.countryId);
    },
    goAddSms(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/customer/sms/add?phone=" + row.phone + "&countryId=" + row.countryId);
    },
    goDevice(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/info/device?phone=" + row.phone);
    },
    goUserCoupon(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/info/coupon?phone=" + row.phone);
    },
    goAddUserCoupon(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/info/addcoupon?phone=" + row.phone + "&countryId=" + row.countryId);
    },
    goPushMessage(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/news/messageadd?phone=" + row.phone + "&countryId=" + row.countryId);
    },
    updateAccount(index, row) {
      const opt = row.status == 0 ? this.$t('user.js.statusString0') : this.$t('user.js.statusString1');
      this.$confirm(opt, this.$t('user.js.tip'), {
        confirmButtonText: this.$t('user.js.ok'),
        cancelButtonText: this.$t('user.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.updateAccount(this, {'memberId': row.memberId, 'status': row.status == 0 ? 1 : 0}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    viewVIPusers(index, row) {
      this.$router.push({name: 'vip', query: {phone: row.phone}});
    },
    selectCard(val) {
      if(val && this.giftRow.clubcardId) {
        [this.cardInfo] = this.countryvipcard.filter((item) => item.id == val);
        this.showCardInfo = true;
      }
    },
    VIPGift(index, row) {
      this.giftRow.name = row.name;
      this.giftRow.phoneString = row.phoneString;
      this.giftRow.memberId = row.memberId;
      api.getCountryVipCardList(this, {countryId: row.countryId});
      this.giftVisible = true;
    },
    editGiftSubmit() {
      api.saveGiveVip(this, this.giftRow)
        .then(() => {
          this.giftRow = {
            name: null,
            phoneString: null,
            clubcardId: null,
            memberId: null,
            isSendMessage: 0
          };
          this.showCardInfo = false;
          this.giftVisible = false; 
          this.handleQuery();
        });
    },
    showOcoinAccount(index, row) {
      this.selectRow = row;
      this.ocoinAccountVisible = true;
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
// .user-info-view {
  .no-min-with {
    min-width: initial !important;
  }
// }
</style>