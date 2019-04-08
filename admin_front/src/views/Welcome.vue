<template>
<div>
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">{{ $t('welcome.title') }}</h3>
    </div>
    <div class="box-body">
      <ul class="todo-list">
        <li v-for="(menus, key) in menuTree" :key="key">
          <!-- drag handle -->
          <span><i class="fa fa-th-list"></i></span>
          <span style="display:inline-block;width: 100px;">{{ $t('menu.' + key + '.name') }}</span>
          <span v-for="(menu, index) in menus" style="display:inline-block;width: 140px;" :key="index"><router-link :to="menu.path" :label="menu.id">{{ $t('menu.' + key + '.' + menu.name) }}</router-link></span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import api from '../api'

export default {
  props: {
    current: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      modules: [],
    }
  },
  mounted() {
    if($.AdminLTE && $.AdminLTE.layout && $.AdminLTE.controlSidebar){
      $.AdminLTE.layout.activate();
      $.AdminLTE.controlSidebar.activate();
    }
    this.getOpenCountryList();
  },
  computed: {
    menuTree() {
      const modules = this.current.modules || [];
      let tree = {};
      modules.forEach(module => {
        if(module && module.parent === 1) {
          tree[module.parentUrl]
            ? tree[module.parentUrl].push(module)
            : tree[module.parentUrl] = [module];
        }
      });
      return tree;
    }
  },

  methods: {
    getOpenCountryList() {
      api.getCountryList(this, {open: true}).then(countrys => {
        localStorage.openCountrys = JSON.stringify(countrys);
      });
    }
  }
}
</script>
