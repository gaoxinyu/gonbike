<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ edit ? $t('addMessage.form.title1') : $t('addMessage.form.title0') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goMessage"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
      <div class="row">
        <div class="col-md-8">
          <el-form-item :label="$t('addMessage.form.type')">
            <el-select v-model="query.type" style="width: 200px;">
              <el-option v-for="item in msgOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('addMessage.form.title')" class="required">
            <el-input :placeholder="$t('addMessage.form.titlePlaceholder')" v-model="query.title"></el-input>
          </el-form-item>
          <el-form-item :label="$t('addMessage.form.content')" class="required">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="$t('addMessage.form.contentPlaceholder')" max-length="100" v-model="query.content"></el-input>
          </el-form-item>
          <el-form-item :label="$t('addMessage.form.img')" class="required">
            <el-upload
              action="/api/v1/upload/file"
              :accept="accepts"
              :headers="headers"
              :multiple="false"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError">
              <el-button size="small" type="primary">{{ $t('addMessage.form.upload') }}</el-button>
              <div class="el-upload__tip" slot="tip">{{ $t('addMessage.form.uploadTip') }}</div>
            </el-upload>
          </el-form-item>

          <div class="row">
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('addMessage.form.coverageArea')">
                <el-select v-model="query.coverageArea">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('addMessage.form.targetUser')">
                <el-select v-model="query.targetUser">
                  <el-option
                    v-for="item in userOptions"
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
              <el-form-item :label="$t('addMessage.form.repetition')">
                <el-select v-model="query.repetition">
                  <el-option
                    v-for="item in repetitionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-6 col-xs-12">
              <el-form-item :label="$t('addMessage.form.status')">
                <el-select v-model="query.status">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <el-form-item :label="$t('addMessage.form.startDateTime')" class="required">
            <el-date-picker
              v-model="dateTimeRange.startDateTime"
              type="datetime"
              :picker-options="pickerStartOption"
              :disabled="disabledStart"
              @change="handleStartDateChange"
              :clearable="false"
              :editable="false"
              :placeholder="$t('addMessage.form.startPlaceholder')">
            </el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('addMessage.form.endDateTime')" class="required">
            <el-date-picker
              v-model="dateTimeRange.endDateTime"
              type="datetime"
              :picker-options="pickerEndOption"
              @change="handleEndDateChange"
              :clearable="false"
              :editable="false"
              :placeholder="$t('addMessage.form.endPlaceholder')">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addMessage.form.submit') }}</el-button>
            <el-button>{{ $t('addMessage.form.cancel') }}</el-button>
          </el-form-item>
        </div>
        <div class="col-md-4">
          <iphone>
            <div class="mask iphone-notify center">
              <div>
                <div class="box box-solid">
                  <div class="box-body">
                    <img v-show="query.img" :src="query.img" alt="">
                    <h5 class="text-center">{{ query.title || $t('addMessage.form.mTitle') }}</h5>
                    <p>{{ query.content || $t('addMessage.form.mContent') }}</p>
                  </div>
                </div>
                <div class="close-model text-center"><i class="fa fa-close"></i></div>
              </div>
            </div>
          </iphone>
        </div>
      </div>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
import moment from "moment"
import {getStorage} from '../../services/auth'
import Iphone from '../../components/Iphone'
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption],
  mounted() {
    const message = sessionStorage.message;
    if(this.$route.name === 'editmessage' && message) {
      this.edit = true;
      this.query = JSON.parse(message);
      this.dateTimeRange.startDateTime = this.query.beginTime ? moment(this.query.beginTime) : null;
      this.dateTimeRange.endDateTime = this.query.endTime ? moment(this.query.endTime) : null;
    }
  },
  data() {
    return {
      query: {
        type: 1,
        title: '',
        content: '',
        img: '',
        coverageArea: 153,
        targetUser: 0,
        beginTime: '',
        endTime: '',
        repetition: false,
        status: true
      },
      edit: false,
      loading: false,
      areaOptions: this.getAreaOnlyOptions(),
      msgOptions: [
        {label: this.$t('addMessage.js.msg1'), value: 1},
        {label: this.$t('addMessage.js.msg2'), value: 2},
        {label: this.$t('addMessage.js.msg3'), value: 3}
      ],
      userOptions: [
        {label: this.$t('addMessage.js.all'), value: 0}
      ],
      repetitionOptions: [
        {label: this.$t('addMessage.js.repetition1'), value: true},
        {label: this.$t('addMessage.js.repetition0'), value: false}
      ],
      statusOptions: [
        {label: this.$t('addMessage.js.status1'), value: true},
        {label: this.$t('addMessage.js.status0'), value: false}
      ],
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      accepts: '.jpg, .png',
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.title && this.query.content && this.query.img
            && this.dateTimeRange.startDateTime && this.dateTimeRange.endDateTime);
    }
  },
  methods: {
    goMessage() {
      this.$router.push({'name': 'message'});
    },
    submit() {
      this.query.beginTime = moment(this.dateTimeRange.startDateTime).format("YYYY-MM-DD HH:mm:ss");
      this.query.endTime = moment(this.dateTimeRange.endDateTime).format("YYYY-MM-DD HH:mm:ss");
      this.$route.name === 'addmessage'
      ? api.saveMessage(this, this.query)
      : api.updateMessage(this, this.query)
    },
    // handleStartDate(val) {
    //   return this.$route.name === 'editmessage' ? false : this.handleStartDateChange(val);
    // },
    uploadSuccess(response, file, fileList) {
      if(response.success) {
        this.query.img = response.data.message;
      } else {
        this.$message({ message: response.data.message, type: 'success' });
      }
    },
    uploadError(err, response, file) {

    }
  },
  components: {
    Iphone
  }

}
</script>

<style lang="scss">
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(8,11,12, .6);
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.iphone-notify {
  padding: 20px 5px;


  img {
    width: 100%;
  }
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
  .close-model {
    font-size: 24px;
    line-height: 24px;
  }
}
</style>
