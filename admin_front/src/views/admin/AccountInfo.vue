<template>
<div>
  <h4>{{ $t('accountInfo.table.title') }}</h4>
  <div class="box box-info">
    <div class="box-header">
      {{ $t('accountInfo.table.title1') }}
    </div>
    <div class="box-body no-padding">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>{{ $t('accountInfo.table.name') }}</th>
            <th>{{ $t('accountInfo.table.password') }}</th>
            <th>{{ $t('accountInfo.table.realName') }}</th>
            <th>{{ $t('accountInfo.table.status') }}</th>
          </tr>
          <tr>
            <td>{{account.name || "--"}}</td>
            <td>{{account.password || "--"}}</td>
            <td>{{account.realName || "--"}}</td>
            <td>{{account.statusString || "--"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header">
      {{ $t('accountInfo.table.title2') }}
    </div>
    <div class="box-body no-padding">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td style="width: 120px;">{{ $t('accountInfo.table.role') }}</td>
            <td>{{account.roleName || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 120px;">{{ $t('accountInfo.table.country') }}</td>
            <td>{{account.countryName || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 120px;">{{ $t('accountInfo.table.city') }}</td>
            <td>{{account.cityName || "--"}}</td>
          </tr>
          <tr>
            <td style="width: 120px;">{{ $t('accountInfo.table.webAuth') }}</td>
            <td><el-button @click="showWebAuth(0, account)" :loading="loading" type="text">{{ $t('accountInfo.table.showWebAuth') }}</el-button></td>
          </tr>
          <tr>
            <td style="width: 120px;">{{ $t('accountInfo.table.appAuth') }}</td>
            <td><el-button @click="showAppAuth(0, account)" :loading="loading" type="text">{{ $t('accountInfo.table.showAppAuth') }}</el-button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('accountInfo.table.title2') }}
    </div>
    <div class="box-body">
      <el-table :data="computedAccountLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('accountInfo.table2.createdAt')" width="120"></el-table-column>
        <el-table-column prop="name" :label="$t('accountInfo.table2.name')" width="120"></el-table-column>
        <el-table-column prop="changeDes" :label="$t('accountInfo.table2.changeDes')"></el-table-column>
      </el-table>
    </div>

  </div>

  <el-dialog :title="$t('account.dialog.title1', {name: account.name})" :visible.sync="webAuthVisible">
    <el-form label-position="left" label-width="80px">
      <div v-for="(menus, key) in menuTree" :key="key">
        <el-form-item :label="$t('menu.' + key + '.name')">
          <span style="display:inline-block; width: 120px;" :class="{'text-aqua': menu.possess}" v-for="(menu, index) in menus" :key="index"><i v-if="menu.possess" class="fa fa-check"></i> <i v-if="!menu.possess" class="fa fa-close"></i> {{ $t('menu.' + key + '.' + menu.name) }}</span>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>

  <el-dialog :title="$t('account.dialog.title2', {name: account.name})" :visible.sync="appAuthVisible">
    <div class="row">
      <div class="col-md-3" v-for="(module, key) in modules" :key="key" :class="{'text-aqua': module.possess}">
        <i v-if="module.possess" class="fa fa-check"></i> <i v-if="!module.possess" class="fa fa-close"></i><span>{{ module.name }}</span>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    // api.getCountryLogList(this, this.query);
  },
  data() {
    return {
      loading: false,
      accountLogs: [],
      account: JSON.parse(sessionStorage.getItem('account')), 
      query: {
        accountId: this.$route.params.id,
      },
      modules: [],
      menuTree: {},
      checkedMenus: [],
      webAuthVisible: false,
      appAuthVisible: false,
    }
  },
  computed: {
    computedAccountLogs() {
      return this.accountLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('accountInfo.js.type1') : item.type === 2 ? this.$t('accountInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
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
  }
}

</script>