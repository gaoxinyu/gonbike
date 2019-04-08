<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('account.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('account.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('account.query.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('addAccount.form.roleId')">
              <el-select v-model="query.roleId">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('account.query.status')">
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
            <el-form-item :label="$t('account.query.countryId')">
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
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery()" :loading="loading">{{ $t('account.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedAccountList" border style="width: 100%">
        <el-table-column prop="id" :label="$t('account.table.id')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('account.table.name')" width="120px"></el-table-column>
        <el-table-column prop="fullContact" :label="$t('account.table.phone')" width="120px"></el-table-column>
        <el-table-column prop="realName" :label="$t('account.table.realName')"></el-table-column>
        <el-table-column prop="statusString" :label="$t('account.table.status')"></el-table-column>
        <el-table-column prop="roleName" :label="$t('account.table.role')"></el-table-column>
        <el-table-column prop="countryName" :label="$t('account.table.country')"></el-table-column>
        <el-table-column prop="cityName" :label="$t('account.table.city')"></el-table-column>
        <el-table-column prop="period" :label="$t('account.table.period')" min-width="200px"></el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('account.table.updatedAt')" width="140px"></el-table-column>
        <el-table-column fixed="right" :label="$t('account.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('account.table.operate') }}</el-button>
              <div><el-button @click="edit(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.edit') }}</el-button></div>
              <div><el-button @click="showWebAuth(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.showWebAuth') }}</el-button></div>
              <div><el-button @click="showAppAuth(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.showAppAuth') }}</el-button></div>
              <div><el-button @click="resetPassword(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.resetPassword') }}</el-button></div>
              <div><el-button @click="detail(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.detail') }}</el-button></div>
              <div><el-button @click="deleteAdmin(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.deleteAdmin') }}</el-button></div>
              <div><el-button @click="frozenAdmin(scope.$index, scope.row)" type="text" size="small" >{{ $t('account.table.frozenAdmin') }}</el-button></div>
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

  <el-dialog :title="$t('account.dialog.title1', {name: selectedAccount.name})" :visible.sync="webAuthVisible">
    <el-form label-position="left" label-width="80px">
      <div v-for="(menus, key) in menuTree" :key="key">
        <el-form-item :label="$t('menu.' + key + '.name')">
          <span style="display:inline-block; width: 140px;" :class="{'text-aqua': menu.possess}" v-for="(menu, index) in menus" :key="index">
            <i v-if="menu.possess" class="fa fa-check"></i> <i v-if="!menu.possess" class="fa fa-close"></i> {{ $t('menu.' + key + '.' + menu.name) }}
          </span>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>

  <el-dialog :title="$t('account.dialog.title2', {name: selectedAccount.name})" :visible.sync="appAuthVisible">
    <div class="row">
      <div class="col-md-3" v-for="(module, key) in modules" :key="key" :class="{'text-aqua': module.possess}">
        <i v-if="module.possess" class="fa fa-check"></i> <i v-if="!module.possess" class="fa fa-close"></i><span>{{ module.name }}</span>
      </div>
    </div>
  </el-dialog>
  <!-- 重置密码 zhu 2017.09.19 -->
  <el-dialog :title="$t('account.dialog.title3')" width="30%" :visible.sync="rstPassVisible">
    <p><i class="el-icon-warning warning"></i>{{ $t('account.dialog.rsttip', { name: resetAccount.name}) }}</p>
    <label>{{ $t('account.dialog.resetpass', { name: resetAccount.name}) }}</label>
    <div class="row">
      <div class="col-md-6">
        <el-input v-model="rstpassword"></el-input>
        <p class="error" v-show="showrstTip">{{ $t('account.dialog.rstpassTip') }}</p>
      </div>
      <div class="col-md-3">
        <el-button @click="customPass" type="primary">{{ $t('account.dialog.custompass') }}</el-button>
      </div>
      <div class="col-md-3">
        <el-button v-clipboard="rstpassword">{{ $t('account.dialog.passcopy') }}</el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitRstPass" :disabled="!rstpassword || showrstTip">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    this.handleQuery();
    this.getAllRoles();
  },
  data () {
    return {
      loading: false,
      accountList: [],
      query: {
        pageNum: 1,
        name: '',
        roleId: null,
        status: 1,
        countryId: null,
      },
      page: {
        count: 0
      },
      selectedAccount: {},
      resetAccount: {}, // 重置密码
      rstpassword: null,
      modules: [],
      menuTree: {},
      checkedMenus: [],
      webAuthVisible: false,
      appAuthVisible: false,
      rstPassVisible: false, // 重置密码
      statusOptions: [
        {label: this.$t('account.js.all'), value: null},
        {label: this.$t('account.js.status1'), value: 1},
        {label: this.$t('account.js.status2'), value: 2},
        {label: this.$t('account.js.status3'), value: 3},
      ],
      roleOptions: [],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedAccountList() {
      return this.accountList.map((item) => {
        return {
            ...item,
            statusString: item.status === 1 ? this.$t('account.js.status1') : item.status === 2 ? this.$t('account.js.status2') : item.status === 3 ? this.$t('account.js.status3') : '',
            period: (item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : '') + ' - ' + (item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : ''),
            updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : '',
          }
      })
    },
    showrstTip() {
      // 校验规则8-15个字符，必须包含数字，字母大小写，允许包含特殊字符[- _ #]
      const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([-_#]{0,})[A-Za-z\d-_#]{8,15}$/;
      return (this.rstpassword && !passReg.test(this.rstpassword));
    }
  },
  methods: {
    goAdd() {
      window.open(location.href + "add");
    },
    getAllRoles() {
      api.getAllRoles(this, {}).then(roles => {
        this.roleOptions = this.roles.map(role => { 
          return {
            label: role.name,
            value: role.id,
          }
        });
        this.roleOptions.unshift({label: this.$t('account.js.all'), value: null});
      });
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getAdminList(this, this.query);
      }
    },
    handleQuery(page) {
      this.query.pageNum = 1;
      api.getAdminList(this, this.query);
    },
    edit(index, row) {
      sessionStorage.account = JSON.stringify(row);
      // this.$router.push({name: "editaccount"});
      window.open(location.href + "edit");
    },
    detail(index, row) {
      sessionStorage.account = JSON.stringify(row);
      // this.$router.push({name: "accountinfo"});
      window.open(location.href + "/" + row.id);
    },
    deleteAdmin(index, row) {
      this.$confirm(this.$t('account.js.deleteMessage', {name: row.name}), this.$t('account.js.tip'), {
        confirmButtonText: this.$t('account.js.ok'),
        cancelButtonText: this.$t('account.js.cancel'),
        type: 'warning'
      }).then(() => {
        api.deleteAdmin(this, {id: row.id}).then(() => {
          api.getAdminList(this, this.query);
        });
      }).catch(() => {
           
      });
    },
    frozenAdmin(index, row) {
      this.$confirm(this.$t('account.js.frozenMessage', {name: row.name}), this.$t('account.js.tip'), {
        confirmButtonText: this.$t('account.js.ok'),
        cancelButtonText: this.$t('account.js.cancel'),
        type: 'warning'
      }).then(() => {
        row.status = 2;
        api.updateAdmin(this, row).then(() => {
          api.getAdminList(this, this.query);
        });
      }).catch(() => {
           
      });
    },
    showWebAuth(index, row) {
      this.selectedAccount = row;
      this.getModuleList(1, row.roleId).then(() => {
        this.webAuthVisible = true;
      });
    },
    showAppAuth(index, row) {
      this.selectedAccount = row;
      this.checkedMenus = [];
      api.getModuleList(this, {type: 2, roleId: row.roleId}).then(() => {
        this.modules.forEach(module => {
          module.possess ? this.checkedMenus.push(module.id) : null;
        });
        this.appAuthVisible = true;
      });
    },
    getModuleList(type, roleId) {
      let tree = {};
      this.checkedMenus = [];
      return api.getModuleList(this, {type, roleId}).then(() => {
        this.modules.forEach((module => {
          if(module.parent === 1) {
            tree[module.parentUrl] 
              ? tree[module.parentUrl].push(module) 
              : tree[module.parentUrl] = [module];
            module.possess ? this.checkedMenus.push(module.id) : null;
          }
        }));
        return tree;
      }).then((tree) => {
        this.menuTree = tree;
      });
    },
    resetPassword(index, row) {
      this.resetAccount = row;
      this.rstPassVisible = true;
    },
    customPass() {
      this.rstpassword = this.randPass(8, 15);
    },
    submitRstPass() {
      api.updateAdminPassword(this, {id: this.resetAccount.id, password: this.rstpassword})
        .then(() => {
          this.rstpassword = null;
          this.rstPassVisible = false;
          this.query.pageNum = 1;
          api.getAdminList(this, this.query);
        });
    },
    cancel() {
      this.rstpassword = null;
      this.rstPassVisible = false;
    }
  }
}
</script>

<style>
.warning {
  font-size: 24px;
  color: #ff9c60;
  margin-right: 15px;
  vertical-align: sub;
}
</style>