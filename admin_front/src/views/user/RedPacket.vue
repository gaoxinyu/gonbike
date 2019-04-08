<template>
  <div class="user-red-packet">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('redpacket.query.title') }}
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redpacket.query.datetimerange')">
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
                <el-form-item :label="$t('redpacket.query.countryId')">
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
                <el-form-item :label="$t('redpacket.query.cityId')">
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
              <el-form-item :label="$t('redpacket.query.bikeId')">
                <el-input v-model="query.bikeId"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redpacket.query.phone')">
                <el-input v-model="query.phone"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redpacket.query.rewardType')">
                  <el-select v-model="query.rewardType" :disabled="rewardTypes.length === 0">
                      <el-option
                      v-for="item in rewardTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redpacket.query.rewardName')">
                  <el-input v-model="query.rewardName"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('redpacket.query.receivedType')">
                  <el-select v-model="query.received" :disabled="receivedTypes.length === 0">
                      <el-option
                      v-for="item in receivedTypes"
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
              <el-form-item :label="$t('redpacket.query.receivedMethod')">
                  <el-select v-model="query.rewardReasonType" :disabled="rewardReasonTypes.length === 0">
                      <el-option
                      v-for="item in rewardReasonTypes"
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
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('redpacket.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            <el-button class="pull-right" type="warning" @click="exportExcel('/api/v1/red-packet/export/file')" :loading="loading" :plain="true">{{ $t('common.exportQuery') }}</el-button>
          </div>
        </div>
        </el-form>
      </div>
    </div>
    <div class="box box-solid">
      <div class="box-body">
        <el-table :data="computedRedPackets" border style="width: 100%">
          <el-table-column prop="id" :label="$t('redpacket.table.id')" width="60"></el-table-column>
          <el-table-column prop="getTimeString" :label="$t('redpacket.table.getTime')" width="140"></el-table-column>
          <el-table-column prop="phoneString" :label="$t('redpacket.table.phone')" width="140"></el-table-column>
          <el-table-column prop="bikeId" :label="$t('redpacket.table.bikeId')" width="120"></el-table-column>
          <el-table-column prop="countryName" :label="$t('redpacket.table.countryId')"></el-table-column>
          <el-table-column prop="cityName" :label="$t('redpacket.table.cityId')"></el-table-column>
          <!-- 奖励类型 -->
          <el-table-column prop="rewardTypeString" :label="$t('redpacket.table.rewardType')"></el-table-column>
          <!-- 奖励活动名称 -->
          <el-table-column prop="rewardName" :label="$t('redpacket.table.rewardName')" width="200"></el-table-column>
          <!-- 奖励资源 -->
          <el-table-column prop="cityName" :label="$t('redpacket.table.rewardContent')">
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.rewardType == '1'">{{ scope.row.couponString }}</el-button>
                <el-button type="text" size="small" v-else @click="handleRewardDetailCheck(scope.row.id)">{{ $t('redpacket.table.check') }}</el-button>
            </template>
          </el-table-column>
          <!-- 领取状态 -->
          <el-table-column prop="receivedString" :label="$t('redpacket.query.receivedType')"  width="150"></el-table-column>
          <!-- 失败原因 -->
          <el-table-column prop="errMsgString" :label="$t('redpacket.table.errorReason')"  width="150"></el-table-column>
          <!-- 领取途径 -->
          <el-table-column prop="rewardReasonTypeString" :label="$t('redpacket.table.rewardReasonType')"></el-table-column>
          <!-- 操作 -->
          <el-table-column fixed="right" :label="$t('redpacket.table.operate')" width="70">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="checkTrip(scope.row.orderNo)">{{ $t('redpacket.table.tripRecord') }}</el-button>
              <!-- <el-popover trigger="click" placement="top" popper-class="no-min-with">
                <el-button slot="reference" type="text" size="small">{{ $t('redpacket.table.operate') }}</el-button>
                <el-button type="text" size="small">{{ '行程记录' }}</el-button>
              </el-popover> -->
            </template>
          </el-table-column>

          <!-- <el-table-column prop="startTimeString" :label="$t('redpacket.table.startTime')" width="140"></el-table-column>
          <el-table-column prop="endTimeString" :label="$t('redpacket.table.endTime')" width="140"></el-table-column>
          <el-table-column prop="expireDateString" :label="$t('redpacket.table.expireDate')" width="140"></el-table-column>
          <el-table-column prop="contentTypeString" :label="$t('redpacket.table.contentType')"></el-table-column>
          <el-table-column prop="actName" :label="$t('redpacket.table.couponName')" width="100"></el-table-column>
          <el-table-column prop="content" :label="$t('redpacket.table.content')"></el-table-column> -->


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
    <el-dialog :title="$t('redpacket.dialog.title')" :visible.sync="showDetailDialog" >
        <el-card class="box-card" v-for="(coupon,index) in computedRewardDetails.coupons" :key="index">
          <table>
            <tbody>
              <tr>
                <th>
                  {{coupon.rewardNameString}}:
                </th>
                <td>{{coupon.benefitTypeString}}</td>
                <td>{{coupon.benefitAmountString}}</td>
              </tr>
              <tr>
                <th></th>
                <td>{{$t('redpacket.dialog.expiredTime')}}</td>
                <td>{{coupon.expiredTimeString}}</td>
              </tr>
              <tr>
                <th>
                </th>
                <td>{{$t('redpacket.dialog.region')}}</td>
                <td>{{coupon.regionString}}</td>
              </tr>
            </tbody>
          </table>
        </el-card>
        <el-card class="box-card" v-for="(code,index) in computedRewardDetails.codes" :key="index">
          <table>
            <tbody>
              <tr>
                <th>{{code.rewardNameString}}</th>
                <td>{{code.code}}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </el-card>
        <el-card class="box-card" v-for="(credit, index) in computedRewardDetails.credits" :key="index">
          <table>
            <tbody>
              <tr>
                <th>{{credit.rewardNameString}}</th>
                <td>{{credit.creditString}}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </el-card>
        <div class="row">
          <div class="col-md-12 col-xs-12">
            <el-button class="pull-right" type="primary" @click="showDetailDialog = false" :loading="loading">{{ 'OK' }}</el-button>
          </div>
        </div>

    </el-dialog>
  </div>
</template>
<script>
import api from "../../api";
import Mixins from "../../mixins/index.js";
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    // api.getRedPacketList(this, this.query);

    this.getCountryInfo();
  },
  data() {
    return {
      loading: false,
      showDetailDialog: false,
      modifyTime: null,
      redpackets: [],
      couponTypes: [],
      query: {
        startTime1: null,
        endTime1: null,
        countryId: null,
        cityId: null,
        bikeId: null,
        phone: null,
        rewardType: null,
        rewardName: null,
        received: null,
        rewardReasonType: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      cityOptions: [],
      rewardTypes: [
        { label: this.$t('redpacket.js.all'), value: null },
        { label: this.$t('redpacket.js.rewardType1'), value: '1' },
        { label: this.$t('redpacket.js.rewardType2'), value: '2' },
      ],

      receivedTypes: [
        { label: this.$t('redpacket.js.all'), value: null },
        { label: this.$t('redpacket.js.receivedType0'), value: 0 },
        { label: this.$t('redpacket.js.receivedType1'), value: 1 },
        { label: this.$t('redpacket.js.receivedType2'), value: 2 }
      ],

      rewardReasonTypes: [
        { label: this.$t('redpacket.js.all'), value: null },
        { label: this.$t('redpacket.js.rewardReasonType1'), value: 1 },
        { label: this.$t('redpacket.js.rewardReasonType2'), value: 2 },
      ],

      rewardDetails: []
    };
  },
  computed: {
    computedRedPackets() {
      return this.redpackets.map(item => {
        return {
          ...item,
          phoneString: (item.phonePrefix ? '+' + item.phonePrefix + ' ' : '') + (item.phone ? item.phone : ''),
          getTimeString: item.getTime ? moment(item.getTime).format("YYYY-MM-DD HH:mm:ss") : '',
          // updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : '',
          // startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : '',
          // endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
          // expireDateString: item.expireDate ? moment(item.expireDate).format("YYYY-MM-DD HH:mm:ss") : '',
          rewardTypeString: item.rewardType ? this.$t('redpacket.js.rewardType' + item.rewardType) : '',
          couponString: (item.currencySymbol ? item.currencySymbol : '') + (item.couponAmount ? item.couponAmount : ''),
          receivedString: item.received === null ? this.$t('redpacket.js.receivedType2'): item.received ? this.$t('redpacket.js.receivedType1'): this.$t('redpacket.js.receivedType0'),
          errMsgString: item.errMsg || '——',
          rewardReasonTypeString: item.rewardReasonType ? this.$t('redpacket.js.rewardReasonType' + item.rewardReasonType) : ''
        };
      });
    },
    computedRewardDetails() {
      return {
        coupons:
        this.rewardDetails.filter(reward => {
          return reward.rewardType == 1
        }).map((reward,index) => {
          return {
            ...reward,
            rewardNameString: reward.rewardName || 'coupone' + (index + 1),
            benefitTypeString: reward.benefitType ? this.$t('redpacket.js.benefitType' + reward.benefitType): '',
            benefitAmountString: !reward.benefitType ? "" : reward.benefitType == 1 ?reward.couponAmount.toFixed() + '%' : reward.currencySymbol +reward.couponAmount.toFixed(2),
            expiredTimeString: reward.expiredTime ? moment(reward.expiredTime).format("YYYY-MM-DD HH:mm:ss") : '',
            regionString: (reward.countryName || '') + ' - ' + (reward.cityName || '')
          }
        }),
        codes:
        this.rewardDetails.filter((reward) => {
          return reward.rewardType == 2
        }).map((reward,index) => {
          return {
            ...reward,
            rewardNameString: reward.rewardName || 'code' + (index + 1),
          }
        }),
        credits:
        this.rewardDetails.filter((reward) => {
          return reward.rewardType == 3
        }).map((reward,index) => {
          return {
            ...reward,
            rewardNameString: reward.rewardName || 'credit' + (index + 1),
            creditString: '加 {number} 分'.replace('{number}', reward.credit)
          }
        }),
      }
    }
  },
  methods: {
    handleModifyTime(datas) {
      if(datas) {
        this.query.startTime1 = datas[0].getTime();
        this.query.endTime1 = datas[1].getTime();
      }
      else {
        this.query.startTime1 = null;
        this.query.endTime1 = null;
      }
    },
    handleQuery() {
      api.getRedPacketList(this, this.query);
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRedPacketList(this, this.query);
      }
    },
    handleRewardDetailCheck(id){
      this.rewardDetails = [];
      let query = {
        id: id,
        rewardType: 2
      }
      api.getRewardDetail(this, query);
      this.showDetailDialog = true;
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
        this.cityOptions.unshift({ label: this.$t('redpacket.js.all'), value: null })
        this.query.cityId = null;
      })
    },
    checkTrip(orderNo) {
      if(orderNo){
        window.open(location.origin + "/operate/trip?orderNo=" + orderNo);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

table {
  width: 100%;
}
th {
  width: 20%;
}
td {
  width: 30%;
}
</style>
