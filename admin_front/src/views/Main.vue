<template>
  <div class="main-view wrapper">
    <nav-top :current="current"></nav-top>
    <nav-left :current="current"></nav-left>
    <!-- Main content -->
    <div class="content-wrapper" style="padding-bottom: 600px">
      <section class="content">
        <transition name="fade">
          <router-view :current="current"></router-view>
        </transition>
      </section>
    </div>
    <nav-right></nav-right>
    <!-- /.content -->
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 0.4.2
      </div>
      <strong>Copyright &copy; 2018 <a href="#">oBike</a>.</strong> All rights reserved.
    </footer>
  </div>
</template>

<script>
// import {load} from '../components/googleMap/utils/manager.js'
import NavLeft from '../components/NavLeft'
import NavRight from '../components/NavRight'
import NavTop from '../components/NavTop'
import api from "../api"

// 'http://maps.google.cn/'  not https   so just use 'https://maps.googleapis.com/'
// load('AIzaSyAqWykDWVzMjP6BmW5yd9qYybpl12x3Yg4', '', ['places'], false);

export default {
  mounted() {
    api.getCurrent(this);
  },
  data() {
    return {
      current: {
        name: ""
      }
    }
  },
  components: {
    NavLeft,
    NavRight,
    NavTop
  }
}
</script>

<style lang="scss">
.main-view{
}
@media (max-width: 768px) {
  .el-dialog__wrapper .el-dialog--small,
  .el-dialog__wrapper .el-dialog--tiny {
    width: 100%;
  }
}
</style>
