<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('addBike.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="120px">

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBike.query.bikeId')" class="required">
              <el-input v-model="query.bikeId" :placeholder="$t('addBike.query.bikeIdPlaceHolder')"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBike.query.lockNo')" class="required">
              <el-autocomplete
                class="inline-input"
                v-model="query.lockNo"
                :fetch-suggestions="querySearch"
                :placeholder="$t('addBike.query.lockNoPlaceholder')"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBike.query.imei')">
              <el-input v-model="imei" disabled></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 col-xs-12">
            <el-form-item :label="$t('addBike.query.mac')">
              <el-input v-model="mac" disabled></el-input>
            </el-form-item>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="submitDisabled" :loading="loading">{{ $t('addBike.query.query') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import api from "../../api"

export default {
  mounted() {
    api.getLockUnbindList(this);
  },
  data() {
    return {
      query: {
        bikeId: null,
        lockId: null,
        lockNo: null
      },
      unbindLocks: [],
      lockNo: null,
      imei: null,
      mac: null,
      loading: false
    }
  },
  computed: {
    submitDisabled() {
      return !(this.query.bikeId && this.query.lockId);
    }
  },
  methods: {
    goBack() {
      this.$router.push({'name': 'bike'});
    },
    submit() {
      api.updateBikeLock(this, this.query);
    },
    querySearch(queryString, cb) {
      var unbindLocks = this.unbindLocks;
      var results = queryString ? unbindLocks.filter(this.createFilter(queryString)) : unbindLocks;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (unbindLock) => {
        return (unbindLock.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      if(item) {
        this.query.lockId = item.id;
        this.imei = item.imei;
        this.mac = item.mac;
      }
    }
  }

}
</script>
