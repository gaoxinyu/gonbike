<template>
<div class="add-push-message">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addPushMessage.form.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="100px">
        <div class="row">

          <div class="col-md-4">
            <el-form-item :label="$t('addPushMessage.form.notiType')">
              <el-select v-model="form.notiType" @change="handleNotiTypeChange">
                <el-option
                  v-for="item in notiTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addPushMessage.form.saveMesaage')">
              <el-radio-group v-model="form.saveMesaage">
                <el-radio :label="0">{{ $t('addPushMessage.form.yes') }}</el-radio>
                <el-radio :label="1">{{ $t('addPushMessage.form.no') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 跳转H5 -->
            <el-form-item v-show="form.notiType == 1" :label="$t('addPushMessage.form.jumpTo')"  class="required">
              <el-input v-model="form.jumpTo" type="text"></el-input>
            </el-form-item>

            <!-- 跳转到指定页面 -->
            <el-form-item v-show="form.notiType == 2" :label="$t('addPushMessage.form.jumpTo')"  class="required">
              <el-select v-model="form.jumpTo">
                <el-option
                  v-for="item in jumpToOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 模板 -->
            <el-form-item v-show="form.notiType == 3" :label="$t('addPushMessage.form.popTemplateType')"  class="required">
              <el-select v-model="form.popTemplateType">
                <el-option
                  v-for="item in popTemplateTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-4">
            <el-form-item :label="$t('addPushMessage.form.countryId')">
              <el-select v-model="form.countryId">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('addPushMessage.form.userPhone')"  class="required">
              <el-input v-model="userPhone" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" :placeholder="$t('addPushMessage.form.userPhonePlaceholder')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('addPushMessage.form.userTag')"  class="required">
              <el-input v-model="form.userTag" type="text"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>

  <div class="box">
    <div class="box-body">
      <el-form label-position="left" label-width="100px">
        <div class="row">
          <div class="col-md-4">
            <el-form-item :label="$t('addPushMessage.form.languages')">
              <el-select v-model="language" @change="handleLanguageChange">
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <el-tabs v-model="currentLangTab" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in form.messages"
            :key="item.language"
            :label="item.languageName"
            :name="item.language"
          >
          <div class="row">
            <div class="col-md-4">
              <el-form-item :label="$t('addPushMessage.form.notiTitle')"  class="required">
                <el-input v-model="item.notiTitle" type="text" :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
              </el-form-item>
              <el-form-item :label="$t('addPushMessage.form.notiContent')"  class="required">
                <el-input v-model="item.notiContent" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" :placeholder="$t('addPushMessage.form.notiTitlePlaceholder')"></el-input>
              </el-form-item>
            </div>

            <div class="col-md-4" v-if="form.notiType == 3">
              <el-form-item :label="$t('addPushMessage.form.upload')" class="required">
                <el-upload
                  class="avatar-uploader"
                  action="/api/v1/upload/file"
                  :accept="accepts"
                  :headers="headers"
                  :show-file-list="false"
                  :multiple="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError">
                  <img v-if="item.popImageUrl" :src="item.popImageUrl" style="width: 100%;">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="display: block;"></i>
                  <div slot="tip" class="el-upload__tip">
                    <span class="magin-r-10">{{ $t('addPushMessage.form.uploadTip') }} </span>
                    <el-button @click="handleClickView(index, item)" type="text" size="small">{{ $t('addPushMessage.form.view') }}</el-button>
                  </div>

                </el-upload>
              </el-form-item>
            </div>

            <div class="col-md-4" v-if="form.notiType == 3">
              <div v-if="form.popTemplateType != 3">
                <el-form-item :label="$t('addPushMessage.form.popTitle')"  class="required">
                  <el-input v-model="item.popTitle" type="text" :placeholder="$t('addPushMessage.form.popTitlePlaceholder')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('addPushMessage.form.popContent')"  class="required">
                  <el-input v-model="item.popContent" type="textarea" :autosize="{ minRows: 4, maxRows: 10}" :placeholder="$t('addPushMessage.form.popTitlePlaceholder')"></el-input>
                </el-form-item>
              </div>

              <el-form-item :label="$t('addPushMessage.form.jumpTo')" class="required">
                <div class="col-md-3" style="padding:0">
                  <el-select v-model="item.jumpToWhere" @change="item.popWebUrl = null; item.popViewControllerType = null;">
                    <el-option :label="$t('addPushMessage.form.jumpToWhereH5')" value="h5"></el-option>
                    <el-option :label="$t('addPushMessage.form.jumpToWherePage')" value="page"></el-option>
                  </el-select>
                </div>
                <div class="col-md-9" style="padding:0" v-show="item.jumpToWhere === 'h5'">
                  <el-input v-model="item.popWebUrl" type="text"></el-input>
                </div>
                <div class="col-md-9" style="padding:0" v-show="item.jumpToWhere === 'page'">
                  <el-select v-model="item.popViewControllerType">
                    <el-option
                      v-for="item in jumpToOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addPushMessage.form.submit') }}</el-button>
          </el-form-item>

          </el-tab-pane>
        </el-tabs>

      </el-form>
    </div>
  </div>

  <el-dialog :title="$t('pushMessage.dialog.title2')" width="30%" :visible.sync="viewMessageVisible">
    <iphone>
      <div class="mask iphone-notify center">
        <div>
          <div class="box box-solid">
            <div class="box-body">
              <img v-if="message.popImageUrl" :src="message.popImageUrl" alt="">
              <h5 v-if="message.popTitle" class="text-center">{{ message.popTitle || $t('message.dialog.mTitle') }}</h5>
              <p v-if="message.popContent">{{ message.popContent || $t('message.dialog.mContent') }}</p>
            </div>
          </div>
          <div class="close-model text-center"><i class="fa fa-close"></i></div>
        </div>
      </div>
    </iphone>
  </el-dialog>
</div>
</template>
<script>
import api from "../../api"
import Mixins from '../../mixins/index.js'
import {getStorage} from '../../services/auth';
import Iphone from '../../components/Iphone'

export default {
  mixins: [Mixins.country, Mixins.language],
  mounted() {

  },
  data() {
    return {
      loading: false,
      viewMessageVisible: false,
      form: {
        notiType: 0,
        countryId: +this.$route.query.countryId || 153,
        saveMesaage: 0,
        popTemplateType: null,
        userPhone: null,
        userTag: null,
        jumpTo: null,
        messages: [{
          language: 'en',
          languageName: this.$t('common.languages.en'),
          notiTitle: '',
          notiContent: '',
          popImageUrl: null,
          popTitle: null,
          popContent: null,
          popWebUrl: null,
          popViewControllerType: null,
          jumpToWhere: 'h5',  // h5 pr page
        }],
      },
      userPhone: this.$route.query.phone,
      language: 'en',
      currentLangTab: 'en',
      message: {    // 预览的消息
        popImageUrl: null,
        popTitle: null,
        popContent: null,
      },
      notiTypeOptions: [
        {label: this.$t('addPushMessage.js.notiType0'), value: 0},
        {label: this.$t('addPushMessage.js.notiType1'), value: 1},
        {label: this.$t('addPushMessage.js.notiType2'), value: 2},
        {label: this.$t('addPushMessage.js.notiType3'), value: 3},
      ],
      jumpToOptions: ['myInfo', 'editStudentCertification', 'successfulCertification',
                      'failedCertification', 'rechargeMember', 'memberInfo', 'myWallet',
                      'couponList', 'creditPoints', 'invitationReward', 'negativeRecord',
                      'transactionDetails', 'gainCredibility', 'myTrip'].map(page => { return {label: this.$t('addPushMessage.js.' + page), value: page} }),
      popTemplateTypeOptions: [
        {label: this.$t('addPushMessage.js.popTemplateType1'), value: 1},
        {label: this.$t('addPushMessage.js.popTemplateType2'), value: 2},
        {label: this.$t('addPushMessage.js.popTemplateType3'), value: 3},
      ],
      areaOptions: this.getAreaOnlyOptions(),
      languageOptions: this.getLangOnlyOptions(),
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      accepts: '.jpg, .png',
    }
  },
  computed: {
    submitDisabled() {
      return !(this.userPhone && this.form.userTag &&
              this.form.messages.filter(m => !m.notiTitle.trim() || !m.notiContent.trim()).length === 0 &&  // 限制 notiTitle & notiContent 都不能为空
              ((this.form.notiType == 1 || this.form.notiType == 2) ? this.form.jumpTo : true) &&
              (this.form.notiType == 3 ? this.form.popTemplateType && this.form.messages[0].popImageUrl : true));
    },

  },
  methods: {
    goBack() {
      this.$router.push({'name': 'pushmessage'});
    },
    submit() {
      this.form.userPhone = this.userPhone.split('\n');
      api.savePushMessage(this, this.form).then(() => this.goBack());
    },
    removeTab(lang) {
      if(this.form.messages.length > 1) {
        this.form.messages = this.form.messages.filter(message => message.language !== lang);
        if(lang === this.currentLangTab) {
          this.language = this.currentLangTab = this.form.messages[0].language;
        }
      }
    },
    handleLanguageChange(lang) {
      if(this.form.messages.map(m => m.language).indexOf(lang) >= 0) {

      } else {
        const message = {
          language: lang,
          languageName: this.$t('common.languages.' + lang),
          notiTitle: '',
          notiContent: '',
          popImageUrl: null,
          popTitle: null,
          popContent: null,
          popWebUrl: null,
          popViewControllerType: null,
          jumpToWhere: 'h5',  // h5 pr page
        }
        this.$set(this.form.messages, this.form.messages.length, message);

      }
      this.currentLangTab = lang;
    },
    handleNotiTypeChange(type) {
      this.form.jumpTo = null;
      this.form.popTemplateType = null;
    },
    handleClickView(index, item) {
      this.viewMessageVisible = true;
      this.message = item;
    },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.form.messages.forEach(message => {
          if(this.currentLangTab === message.language) {
            message.popImageUrl = response.data.message;
          }
        })
      } else {
        this.$message({ message: response.data.message, type: 'success' });
      }
    },
    uploadError(err, response, file) {

    },

  },
  components: {
    Iphone
  }

}
</script>
