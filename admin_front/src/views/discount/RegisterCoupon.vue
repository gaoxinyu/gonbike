<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('registerCoupon.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('registerCoupon.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('registerCoupon.query.countryId')">
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

          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>

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
      <el-table v-loading="loading" :data="computedCoupons" border style="width: 100%">
        <el-table-column prop="id" :label="$t('registerCoupon.table.id')" width="60"></el-table-column>
        <el-table-column prop="countryName" :label="$t('registerCoupon.table.countryName')"></el-table-column>
        <el-table-column prop="num" :label="$t('registerCoupon.table.num')"></el-table-column>
        <el-table-column prop="benefitMoneyString" :label="$t('registerCoupon.table.benefitMoney')"></el-table-column>
        <el-table-column prop="days" :label="$t('registerCoupon.table.days')"></el-table-column>
        <el-table-column prop="updateAtString" :label="$t('coupon.table.updateAt')"></el-table-column>
        <el-table-column prop="adminName" :label="$t('coupon.table.adminName')"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('registerCoupon.table.edit') }}</el-button>
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

  <el-dialog :title="$t('registerCoupon.dialog.title')" :visible.sync="addCouponVisible" width="30%">
    <el-form label-position="left" label-width="90px">
      <el-form-item :label="$t('registerCoupon.dialog.countryId')" class="required">
        <el-select v-model="form.countryId" @change="getCountryInfo" :disabled="operate === 'edit'">
          <el-option
            v-for="item in areaOnlyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('registerCoupon.dialog.num')" class="required">
        <el-input v-model.number="form.num" type="number" :min="0" :placeholder="$t('registerCoupon.dialog.mustint0')"></el-input>
        <!-- <p class="error" v-show="form.num !== null && regNum">{{ $t('registerCoupon.dialog.mustint') }}</p> -->
      </el-form-item>

      <el-form-item :label="$t('registerCoupon.dialog.benefitMoney')" class="required">
        <el-input v-model.number="form.benefitMoney" type="number">
          <template slot="append">{{ country.currency }}</template>
        </el-input>
      </el-form-item>

      <el-form-item :label="$t('registerCoupon.dialog.days')" class="required">
        <el-input v-model.number="form.days" type="number" :min="1" :placeholder="$t('registerCoupon.dialog.mustint')">
          <template slot="append">{{ $t('registerCoupon.dialog.day') }}</template>
        </el-input>
        <!-- <p class="error" v-show="regDays">{{ $t('registerCoupon.dialog.mustint') }}</p> -->
      </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addCouponVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="commit" :disabled="disabled">{{ $t('common.ok') }}</el-button>
    </div>
  </el-dialog>

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
  data () {
    return {
      loading: true,
      addCouponVisible: false,
      operate: 'add', // add 添加  edit 编辑
      coupons: [],
      country: {},
      query: {
        pageNum: 1,
        countryId: null,
        couponType: 5,
      },
      form: {
        benefitType: 2,   // 定额
        endType: 1,       // 指定天数
        couponType: 5,
        countryId: null,
        num: null,
        benefitMoney: null,
        days: '30',
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions(),
      areaOnlyOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    computedCoupons() {
      return this.coupons.map((item) => {
        return {
          ...item,
          benefitMoneyString: item.currencySymbol + ' ' + item.benefitMoney,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    },
    disabled() {
      return !(this.form.countryId && 
              (Number.isInteger(this.form.num) && +this.form.num >= 0) && 
              (this.form.benefitMoney > 0 || this.form.benefitMoney === 0) && 
              (Number.isInteger(this.form.days) && +this.form.days > 0));
    },
    regNum() {
      return !(Number.isInteger(this.form.num) && +this.form.num >= 0);
    },
    regDays() {
      return !(Number.isInteger(this.form.days) && +this.form.days > 0);
    }
  },
  methods: {
    goAdd() {
      this.clear();
      this.operate = 'add';
      this.addCouponVisible = true;
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCoupons(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCoupons(this, this.query);
    },
    edit(index, row) {
      this.operate = 'edit';
      this.form = row;
      this.addCouponVisible = true;
      this.getCountryInfo();
    },
    commit() {
      if(this.operate === 'add') {
        api.saveCoupon(this, this.form).then(() => {
          this.handleQuery();
          this.addCouponVisible = false;
          this.clear();
        });
      } else if (this.operate === 'edit') {
        api.updateCoupon(this, this.form).then(() => {
          this.handleQuery();
          this.addCouponVisible = false;
          this.clear();
        });
      }
    },
    clear() {
      this.form = {
        benefitType: 2,   // 定额
        endType: 1,       // 指定天数
        couponType: 5,
        countryId: null,
        num: null,
        benefitMoney: null,
        days: 30,
      }
    },
    getCountryInfo() {
      api.getCountryInfo(this, {id: this.form.countryId});
    },
  },
}
</script>