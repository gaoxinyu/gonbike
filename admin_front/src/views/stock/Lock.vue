<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('lock.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('lock.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.createdAt')">
              <el-date-picker
                v-model="createdAt"
                type="daterange"
                @change="handleCreatedAt"
                value-format="yyyy-MM-dd"
                :placeholder="$t('lock.query.chooseTime')"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.type')">
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

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.status')">
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

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.lockNo')">
              <el-input v-model="query.lockNo"></el-input>
            </el-form-item>
          </div>
          
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.imei')">
              <el-input v-model="query.imei"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('lock.query.manufacture')">
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
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('lock.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedlocks" border style="width: 100%">
        <el-table-column prop="lockId" :label="$t('lock.table.lockId')" width="70"></el-table-column>
        <el-table-column prop="lockNo" :label="$t('lock.table.lockNo')" width="120"></el-table-column>
        <el-table-column prop="imei" :label="$t('lock.table.imei')" width="120"></el-table-column>
        <el-table-column prop="typeString" :label="$t('lock.table.type')"></el-table-column>
        <el-table-column prop="manufactureString" :label="$t('lock.table.manufacture')" width="110"></el-table-column>
        <el-table-column prop="statusString" :label="$t('lock.table.status')"></el-table-column>
        <el-table-column prop="electricity" :label="$t('lock.table.electricity')"></el-table-column>
        <el-table-column prop="id" :label="$t('lock.table.id')" width="100"></el-table-column>
        <!-- <el-table-column prop="secretKey" :label="$t('lock.table.secretKey')" width="160"></el-table-column> -->
        <!-- <el-table-column prop="unlockKey" :label="$t('lock.table.unlockKey')" width="160"></el-table-column> -->
        <el-table-column prop="lockCreatedAtString" :label="$t('lock.table.lockCreatedAt')" width="180"></el-table-column>
        <el-table-column prop="simNo" :label="$t('lock.table.simNo')"></el-table-column>
        <el-table-column fixed="right" :label="$t('lock.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('lock.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('lock.table.detail') }}</el-button></div>
              <div><el-button type="text" size="small" @click="update(scope.$index, scope.row)">{{ $t('lock.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">{{ $t('lock.table.delete') }}</el-button></div>
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

  <el-dialog :title="$t('lock.table.title')" :visible.sync="detailVisible">
    <div class="row">
      <div class="col-md-4">{{ $t('lock.table.lockNo') }}：{{selectRow.lockNo || "--"}}</div>
      <div class="col-md-4">{{ $t('lock.table.type') }}：{{selectRow.typeString || "--"}}</div>
      <div class="col-md-4">{{ $t('lock.table.imei') }}：{{selectRow.imei || "--"}}</div>
    </div>
    <div class="row">
      <div class="col-md-4">{{ $t('lock.table.id') }}：{{selectRow.id || "--"}}</div>
      <!-- <div class="col-md-4">{{ $t('lock.table.secretKey') }}：{{selectRow.secretKey || "--"}}</div> -->
      <!-- <div class="col-md-4">{{ $t('lock.table.unlockKey') }}：{{selectRow.unlockKey || "--"}}</div> -->
    </div>
    <div class="row">
      <div class="col-md-4">{{ $t('lock.table.lockCreatedAt') }}：{{selectRow.lockCreatedAtString || "--"}}</div>
      <div class="col-md-4">{{ $t('lock.table.simNo') }}：{{selectRow.simNo || "--"}}</div>
      <div class="col-md-4">{{ $t('lock.table.manufacture') }}：{{selectRow.manufactureString || "--"}}</div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.query],
  mounted() {
    // api.getLockList(this, this.query)
  },
  data () {
    return {
      loading: false,
      detailVisible: false,
      selectRow: {},
      locks: [],
      createdAt: null,
      query: {
        beginCreatedAt: null,
        endCreatedAt: null,
        imei: null,
        type: null,
        pageNum: 1,
        lockNo: null,
        status: null,
        manufacture: null,
      },
      page: {
        count: 0
      },
      typeOptions: [
        {label: this.$t('lock.js.all'), value: null},
        {label: this.$t('lock.js.type1'), value: 1},
        {label: this.$t('lock.js.type2'), value: 2},
        {label: this.$t('lock.js.type3'), value: 3},
      ],
      statusOptions: [
        {label: this.$t('lock.js.all'), value: null},
        {label: this.$t('lock.js.status1'), value: 1},
        {label: this.$t('lock.js.status2'), value: 2},
        {label: this.$t('lock.js.status3'), value: 3},
      ],
      manufactureOptions: [
        {label: this.$t('common.all'), value: null},
        {label: this.$t('lock.js.manufacture1'), value: 1},
        {label: this.$t('lock.js.manufacture2'), value: 2},
      ]
    }
  },
  computed: {
    computedlocks() {
      return this.locks.map((item) => {
        return {
          ...item,
          typeString: this.$t('lock.js.type' + item.lockType),
          // typeString: item.lockType === 1 ? this.$t('lock.js.type1') : item.lockType === 2 ? this.$t('lock.js.type2') : item.lockType === 3 ? this.$t('lock.js.type3') : "",
          statusString: item.lockStatus === 1 ? this.$t('lock.js.status1') : item.lockStatus === 2 ? this.$t('lock.js.status2') : item.lockStatus === 3 ? this.$t('lock.js.status3') : "",
          lockCreatedAtString: item.lockCreatedAt ? moment(item.lockCreatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
          manufactureString: item.manufacture ? this.$t('lock.js.manufacture' + item.manufacture) : '',
        }
      })
    }
  },
  methods: {
    goAdd() {
      // this.$router.push({name: "addlock"});
      window.open(location.href.split(location.pathname)[0] + "/stock/lock/add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getLockList(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getLockList(this, this.query)
    },
    detail(index, row) {
      this.detailVisible = true;
      this.selectRow = row;
    },
    update(index, row) {
      let lock = this.locks[index] || {};
      lock.type = lock.lockType;
      lock.id = lock.lockId;
      sessionStorage.lock = JSON.stringify(lock);
      this.$router.push({name: "editlock"});
    },
    deleteRow(index, row) {
      this.$confirm(this.$t('lock.js.message', {lockNo: row.lockNo}), this.$t('lock.js.tip'), {
        confirmButtonText: this.$t('lock.js.ok'),
        cancelButtonText: this.$t('lock.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteLock(this, {lockId: row.lockId}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    handleCreatedAt(datas) {
      if(datas) {
        this.query.beginCreatedAt = datas[0];
        this.query.endCreatedAt = datas[1];
      } else {
        this.query.beginCreatedAt = '';
        this.query.endCreatedAt = '';
      }
    },
  },
  components: {
  }
}
</script>