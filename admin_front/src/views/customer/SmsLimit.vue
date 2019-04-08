<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('smsLimit.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('smsLimit.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('smsLimit.query.countryId')">
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
            <el-form-item :label="$t('smsLimit.query.phone')">
              <el-input v-model="query.phone"></el-input>
            </el-form-item>
          </div>
          <div class="col-md-3 col-xs-12"></div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('smsLimit.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
            <el-button class="pull-right" type="warning" @click="exportQuery" :loading="loading" :plain="true">{{ $t('common.exportQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedSmsBlackList" border style="width: 100%">
        <el-table-column prop="id" :label="$t('smsLimit.table.id')" width="60"></el-table-column>
        <el-table-column prop="codeString" :label="$t('smsLimit.table.countryId')" width="120"></el-table-column>
        <el-table-column prop="phone" :label="$t('smsLimit.table.phone')"></el-table-column>
        <el-table-column prop="remark" :label="$t('smsLimit.table.remark')"></el-table-column>
        <el-table-column fixed="right" :label="$t('smsLimit.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('smsLimit.table.operate') }}</el-button>
              <div><el-button type="text" size="small" @click="editRemark(scope.$index, scope.row)">{{ $t('smsLimit.table.edit') }}</el-button></div>
              <div><el-button type="text" size="small" @click="deleteBlack(scope.$index, scope.row)">{{ $t('smsLimit.table.delete') }}</el-button></div>
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
    <!--添加-->
    <el-dialog :title="$t('smsLimit.dialog.title')" :visible.sync="dialogVisible">
      <el-form label-position="left" label-width="90px">
        <el-form-item :label="$t('smsLimit.form.countryId')" class="required">
          <el-select v-model="form.countryId">
            <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('smsLimit.form.phone')" class="required">
          <el-input
            type="textarea"
            :autoSize="{ minRows: 2, maxRows: 10}"
            :placeholder="$t('smsLimit.form.placeholder')"
            v-model="proPhone">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('smsLimit.form.cancel') }}</el-button>
        <el-button type="primary" @click="addSubmit" :disabled="submitDisabled">{{ $t('smsLimit.form.submit') }}</el-button>
      </span>
    </el-dialog>
    <!--备注-->
    <el-dialog :title="$t('smsLimit.dialog.title1')" :visible.sync="remarkVisible">
      <el-form label-position="left" label-width="90px">
        <el-form-item :label="$t('smsLimit.form.phone')">
            {{ '+' + remark.code + ' ' + remark.phone }}
        </el-form-item>
        <el-form-item :label="$t('smsLimit.form.remark')" class="required">
          <el-input
            type="textarea"
            :autoSize="{ minRows: 2, maxRows: 10}"
            v-model="remark.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remarkVisible = false">{{ $t('smsLimit.form.cancel') }}</el-button>
        <el-button type="primary" @click="remarkSubmit" :disabled="remarkDisabled">{{ $t('smsLimit.form.submit') }}</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'
import {getStorage} from '../../services/auth'

export default {
  mixins: [Mixins.query, Mixins.country],
  mounted() {
    this.handleQuery();
    api.getSmsBlackList(this, {});
  },
  data () {
    return {
      loading: true,
      smsBlackList: [],
      query: {
          countryId: null,
          phone: null
      },
      page: {
        count: 0
      },
      areaOptions: this.getAreaOnlyOptions(),
      dialogVisible: false,
      form: {
        countryId: 153,
        phone: ''
      },
      remarkVisible: false,
      remark: {
        id: null,
        remark: null
      },
      proPhone: '',
      headers: {Authorization: getStorage('token') ? 'Bearer ' + getStorage('token').accessToken : ''},
    }
  },
  computed: {
    computedSmsBlackList() {
      return this.smsBlackList.map((item) => {
        return {
          ...item,
          codeString: item.code ? '+' + item.code : ''
        }
      })
    },
    submitDisabled() {
        return !(this.form.countryId && this.proPhone !== '');
    },
    remarkDisabled() {
        return !(this.remark.remark);
    }
  },
  methods: {
    goAdd() {
      this.dialogVisible = true;
    },
    handleQuery() {
      api.getSmsBlackList(this, this.query);
    },
    editRemark(index, row) {
      this.remarkVisible = true;
      this.remark = row;
    },
    deleteBlack(index, row) {
      this.$confirm(this.$t('smsLimit.js.deleteBlack', {phone: '+' + row.code + ' ' + row.phone}), this.$t('smsLimit.js.tip'), {
        confirmButtonText: this.$t('smsLimit.js.ok'),
        cancelButtonText: this.$t('smsLimit.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteSmsBlackList(this, {phone: row.phone, countryId: row.countryId}).then(() => {
          this.handleQuery();
        });
      }).catch(() => {
           
      });
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getSmsBlackList(this, this.query);
      }
    },
    addSubmit() {
        this.proPhone = this.proPhone.trim().replace(/(\r\n|\n|\r)/g, ',');
        this.form.phone = this.proPhone.split(',').filter(item => item.match(/^\d{3,18}$/)).join(',');
        if(this.form.phone != '') {
          api.saveSmsBlackList(this, this.form)
            .then(() => {
                this.dialogVisible = false;
                api.getSmsBlackList(this, this.query);
            });
        }
        else {
          this.$message({ message: this.$t('smsLimit.js.textTip'), type: 'error' });
          this.proPhone = '';
        }
    },
    remarkSubmit() {
        api.updateSmsBlackList(this, this.remark)
          .then(() => {
              this.remarkVisible = false;
              api.getSmsBlackList(this, this.query);
          })
    },
    resetQuery() {
      this.query = {
        countryId: null,
        phone: null
      }
    },
    exportQuery() {
      let parms = [];
      for(let key in this.query) {
        if(this.query[key] !== null && this.query[key] !== '' && this.query[key] !== undefined) {
          parms.push(key + '=' + this.query[key]);
        }
      }

      let iframe = document.createElement("iframe");
      iframe.id = 'iframeRequest';
      iframe.style.display = 'none';
      iframe.src = '/api/v1/black-list/file?' + parms.join('&') + '&Authorization=' + this.headers.Authorization;
      document.body.appendChild(iframe);
    }
  }
}
</script>