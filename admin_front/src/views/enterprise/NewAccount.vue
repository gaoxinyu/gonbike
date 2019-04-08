<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    @close="handleDialogClose">
      <el-form :model="form" :rules="isNew ? rules : rulesEdit" ref="form" label-width="100px" v-if="show">
        <div class="row">
          <div class="col-md-6">
            <!-- 新增-国家 -->
            <el-form-item :label="$t('enterpriseAccountAdd.label.country')" prop="countryId" v-if="isNew">
              <el-select v-model="form.countryId" :placeholder="$t('common.choose')">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 编辑-国家 -->
            <el-form-item :label="$t('enterpriseAccountAdd.label.country')" v-else>
              <el-input v-model="form.countryName" disabled></el-input>
            </el-form-item>
          </div>
          <div class="col-md-6">
            <!-- 新增-企业名称 -->
              <el-form-item :label="$t('enterpriseAccountAdd.label.name')" prop="name" v-if="isNew">
                <el-input v-model="form.name" :placeholder="$t('common.input')"></el-input>
              </el-form-item>
              <!-- 编辑-企业名称 -->
              <el-form-item :label="$t('enterpriseAccountAdd.label.name')" v-else>
                <el-input v-model="form.name" :placeholder="$t('common.input')" disabled></el-input>
              </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <!-- 企业简称 -->
            <el-form-item :label="$t('enterpriseAccountAdd.label.abbr')" prop="abbr">
              <el-input v-model="form.abbr" :placeholder="$t('enterpriseAccountAdd.placeholder.abbr')"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-6">
            <!-- 管理邮箱 -->
            <el-form-item :label="$t('enterpriseAccountAdd.label.email')" prop="email">
              <el-input v-model="form.email" :placeholder="$t('common.input')"></el-input>
            </el-form-item>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            
          </div>
        </div>
        <!-- 密码 -->
        <el-form-item :label="$t('enterpriseAccountAdd.label.password')" prop="password" v-if="isNew">
          <el-input v-model="form.password" :placeholder="$t('enterpriseAccountAdd.placeholder.password')"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item :label="$t('enterpriseAccountAdd.label.checkPassword')" prop="checkPassword" v-if="isNew">
          <el-input v-model="form.checkPassword" :placeholder="$t('common.input')"></el-input>
        </el-form-item>
        <!-- 公司电话 -->
        <el-form-item :label="$t('enterpriseAccountAdd.label.telephone')" prop="telephone">
          <el-input v-model="form.telephone" :placeholder="$t('common.input')"></el-input>
        </el-form-item>
        <!-- 联系人 -->
        <el-form-item :label="$t('enterpriseAccountAdd.label.contact')" prop="contact">
          <el-input v-model="form.contact" :placeholder="$t('common.input')"></el-input>
        </el-form-item>
        <!-- 联系人电话 -->
        <el-form-item :label="$t('enterpriseAccountAdd.label.phone')" prop="phone">
          <el-input v-model="form.phone" :placeholder="$t('common.input')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :loading="loading">{{sumbitButtonText}}</el-button>
          <!-- 重置 -->
          <el-button @click="resetFields('form')" :loading="loading">{{$t('enterpriseAccountAdd.label.reset')}}</el-button>
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
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        // 请输入密码
        callback(new Error(this.$t('enterpriseAccountAdd.rules.inputPass')));
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        // 请再次输入密码
        callback(new Error(this.$t('enterpriseAccountAdd.rules.inputPassAgain')));
      } else if (value !== this.form.password) {
        // 两次输入密码不一致
        callback(new Error(this.$t('enterpriseAccountAdd.rules.passDiff')));
      } else {
        callback();
      }
    };
    var baseRules = {
        countryId: [
          // 请选择国家
          { type: 'number', required: true, message: this.$t('enterpriseAccountAdd.rules.country'), trigger: 'change' }
        ],
        name: [
          // 企业名不能为空
          { required: true, message: this.$t('enterpriseAccountAdd.rules.name1'), trigger: 'blur' },
          // 长度在 0 到 100 个字符
          { min: 1, max: 100, message: this.$t('enterpriseAccountAdd.rules.name2'), trigger: 'blur' },
        ],
        abbr: [
          // 企业简称不能为空
          { required: true, message: this.$t('enterpriseAccountAdd.rules.abbr1'), trigger: 'blur' },
          // 6位数内的英文字母组合
          { pattern: /^[a-zA-Z]{1,6}$/, message: this.$t('enterpriseAccountAdd.rules.abbr2'), trigger: 'blur' },
        ],
        email: [
          // 请输入合法的邮箱格式
          { type: 'email', required: true, message: this.$t('enterpriseAccountAdd.rules.email'), trigger: 'blur' }
        ],
        telephone: [
          // 电话不能为空
          { required: true, message: this.$t('enterpriseAccountAdd.rules.telephone'), trigger: 'blur' },
        ],
        contact: [
          // 联系人不能为空
          { required: true, message: this.$t('enterpriseAccountAdd.rules.contact'), trigger: 'blur' },
        ],
        phone: [
          // 联系人电话不能为空
          { required: true, message: this.$t('enterpriseAccountAdd.rules.phone'), trigger: 'blur' },
        ]
      };
      var passRules = {
        password: [
          { validator: validatePassword },
          // 密码不能为空
          { required: true, message: this.$t('enterpriseAccountAdd.rules.pass1'), trigger: 'blur' },
          // 必须是6-12位含大小写英文、数字的组合
          { pattern: ENTERPRISE_PASS, message: this.$t('enterpriseAccountAdd.rules.pass2') }
        ],
        checkPassword: [
          { required: true, message: this.$t('enterpriseAccountAdd.rules.pass1'), trigger: 'blur' },
          { validator: validatePassword2, trigger: 'blur' },
          // 必须是6-12位含大小写英文、数字的组合
          { pattern: ENTERPRISE_PASS, message: this.$t('enterpriseAccountAdd.rules.pass2') }
        ],
      }
    return {
      isNew: true,
      show: false,
      areaOptions: this.getAreaOnlyOptions(),
      loading: false,
      defaultForm: {
        countryId: null,
        name: null,
        abbr: null,
        email: null,
        password: null,
        checkPassword: null,
        telephone: null,
        contact: null,
        phone: null,
      },
      form: {
        countryId: null,
        name: null,
        abbr: null,
        email: null,
        password: null,
        checkPassword: null,
        telephone: null,
        contact: null,
        phone: null,
      },
      // form: {
      //   countryId: 37,
      //   name: 'aaa',
      //   abbr: 'aaa',
      //   email: 'aaa@aaa.com',
      //   password: '123AAAaaa',
      //   checkPassword: '123AAAaaa',
      //   telephone: '123-123-123',
      //   contact: 'acbde',
      //   phone: '13023230625',
      // },
      rules: {
        ...baseRules,
        ...passRules
      },
      rulesEdit: {
        ...baseRules
      }
    };
  },
  computed: {
    title(){
      return this.isNew ? this.$t('enterpriseAccountAdd.titleAdd') //新建企业账号
      : this.$t('enterpriseAccountAdd.titleAdd'); //编辑企业账号
    } ,
    sumbitButtonText(){
      return this.isNew ? this.$t('enterpriseAccountAdd.submitAdd') //创建 
      : this.$t('enterpriseAccountAdd.submitEdit'); //更新
    } 
  },
  methods: {
    new() {
      this.resetForm();
      this.isNew = true;
      this.show = true;
    },
    edit(info) {
      this.isNew = false;
      this.form = {...info};
      this.show = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isNew ? this.sendCreateAccount() : this.sendUpdateAccount();
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
    sendCreateAccount(){
      api.creatEnterpriseAccount(this, this.form)
      .then(data => {
        if(data.success){
          this.$emit('added');
          this.show = false;
        }
      })
    },
    sendUpdateAccount() {
      api.updateEnterpriseAccount(this, this.form)
      .then(data => {
        if(data.success){
          this.$emit('updated');
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
