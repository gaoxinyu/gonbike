<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addReport.box.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
      <div class="row">
        <div class="col-md-6">
          <el-form-item :label="$t('addReport.form.type')">
            <el-select v-model="query.type" style="width: 200px;">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.bikeId')" class="required">
            <el-input type="text" :placeholder="$t('addReport.form.bikeIdPlaceHolder')" v-model="query.bikeId" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.phone')">
            <el-input type="number" :placeholder="$t('addReport.form.phonePlaceHolder')" v-model="query.memberName" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.content')">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="query.content"></el-input>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.img')">
            <el-upload
              action="/api/v1/upload/file"
              :headers="headers"
              :accept="accepts"
              :multiple="false"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError">
              <el-button size="small" type="primary">{{ $t('addReport.form.upload') }}</el-button>
              <div class="el-upload__tip" slot="tip">{{ $t('addReport.form.uploadTip') }}</div>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.assignTo')">
            <el-select v-model="query.assignTo" style="width: 200px;">
              <el-option
                v-for="item in assignToOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.priority')">
            <a href="javascript:void(0)" @click="query.priority = 1" class="btn btn-sm btn-flat pull-left" :class="{'btn-danger': query.priority === 1, 'btn-default': query.priority !== 1}">{{ $t('addReport.form.priority1') }}</a>
            <a href="javascript:void(0)" @click="query.priority = 2" class="btn btn-sm btn-flat pull-left" :class="{'btn-danger': query.priority === 2, 'btn-default': query.priority !== 2}">{{ $t('addReport.form.priority2') }}</a>
            <a href="javascript:void(0)" @click="query.priority = 3" class="btn btn-sm btn-flat pull-left" :class="{'btn-danger': query.priority === 3, 'btn-default': query.priority !== 3}">{{ $t('addReport.form.priority3') }}</a>
            <a href="javascript:void(0)" @click="query.priority = 0" v-show="query.priority" class="btn btn-sm btn-flat pull-left">{{ $t('addReport.form.priority0') }}</a>
          </el-form-item>

          <el-form-item :label="$t('addReport.form.remark')">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="query.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addReport.form.save') }}</el-button>
          </el-form-item>
        </div>
      </div>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
import {getStorage} from '../../services/auth'

export default {
  mounted() {

  },
  data() {
    return {
      loading: false,
      query: {
        type: 2,
        bikeId: null,
        memberName: null,
        content: null,
        img: null,
        assignTo: 1,
        priority: 0,
        remark: null,
      },
      typeOptions: [
        {label: this.$t("addReport.js.type2"), value: 2},
        {label: this.$t("addReport.js.type5"), value: 5},
        {label: this.$t("addReport.js.type1"), value: 1},
        {label: this.$t("addReport.js.type3"), value: 3},
        {label: this.$t("addReport.js.type4"), value: 4},
        {label: this.$t("addReport.js.type6"), value: 6},
        {label: this.$t("addReport.js.type30"), value: 30},
        {label: this.$t("addReport.js.type32"), value: 32},
        {label: this.$t("addReport.js.type31"), value: 31},
      ],
      assignToOptions: [
        {label: this.$t("addReport.js.assignTo1"), value: 1},
        {label: this.$t("addReport.js.assignTo2"), value: 2},
      ],
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
      accepts: '.jpg, .png',
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.bikeId);
    }
  },
  methods: {
    goBack() {
      this.$router.push({'name': 'report'});
    },
    submit() {
      api.saveReport(this, this.query);
    },
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
}
</script>
