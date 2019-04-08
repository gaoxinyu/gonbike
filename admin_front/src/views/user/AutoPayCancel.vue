<template>
  <div class="user-auto-cancel">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('autocancel.query.title') }}
        <el-button class="pull-right" type="primary" @click="back">{{ $t('autocancel.query.back') }}</el-button>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('autocancel.query.phone')">
                <el-input v-model="query.phone"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('autocancel.query.countryId')">
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
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('autocancel.query.adminPhone')">
                <el-input v-model="query.adminPhone"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('autocancel.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>

    <div class="box box-solid">
      <div class="box-body">
        <el-table v-loading="loading" :data="computedAutocancels" border style="width: 100%">
          <el-table-column prop="id" :label="$t('autocancel.table.id')" width="60"></el-table-column>
          <el-table-column prop="phone" :label="$t('autocancel.table.phone')"></el-table-column>
          <el-table-column prop="countryName" :label="$t('autocancel.table.countryId')"></el-table-column>
          <el-table-column prop="admin" :label="$t('autocancel.table.admin')"></el-table-column>
          <el-table-column prop="createdAtString" :label="$t('autocancel.table.createdAt')"></el-table-column>
        </el-table>
        <div class="row text-center">
          <div class="col-md-12">
            <el-pagination 
              layout="total, prev, pager, next" 
              :total="page.count"
              :page-size="page.per"
              :current-page="page.current"
              @current-change="handleCurrentChange"
              ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import Mixins from "../../mixins/index.js";
import moment from "moment";

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],

  mounted() {
    api.getAutoCancelLog(this, this.query);
  },

  data() {
    return {
      loading: false,
      autocancels: [],
      query: {
        countryId: null,
        phone: null,
        adminPhone: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOptions()
    }
  },

  computed: {
    computedAutocancels() {
      return this.autocancels.map((item) => {
        return {
          ...item,
          admin: (item.adminName ? item.adminName + ' | ' : '') + (item.adminPhone ? item.adminPhone : ''),
          createdAtString: item.createdAt ? moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') : ''
        }
      })
    }
  },

  methods: {
    back() {
      this.$router.push('autopay');
    },
    handleQuery() {
      api.getAutoCancelLog(this, this.query);
    },

    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getAutoCancelLog(this, this.query);
      }
    }
  }
};
</script>

