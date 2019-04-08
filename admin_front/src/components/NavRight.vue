<template>
<div>
<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
  <!-- Create the tabs -->
  <!-- <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
    <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
    <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
  </ul> -->
  <!-- Tab panes -->
  <div class="tab-content">
    <div class="form-group">
      <div class="radio">
        <label>
          <input type="radio" name="language" @click="toggleLang('zh-CN')" value="zh-CH" :checked="lang === 'zh-cn'">
          简体中文
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="language" @click="toggleLang('en')" value="en" :checked="lang === 'en'">
          English
        </label>
      </div>
      <div class="radio">
        <label>
          <input type="radio" name="language" @click="toggleLang('zh-TW')" value="zh-TW" :checked="lang === 'zh-tw'">
          繁體中文
        </label>
      </div>
    </div>
  </div>
</aside>
<div class="control-sidebar-bg"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      lang: localStorage.getItem('lang') ? localStorage.getItem('lang').toLocaleLowerCase() : 'en'
    }
  },
  methods: {
    toggleLang(lang) {
      if(this.lang != lang) {
        localStorage.setItem('lang', lang)
        location.reload();
      }
    }
  }
}

</script>