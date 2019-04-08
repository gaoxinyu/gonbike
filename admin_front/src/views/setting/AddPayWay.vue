<template>
  <div class="add-pay">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ edit ? $t('payadd.form.title1') : $t('payadd.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goPay"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="120px">
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.countryId')" class="required">
                <el-select v-model="query.countryId" filterable v-if="this.$route.name === 'addpay'" @change="handleChangeCountry">
                  <el-option
                    v-for="item in countryNoPayMethod"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-input :disabled="this.$route.name === 'editpay'" v-if="this.$route.name === 'editpay'" v-model="editpay.countryName"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.deposit')" class="required">
                <el-checkbox v-model="depositChecked" v-for="pay in payMethods" :key="pay.id" :label="pay.name" @change="handleDepositChecked">{{ pay.name }}</el-checkbox>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.recharge')" class="required">
                <el-checkbox v-model="rechargeChecked" v-for="pay in payMethods" :key="pay.id" :label="pay.name" @change="handleRechargeChecked">{{ pay.name }}</el-checkbox>
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.delivery')" class="required">
                <el-checkbox v-model="deliveryChecked" v-for="pay in payMethods" :key="pay.id" :label="pay.name" @change="handleDeliveryChecked">{{ pay.name }}</el-checkbox>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.depositSel')" class="required">
                <div v-for="(deposit, index) in depositList" :key="index" class="row" style="margin-left: 0;">
                    <div class="col-md-5">
                      {{ deposit.name }}
                    </div>
                    <div class="col-md-2 card-lavel" v-if="depositList.length > 1">
                      <div class="vip-level">
                        <i class="fa fa-angle-double-down" aria-hidden="true" @click="upLevel(index, 1)" v-show="(deposit.methodType == 1 && index !== (depositList.length - 1))"></i>
                      </div>
                    </div>
                    <div class="col-md-2 card-lavel" v-if="depositList.length > 1">
                      <div class="vip-level">
                        <i class="fa fa-angle-double-up" aria-hidden="true" @click="upLevel(index, -1)" v-show="(deposit.methodType == 1 && index !== 0)"></i>
                      </div>
                    </div>
                  </div> 
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.rechargeSel')" class="required">
                <div v-for="(recharge, index) in rechargeList" :key="index" class="row" style="margin-left: 0;">
                    <div class="col-md-5">
                      {{ recharge.name }}
                    </div>
                    <div class="col-md-2 card-lavel" v-if="rechargeList.length > 1">
                      <div class="vip-level">
                        <i class="fa fa-angle-double-down" aria-hidden="true" @click="upReLevel(index, 1)" v-show="(recharge.methodType == 1 && index !== (rechargeList.length - 1))"></i>
                      </div>
                    </div>
                    <div class="col-md-2 card-lavel" v-if="rechargeList.length > 1">
                      <div class="vip-level">
                        <i class="fa fa-angle-double-up" aria-hidden="true" @click="upReLevel(index, -1)" v-show="(recharge.methodType == 1 && index !== 0)"></i>
                      </div>
                    </div>
                  </div> 
              </el-form-item>
            </div>
            <div class="col-md-4 col-xs-12">
              <el-form-item :label="$t('payadd.form.deliverySel')" class="required">
                <div v-for="(delivery, index) in deliveryList" :key="index" class="row" style="margin-left: 0;">
                    <div class="col-md-5">
                      {{ delivery.name }}
                    </div>
                    <div class="col-md-2 card-lavel" v-if="deliveryList.length > 1">
                      <div class="vip-level">
                        <i class="fa fa-angle-double-down" aria-hidden="true" @click="upDeLevel(index, 1)" v-show="(delivery.methodType == 1 && index !== (deliveryList.length - 1))"></i>
                      </div>
                    </div>
                    <div class="col-md-2 card-lavel" v-if="deliveryList.length > 1">
                      <div class="vip-level">
                        <i class="fa fa-angle-double-up" aria-hidden="true" @click="upDeLevel(index, -1)" v-show="(delivery.methodType == 1 && index !== 0)"></i>
                      </div>
                    </div>
                  </div> 
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <el-form-item>
                <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="uploading">{{ $t('addVersion.form.submit') }}</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins';

export default {
  mixins: [Mixins.common],
  mounted() {
    api.getPayMethod(this).then(() => {
      const editpay = sessionStorage.editpay;
      if(this.$route.name === 'editpay' && editpay) {
        this.edit = true;
        this.editpay = JSON.parse(sessionStorage.editpay);
        this.query.countryId = this.editpay.countryId;
        this.query.countryName = this.editpay.countryName;
        this.depositChecked = this.editpay.deposit.split(',');
        this.rechargeChecked = this.editpay.balance.split(',');
        this.deliveryChecked = this.editpay.delivery.split(',');
        for(let i = 0, deposits = this.depositChecked; i < deposits.length; i++) {
          for(let j = 0, payMethods = this.payMethods; j < payMethods.length; j++) {
            if(payMethods[j].name == deposits[i]) {
              this.depositList.push(payMethods[j]);
            }
          }
        }

        for(let i = 0, recharge = this.rechargeChecked; i < recharge.length; i++) {
          for(let j = 0, payMethods = this.payMethods; j < payMethods.length; j++) {
            if(payMethods[j].name == recharge[i]) {
              this.rechargeList.push(payMethods[j]);
            }
          }
        }

        for(let i = 0, delivery = this.deliveryChecked; i < delivery.length; i++) {
          for(let j = 0, payMethods = this.payMethods; j < payMethods.length; j++) {
            if(payMethods[j].name == delivery[i]) {
              this.deliveryList.push(payMethods[j]);
            }
          }
        }

        // this.depositList = this.payMethods.filter(item => (this.depositChecked.includes(item.name)));
        // this.rechargeList = this.payMethods.filter(item => (this.rechargeChecked.includes(item.name)));
      }
      else {
        api.getCountryNoPayMethod(this);
      }
    });
  },
  data() {
    return {
      edit: false,
      countryNoPayMethod: [],
      depositChecked: [],
      rechargeChecked: [],
      deliveryChecked: [],
      payMethods: [],
      depositList: [],
      rechargeList: [],
      deliveryList: [],
      query: {
        countryId: null,
        countryName: null,
        depositList: [],
        rechargeList: [],
        deliveryList: []
      },
      uploading: false,
      editpay: {}
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.countryId && this.depositList.length > 0 && this.rechargeList.length > 0 && this.deliveryList.length > 0);
    }
  },
  methods: {
    goPay() {
      this.$router.push({name: 'pay'});
    },
    submit() {
      for(let i = 0; i < this.depositList.length; i++) {
        this.query.depositList.push(this.depositList[i].name);
      }
      for(let i = 0; i < this.rechargeList.length; i++) {
        this.query.rechargeList.push(this.rechargeList[i].name);
      }
      for(let i = 0; i < this.deliveryList.length; i++) {
        this.query.deliveryList.push(this.deliveryList[i].name);
      }
      if(this.$route.name === 'editpay') {
        api.updatePayMethod(this, this.query).then(() => this.$router.push({name: 'pay'}));
      }
      else {
        api.savePayMethod(this, this.query).then(() => this.$router.push({name: 'pay'}));
      }
    },
    handleChangeCountry(val) {
      for(let i = 0, con = this.countryNoPayMethod; i < con.length; i++) {
        if(val == con[i].id) {
          this.query.countryName = con[i].name;
          break;
        }
      }
    },
    handleDepositChecked() {
      this.depositList = [];
      for(let i = 0, deposits = this.depositChecked; i < deposits.length; i++) {
        for(let j = 0, payMethods = this.payMethods; j < payMethods.length; j++) {
          if(payMethods[j].name == deposits[i]) {
            this.depositList.push(payMethods[j]);
          }
        }
      }
      // this.depositList = this.payMethods.filter(item => (.includes(item.name)));
    },
    handleRechargeChecked() {
      this.rechargeList = [];
      for(let i = 0, recharge = this.rechargeChecked; i < recharge.length; i++) {
        for(let j = 0, payMethods = this.payMethods; j < payMethods.length; j++) {
          if(payMethods[j].name == recharge[i]) {
            this.rechargeList.push(payMethods[j]);
          }
        }
      }
    },
    handleDeliveryChecked() {
      this.deliveryList = [];
      for(let i = 0, delivery = this.deliveryChecked; i < delivery.length; i++) {
        for(let j = 0, payMethods = this.payMethods; j < payMethods.length; j++) {
          if(payMethods[j].name == delivery[i]) {
            this.deliveryList.push(payMethods[j]);
          }
        }
      }
    },
    upLevel(index, lavel) {
      if((index + lavel > this.depositList.length - 1) || (index + lavel < 0)) {
        return;
      }
      let temp = this.depositList[index];
      this.$set(this.depositList, index, this.depositList[index + lavel]);
      this.$set(this.depositList, index + lavel, temp);
    },
    upReLevel(index, lavel) {
      if((index + lavel > this.rechargeList.length - 1) || (index + lavel < 0)) {
        return;
      }
      let temp = this.rechargeList[index];
      this.$set(this.rechargeList, index, this.rechargeList[index + lavel]);
      this.$set(this.rechargeList, index + lavel, temp);
    },
    upDeLevel(index, lavel) {
      if((index + lavel > this.deliveryList.length - 1) || (index + lavel < 0)) {
        return;
      }
      let temp = this.deliveryList[index];
      this.$set(this.deliveryList, index, this.deliveryList[index + lavel]);
      this.$set(this.deliveryList, index + lavel, temp);
    }
  }
}
</script>

<style media="scoped">
  .add-pay .el-checkbox,
  .add-pay .el-checkbox+.el-checkbox {
    margin: 0 15px 0 0;
  }
  .add-pay .fa {
    font-size: 20px;
  }
</style>
