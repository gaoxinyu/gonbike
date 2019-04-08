<template>
<div>
  <div class="row">
    <div class="col-md-6">
      <div class="box box-info">
        <div class="box-header with-border">
          {{ $t('addLock.form.title1') }}
          <div class="pull-right box-tools">
            <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
          </div>
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="120px">
            
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('addLock.form.type')">
                  <el-select v-model="query.type">
                    <el-option
                      v-for="item in typeOptions"
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
                <el-form-item :label="$t('addLock.form.lockNo')" class="required">
                  <el-input v-model="query.lockNo"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('lock.query.manufacture')" class="required">
                  <el-select v-model="query.manufacture">
                    <el-option
                      v-for="item in manufactureOptions"
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
                <el-form-item :label="$t('addLock.form.imei')" class="required">
                  <el-input v-model="query.imei"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('addLock.form.simNo')">
                  <el-input v-model="query.simNo"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('addLock.form.secretKey')" class="required">
                  <el-input v-model="query.secretKey"></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('addLock.form.unlockKey')" class="required">
                  <el-input v-model="query.unlockKey"></el-input>
                </el-form-item>
              </div>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addLock.form.submit') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="col-md-6" v-if="$route.name === 'addlock'">
      <div class="box box-info">
        <div class="box-header with-border">
          {{ $t('addLock.form.title2') }}
          <div class="pull-right box-tools">
            <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
          </div>
        </div>
        <div class="box-body">
          <el-form label-position="left" label-width="120px">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <el-form-item :label="$t('addLock.form.type')">
                  <el-select v-model="uploadData.type">
                    <el-option
                      v-for="item in typeOptions"
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
                <el-form-item :label="$t('lock.query.manufacture')" class="required">
                  <el-select v-model="uploadData.manufacture">
                    <el-option
                      v-for="item in manufactureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <el-form-item>
              <el-upload
                action="/api/v1/lock/bike-lock/file"
                :show-file-list="false"
                :multiple="false"
                name="filename"
                :data="uploadData"
                :headers="headers"
                :on-success="uploadSuccess"
                :on-progress="uploadProgress"
                :on-error="uploadError">
                <el-button size="small" type="primary" :disabled="loading" :loading="loading">{{ $t('addLock.form.import') }}</el-button>
                <div class="el-upload__tip" slot="tip" v-show="loading">{{ $t('addLock.form.tip') }}</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"
import {getStorage} from '../../services/auth'

export default {
  mounted() {
    const lock = sessionStorage.lock;
    if(this.$route.name === 'editlock' && lock) {
      this.query = JSON.parse(lock);
    }
  },
  data() {
    return {
      loading: false,
      uploadData: {
        type: 1,
        manufacture: 1,
      },
      query: {
        type: 1,
        lockNo: null,
        imei: null,
        simNo: null,
        secretKey: null,
        unlockKey: null,
        manufacture: null,
      },
      typeOptions: [
        {label: this.$t('addLock.js.type1'), value: 1},
        {label: this.$t('addLock.js.type2'), value: 2},
        {label: this.$t('addLock.js.type3'), value: 3},
      ],
      manufactureOptions: [
        {label: this.$t('lock.js.manufacture1'), value: 1},
        {label: this.$t('lock.js.manufacture2'), value: 2},
      ],
      headers: {'Authorization': getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.lockNo && this.query.manufacture && this.query.imei && this.query.secretKey && this.query.unlockKey);
    }
  },
  methods: {
    goBack() {
      this.$router.push({'name': 'lock'});
    },
    submit() {
      if(this.$route.name === 'addlock') {
        api.saveLock(this, this.query);
      } else {
        api.updateLock(this, this.query);
      }
    },
    uploadProgress() {
      this.loading = true;
    },
    uploadSuccess(response, file, fileList) {
      this.loading = false;
      if(response.success) {
        const msg = this.$t('addLock.js.msg', {success: response.data.success, fail: response.data.fail}); //'导入'+ response.data.success +'条数据成功，'+ response.data.fail +'条数据失败';
        this.$message({ message: msg, type: 'success' });
        this.goBack();
      } else {
        this.$message({ message: response.data.error, type: 'error' });
      }
    },
    uploadError(err, response, file) {
      this.loading = false;
    },
  }

}
</script>
