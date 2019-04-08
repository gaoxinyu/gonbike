<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('userCoupon.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('userCoupon.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.createdAt')">
              <el-date-picker
                v-model="query.createdAtStart"
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
                v-model="query.createdAtEnd"
                type="date"
                :placeholder="$t('user.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.countryId')">
              <el-select v-model="query.couponCountryId">
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
            <el-form-item :label="$t('user.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('userCoupon.query.used')">
              <el-select v-model="query.used">
                <el-option
                  v-for="item in usedOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('userCoupon.query.couponType')">
              <el-select v-model="query.couponType">
                <el-option
                  v-for="item in couponTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12"></div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('userCoupon.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedUserCoupons" border style="width: 100%">
        <el-table-column prop="id" :label="$t('userCoupon.table.id')" width="70"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('userCoupon.table.phone')" width="150"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('userCoupon.table.createdAt')" width="140"></el-table-column>
        <el-table-column prop="couponTypeString" :label="$t('userCoupon.table.couponType')" width="130"></el-table-column>
        <el-table-column prop="benefitMoneyString" :label="$t('userCoupon.table.benefitMoney')"></el-table-column>
        <el-table-column prop="daysString" :label="$t('userCoupon.table.days')" width="260"></el-table-column>
        <el-table-column prop="areaString" :label="$t('userCoupon.table.area')"></el-table-column>
        <el-table-column prop="usedString" :label="$t('userCoupon.table.used')"></el-table-column>
        <el-table-column fixed="right" :label="$t('userCoupon.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('userCoupon.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('userCoupon.table.detail') }}</el-button></div>
              <div v-if="scope.row.phone"><el-button type="text" size="small" @click="goAddUserCoupon(scope.$index, scope.row)">{{ $t('userCoupon.table.addUserCoupon') }}</el-button></div>
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
    if(!this.$route.query.phone) {
      const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.createdAtStart = startDate;
      this.createdAtEnd = endDate;
      this.query.createdAtStart = startDateStr;
      this.query.createdAtEnd = endDateStr;
    }
  },
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      userCoupons: [],
      query: {
        pageNum: 1,
        createdAtStart: null,
        createdAtEnd: null,
        couponCountryId: null,
        used: null,
        couponType: null,
        phone: this.$route.query.phone,
      },
      page: {
        count: 0
      },
      usedOptions: [
        {label: this.$t('userCoupon.js.all'), value: null},
        {label: this.$t('userCoupon.js.used0'), value: 0},
        {label: this.$t('userCoupon.js.used1'), value: 1},
        {label: this.$t('userCoupon.js.used2'), value: 2},
      ],
      couponTypeOptions: [
        {label: this.$t('userCoupon.js.all'), value: null},
        {label: this.$t('userCoupon.js.couponType1'), value: 1},
        {label: this.$t('userCoupon.js.couponType2'), value: 2},
        {label: this.$t('userCoupon.js.couponType3'), value: 3},
        {label: this.$t('userCoupon.js.couponType4'), value: 4},
        {label: this.$t('userCoupon.js.couponType5'), value: 5},
        {label: this.$t('userCoupon.js.couponType7'), value: 7},
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedUserCoupons() {
      return this.userCoupons.map((item) => {
        return {
          ...item,
          phoneString: item.phone ? (item.code ? "+" + item.code + " " + item.phone : item.phone) : this.$t('userCoupon.js.unRegister'),
          inviteMemberPhoneString: item.inviteMemberPhone ? (item.code ? "+" + item.code + " " + item.inviteMemberPhone : item.inviteMemberPhone) : '',
          fromMemberPhoneString: item.code ? "+" + item.code + " " + item.fromMemberPhone : item.fromMemberPhone,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
          couponTypeString: this.$t('userCoupon.js.couponType' + item.couponType),
          benefitMoneyString: item.benefitType === 1 ? this.getCotentStringType1(item) : item.benefitType === 2 ?  this.getCotentStringType2(item) : '',
          daysString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : '',
          exchangeDaysString: item.exchangeStartTime ? moment(item.exchangeStartTime).format("YYYY-MM-DD HH:mm:ss") + ' ~ ' + moment(item.exchangeEndTime).format("YYYY-MM-DD HH:mm:ss") : '',
          areaString: item.couponCountry + (item.couponCity ? ' - ' + item.couponCity : ''),
          usedString: item.used === 0 ? this.$t('userCoupon.js.used0') : item.used === 1 ? this.$t('userCoupon.js.used1') : item.used === 2 ? this.$t('userCoupon.js.used2') : '',
        }
      })
    }
  },
  methods: {
    getCotentStringType1(item) {
      if(item.randomPromotion){
        return this.$t('addUserCoupon.js.benefitType1') + ' ' + item.minPromotion + '%' + ' ~ ' + item.maxPromotion + '%';
      }else{
        return this.$t('addUserCoupon.js.benefitType1') + ' ' + item.benefitPercent + '%';
      }
    },
    getCotentStringType2(item) {
      if(item.randomPromotion){
        return this.$t('addUserCoupon.js.benefitType2') + ' ' + item.currencySymbol + ' ' + item.minPromotion + ' ~ ' + item.currencySymbol + ' ' + item.maxPromotion
      }else{
        return this.$t('addUserCoupon.js.benefitType2') + ' ' + item.currencySymbol + ' ' + item.benefitMoney
      }
    },
    goAdd() {
      window.open(location.href.split(location.pathname)[0] + "/user/info/addcoupon");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getMemberCoupons(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getMemberCoupons(this, this.query);
    },
    // edit(index, row) {
    //   sessionStorage.userCoupon = JSON.stringify(row);
    //   this.$router.push({name: "editusercoupon"});
    // },
    detail(index, row) {
      sessionStorage.userCoupon = JSON.stringify(row);
      window.open(location.href.split(location.pathname)[0] + "/user/info/coupon/" + row.id);
    },
    goAddUserCoupon(index, row) {
      window.open(location.href.split(location.pathname)[0] + "/user/info/addcoupon?phone=" + row.phone + "&countryId=" + row.memberCountryId);
    },
  },
}
</script>