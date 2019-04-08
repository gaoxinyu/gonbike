<template>
<div>
  <h4>{{ $t('appAuth.title') }}</h4>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('appAuth.nameLabel') }} : {{ role.name }}
      </div>
      <div class="box-body">
        <el-form label-position="left" label-width="100px">
          <div class="row">
            <div class="col-md-12">
              <el-checkbox-group v-model="checkedMenus" @change="handleCheckedMenusChange">
                <el-form-item :label="$t('appAuth.title1')">
                  <div v-for="(module, key) in modules" :key="module.id">
                    <el-checkbox style="width: 140px;" :label="module.id">{{ module.name }}</el-checkbox>
                  </div>
                </el-form-item>
              </el-checkbox-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <el-form-item>
                <el-button type="primary" @click="submit" >{{ $t('appAuth.save') }}</el-button>
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
      modules: [],
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
      api.getModuleList(this, {type: 2, roleId: this.role.id}).then(() => {
        this.modules.forEach(module => {
          module.possess ? this.checkedMenus.push(module.id) : null;
        })
      });
    },
    handleCheckedMenusChange() {

    },
    submit() {
      const query = {
        moduleIds: this.checkedMenus.join(','),
        roleId: this.role.id,
        type: 2,
      }
      api.updateRoleModules(this, query).then(() => this.$router.push({name: 'role'}));
    }
  }
}

</script>
