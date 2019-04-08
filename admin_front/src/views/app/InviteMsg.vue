<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('invite.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="addInvite"><i class="fa fa-plus"></i></button>
        </div>
      </div>

      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedInvites" border style="width: 100%">
            <el-table-column prop="id" :label="$t('invite.table.id')" width="60"></el-table-column>
            <el-table-column prop="countryName" :label="$t('invite.table.countryName')"></el-table-column>
            <el-table-column prop="num" :label="$t('invite.table.num')"></el-table-column>
            <el-table-column prop="benefitMoneyCurr" :label="$t('invite.table.benefitMoney')"></el-table-column>
            <el-table-column prop="days" :label="$t('invite.table.days')"></el-table-column>
            <el-table-column prop="limitArea" :label="$t('invite.table.limitArea')"></el-table-column>
            <el-table-column fixed="right" :label="$t('invite.table.operate')" width="70">
              <template slot-scope="scope">
                <el-popover trigger="click" placement="top" popper-class="no-min-with">
                  <el-button slot="reference" type="text" size="small">{{ $t('invite.table.operate') }}</el-button>
                  <el-button type="text" size="small" @click="viewInvite(scope.$index, scope.row)">{{ $t('invite.table.view') }}</el-button>
                  </br>
                  <el-button type="text" size="small" @click="editInvites(scope.$index, scope.row)">{{ $t('invite.table.edit') }}</el-button>
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
      <!-- add dialog -->
      <el-dialog :title="$t('invite.form.title')" size="small" :visible.sync="addVisible">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.countryId')" class="required">
                <el-select v-model="form.countryId" @change="handleCountryChange">
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
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.num')" class="required">
                <el-input v-model="form.num" type="number" :min="1"></el-input>
                <p class="error" v-show="regNum">{{ $t('registerCoupon.dialog.mustint') }}</p>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.benefitMoney')" class="required">
                <el-input v-model.number="form.benefitMoney" type="number" :min="0">
                  <template slot="append">{{ country.open ? country.currency : 'USD' }}</template>
                </el-input>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.days')">
                <el-input v-model="form.days" type="number" :min="1">
                  <template slot="append">{{ $t('invite.form.day') }}</template>
                </el-input>
                <p class="error" v-show="regDays">{{ $t('registerCoupon.dialog.mustint') }}</p>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.limitArea')">
                <el-input :placeholder="form.limitCountry" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item>
            <el-button @click="addVisible = false">{{ $t('invite.form.cancel') }}</el-button>
            <el-button type="primary" @click="submit" :disabled="submitDisabled">{{ $t('invite.form.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- edit dialog -->
      <el-dialog :title="$t('invite.form.title0')" size="small" :visible.sync="editVisible">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.countryId')" class="required">
                <el-input v-model="editInvite.countryName" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.num')" class="required">
                <el-input v-model="editInvite.num" type="number"></el-input>
                <p class="error" v-show="!(!this.editInvite.num || (/^[1-9]\d*$/.test(this.editInvite.num)))">{{ $t('registerCoupon.dialog.mustint') }}</p>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.benefitMoney')" class="required">
                <el-input v-model="editInvite.benefitMoney" type="number">
                  <template slot="append">{{ country.open ? country.currency : 'USD' }}</template>
                </el-input>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.days')">
                <el-input v-model="editInvite.days" type="number">
                  <template slot="append">{{ $t('invite.form.day') }}</template>
                </el-input>
                <p class="error" v-show="!(!this.editInvite.days || (/^[1-9]\d*$/.test(this.editInvite.days)))">{{ $t('registerCoupon.dialog.mustint') }}</p>
              </el-form-item>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('invite.form.limitArea')">
                <el-input :placeholder="editInvite.limitArea" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item>
            <el-button @click="editVisible = false">{{ $t('invite.form.cancel') }}</el-button>
            <el-button type="primary" @click="editSubmit" :disabled="EditSubDisabled">{{ $t('invite.form.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- log dialog -->
      <el-dialog :title="$t('invite.form.title1')" size="small" :visible.sync="logDialog">
        <el-table v-loading="loading" :data="computedcouponLogs" border style="width: 100%">
          <el-table-column prop="createdAtString" :label="$t('invite.table.createdAt')"></el-table-column>
          <el-table-column prop="adminRole" :label="$t('invite.table.adminName')"></el-table-column>
          <el-table-column prop="remark" :label="$t('invite.table.remark')"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from '../../api'
import moment from "moment"
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country],
  mounted() {
    api.getCouponsInvite(this, this.query);
  },
  data() {
    return {
      loading: false,
      invites: [],
      query: {},
      page: {
        count: 0
      },
      // add dialog
      addVisible: false,
      areaOptions: this.getAreaOnlyOptions(),
      country: {},
      form: {
        countryId: null,
        num: null,
        benefitMoney: null,
        days: 30,
        endType: 1,
        couponType: 1,
        benefitType: 2,
        name: 'invite code',
        limitCountry: this.$t('invite.js.nolimit') + this.$t('invite.js.limitArea')
      },
      // edit dialog
      editVisible: false,
      editInvite: {},
      // log dialog
      logDialog: false,
      couponLogs: []
    }
  },
  computed: {
    computedInvites() {
      return this.invites.map((item) => {
        return {
          ...item,
          benefitMoneyCurr: item.currencySymbol ? item.currencySymbol + item.benefitMoney : '$ ' + item.benefitMoney,
          limitArea: (item.countryName ? item.countryName : this.$t('invite.js.nolimit')) + this.$t('invite.js.limitArea')
        }
      })
    },
    submitDisabled() {
      return !(this.form.countryId && (+this.form.num > 0 && (/^[1-9]\d*$/.test(this.form.num))) && (+this.form.benefitMoney > 0) && (+this.form.days > 0 && (/^[1-9]\d*$/.test(this.form.days))));
    },
    EditSubDisabled() {
      return !(this.editInvite.countryId && (+this.editInvite.num > 0 && (/^[1-9]\d*$/.test(this.editInvite.num))) && (+this.editInvite.benefitMoney > 0) && (+this.editInvite.days > 0 && (/^[1-9]\d*$/.test(this.editInvite.days))));
    },
    computedcouponLogs() {
      return this.couponLogs.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          adminRole: item.adminName + '(' + (item.roleName ? item.roleName : '') + ')'
        }
      })
    },
    regNum() {
      return !(!this.form.num || (/^[1-9]\d*$/.test(this.form.num)));
    },
    regDays() {
      return !(!this.form.days || (/^[1-9]\d*$/.test(this.form.days)));
    }
  },
  methods: {
    addInvite() {
      this.addVisible = true;
      this.form = {
        countryId: null,
        num: null,
        benefitMoney: null,
        days: 30,
        endType: 1,
        couponType: 1,
        benefitType: 2,
        name: 'invite code',
        limitCountry: this.$t('invite.js.nolimit') + this.$t('invite.js.limitArea')
      };
    },
    handleCountryChange() {
      api.getCountryInfo(this, {id: this.form.countryId}).then(() => this.form.limitCountry = this.country.name + this.$t('invite.js.limitArea'));
    },
    submit() {
      this.addVisible = false;
      api.saveCoupon(this, this.form).then(() => api.getCouponsInvite(this, this.query));
    },
    viewInvite(index, row) {
      this.logDialog = true;
      let couponId = {couponId: this.invites[index].id};
      api.getCouponLogList(this, couponId);
    },
    editInvites(index, row) {
      sessionStorage.editInvite = JSON.stringify(this.invites[index]);
      this.editInvite = JSON.parse(sessionStorage.editInvite);
      this.editInvite.limitArea = this.editInvite.countryName + this.$t('invite.js.limitArea');
      api.getCountryInfo(this, {id: this.editInvite.countryId});
      this.editVisible = true;
    },
    editSubmit() {
      this.editVisible = false;
      api.updateCoupon(this, this.editInvite).then(() => api.getCouponsInvite(this, this.query));
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getCouponsInvite(this, this.query);
    }
  }
}
</script>
