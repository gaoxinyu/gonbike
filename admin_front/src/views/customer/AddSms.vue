<template>
<div class="addBalance-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addsms.box.title') }}
      <!-- <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goCredit"><i class="fa fa-mail-reply"></i></button>
      </div> -->
    </div>

    <div class="box-body">
      <el-form label-position="left" label-width="120px">
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addsms.form.template')">
              <div class="col-md-6" style="padding: 0;">
                <el-select v-model="selectedTemplate" @change="handleSelectTemplate">
                  <el-option
                    v-for="item in templateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="col-md-6" style="padding: 0;">
                <el-select v-model="selectedLanguage" @change="handleSelectLanguage">
                  <el-option
                    v-for="item in languageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addsms.form.message')" class="required">
              <el-input v-model="query.message" @change="handleMessageChange" type="textarea" :autosize="{ minRows: 5, maxRows: 5}" :placeholder="$t('addsms.form.messagePlaceholder')"></el-input>
              <span class="text-yellow pull-right">{{ messageLength }} / {{ maxLength }}</span>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addsms.form.countryId')">
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
        </div>

        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addsms.form.phone')" class="required">
              <el-input v-model="phone" type="textarea" :autosize="{ minRows: 10, maxRows: 20}" :placeholder="$t('addsms.form.phonePlaceholder')"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addsms.form.isBlackLimit')" class="required">
              <el-switch
                v-model="query.blacklist"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <el-form-item :label="$t('addsms.form.remark')">
              <el-input v-model="query.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addsms.form.submit') }}</el-button>
          <el-button @click="clear" :loading="loading">{{ $t('addsms.form.clear') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
// import * as Options from '../../services/options/index.js'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country],
  mounted() {
    this.getSmsTemplateList();
  },
  data() {
    return {
      loading: false,
      selectedTemplate: null,
      selectedLanguage: null,
      phone: this.$route.query.phone,
      messageLength: 0,
      maxLength: 140,   // 短信的最大字符数
      smsTemplateList: [],
      query: {
        countryId: +this.$route.query.countryId || 153,
        message: '',
        phone: null,
        remark: null,
        blacklist: false
      },
      templateOptions: [
        {label: this.$t('addsms.js.template1'), value: null},
      ],
      languageOptions: [],
      areaOptions: this.getAreaOnlyOptions(),
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.message && this.phone);
    },
  },
  destroyed() {
    // delete sessionStorage.countryId;
    // delete sessionStorage.phone;
  },
  methods: {
    submit() {
      this.query.phone = this.phone.split('\n').join(';');
      api.saveSms(this, this.query);
    },
    clear() {
      this.query.message = null;
      this.query.phone = null;
      this.query.remark = null;
    },
    handleMessageChange(text) {
      const replacedText = text.replace(/[^\x00-\xff]/g,"**");  // 中文占2个字符，英文和数字占1个字符，将所有中文转换成*号
      this.messageLength = replacedText.length;  

      // if(this.messageLength > this.maxLength) {
      //   const count = replacedText.substr(0, this.maxLength).split('').filter(s => s === '*').length; // *号的个数
      //   let size = 0;   // 需要截取的长度
        
      //   if((count % 2) === 1) {   // 如果是奇数个*号，说明最后一个字符是半个汉字
      //     size = (count - 1) / 2 + (this.maxLength - count);
      //     this.messageLength = this.maxLength - 1;
      //   } else {  // 如果是偶数个*号
      //     size = count / 2 + (this.maxLength - count);
      //     this.messageLength = this.maxLength;
      //   }
      //   this.query.message = text.substr(0, size);
      // }
    },
    getSmsTemplateList() {
      api.getSmsTemplateList(this, {}).then(() => {
        if(this.smsTemplateList.length > 0) {

          this.smsTemplateList.forEach(item => {
            this.$set(this.templateOptions, this.templateOptions.length, { label: item.name, value: item.id });
          });

          // this.setLanguageOption(this.smsTemplateList[0]);
        }
      });
    },
    setLanguageOption(template) {
      if(template.list.length > 0) {
        template.list.forEach(lang => {
          this.$set(this.languageOptions, this.languageOptions.length, { label: lang.language, value: lang.id });
        })
        this.selectedLanguage = this.languageOptions[0].value;
        this.query.message = template.list[0].content;
      }
    },
    handleSelectTemplate(value) {
      let temp = null;
      for(let i = 0, len = this.smsTemplateList.length; i < len; i++) {
        if(this.smsTemplateList[i].id === value) {
          temp = this.smsTemplateList[i];
          break;
        }
      }
      this.languageOptions = [];
      if(temp) {
        this.setLanguageOption(temp);
      } else {
        this.selectedLanguage = null;
        this.query.message = null;
      }
    },
    handleSelectLanguage(value) {
      let temp = null, lang = null;
      for(let i = 0, len = this.smsTemplateList.length; i < len; i++) {
        if(this.smsTemplateList[i].id === this.selectedTemplate) {
          temp = this.smsTemplateList[i];
          break;
        }
      }
      if(temp && temp.list.length > 0) {
        for(let i = 0, len = temp.list.length; i < len; i++) {
          if(temp.list[i].id === value) {
            lang = temp.list[i];
            this.query.message = lang.content;
            this.handleMessageChange(lang.content);
            break;
          }
        }
      }
    }
  },
}
</script>
