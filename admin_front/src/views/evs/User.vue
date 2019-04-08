<template>
<div class="evs-user-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('user.query.title') }}
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.createdAt')">
              <el-date-picker
                v-model.number="query.beginDate"
                type="date"
                :placeholder="$t('user.query.chooseTime')"
                value-format="timestamp"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.endTime')">
              <el-date-picker
                v-model.number="query.endDate"
                type="date"
                :placeholder="$t('user.query.chooseTime')"
                value-format="timestamp"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <!-- <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.memberId')">
              <el-input v-model="query.memberId"></el-input>
            </el-form-item>
          </div> -->

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('user.query.countryId')">
              <el-select v-model="query.countryId" filterable>
                <el-option
                  v-for="item in countrys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('user.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedUsers" border style="width: 100%">
        <el-table-column prop="id" :label="$t('user.table.memberId')" width="70"></el-table-column>
        <el-table-column prop="name" :label="$t('evsUser.table.name')"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('user.table.createdAt')" min-width="150"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('user.table.phone')" min-width="150"></el-table-column>
        <el-table-column prop="countryName" :label="$t('evsUser.table.countryName')" min-width="80"></el-table-column>
        <el-table-column prop="statusString" :label="$t('user.table.status')" min-width="110"></el-table-column>
        <el-table-column fixed="right" :label="$t('user.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('user.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="updateAccount(scope.$index, scope.row)">{{scope.row.status == 1 ? $t('user.table.statusBtn0') : $t('user.table.statusBtn1')}}</el-button></div>
            </el-popover>
          </template>
        </el-table-column>
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
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query],
  created() {
    // if(!this.$route.query.phone) {
    //   const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
    //   this.createdAt = startDate;
    //   this.endTime = endDate;
    //   this.query.createdAt = startDateStr;
    //   this.query.endTime = endDateStr;
    // }
  },
  mounted() {
    this.handleQuery();
    this.getAllCountrys();
  },
  data () {
    return {
      loading: false,
      users: [],
      query: {
        createdAt: null,
        endTime: null,
        phone: this.$route.query.phone,
        status: null,
        countryId: null,
        pageNum: 1,
      },
      page: {
        count: 0
      },
      // areaOptions: this.getAreaOptions(),
      countrys: [],
    }
  },
  computed: {
    computedUsers() {
      return this.users.map((item) => {
        return {
            ...item,
            phoneString: item.countryCode ? "+" + item.countryCode + " " + item.phone : item.phone,
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
            statusString: item.status === 1 ? this.$t('user.js.status0') : item.status == 0 ? this.$t('user.js.status1') : "",
          }
      })
    }
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getEvsUserList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getEvsUserList(this, this.query)
    },
    updateAccount(index, row) {
      const opt = row.status == 1 ? this.$t('user.js.statusString0') : this.$t('user.js.statusString1');
      this.$confirm(opt, this.$t('user.js.tip'), {
        confirmButtonText: this.$t('user.js.ok'),
        cancelButtonText: this.$t('user.js.cancel'),
        type: 'warning'
      }).then(() => {
        const apiStr = row.status == 0 ? 'updateEvsUserFrozen' : 'updateEvsUserUnFrozen';
        api[apiStr](this, { 'id': row.id }).then(() => {
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    getAllCountrys() {
      api.getCountryList(this).then(() => { 
        this.countrys.unshift({id: null, name: this.$t('city.js.all')}); 
      });
    }
  },
  components: {
  }
}
</script>
