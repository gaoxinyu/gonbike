<template>
  <div class="add-reward-coupon">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ $t('rwinfocoupon.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backRwCoupon">
            <i class="fa fa-mail-reply"></i>
          </button>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body row">
          <div class="col-md-8 col-xs-12">
            <!-- 基本信息 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('rwinfocoupon.query.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rwinfocoupon.query.merchant')">
                        <label>{{ rwCoupon.merchantName }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocoupon.query.merchantCode')">
                        <label>{{ rwCoupon.merchantCode }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocoupon.query.couponId')">
                        <label>{{ rwCoupon.couponName }}</label>
                      </el-form-item>
                    </div>
                    <div class="col-md-12 col-xs-12">
                      <el-form-item :label="$t('rwinfocoupon.query.couponInfo')">
                        <table>
                          <tr>
                            <td width="100px">{{ rwCoupon.benefitTypeString}}</td>
                            <td>{{ rwCoupon.benefitContent }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('rwinfocoupon.query.period') }}</td>
                            <td>{{ (rwCoupon.endTypeString + ' ' + rwCoupon.period) }}</td>
                          </tr>
                          <tr>
                            <td>{{ $t('rwinfocoupon.query.area') }}</td>
                            <td>{{ rwCoupon.area }}</td>
                          </tr>
                        </table>
                      </el-form-item>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rwinfocoupon.query.needPhone')" class="required">
                        {{ rwCoupon.needPhone ? $t('rwinfocoupon.query.yes') : $t('rwinfocoupon.query.no') }}
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <!-- logo配置 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('rwinfocoupon.query.setting') }}
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-6 col-xs-12">
                    <div class="coupon-list">
                      <div class="item">
                        <h4><span>{{ $t('rwinfocoupon.query.set') }}</span></h4>
                        <div class="item-con">
                          <div class="left">
                            Logo
                            <img class="logo" :src="rwCoupon.logoUrl" />
                          </div>
                          <div class="right">
                            <h3>{{ (rwCoupon.benefitTypeString + ' ' + (rwCoupon.benefitContent ? rwCoupon.benefitContent.split(' ')[0] : '')) }}</h3>
                            <p class="item-name">{{ rwCoupon.logoName || '--' }}</p>
                            <p class="item-date">{{ (rwCoupon.periodSampleForEditOrInfo) }}</p>
                            <span class="detail" v-show="rwCoupon.h5Url">{{ $t('rwinfocoupon.query.detail') }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="link" v-if="rwCoupon.h5Url" style="margin-top: 20px;">
                      {{ $t('rwinfocoupon.query.link') + ': ' + rwCoupon.h5Url }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('cardInfo.table.title2') }}
      </div>
      <div class="box-body">
        <el-table v-loading="loading" :data="computedCouponLogs" border style="width: 100%">
          <el-table-column prop="createdAtString" :label="$t('cardInfo.table.createdAt')" width="130"></el-table-column>
          <el-table-column prop="typeString" :label="$t('cardInfo.table.type')" width="120"></el-table-column>
          <el-table-column prop="adminName" :label="$t('cardInfo.table.adminName')" width="120"></el-table-column>
          <el-table-column prop="remark" :label="$t('cardInfo.table.remark')"></el-table-column>
        </el-table>

        <div class="row text-center">
          <div class="col-md-12">
            <el-pagination 
              layout="total, prev, pager, next" 
              :total="page.count" 
              :page-size="page.per" 
              :current-page="page.current" 
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api';
import Iphone from '../../components/Iphone';
import Mixins from '../../mixins/index.js'
import { getStorage } from '../../services/auth';
import moment from "moment";
// import ElObikeUpload from 'element-upload'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    api.getRwLog(this, this.query);
  },
  data() {
    return {
      loading: false,
      rwlogs: [],
      rwCoupon: JSON.parse(sessionStorage.viewRwCoupon),
      query: {
        rewardId: this.$route.query.id,
        operand: 1,
      },
      page: {
        count: 0
      }
    }
  },
  computed: {
    computedCouponLogs() {
      return this.rwlogs.map((item) => {
        return {
          ...item,
          typeString: item.operationType === 1 ? this.$t('cardInfo.js.type1') : item.operationType === 2 ? this.$t('cardInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : ""
        }
      })
    }
  },
  methods: {
    backRwCoupon() {
      this.$router.push({ name: 'rwcoupon' });
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwLog(this, this.query);
      }
    },
  }
}
</script>
