<template>
  <header class="main-header">
    <!-- Logo -->
    <!--<a href="/welcome" class="logo">-->
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <!--<span class="logo-mini"><b>O</b></span>-->
      <!-- logo for regular state and mobile devices -->
      <!--<span class="logo-lg"><b>oBike</b></span>-->
    <!--</a>-->
    <router-link to="/welcome" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>O</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>oBike</b></span>
    </router-link>
    
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li><a href="#"><i class="fa fa-user"></i> {{current.name}}</a></li>
          <!-- Control Sidebar Toggle Button -->
          <li><a href="/" @click="signOut">{{ $t('signOut') }}</a></li>
          <li><a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import {signOut} from '../services/auth'
import api from "../api"

export default {
  props: {
    current: {
      type: Object,
      default: {
        name: ""
      }
    }
  },
  mounted() {
    // api.getCurrent(this);
  },
  data() {
    return {
      
    }
  },
  methods: {
    signOut
  }
}
</script>