<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('pushrec.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="90px">
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('pushrec.query.createdTime')">
                <el-date-picker
                  v-model="createdAt"
                  type="date"
                  :placeholder="$t('pushrec.query.chooseTime')"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('pushrec.query.userId')">
                <el-input v-model="query.userPhone"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('pushrec.query.fbtoken')">
                <el-input v-model="query.firebaseToken"></el-input>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('pushrec.query.functype')">
                <el-select v-model="query.category">
                  <el-option
                    v-for="item in funcTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('pushrec.query.pushtime')">
                <el-select v-model="query.occasion">
                  <el-option
                    v-for="item in pushTimeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12">
              <el-form-item :label="$t('pushrec.query.languageId')">
                <el-select v-model="query.language">
                  <el-option
                    v-for="item in langOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-md-3 col-xs-12"></div>
            <div class="col-md-3 col-xs-12">
              <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('pushrec.query.query') }}</el-button>
              <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <el-table v-loading="loading" :data="computedPushRecs" border style="width: 100%">
            <el-table-column prop="id" :label="$t('pushrec.table.id')" width="70px"></el-table-column>
            <el-table-column prop="createdAtString" :label="$t('pushrec.table.createdAt')" width="140px"></el-table-column>
            <el-table-column prop="userPhone" :label="$t('pushrec.table.userId')" width="140px"></el-table-column>
            <el-table-column prop="target" :label="$t('pushrec.table.fbtoken')" min-width="300"></el-table-column>
            <el-table-column prop="funcTypeString" :label="$t('pushrec.table.type')" width="140"></el-table-column>
            <el-table-column prop="pushTimeString" :label="$t('pushrec.table.pushtime')" width="140"></el-table-column>
            <el-table-column prop="language" :label="$t('pushrec.table.language')"></el-table-column>
            <el-table-column prop="title" :label="$t('pushrec.table.title')" width="100"></el-table-column>
            <el-table-column prop="content" :label="$t('pushrec.table.content')" width="200"></el-table-column>
            <el-table-column prop="arrivedString" :label="$t('pushrec.table.isreached')"></el-table-column>
            <el-table-column prop="remark" :label="$t('pushrec.table.remark')" min-width="140"></el-table-column>
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
  </div>
</template>

<script>
import api from '../../api';
// import * as Options from '../../services/options';
import Mixins from '../../mixins/index.js'
import moment from 'moment';

export default {
  mixins: [Mixins.country, Mixins.language, Mixins.common, Mixins.query],
  created() {
    if(!this.$route.query.category && !this.$route.query.occasion) {
      const { startDate, startTimestamp } = this.getDefaultDate();   // query.js
      this.createdAt = startDate;
      this.query.createdAtLong = startTimestamp;
    }
  },
  mounted() {
    // this.query.category = this.$route.query.category ? parseInt(this.$route.query.category) : null;
    // this.query.occasion = this.$route.query.occasion ? parseInt(this.$route.query.occasion) : null;
    api.getPushRecList(this, this.query);
  },
  data() {
    return {
      loading: false,
      pushrecs: [],
      query: {
        pageNum: 1,
        templateId: null,
        createdAtLong: null,
        userPhone: null,
        firebaseToken: null,
        category: this.$route.query.category ? +this.$route.query.category : null,
        occasion: this.$route.query.occasion ? +this.$route.query.occasion : null,
        language: null
      },
      createdAt: null,
      // pickerOptions: Options.pickerOptions,
      page: {
        count: 0
      },
      pushTimeOptions: [
        { label: this.$t('funcnews.js.pushtype0'), value: null },
        ...[...Array(55)].map((item,index) => { return { label: this.$t('funcnews.js.pushtype' + (index+1)), value: index+1 }})
      ],
      funcTypes: [
        { label: this.$t('funcnews.js.functype0'), value: null },
        ...[...Array(13)].map((item,index) => { return { label: this.$t('funcnews.js.functype' + (index+1)), value: index+1 }})
      ],
      langOptions: this.getLangOptions()
    }
  },
  computed: {
    computedPushRecs() {
      return this.pushrecs.map((item) => {
        return {
          ...item,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
          funcTypeString: item.category ? this.getNameById(this.funcTypes, item.category) : '',
          pushTimeString: item.occasion ? this.getNameById(this.pushTimeOptions, item.occasion) : '',
          language: item.language ? this.getNameById(this.getLangOnlyOptions(), item.language) : '',
          arrivedString: item.arrived ? '是' : '否'
        }
      });
    }
  },
  methods: {
    handleQuery() {
      this.query.pageNum = 1;
      this.query.createdAtLong = this.createdAt ? this.createdAt.getTime() : null;
      api.getPushRecList(this, this.query);
    },
    handleCurrentChange(val) {
      this.query.pageNum = val;
      api.getPushRecList(this, this.query);
    },
    goBack() {
      this.$router.push({name: 'func'});
    }
  }
}
</script>
