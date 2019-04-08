<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('role.table.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('role.table.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedRoles" border style="width: 100%">
        <el-table-column prop="id" :label="$t('role.table.id')" width="60"></el-table-column>
        <el-table-column prop="name" :label="$t('role.table.name')" ></el-table-column>
        <el-table-column :label="$t('role.table.web')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isWeb"
              @change="handleWebChange(scope.$index, scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :label="$t('role.table.app')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isApp"
              @change="handleAppChange(scope.$index, scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAtString" :label="$t('role.table.updatedAt')"></el-table-column>
        <el-table-column prop="modifierInfo" :label="$t('role.table.updatedName')"></el-table-column>
        <el-table-column fixed="right" :label="$t('role.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('role.table.operate') }}</el-button>
              <div><el-button @click="edit(scope.$index, scope.row)" type="text" size="small" >{{ $t('role.table.edit') }}</el-button></div>
              <div><el-button v-if="scope.row.isWeb" @click="editWebAuth(scope.$index, scope.row)" type="text" size="small" >{{ $t('role.table.editWebAuth') }}</el-button></div>
              <div><el-button v-if="scope.row.isApp" @click="editAppAuth(scope.$index, scope.row)" type="text" size="small" >{{ $t('role.table.editAppAuth') }}</el-button></div>
              <div><el-button v-if="!scope.row.isWeb && !scope.row.isApp" type="text" size="small" >{{ $t('role.table.openTip') }}</el-button></div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

  <el-dialog :title="$t('role.dialog.title')" width="30%" :visible.sync="addRoleVisible">
    <el-form label-position="left" label-width="80px">
      <div class="row">
        <div class="col-md-12">
          <el-form-item :label="$t('role.dialog.nameLabel')">
            <el-input type="text" v-model="role.name"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          {{ $t('role.dialog.web') }}
          <el-switch
            v-model="role.isWeb"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="col-md-6">
          {{ $t('role.dialog.app') }}
          <el-switch
            v-model="role.isApp"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRoleVisible = false">{{ $t('role.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="addRole">{{ $t('role.dialog.ok') }}</el-button>
    </div>
  </el-dialog>

  <el-dialog :title="$t('role.dialog.title1')" width="30%" :visible.sync="editRoleVisible">
    <el-form label-position="left" label-width="80px">
      <div class="row">
        <div class="col-md-12">
          <el-form-item :label="$t('role.dialog.nameLabel')">
            <el-input type="text" v-model="selectRole.name"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editRoleVisible = false">{{ $t('role.dialog.cancel') }}</el-button>
      <el-button type="primary" @click="eidtRole">{{ $t('role.dialog.ok') }}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      addRoleVisible: false,
      editRoleVisible: false,
      roles: [],
      role: this.initRole(),
      selectRole: {},
      query: {
        pageNum: 1,
        
      },
      page: {
        count: 0
      },
    }
  },
  computed: {
    computedRoles() {
      return this.roles.map((item) => {
        return {
            ...item,
            updatedAtString: item.updatedAt ? moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss") : "",
            isWeb: !!item.isWeb,
            isApp: !!item.isApp,
          }
      })
    }
  },
  methods: {
    goAdd() {
      this.addRoleVisible = true;
    },
    initRole() {
      return {
        name: '',
        isWeb: false,
        isApp: false,
      }
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getRoleList(this, this.query);
      }
    },
    handleQuery(page) {
      this.query.pageNum = 1;
      api.getRoleList(this, this.query);
    },
    handleWebChange(index, row) {
      api.updateRole(this, {id: row.id, isWeb: +row.isWeb, name: row.name});
    },
    handleAppChange(index, row) {
      api.updateRole(this, {id: row.id, isApp: +row.isApp, name: row.name});
    },
    editWebAuth(index, row) {
      sessionStorage.role = JSON.stringify(row);
      this.$router.push({name: "editwebauth"});
    },
    editAppAuth(index, row) {
      sessionStorage.role = JSON.stringify(row);
      this.$router.push({name: "editappauth"});
    },
    edit(index, row) {
      this.editRoleVisible = true;
      this.selectRole = {...row};
    },
    eidtRole(index, row) {
      api.updateRole(this, {id: this.selectRole.id, name: this.selectRole.name}).then(() => {
        this.handleQuery();
        this.selectRole = {};
        this.editRoleVisible = false;
      });
    },
    addRole() {
      api.saveRole(this, {name: this.role.name, isWeb: +this.role.isWeb, isApp: +this.role.isApp}).then(() => {
        this.handleQuery();
        this.initRole();
        this.addRoleVisible = false;
      });
    }
  }
}
</script>