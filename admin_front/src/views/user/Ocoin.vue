<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('ocoin.query.title') }}
      <div class="pull-right box-tools">
        <!-- <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('trade.query.goAdd') }}</button> -->
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.beginTime')">
              <el-date-picker
                v-model="query.beginDate"
                type="date"
                :placeholder="$t('trade.query.chooseTime')"
                value-format="timestamp"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.endTime')">
              <el-date-picker
                v-model="query.endDate"
                type="date"
                :placeholder="$t('trade.query.chooseTime')"
                value-format="timestamp"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.countryId')">
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
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('trade.query.statementNo')">
              <el-input v-model="query.statementNo"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('ocoin.query.subject')">
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
          
          <div class="col-md-3 col-xs-12">
           
          </div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('trade.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>

      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedOcoins" border style="width: 100%">
        <el-table-column prop="id" :label="$t('ocoin.table.id')" width="70"></el-table-column>
        <el-table-column prop="createdAtString" :label="$t('trade.table.payTime')"></el-table-column>
        <el-table-column prop="statementNo" :label="$t('trade.table.statementNo')"></el-table-column>
        <el-table-column prop="phoneString" :label="$t('trade.table.phone')">
          <template slot-scope="scope">
            <el-button @click="handleClickPhone(scope.$index, scope.row)" type="text" size="small">{{scope.row.phoneString}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="currentBalance" :label="$t('ocoin.table.currentBalance')"></el-table-column>
        <el-table-column prop="ocoinNum" :label="$t('ocoin.table.ocoinNum')"></el-table-column>
        <el-table-column prop="subjectString" :label="$t('ocoin.table.subject')"></el-table-column>
        <el-table-column fixed="right" :label="$t('common.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with" v-if="scope.row.subject === 1">
              <el-button slot="reference" type="text" size="small">{{ $t('common.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)" :loading="loading">{{ $t('trade.table.detail') }}</el-button></div>
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

  <el-dialog :title="$t('ocoin.table.dialogTitle')" :visible.sync="detaillVisible">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th>{{ $t('trade.table.payTime') }}</th>
          <td>{{selectRow.createdAtString || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('trade.table.statementNo') }}</th>
          <td>{{selectRow.statementNo || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('trade.table.phone') }}</th>
          <td>{{selectRow.phoneString || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('ocoin.table.ocoinNum') }}</th>
          <td>{{selectRow.ocoinNum || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('ocoin.table.subject') }}</th>
          <td>{{selectRow.subjectString || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('ocoin.table.fromAccount') }}</th>
          <td>{{selectRow.fromAccount || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('ocoin.table.ocoinAccount') }}</th>
          <td>{{selectRow.ocoinAccount || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('ocoin.table.minersFee') }}</th>
          <td>{{selectRow.minersFee + ' eth' || "--"}}</td>
        </tr>
        <tr>
          <th>{{ $t('ocoin.table.txHash') }}</th>
          <td v-show="selectRow.txHash" >
            <a :href="'https://etherscan.io/tx/' + selectRow.txHash"
               target="_blank"
               style="word-wrap: break-word;word-break:break-all">
              {{selectRow.txHash}}</a>
          </td>
          <td v-show="!selectRow.txHash">--</td>
        </tr>
      </tbody>
    </table>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  created() {
    // if(!this.$route.query.phone && !this.$route.query.statementNo) {
    //   const { startDate, endDate, startDateStr, endDateStr } = this.getDefaultDate();   // query.js
    //   this.beginDate = startDate;
    //   this.endDate = endDate;
    //   this.query.beginDate = startDateStr;
    //   this.query.endDate = endDateStr;
    // }
  },
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: false,
      selectRow: {},
      ocoins: [],
      detaillVisible: false,
      query: {
        pageNum: 1,
        countryId: null,
        beginDate: null,
        endDate: null,
        phone: this.$route.query.phone,
        subject: null,
        statementNo: this.$route.query.statementNo,
      },
      page: {
        count: 0
      },
      subjectOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('ocoin.js.subject1'), value: 1},
        {label: this.$t('ocoin.js.subject2'), value: 2},
        {label: this.$t('ocoin.js.subject3'), value: 3},
        // {label: this.$t('ocoin.js.subject4'), value: 4},
        // {label: this.$t('ocoin.js.subject5'), value: 5},
        // {label: this.$t('ocoin.js.subject6'), value: 6},
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedOcoins() {
      return this.ocoins.map((item) => {
        return {
            ...item,
            phoneString: item.countryCode ? "+" + item.countryCode + " " + item.phone : item.phone,
            createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : '',
            subjectString: this.$t('ocoin.js.subject' + item.subject),
          }
      })
    },
  },
  methods: {
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getOcoinTradeList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getOcoinTradeList(this, this.query)
    },
    handleClickPhone(index, row) {
      this.query.phone = row.phone;
      this.handleQuery();
    },
    detail(index, row) {
      this.selectRow = row;
      this.detaillVisible = true;
    },
  },
  components: {
  }
}
</script>