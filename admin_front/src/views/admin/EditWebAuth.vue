<template>
<div>
  <h4>{{ $t('webAuth.title') }}</h4>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('webAuth.nameLabel') }} : {{ role.name }}
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="80px">
          <div class="row">
            <div class="col-md-12">
              <el-form-item>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              </el-form-item>
              <el-checkbox-group v-model="checkedMenus" @change="handleCheckedMenusChange">
                <div v-for="(menus, key) in menuTree" :key="key">
                  <el-form-item :label="$t('menu.' + key + '.name')">
                    <el-checkbox style="width: 140px;" v-for="(menu, index) in menus" :key="index" :label="menu.id">{{ $t('menu.' + key + '.' + menu.name) }}</el-checkbox>
                  </el-form-item>
                </div>
              </el-checkbox-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <el-form-item>
                <el-button type="primary" @click="submit" >{{ $t('webAuth.save') }}</el-button>
                <el-button type="defalut" @click="goBack" >{{ $t('webAuth.goBack') }}</el-button>
              </el-form-item>
            </div>
          </div>

        </el-form>

      </div>
    </div>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"

export default {
  mounted() {
    this.getModuleList();
  },
  data() {
    return {
      checkedMenus: [],
      allMenus: [],
      modules: [],
      menuTree: {},
      checkAll: false,
      isIndeterminate: true,
      role: JSON.parse(sessionStorage.getItem('role')) || {},
      query: {

      }
    }
  },
  computed: {
    submitDisabled() {
      return !(this.checkedMenus.length > 0);
    }
  },
  methods: {
    goBack() {
      this.$router.push({name: 'role'});
    },
    getModuleList() {
      let tree = {};
      api.getModuleList(this, {type: 1, roleId: this.role.id}).then(() => {
        this.modules.forEach((module => {
          if(module.parent === 1) {
            tree[module.parentUrl]
              ? tree[module.parentUrl].push(module)
              : tree[module.parentUrl] = [module];
            module.possess ? this.checkedMenus.push(module.id) : null;
            this.allMenus.push(module.id);
          }
        }));
        this.isIndeterminate = this.checkedMenus.length > 0 && this.checkedMenus.length < this.allMenus.length;
        this.checkAll = this.checkedMenus.length > 0 && this.checkedMenus.length === this.allMenus.length;
        return tree;
      }).then((tree) => {
        this.menuTree = tree;
      });
    },
    handleCheckedMenusChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allMenus.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allMenus.length;
    },
    handleCheckAllChange(event) {
      // this.checkedMenus = event.target.checked ? this.allMenus : [];
      this.checkedMenus = event ? this.allMenus : [];
      this.isIndeterminate = false;
    },
    submit() {
      const query = {
        moduleIds: this.checkedMenus.join(','),
        roleId: this.role.id,
        type: 1,
      }
      api.updateRoleModules(this, query).then(() => this.$router.push({name: 'role'}));
    }
  }
}

</script>
