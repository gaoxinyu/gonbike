<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    @close="handleDialogClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" v-if="show">
        <!-- 国家选择
        <el-form-item :label="$t('enterprisePackageAdd.label.countryId')" prop="countryId" >
          <el-select v-model="form.countryId" :placeholder="$t('enterprisePackageAdd.placeholder.select')" >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- 套餐名称 -->
        <el-form-item :label="$t('enterprisePackageAdd.label.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('enterprisePackageAdd.placeholder.input')" ></el-input>
        </el-form-item>
        <!-- 套餐总价 -->
        <el-form-item :label="$t('enterprisePackageAdd.label.amount')" prop="amount">
          <el-input v-model.number="form.amount" :placeholder="$t('enterprisePackageAdd.placeholder.input')"  type="number">
            <template slot="prepend">{{currencySymbol}}</template>
          </el-input>
        </el-form-item>
        <!-- 套餐人数 -->
        <el-form-item :label="$t('enterprisePackageAdd.label.peopleNum')" prop="peopleNum">
          <el-input v-model.number="form.peopleNum" :placeholder="$t('enterprisePackageAdd.placeholder.input')"  type="number">
          </el-input>
        </el-form-item>
        <!-- 开启时间 -->
        <el-form-item :label="$t('enterprisePackageAdd.label.startTime')" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            :placeholder="$t('enterprisePackageAdd.placeholder.date')"
            :picker-options="startTimePickerOptions" >
          </el-date-picker>
        </el-form-item>
        <!-- 套餐周期 -->
        <el-form-item :label="$t('enterprisePackageAdd.label.days')" prop="days">
          <el-input v-model.number="form.days" :placeholder="$t('enterprisePackageAdd.placeholder.input')" type="number">
            <template slot="append">{{$t('enterprisePackageAdd.placeholder.day')}}</template>
          </el-input>
        </el-form-item>
        <!-- 实付金额 -->
        <el-form-item :label="$t('enterprisePackageAdd.label.payAmount')" prop="payAmount">
          <el-input v-model.number="form.payAmount" :placeholder="$t('enterprisePackageAdd.placeholder.input')"  type="number">
            <template slot="prepend">{{currencySymbol}}</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">{{sumbitButtonText}}</el-button>
          <el-button @click="resetFields('form')">{{$t('enterprisePackageAdd.reset')}}</el-button>
        </el-form-item>
      </el-form>
  
  </el-dialog>
</template>

<script>
import api from "../../api";
import Mixins from "../../mixins/index.js";
import { ENTERPRISE_PASS } from '../../utils/regex'

export default {
  mixins: [
    Mixins.country
  ],
  data() {
    var validatepayAmount = (rule, value, callback) => {
      if (value === null) {
        // 请输入实付金额
        callback(new Error(this.$t('enterprisePackageAdd.rules.payAmount1')));
      } else {
        if (this.form.amount !== null && this.form.amount < value) {
          // 实付金额必须小于等于套餐总价
          callback(new Error(this.$t('enterprisePackageAdd.rules.payAmount2')));
        }else{
          callback();
        }
      }
    };
    var baseRules = {
        // countryId: [
        //   // 请选择国家
        //   { type: 'number', required: true, message: this.$t('enterprisePackageAdd.rules.countryId'), trigger: 'change' }
        // ],
        name: [
          // 套餐名不能为空
          { required: true, message: this.$t('enterprisePackageAdd.rules.name1'), trigger: 'blur' },
          // 长度在 0 到 100 个字符
          { min: 1, max: 100, message: this.$t('enterprisePackageAdd.rules.name2'), trigger: 'blur' },
        ],
        amount: [
          // 请输入大于0数字
          { type: 'number', required: true, min: 0,  message: this.$t('enterprisePackageAdd.rules.amount'), trigger: 'blur' }
        ],
        peopleNum: [
          // 请输入大于0整数
          { type: 'integer', required: true, min: 0,  message: this.$t('enterprisePackageAdd.rules.peopleNum'), trigger: 'blur' }
        ],
        startTime: [
          // 请选择日期
          {  type: 'date', required: true, min: 0,  message: this.$t('enterprisePackageAdd.rules.startTime'), trigger: 'change' }
        ],
        days: [
          // 请输入大于0整数
          { type: 'integer', required: true, min: 0, message: this.$t('enterprisePackageAdd.rules.days'), trigger: 'blur' }
        ],
        payAmount: [
          // 请输入大于0数字
          { type: 'number', required: true, min: 0,  message: this.$t('enterprisePackageAdd.rules.payAmount'), trigger: 'blur' },
          { validator: validatepayAmount, trigger: 'blur' }
        ]
      };
    return {
      title: this.$t('enterprisePackageAdd.title'),               //对话框标题
      sumbitButtonText: this.$t('enterprisePackageAdd.create'),       //创建按钮
      show: false,                   //对话框显示与否
      areaOptions: this.getAreaOnlyOptions(),       //获取国家列表
      currencySymbol: '$',
      enterpriseId: null,
      defaultForm: {
        name: null,
        amount: null,
        peopleNum: null,
        startTime: null,
        days: null,
        payAmount: null,
      },
      form: {
        name: null,
        amount: null,
        peopleNum: null,
        startTime: null,
        days: null,
        payAmount: null,
      },
      rules: {
        ...baseRules,
      },
      startTimePickerOptions: {
        disabledDate(time) {
          return (time.getTime() - - 3600 * 1000 * 24) < Date.now();
        },
      }
    };
  },
  methods: {
    new(id, currencySymbol) {
      this.enterpriseId = id;
      this.currencySymbol = currencySymbol;
      this.resetForm();
      this.show = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendCreatePackageRequest();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.form = {...this.defaultForm};
    },
    resetFields(formName){
      this.$refs[formName].resetFields();
    },
    sendCreatePackageRequest(){
      let params = {
        ...this.form,
        startTime: this.form.startTime.getTime(),
        enterpriseId: this.enterpriseId,
      }
      api.creatEnterprisePackage(this, params)
      .then(data => {
        if(data.success){
          this.$emit('added');
          this.show = false;
        }
      })
    },
    handleDialogClose() {
      this.resetForm();
    },
  }
}
</script>
<style lang="scss" scoped>
.el-form-item{
  margin-bottom: 22px;
}
</style>
