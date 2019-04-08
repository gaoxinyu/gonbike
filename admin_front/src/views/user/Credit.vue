<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('credit.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAddCredit"><i class="fa fa-plus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('credit.query.beginTime')">
              <el-date-picker
                v-model="query.beginTime"
                type="date"
                :placeholder="$t('credit.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('credit.query.endTime')">
              <el-date-picker
                v-model="query.endTime"
                type="date"
                :placeholder="$t('credit.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('credit.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('credit.query.subject')">
              <el-select v-model="query.subject">
                <el-option
                  v-for="item in subjectOptions"
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
          </div>
          
          <div class="col-md-3 col-xs-12">
          </div>

          <div class="col-md-3 col-xs-12">
          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('credit.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
        
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCredits" border style="width: 100%">
        <el-table-column prop="id" :label="$t('credit.table.id')" width="80"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('credit.table.phone')" width="150"></el-table-column>
        <el-table-column prop="currentAmount" :label="$t('credit.table.currentAmount')"></el-table-column>
        <el-table-column prop="amount" :label="$t('credit.table.amount')"></el-table-column>
        <el-table-column prop="afterChangeAmount" :label="$t('credit.table.afterChangeAmount')"></el-table-column>
        <el-table-column prop="subjectString" :label="$t('credit.table.subjectName')" width="180"></el-table-column>
        <el-table-column prop="createName" :label="$t('credit.table.createName')"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('credit.table.createdAt')" width="160"></el-table-column>
        <el-table-column prop="desc" :label="$t('credit.table.desc')"></el-table-column>
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
    if(!this.$route.query.phone) {
      const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
      this.beginTime = startDate;
      this.endTime = endDate;
      this.query.beginTime = startDateStr;
      this.query.endTime = endDateStr;
    }
  },
  mounted() {
    api.getCreditList(this, this.query)
  },
  data () {
    return {
      loading: false,
      credits: [],
      query: {
        beginTime: null,
        endTime: null,
        phone: this.$route.query.phone,
        pageNum: 1,
        subject: null,
      },
      page: {
        count: 0
      },
      subjectOptions: [
        {label: this.$t('trade.js.all'), value: null},
        {label: this.$t('addCredit.js.subject1'), value: 1},
        {label: this.$t('addCredit.js.subject2'), value: 2},
        {label: this.$t('addCredit.js.subject3'), value: 3},
        {label: this.$t('addCredit.js.subject4'), value: 4},
        {label: this.$t('addCredit.js.subject5'), value: 5},
        {label: this.$t('addCredit.js.subject6'), value: 6},
        {label: this.$t('addCredit.js.subject7'), value: 7},
        {label: this.$t('addCredit.js.subject8'), value: 8},
        {label: this.$t('addCredit.js.subject9'), value: 9},
        {label: this.$t('addCredit.js.subject10'), value: 10},
        {label: this.$t('addCredit.js.subject11'), value: 11},
        {label: this.$t('addCredit.js.subject12'), value: 12},
        {label: this.$t('addCredit.js.subject13'), value: 13},
        {label: this.$t('addCredit.js.subject14'), value: 14},
        {label: this.$t('addCredit.js.subject15'), value: 15},
        {label: this.$t('addCredit.js.subject17'), value: 17},
        {label: this.$t('addCredit.js.subject18'), value: 18},
        {label: this.$t('addCredit.js.subject19'), value: 19},
        {label: this.$t('addCredit.js.subject20'), value: 20},
        {label: this.$t('addCredit.js.subject21'), value: 21},
        {label: this.$t('addCredit.js.subject16'), value: 16},
      ],
      // pickerOptions: Options.pickerOptions,
    }
  },
  computed: {
    computedCredits() {
      return this.credits.map((item) => {
        return {
          ...item,
          phoneString: item.code ? "+" + item.code + " " + item.phone : item.phone,
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          subjectString: this.$t('addCredit.js.subject' + item.subject),
        }
      })
    }
  },
  methods: {
    goAddCredit() {
      // this.$router.push({name: "addcredit"});
      // window.open(location.href + "/add");
      window.open(location.href.split(location.pathname)[0] + "/user/credit/add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCreditList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCreditList(this, this.query)
    },
  },
  components: {
  }
}
</script>