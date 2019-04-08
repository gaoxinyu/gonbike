<template>
  <div class="user-vip-info">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('uservip.query.title') }}
        <el-button class="pull-right" type="primary" @click="giftVip">{{ $t('uservip.query.giftvip') }}</el-button>
        <el-button class="pull-right magin-r-10" type="primary" @click="autoMng">{{ $t('uservip.query.automng') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('uservip.query.countryId')">
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
              <el-form-item :label="$t('uservip.query.phone')">
                <el-input v-model="query.phone"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('uservip.query.datetimerange')">
                <el-date-picker
                  v-model="modifyTime"
                  type="daterange"
                  @change="handleModifyTime"
                  :placeholder="$t('uservip.query.chooseTime')"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('uservip.query.vipsource')">
                <el-select v-model="query.cardType">
                  <el-option
                    v-for="item in vipsourceOptions"
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
              <el-form-item :label="$t('uservip.query.viptype')">
                <el-input v-model="query.days"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('uservip.query.status')">
                <el-select v-model="query.vipStatus">
                  <el-option
                    v-for="item in vipStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('uservip.query.autopay')">
                <el-select v-model="query.renew">
                  <el-option
                    v-for="item in renewOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('uservip.query.superVip')">
                <el-select v-model="query.superVip">
                  <el-option
                    v-for="item in superVipOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 col-xs-12 col-md-offset-9">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('uservip.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedVipCardList" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
                <tr v-for="(delay, index) in props.row.delayCard" :key="index" class="extend-table">
                  <td>{{ delay.vipSource ? getNameById(vipsourceOptions, delay.vipSource) : '' }}</td>
                  <td>{{ delay.days ? delay.days + $t('uservip.table.day') : '' }}</td> 
                  <td>{{ delay.vipStatus ? getNameById(vipStatusOptions, delay.vipStatus) : '' }}</td>
                  <td>{{ $t('uservip.table.gettime') + ': ' + (delay.createAt ? moment(delay.createAt).format("YYYY-MM-DD HH:mm:ss") : '') }}</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column prop="id" :label="$t('uservip.table.id')" width="70"></el-table-column>
          <el-table-column prop="phoneString" :label="$t('uservip.table.phone')" width="150"></el-table-column>
          <el-table-column prop="countryName" :label="$t('uservip.table.countryId')"></el-table-column>
          <el-table-column prop="days" :label="$t('uservip.table.viptype')" width="90"></el-table-column>
          <el-table-column prop="superVipString" :label="$t('uservip.query.superVip')" width="90"></el-table-column>
          <el-table-column prop="vipSourceString" :label="$t('uservip.table.vipsource')"></el-table-column>
          <el-table-column prop="createdAtString" :label="$t('uservip.table.gettime')" width="140"></el-table-column>
          <el-table-column prop="startTimeString" :label="$t('uservip.table.effectivetime')" width="140"></el-table-column>
          <el-table-column prop="endTimeString" :label="$t('uservip.table.deadlinetime')" width="140"></el-table-column>
          <el-table-column prop="vipStatusString" :label="$t('uservip.table.status')"></el-table-column>
          <el-table-column prop="renewString" :label="$t('uservip.table.autopay')"></el-table-column>
          <el-table-column fixed="right" :label="$t('uservip.table.operate')" width="70">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('uservip.table.operate') }}</el-button>
                <div v-if="scope.row.vipSource != 'delayCard'"><el-button type="text" size="small" @click="giftVip(scope.$index, scope.row)">{{ $t('uservip.table.giftvip') }}</el-button></div>
                <div v-if="(scope.row.vipSource == 'buyCard' || scope.row.vipSource == 'giveCard') && (scope.row.vipStatus == 'valid' || scope.row.vipStatus == 'invalid')"><el-button type="text" size="small" @click="cancelVip(scope.$index, scope.row)" >{{ $t('uservip.table.cancelvip') }}</el-button></div>
                <div v-if="scope.row.vipSource == 'buyCard' && (scope.row.vipStatus == 'valid' || scope.row.vipStatus == 'invalid')"><el-button type="text" size="small" @click="delayVip(scope.$index, scope.row)">{{ $t('uservip.table.delayvip') }}</el-button></div>
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
        <el-dialog :title="$t('uservip.dialog.giftvip')" :visible.sync="giftVisible" width="30%">
          <el-form label-position="left" label-width="80px">
            <el-form-item :label="$t('uservip.dialog.countryId')">
              <el-input v-model="giftRow.name" disabled v-if="giftRow.name"></el-input>
              <el-select v-model="giftRow.countryId" @change="handleCountryChange" v-if="!giftRow.name">
                <el-option
                  v-for="item in areaOnlyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('uservip.dialog.phone')">
              <el-input v-model="giftRow.phoneString" disabled v-if="giftRow.phoneString"></el-input>
              <el-input v-model="giftRow.phone" v-if="!giftRow.phoneString"></el-input>
            </el-form-item>
            <el-form-item :label="$t('uservip.dialog.vipLimit')">
              <el-select v-model="giftRow.clubcardId" @change="selectCard">
                <el-option
                  v-for="item in countryvipcard"
                  :key="item.id"
                  :label="item.days + $t('uservip.dialog.day') + ' ' + (item.cardName ? item.cardName : '')"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-collapse v-if="showCardInfo">
                <el-collapse-item :title="$t('uservip.dialog.cardinfo')" name="1">
                  <div v-show="cardInfo.cardName"> {{ $t('uservip.dialog.name') + (cardInfo.cardName ? cardInfo.cardName : '') }}</div> 
                  <div> {{ $t('uservip.dialog.days') + (cardInfo.days ? cardInfo.days : $t('uservip.dialog.empty')) }}</div>
                  <div> {{ $t('uservip.dialog.price') + (cardInfo.price ? (cardInfo.currencySymbol ? cardInfo.currencySymbol : '$') + cardInfo.price : $t('uservip.dialog.empty')) }}</div>
                  <div>{{ $t('uservip.dialog.limited') + (cardInfo.limited ? $t('uservip.dialog.limitedC', {freeTimes: cardInfo.freeTimes, freeMinutes: cardInfo.freeMinutes}) : $t('uservip.dialog.nolimited')) }}</div>
                  <div>{{ $t('uservip.dialog.renew') + (cardInfo.renew ? (cardInfo.currencySymbol ? cardInfo.currencySymbol : '$') + cardInfo.renewPrice : $t('uservip.dialog.empty')) }}</div>
                  <div>{{ $t('uservip.dialog.promotion') + (cardInfo.promotion ? (cardInfo.currencySymbol ? cardInfo.currencySymbol : '$') + cardInfo.promotionPrice : $t('uservip.dialog.empty')) }}</div>
                </el-collapse-item>
              </el-collapse>
            </el-form-item>
            <el-form-item :label="$t('uservip.dialog.isSendMessage')">
              <el-radio-group v-model="giftRow.isSendMessage">
                <el-radio :label="1">{{ $t('uservip.dialog.yes') }}</el-radio>
                <el-radio :label="0">{{ $t('uservip.dialog.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="giftVisible = false">{{ $t('uservip.dialog.cancel') }}</el-button>
            <el-button type="primary" @click="editGiftSubmit" :disabled="!giftRow.clubcardId">{{ $t('uservip.dialog.ok') }}</el-button>
          </div>
        </el-dialog>
        <el-dialog :title="$t('uservip.dialog.cancelvip')" :visible.sync="cancelVisible" width="30%">
          <p>{{ $t('uservip.dialog.phone') + ': ' + cancelvip.phone }}</p>
          <p class="mt">{{$t('uservip.dialog.payway')}}：</p>
          <table width="100%">
            <tr v-for="(pay, index) in vippaydetail" :key="index">
              <td width="90px">{{ pay.payMethod }}</td>
              <td>{{ pay.payAmount }}</td>
            </tr>
          </table>
          <p class="mt">{{ $t('uservip.dialog.cancelTip') }}</p>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelVisible = false">{{ $t('uservip.dialog.cancel') }}</el-button>
            <el-button type="primary" @click="cancelVipSubmit">{{ $t('uservip.dialog.ok') }}</el-button>
          </div>
        </el-dialog>
        <el-dialog :title="$t('uservip.dialog.delayvip')" :visible.sync="delayVisible" width="30%">
          <el-form label-position="left" label-width="80px">
            <el-form-item :label="$t('uservip.dialog.countryId')">
              <el-input v-model="delayRow.countryName" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('uservip.dialog.phone')">
              <el-input v-model="delayRow.phoneString" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('uservip.dialog.vipLimit')">
              <el-input v-model="delayRow.days">
                <template slot="append">{{ $t('uservip.dialog.day') }}</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('uservip.dialog.isSendMessage')">
              <el-radio-group v-model="delayRow.isSendMessage">
                <el-radio :label="1">{{ $t('uservip.dialog.yes') }}</el-radio>
                <el-radio :label="0">{{ $t('uservip.dialog.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delayVisible = false">{{ $t('uservip.dialog.cancel') }}</el-button>
            <el-button type="primary" @click="delayVipSubmit" :disabled="!delayRow.days">{{ $t('uservip.dialog.ok') }}</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    api.getVipCardList(this, this.query);
  },
  data() {
    return {
      loading: false,
      modifyTime: null,
      vipcardlist: [],
      query: {
        countryId: null,
        phone: this.$route.query.phone,
        startTime: null,
        endTime: null, 
        cardType: null,
        days: null,
        vipStatus: null,
        renew: null,
        superVip:null,
        pageNum: 1
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      areaOnlyOptions: this.getAreaOnlyOptions(),
      vipsourceOptions: [
        { label: this.$t('uservip.js.all'), value: null },
        { label: this.$t('uservip.js.buyCard'), value: 'buyCard' },
        { label: this.$t('uservip.js.giveCard'), value: 'giveCard' },
        { label: this.$t('uservip.js.delayCard'), value: 'delayCard' },
      ],
      vipStatusOptions: [
        { label: this.$t('uservip.js.all'), value: null },
        { label: this.$t('uservip.js.canceled'), value: 'canceled' },
        { label: this.$t('uservip.js.valid'), value: 'valid' },
        { label: this.$t('uservip.js.invalid'), value: 'invalid' },
        { label: this.$t('uservip.js.overdue'), value: 'overdue' },
      ],
      renewOptions: [
        { label: this.$t('uservip.js.all'), value: null },
        { label: this.$t('uservip.js.no'), value: false },
        { label: this.$t('uservip.js.yes'), value: true },
      ],
      superVipOptions: [
        { label: this.$t('uservip.js.all'), value: null },
        { label: this.$t('uservip.js.nonSuperVip'), value: false },
        { label: this.$t('uservip.js.superVip'), value: true },
      ],
      giftVisible: false,
      giftRow: {
        countryId: null,
        phone: null,
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
      showCardInfo: false,
      cancelVisible: false,
      cancelvip: {
        phone: null,
        vipCardId: null,
        isSendMessage: 1
      },
      vippaydetail: [],
      delayVisible: false,
      delayRow: {
        countryName: null,
        phoneString: null,
        clubcardId: null,
        days: null,
        memberId: null,
        isSendMessage: 0
      },
      moment: moment
    }
  },
  computed: {
    computedVipCardList() {
      return this.vipcardlist.map((item) => {
        return {
          ...item,
          phoneString: item.phone ? (item.countryCode ? ('+' + item.countryCode + ' ' + item.phone) : item.phone) : '',
          vipSourceString: (item.vipSource ? this.getNameById(this.vipsourceOptions, item.vipSource) : '') + (item.delayCard.length > 0 ? this.$t('uservip.js.others') : ''),
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : '',
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
          vipStatusString: item.vipStatus ? this.getNameById(this.vipStatusOptions, item.vipStatus) : '',
          renewString: item.renew ? this.$t('uservip.js.yes') : this.$t('uservip.js.no'),
          superVipString: item.superVip ? this.$t('uservip.js.superVip') : this.$t('uservip.js.nonSuperVip')
        }
      })
    }
  },
  methods: {
    handleModifyTime(datas) {
      if(datas) {
        this.query.startTime = datas[0].getTime();
        this.query.endTime = datas[1].getTime();
      }
      else {
        this.query.startTime = null;
        this.query.endTime = null;
      }
    },
    handleQuery() {
      api.getVipCardList(this, this.query);
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getVipCardList(this, this.query);
      }
    },
    selectCard(val) {
      if(val && this.giftRow.clubcardId) {
        [this.cardInfo] = this.countryvipcard.filter((item) => item.id == val);
        this.showCardInfo = true;
      }
    },
    editGiftSubmit() {
      api.saveGiveVip(this, this.giftRow)
        .then(() => {
          this.giftRow = {
            countryId: null,
            phone: null,
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
    giftVip(index, row) {
      if(row) {
        this.giftRow.name = row.countryName;
        this.giftRow.phoneString = row.phoneString;
        this.giftRow.memberId = row.memberId;
        this.giftRow.countryId = row.countryId;
        api.getCountryVipCardList(this, {countryId: this.giftRow.countryId});
      }
      this.giftVisible = true;
    },
    // 自动续费管理 2017.10.27 zhu
    autoMng() {
      this.$router.push({name: 'autopay'});
    },
    handleCountryChange(val) {
      if(val) {
        api.getCountryVipCardList(this, {countryId: val});
      }
    },
    cancelVip(index, row) {
      this.cancelvip.phone = row.phoneString;
      this.cancelvip.vipCardId = row.id;
      api.getVipPayDetailsList(this, {vipCardId: row.id, memberId: row.memberId})
        .then(() => this.cancelVisible = true);
    },
    cancelVipSubmit() {
      api.deleteVipCard(this, {vipCardId: this.cancelvip.vipCardId, isSendMessage: 1})
        .then(() => {
          this.cancelvip = {
            phone: null,
            vipCardId: null,
            isSendMessage: 1
          };
          this.cancelVisible = false;
        });
    },
    delayVip(index, row) {
      this.delayRow.countryName = row.countryName;
      this.delayRow.phoneString = row.phoneString;
      this.delayRow.clubcardId = row.id;
      this.delayRow.memberId = row.memberId;
      this.delayVisible = true;
    },
    delayVipSubmit() {
      api.saveVipDelay(this, this.delayRow)
        .then(() => {
          this.delayRow = {
            countryName: null,
            phoneString: null,
            clubcardId: null,
            days: null,
            memberId: null,
            isSendMessage: 0
          };
          this.delayVisible = false;
          this.handleQuery();
        });
    }
  }
}
</script>

<style>
table .extend-table td {
  padding: 10px;
}
.mt {
  margin-top: 20px;
}
</style>