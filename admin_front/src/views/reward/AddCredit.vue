<template>
  <div class="add-reward-code">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ this.$route.name === 'rweditcredit' ? $t('rweditcredit.form.title') : $t('rweditcredit.form.title0') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backRwCredit">
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
                {{ $t('rweditcredit.form.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rweditcredit.form.creditName')" class="required">
                        <el-input v-model="form.name" type="text"></el-input>
                      </el-form-item>

                      <el-form-item :label="$t('rweditcredit.form.changeType')" class="required">
                        <div class="col-md-6" style="padding:0;">
                        <el-select v-model="form.changeType">
                            <el-option :label="$t('rweditcredit.form.plus')" :value="1"></el-option>
                            <el-option :label="$t('rweditcredit.form.minus')" :value="2"></el-option>
                        </el-select>
                        </div> 
                        <div class="col-md-6" style="padding:0;">
                        <el-input-number v-model="form.credit"  :min="1" :placeholder="$t('rweditcredit.form.must')"></el-input-number>
                        <!-- <el-input type="number" v-model="form.credit" :placeholder="$t('rweditcredit.form.must')"></el-input> -->
                        </div>
                    </el-form-item>
                      
                      <el-form-item :label="$t('rweditcredit.form.needPhone')" class="required">
                        <el-radio-group v-model="form.needPhone">
                          <el-radio :label="true">{{ $t('rweditcredit.form.yes') }}</el-radio>
                          <el-radio :label="false">{{ $t('rweditcredit.form.no') }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="backRwCredit">{{ $t('rweditcredit.form.cancel') }}</el-button>
                        <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('rweditcredit.form.submit') }}</el-button>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api";
import Iphone from "../../components/Iphone";
import Mixins from "../../mixins/index.js";
import { getStorage } from "../../services/auth";
import moment from "moment";
// import ElObikeUpload from 'element-upload'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    const editRwCredit = sessionStorage.editRwCredit;
    if (this.$route.name == "rweditcredit" && editRwCredit) {
      this.form = JSON.parse(editRwCredit);
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: null,
        changeType: 1,
        credit: null,
        needPhone: false
      }
    };
  },
  computed: {
    submitDisabled() {
      return !(this.form.name && this.form.name.search(/\s/) < 0 && this.form.credit && this.form.credit > 0 && Number.isInteger(this.form.credit));
    }
  },
  methods: {
    backRwCredit() {
      this.$router.push({ name: "rwcredit" });
    },
    submit() {
      if (this.$route.name == "rweditcredit") {
        api
          .updateRwCredit(this, this.form)
          .then(() => this.$router.push({ name: "rwcredit" }));
      } else {
        api
          .saveRwCredit(this, this.form)
          .then(() => this.$router.push({ name: "rwcredit" }));
      }
    }
  }
};
</script>