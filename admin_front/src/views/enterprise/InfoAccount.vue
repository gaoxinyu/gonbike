<template>
  <el-dialog 
    :title="title"
    :visible.sync="show"
     @close="handleDialogClose">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <!-- 基础信息 -->
          <th colspan="4">{{$t('enterpriseAccountInfo.basic.title')}}</th>
        </tr>
        <tr>
          <!-- 企业ID -->
          <th>{{$t('enterpriseAccountInfo.basic.id')}}</th>
          <td>{{accountInfo.id}}</td>
          <!-- 国家 -->
          <th>{{$t('enterpriseAccountInfo.basic.countryName')}}</th>
          <td>{{accountInfo.countryName}}</td>
        </tr>
        <tr>
          <!-- 企业全名 -->
          <th>{{$t('enterpriseAccountInfo.basic.name')}}</th>
          <td>{{accountInfo.name}}</td>
          <!-- 国管理账号家 -->
          <th>{{$t('enterpriseAccountInfo.basic.email')}}</th>
          <td>{{accountInfo.email}}</td>
        </tr>
        <tr>
          <th>{{$t('enterpriseAccountInfo.basic.abbr')}}</th>
          <td>{{accountInfo.abbr}}</td>
          <th>{{$t('enterpriseAccountInfo.basic.telephone')}}</th>
          <td>{{accountInfo.countryCode + '-' + accountInfo.telephone}}</td>
        </tr>
        <tr>
          <th>{{$t('enterpriseAccountInfo.basic.contact')}}</th>
          <td>{{accountInfo.contact}}</td>
          <th>{{$t('enterpriseAccountInfo.basic.phone')}}</th>
          <td>{{accountInfo.countryCode + '-' + accountInfo.phone}}</td>
        </tr>
        <tr>
          <!-- 企业状态 -->
          <th>{{$t('enterpriseAccountInfo.basic.frozen')}}</th>
          <td>{{accountInfo.typeStr}}</td>
          <th></th>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="table table-bordered" v-if="accountInfo.packageName">
      <tbody>
        <tr>
          <!-- 套餐详情（当前) -->
          <th colspan="4">{{$t('enterpriseAccountInfo.package.title')}}</th>
        </tr>
        <tr>
          <!-- 套餐ID -->
          <th>{{$t('enterpriseAccountInfo.package.packageId')}}</th>
          <td>{{accountInfo.packageId}}</td>
          <!-- 套餐名称 -->
          <th>{{$t('enterpriseAccountInfo.package.packageName')}}</th>
          <td>{{accountInfo.packageName}}</td>
        </tr>
        <tr>
          <!-- 套餐周期 -->
          <th>{{$t('enterpriseAccountInfo.package.days')}}</th>
          <td>{{accountInfo.days}}天</td>
          <!-- 类型 -->
          <!-- <th>{{$t('enterpriseAccountInfo.package.type')}}</th>
          <td>{{accountInfo.type}}</td> -->
        </tr>
        <tr>
          <!-- 套餐人数 -->
          <th>{{$t('enterpriseAccountInfo.package.peopleNum')}}</th>
          <td>{{accountInfo.memberNum}}/{{accountInfo.peopleNum}}</td>
          <!-- 起止时间 -->
          <th>{{$t('enterpriseAccountInfo.package.TimeStr')}}</th>
          <td>{{accountInfo.startTimeStr}} ~ {{accountInfo.endTimeStr}}</td>
        </tr>
        <tr>
          <!-- 总价 - 折扣 -->
          <th>{{$t('enterpriseAccountInfo.package.amount')}}</th>
          <td>{{accountInfo.currencySymbol + accountInfo.amount}}</td>
          <!-- 实付金额 -->
          <th>{{$t('enterpriseAccountInfo.package.payAmount')}}</th>
          <td>{{accountInfo.currencySymbol + accountInfo.payAmount}}</td>
        </tr>
        <tr>
          <!-- <th>福利内容</th>
          <td>{{accountInfo.payAmount}}</td> -->
          <!-- 下单时间 -->
          <th>{{$t('enterpriseAccountInfo.package.packageCreatedAtStr')}}</th>
          <td>{{accountInfo.packageCreatedAtStr}}</td>
        </tr>
      </tbody>
    </table>
  </el-dialog>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      show: false,
      // 企业详情
      title: this.$t('enterpriseAccountInfo.title'),
      accountInfo: {}
    }
  },
  methods: {
    info(id) {
      api.getEnterpriseInfo(this, {id: id})
      .then(res =>{
        this.accountInfo.typeStr = this.accountInfo.frozen ? this.$t('enterpriseAccount.js.frozenOption1') : this.$t('enterpriseAccount.js.frozenOption0')
        this.show = true;
      });
      
    },
    handleDialogClose() {
      this.resetAccountInfo(); 
      this.show = false;
    },
    resetAccountInfo() {
      this.accountInfo = {}
    }
  }
}
</script>

<style lang="scss" scoped>
th, td {
  width: 25%;
  word-break: break-word;
}
</style>
