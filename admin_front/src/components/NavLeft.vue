<template>
  <aside class="main-sidebar">
    <!-- <scroll-bar> -->
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <ul class="sidebar-menu">
        <li class="header">{{ $t('menu.mainMenu') }}</li>

        <li v-if="menuTree.customer" class="treeview" :class="{'active': $route.path.indexOf('customer') >= 0}">
          <a href="#">
            <i class="icon icon-customer-service"></i> <span>{{ $t('menu.customer.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('customer') >= 0}">
            <li v-if="menuTree.customer.report" :class="{'active': $route.path.indexOf('/customer/report') >= 0}">
              <router-link to="/customer/report"><i class="fa fa-bell-slash"></i>{{ $t('menu.customer.report') }}</router-link>
            </li>
            <li v-if="menuTree.customer.addreport" :class="{'active': $route.path.indexOf('/customer/addreport') >= 0}">
              <router-link to="/customer/addreport"><i class="fa fa-plus"></i>{{ $t('menu.customer.addreport') }}</router-link>
            </li>
            <li v-if="menuTree.customer.student" :class="{'active': $route.path.indexOf('/customer/student') >= 0}">
              <router-link to="/customer/student"><i class="fa fa-id-card"></i>{{ $t('menu.customer.student') }}</router-link>
            </li>
            <li v-if="menuTree.customer.driververify" :class="{'active': $route.path.indexOf('/customer/driver') >= 0}">
              <router-link to="/customer/driver"><i class="fa fa-address-book"></i>{{ $t('menu.customer.driververify') }}</router-link>
            </li>
            <li v-if="menuTree.customer.sms" :class="{'active': $route.path.indexOf('/customer/sms') >= 0}">
              <router-link to="/customer/sms"><i class="fa fa-gift"></i>{{ $t('menu.customer.sms') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/customer/sms') >= 0}">
                <li :class="{'active': $route.path.indexOf('/customer/sms/add') >= 0}">
                  <router-link to="/customer/sms/add"><i class="fa fa-plus"></i>{{ $t('menu.customer.smsadd') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/customer/sms/template') >= 0}">
                  <router-link to="/customer/sms/template"><i class="fa fa-tags"></i>{{ $t('menu.customer.smstemplate') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/customer/sms/limit') >= 0}">
                  <router-link to="/customer/sms/limit"><i class="fa fa-tags"></i>{{ $t('menu.customer.smslimit') }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.operate" class="treeview" :class="{'active': $route.path.indexOf('/operate') >= 0}">
          <a href="#">
            <i class="icon icon-Cycling-operations"></i> <span>{{ $t('menu.operate.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/operate') >= 0}">
            <li v-if="menuTree.operate.monitor" :class="{'active': $route.path.indexOf('/operate/monitor') >= 0}">
              <router-link to="/operate/monitor"><i class="fa fa-eye"></i>{{ $t('menu.operate.monitor') }}</router-link>
            </li>
            <li v-if="menuTree.operate.trip" :class="{'active': $route.path.indexOf('/operate/trip') >= 0}">
              <router-link to="/operate/trip"><i class="fa fa-truck"></i>{{ $t('menu.operate.trip') }}</router-link>
            </li>
            <!-- 停车区域管理 zhu 2017/04/13 -->
            <li v-if="menuTree.operate.bikearea" :class="{'active': $route.path.indexOf('/operate/bikearea') >= 0}">
              <router-link to="/operate/bikearea"><i class="fa fa-map-marker"></i>{{ $t('menu.operate.bikearea') }}</router-link>
            </li>
            <!-- 单车logo管理 zhu 2017.04.17-->
            <li v-if="menuTree.operate.bikelogo" :class="{'active': $route.path.indexOf('/operate/bikelogo') >= 0}">
              <router-link to="/operate/bikelogo"><i class="fa fa-flag"></i>{{ $t('menu.operate.bikelogo') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/operate/bikelogo') >= 0}">
                <li :class="{'active': $route.path.indexOf('/operate/bikelogo/add') >= 0}">
                  <router-link to="/operate/bikelogo/add"><i class="fa fa-plus"></i>{{ $t('menu.operate.bikelogoadd') }}</router-link>
                </li>
              </ul>
            </li>

            <!-- 国家城市配置 zhu 2017.05.11 -->
            <li v-if="menuTree.operate.cityconfig" :class="{'active': $route.path.indexOf('/operate/cityconfig') >= 0}">
              <router-link to="/operate/cityconfig"><i class="fa fa-sliders"></i>{{ $t('menu.operate.cityconfig') }}</router-link>
            </li>

            <!-- 投放标签管理 -->
            <li v-if="menuTree.operate.tag" :class="{'active': $route.path.indexOf('/operate/tag') >= 0}">
              <router-link to="/operate/tag"><i class="fa fa-tag"></i>{{ $t('menu.operate.tag') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/operate/tag') >= 0}">
                <li :class="{'active': $route.path.indexOf('/operate/tag/category') >= 0}">
                  <router-link to="/operate/tag/category"><i class="fa fa-tags"></i>{{ $t('menu.operate.category') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/operate/tagadd') >= 0}">
                  <router-link to="/operate/tagadd"><i class="fa fa-plus"></i>{{ $t('menu.operate.tagadd') }}</router-link>
                </li>
              </ul>
            </li>

            <!-- 电子围栏 -->
            <li v-if="menuTree.operate.fence" :class="{'active': $route.path.indexOf('/operate/fence') >= 0}">
              <router-link to="/operate/fence"><i class="fa fa-clone"></i>{{ $t('menu.operate.fence') }}</router-link>
              <!-- <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/operate/fence') >= 0}">
                <li :class="{'active': $route.path.indexOf('/operate/fence/info') >= 0}">
                  <router-link to="/operate/fence/info"><i class="fa fa-tasks"></i>{{ $t('menu.operate.fenceInfo') }}</router-link>
                </li>
              </ul> -->
            </li>

          </ul>
        </li>

        <li v-if="menuTree.delivery" class="treeview" :class="{'active': $route.path.indexOf('/delivery') >= 0}">
          <a href="#">
            <i class="fa fa-bolt" style="width:14px;text-align:center"></i> <span>{{$t('menu.delivery.name')}}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
           <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('customer') >= 0}">
            <li v-if="menuTree.delivery.deliveryorder" :class="{'active': $route.path.indexOf('/delivery/order') >= 0}">
              <router-link to="/delivery/order"><i class="fa fa-list"></i>{{$t('menu.delivery.deliveryorder')}}</router-link>
            </li>
           </ul>
        </li>

        <li v-if="menuTree.user" class="treeview" :class="{'active': $route.path.indexOf('/user/') >= 0}">
          <a href="#">
            <i class="icon icon-Bicycle-Management"></i> <span>{{ $t('menu.user.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/user/') >= 0}">
            <li v-if="menuTree.user.userinfo" :class="{'active': $route.path.indexOf('/user/info') >= 0}">
              <router-link to="/user/info"><i class="icon icon-User-basic-information"></i>{{ $t('menu.user.userinfo') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/user/info') >= 0}">
                <li :class="{'active': $route.path.indexOf('/user/info/device') >= 0}">
                  <router-link to="/user/info/device"><i class="fa fa-desktop"></i>{{ $t('menu.user.device') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/user/info/coupon') >= 0}">
                  <router-link to="/user/info/coupon"><i class="fa fa-jpy"></i>{{ $t('menu.user.usercoupon') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/user/info/addcoupon') >= 0}">
                  <router-link to="/user/info/addcoupon"><i class="fa fa-eur"></i>{{ $t('menu.user.addusercoupon') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/user/info/vip') >= 0}">
                  <router-link to="/user/info/vip"><i class="fa fa-cc-discover"></i>{{ $t('menu.user.vip') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/user/info/autopay') >= 0}">
                  <router-link to="/user/info/autopay"><i class="fa fa-cc-discover"></i>{{ $t('menu.user.autopay') }}</router-link>
                </li>
                <!-- 用户图标奖励信息展示 zhu 2017.11.01 -->
                <li :class="{'active': $route.path.indexOf('/user/info/redbag') >= 0}">
                  <router-link to="/user/info/redbag"><i class="fa fa-gift"></i>{{ $t('menu.user.redbag') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.user.driver" :class="{'active': $route.path.indexOf('/user/driver') >= 0}">
              <router-link to="/user/driver"><i class="fa fa-id-card"></i>{{ $t('menu.user.driver') }}</router-link>
            </li>
            <li v-if="menuTree.user.credit" :class="{'active': $route.path.indexOf('/user/credit') >= 0}">
              <router-link to="/user/credit"><i class="icon icon-Credit-points"></i>{{ $t('menu.user.credit') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/user/credit') >= 0}">
                <li :class="{'active': $route.path.indexOf('/user/credit/add') >= 0}">
                  <router-link to="/user/credit/add"><i class="fa fa-plus"></i>{{ $t('menu.user.creditadd') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.user.trade" :class="{'active': $route.path.indexOf('/user/trade') >= 0}">
              <router-link to="/user/trade"><i class="icon icon-Transaction-details"></i>{{ $t('menu.user.trade') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/user/trade') >= 0}">
                <li :class="{'active': $route.path.indexOf('/user/trade/add') >= 0}">
                  <router-link to="/user/trade/add"><i class="fa fa-plus"></i>{{ $t('menu.user.tradeadd') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.user.payment" :class="{'active': $route.path.indexOf('/user/payment') >= 0}">
              <router-link to="/user/payment"><i class="icon icon-Payment-details"></i>{{ $t('menu.user.payment') }}</router-link>
            </li>
            <li v-if="menuTree.user.cash" :class="{'active': $route.path.indexOf('/user/cash') >= 0}">
              <router-link to="/user/cash"><i class="fa fa-usd"></i>{{ $t('menu.user.cash') }}</router-link>
            </li>
            <li v-if="menuTree.user.ocoin" :class="{'active': $route.path.indexOf('/user/ocoin') >= 0}">
              <router-link to="/user/ocoin"><i class="fa fa-usd"></i>{{ $t('menu.user.ocoin') }}</router-link>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.stock" class="treeview" :class="{'active': $route.path.indexOf('/stock') >= 0}">
          <a href="#">
            <i class="icon icon-Bicycle-storage"></i> <span>{{ $t('menu.stock.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/stock') >= 0}">
            <li v-if="menuTree.stock.lock" :class="{'active': $route.path.indexOf('/stock/lock') >= 0}">
              <router-link to="/stock/lock"><i class="fa fa-lock"></i>{{ $t('menu.stock.lock') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/stock/lock') >= 0}">
                <li :class="{'active': $route.path.indexOf('/stock/lock/add') >= 0}">
                  <router-link to="/stock/lock/add"><i class="fa fa-plus"></i>{{ $t('menu.stock.lockadd') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.stock.bike" :class="{'active': $route.path.indexOf('/stock/bike') >= 0}">
              <router-link to="/stock/bike"><i class="fa fa-info-circle"></i>{{ $t('menu.stock.bike') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/stock/bike') >= 0}">
                <li :class="{'active': $route.path.indexOf('/stock/bike/add') >= 0}">
                  <router-link to="/stock/bike/add"><i class="fa fa-plus"></i>{{ $t('menu.stock.bikeadd') }}</router-link>
                </li>
              </ul>
            </li>
            <!-- 单车国家配置 zhu 2017.05.03 -->
            <li v-if="menuTree.stock.state" :class="{'active': $route.path.indexOf('/stock/state') >= 0}">
              <router-link to="/stock/state"><i class="fa fa-cog"></i>{{ $t('menu.stock.state') }}</router-link>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.app" class="treeview" :class="{'active': $route.path.indexOf('/app') >= 0}">
          <a href="#">
            <i class="icon icon-app-management"></i> <span>{{ $t('menu.app.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/app') >= 0}">
            
            <!-- /app/invite 邀请好友赠送管理 zhu 2017.04.25 -->
            <li v-if="menuTree.app.invite" :class="{'active': $route.path.indexOf('/app/invite') >= 0}">
              <router-link to="/app/invite"><i class="fa fa-share-alt"></i>{{ $t('menu.app.invite') }}</router-link>
            </li>
            <li v-if="menuTree.app.message" :class="{'active': $route.path.indexOf('/app/message') >= 0}">
              <router-link to="/app/message"><i class="fa fa-bell"></i>{{ $t('menu.app.message') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/app/message') >= 0}">
                <li :class="{'active': $route.path.indexOf('/app/message/add') >= 0}">
                  <router-link to="/app/message/add"><i class="fa fa-plus"></i>{{ $t('menu.app.messageadd') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.app.version" :class="{'active': $route.path.indexOf('/app/version') >= 0}">
              <router-link to="/app/version"><i class="fa fa-apple"></i>{{ $t('menu.app.version') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/app/version') >= 0}">
                <li :class="{'active': $route.path.indexOf('/app/version/add') >= 0}">
                  <router-link to="/app/version/add"><i class="fa fa-plus"></i>{{ $t('menu.app.versionadd') }}</router-link>
                </li>
              </ul>
            </li>

            <!-- 广告位 zhu 2017.09.01 -->
            <li v-if="menuTree.app.adarea" :class="{'active': $route.path.indexOf('/app/adarea') >= 0}">
              <router-link to="/app/adarea"><i class="fa fa-bullhorn"></i>{{ $t('menu.app.adarea') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/app/adarea') >= 0}">
                <!-- 首页弹窗 -->
                <li :class="{'active': $route.path.indexOf('/app/adarea/add/1') >= 0}">
                  <router-link to="/app/adarea/add/1"><i class="fa fa-plus"></i>{{ $t('menu.app.addad1') }}</router-link>
                </li>
                <!-- 首页轮播 -->
                <li :class="{'active': $route.path.indexOf('/app/adarea/add/2') >= 0}">
                  <router-link to="/app/adarea/add/2"><i class="fa fa-plus"></i>{{ $t('menu.app.addad2') }}</router-link>
                </li>
                <!-- 顶部横幅 -->
                <li :class="{'active': $route.path.indexOf('/app/adarea/add/3') >= 0}">
                  <router-link to="/app/adarea/add/3"><i class="fa fa-plus"></i>{{ $t('menu.app.addad3') }}</router-link>
                </li>
                <!-- 图标 -->
                <li :class="{'active': $route.path.indexOf('/app/adarea/add/4') >= 0}">
                  <router-link to="/app/adarea/add/4"><i class="fa fa-plus"></i>{{ $t('menu.app.addad4') }}</router-link>
                </li>
                <!-- 一键购买会员  -->
                <li :class="{'active': $route.path.indexOf('/app/adarea/add/5') >= 0}">
                  <router-link to="/app/adarea/add/5"><i class="fa fa-plus"></i>{{ $t('menu.app.addad5') }}</router-link>
                </li>
              </ul>
            </li>
            
          </ul>
        </li>

        <li v-if="menuTree.city" class="treeview" :class="{'active': $route.path.indexOf('/city/') >= 0}">
          <a href="#">
            <i class="fa fa-university"></i> <span>{{ $t('menu.city.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/city') >= 0}">
            <li v-if="menuTree.city.recharge" :class="{'active': $route.path.indexOf('/city/recharge') >= 0}">
              <router-link to="/city/recharge"><i class="fa fa-usd"></i>{{ $t('menu.city.recharge') }}</router-link>
            </li>
            <li v-if="menuTree.city.price" :class="{'active': $route.path.indexOf('/city/price') >= 0}">
              <router-link to="/city/price"><i class="fa fa-usd"></i>{{ $t('menu.city.price') }}</router-link>
            </li>
            <li v-if="menuTree.city.payfee" :class="{'active': $route.path.indexOf('/city/payfee') >= 0}">
              <router-link to="/city/payfee"><i class="fa fa-usd"></i>{{ $t('menu.city.payfee') }}</router-link>
            </li>
            <li v-if="menuTree.city.flashmanedit" :class="{'active': $route.path.indexOf('/city/flashmanedit') >= 0}">
              <router-link to="/city/flashmanedit"><i class="fa fa-usd"></i>{{ $t('menu.city.flashmanedit') }}</router-link>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.discount" class="treeview" :class="{'active': $route.path.indexOf('/discount') >= 0}">
          <a href="#">
            <i class="fa fa-diamond"></i> <span>{{ $t('menu.discount.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount') >= 0}">
            <li v-if="menuTree.discount.activity" :class="{'active': $route.path.indexOf('/discount/activity') >= 0}">
              <router-link to="/discount/activity"><i class="fa fa-credit-card-alt"></i>{{ $t('menu.discount.activity') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount/activity') >= 0}">
                <li :class="{'active': $route.path.indexOf('/discount/activityadd') >= 0}">
                  <router-link to="/discount/activityadd"><i class="fa fa-plus"></i> {{ $t('menu.discount.activityadd') }}</router-link>
                </li>
              </ul>
            </li>

            <li v-if="menuTree.discount.coupon" :class="{'active': $route.path.indexOf('/discount/coupon') >= 0}">
              <router-link to="/discount/coupon"><i class="fa fa-cc-discover"></i>{{ $t('menu.discount.coupon') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount/coupon') >= 0}">
                <li :class="{'active': $route.path.indexOf('/discount/couponadd') >= 0}">
                  <router-link to="/discount/couponadd"><i class="fa fa-plus"></i> {{ $t('menu.discount.couponadd') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.discount.code" :class="{'active': $route.path.indexOf('/discount/code') >= 0}">
              <router-link to="/discount/code"><i class="fa fa-cc-mastercard"></i>{{ $t('menu.discount.code') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount/code') >= 0}">
                <li :class="{'active': $route.path.indexOf('/discount/codeadd') >= 0}">
                  <router-link to="/discount/codeadd"><i class="fa fa-plus"></i> {{ $t('menu.discount.codeadd') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/discount/coderecord') >= 0}">
                  <router-link to="/discount/coderecord"><i class="fa fa-book"></i> {{ $t('menu.discount.coderecord') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.discount.free" :class="{'active': $route.path.indexOf('/discount/free') >= 0}">
              <router-link to="/discount/free"><i class="fa fa-bicycle"></i>{{ $t('menu.discount.free') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount/free') >= 0}">
                <li :class="{'active': $route.path.indexOf('/discount/freeadd') >= 0}">
                  <router-link to="/discount/freeadd"><i class="fa fa-plus"></i> {{ $t('menu.discount.freeadd') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.discount.card" :class="{'active': $route.path.indexOf('/discount/card') >= 0}">
              <router-link to="/discount/card"><i class="fa fa-cc-visa"></i>{{ $t('menu.discount.card') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount/card') >= 0}">
                <li :class="{'active': $route.path.indexOf('/discount/cardadd') >= 0}">
                  <router-link to="/discount/cardadd"><i class="fa fa-plus"></i> {{ $t('menu.discount.cardadd') }}</router-link>
                </li>
              </ul>
            </li>
            <!-- 押金折扣 zhu 2017.04.26 -->
            <li v-if="menuTree.discount.deposit" :class="{'active': $route.path.indexOf('/discount/deposit') >= 0}">
              <router-link to="/discount/deposit"><i class="fa fa-cc-diners-club"></i>{{ $t('menu.discount.deposit') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/discount/deposit') >= 0}">
                <li :class="{'active': $route.path.indexOf('/discount/deposit/add') >= 0}">
                  <router-link to="/discount/deposit/add"><i class="fa fa-plus"></i> {{ $t('menu.discount.depositadd') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/discount/deposit/users') >= 0}">
                  <router-link to="/discount/deposit/users"><i class="fa fa-users"></i> {{ $t('menu.discount.users') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.discount.registercoupon" :class="{'active': $route.path.indexOf('/discount/registercoupon') >= 0}">
              <router-link to="/discount/registercoupon"><i class="fa fa-cc-stripe"></i>{{ $t('menu.discount.registercoupon') }}</router-link>
            </li>
            <li v-if="menuTree.discount.nodeposit" :class="{'active': $route.path.indexOf('/discount/nodeposit') >= 0}">
              <router-link to="/discount/nodeposit"><i class="fa fa-cc-amex"></i>{{ $t('menu.discount.nodeposit') }}</router-link>
            </li>
          </ul>
        </li>

        <!-- 图标活动 zhu 2017.09.21 -->
        <li v-if="menuTree.icon" class="treeview" :class="{'active': $route.path.indexOf('/icon') >= 0}">
          <a href="#">
            <i class="fa fa-eercast"></i> <span>{{ $t('menu.icon.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/icon') >= 0}">
            <li v-if="menuTree.icon.reward" :class="{'active': $route.path.indexOf('/icon/reward') >= 0}">
              <router-link to=""><i class="fa fa-trophy"></i>{{ $t('menu.icon.reward') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/icon/reward/redbag') >= 0}">
                <li :class="{'active': $route.path.indexOf('/icon/reward/redbag') >= 0}">
                  <router-link to="/icon/reward/redbag"><i class="fa fa-gift"></i> {{ $t('menu.icon.redbag') }}</router-link>
                </li>
                <!-- <li :class="{'active': $route.path.indexOf('/icon/reward/coupon') >= 0}">
                  <router-link to="/icon/reward/coupon"><i class="fa fa-gift"></i> {{ $t('menu.icon.coupon') }}</router-link>
                </li> -->
              </ul>
            </li>
            <li v-if="menuTree.icon.bikeicon" :class="{'active': $route.path.indexOf('/icon/bikeicon') >= 0}">
              <router-link to="/icon/bikeicon"><i class="fa fa-commenting"></i>{{ $t('menu.icon.bikeicon') }}</router-link>
              <!-- <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/icon/bikeicon/add') >= 0}">
                <li :class="{'active': $route.path.indexOf('/icon/bikeicon/add') >= 0}">
                  <router-link to="/icon/bikeicon/add"><i class="fa fa-plus"></i> {{ $t('menu.icon.addbikeicon') }}</router-link>
                </li>
              </ul> -->
            </li>
          </ul>
        </li>

        <!-- 奖励管理 zhu 2017.12.12 -->
        <li v-if="menuTree.reward" class="treeview" :class="{'active': $route.path.indexOf('/reward') >= 0 && $route.path.indexOf('/icon/reward') == -1}">
          <a href="#">
            <i class="fa fa-gift"></i> <span>{{ $t('menu.reward.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/reward') >= 0}">
            <li v-if="menuTree.reward.rwcoupon" :class="{'active': $route.path.indexOf('/reward/coupon') >= 0}">
              <router-link to="/reward/coupon"><i class="fa fa-commenting"></i>{{ $t('menu.reward.rwcoupon') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/reward/coupon/add') >= 0}">
                <li :class="{'active': $route.path.indexOf('/reward/coupon/add') >= 0}">
                  <router-link to="/reward/coupon/add"><i class="fa fa-plus"></i> {{ $t('menu.reward.rwaddcoupon') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.reward.rwcode" :class="{'active': $route.path.indexOf('/reward/code') >= 0}">
              <router-link to="/reward/code"><i class="fa fa-commenting"></i>{{ $t('menu.reward.rwcode') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/reward/code/add') >= 0}">
                <li :class="{'active': $route.path.indexOf('/reward/code/add') >= 0}">
                  <router-link to="/reward/code/add"><i class="fa fa-plus"></i> {{ $t('menu.reward.rwaddcode') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.reward.rwcredit" :class="{'active': $route.path.indexOf('/reward/credit') >= 0}">
              <router-link to="/reward/credit"><i class="fa fa-commenting"></i>{{ $t('menu.reward.rwcredit') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/reward/credit/add') >= 0}">
                <li :class="{'active': $route.path.indexOf('/reward/credit/add') >= 0}">
                  <router-link to="/reward/credit/add"><i class="fa fa-plus"></i> {{ $t('menu.reward.rwaddcredit') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.reward.rwactivity" :class="{'active': $route.path.indexOf('/reward/activity') >= 0}">
              <router-link to="/reward/activity"><i class="fa fa-commenting"></i>{{ $t('menu.reward.rwactivity') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/reward/activity/add') >= 0}">
                <li :class="{'active': $route.path.indexOf('/reward/activity/add') >= 0}">
                  <router-link to="/reward/activity/add"><i class="fa fa-plus"></i> {{ $t('menu.reward.rwaddactivity') }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.setting" class="treeview" :class="{'active': $route.path.indexOf('/setting') >= 0}">
          <a href="#">
            <i class="fa fa-cog"></i> <span>{{ $t('menu.setting.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/setting') >= 0}">
            <li v-if="menuTree.setting.risk" :class="{'active': $route.path.indexOf('/setting/risk') >= 0}">
              <router-link to="/setting/risk"><i class="fa fa-asterisk"></i>{{ $t('menu.setting.risk') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/setting/risk') >= 0}">
                <li :class="{'active': $route.path.indexOf('/setting/risk/add') >= 0}">
                  <router-link to="/setting/risk/add"><i class="fa fa-plus"></i> {{ $t('menu.setting.riskadd') }}</router-link>
                </li>
              </ul>
            </li>
            <!-- /setting/pay 支付方式设置 zhu 2017.06.16 -->
            <li v-if="menuTree.setting.pay" :class="{'active': $route.path === '/setting/pay' || $route.path.indexOf('/setting/pay/') >= 0}">
              <router-link to="/setting/pay"><i class="fa fa-bell"></i>{{ $t('menu.setting.pay') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/setting/pay') >= 0}">
                <li :class="{'active': $route.path.indexOf('/setting/pay/add') >= 0}">
                  <router-link to="/setting/pay/add"><i class="fa fa-plus"></i>{{ $t('menu.setting.addpay') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.setting.appsms" :class="{'active': $route.path.indexOf('/setting/sms') >= 0}">
              <router-link to="/setting/sms"><i class="fa fa-paper-plane"></i>{{ $t('menu.setting.appsms') }}</router-link>
               <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/setting/sms') >= 0}">
                <!-- <li :class="{'active': $route.path.indexOf('/setting/sms/add') >= 0}">
                  <router-link to="/setting/sms/add"><i class="fa fa-plus"></i> {{ $t('menu.setting.smssettingadd') }}</router-link>
                </li> -->
                <li :class="{'active': $route.path.indexOf('/setting/sms/prov') >= 0}">
                  <router-link to="/setting/sms/prov"><i class="fa fa-telegram"></i> {{ $t('menu.setting.prov') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/setting/sms/operator') >= 0}">
                  <router-link to="/setting/sms/operator"><i class="fa fa-info-circle"></i> {{ $t('menu.setting.operator') }}</router-link>
                </li>
              </ul> 
            </li>
            <li v-if="menuTree.setting.paypal" :class="{'active': $route.path.indexOf('/setting/paypal') >= 0}">
              <router-link to="/setting/paypal"><i class="fa fa-paypal"></i>{{ $t('menu.setting.paypal') }}</router-link>
            </li>
            <li v-if="menuTree.setting.radius" :class="{'active': $route.path.indexOf('/setting/radius') >= 0}">
              <router-link to="/setting/radius"><i class="fa fa-circle-o-notch"></i>{{ $t('menu.setting.radius') }}</router-link>
            </li>
            <li v-if="menuTree.setting.depositrefund" :class="{'active': $route.path.indexOf('/setting/depositrefund') >= 0}">
              <router-link to="/setting/depositrefund"><i class="fa fa-circle-o-notch"></i>{{ $t('menu.setting.depositrefund') }}</router-link>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.log" class="treeview" :class="{'active': $route.path.indexOf('/log') >= 0}">
          <a href="#">
            <i class="fa fa-tasks"></i> <span>{{ $t('menu.log.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/log') >= 0}">
            <li v-if="menuTree.log.bind" :class="{'active': $route.path.indexOf('/log/bind') >= 0}">
              <router-link to="/log/bind"><i class="fa fa-window-restore"></i>{{ $t('menu.log.bind') }}</router-link>
            </li>
            <li v-if="menuTree.log.pay" :class="{'active': $route.path.indexOf('/log/pay') >= 0}">
              <router-link to="/log/pay"><i class="fa fa-cutlery"></i>{{ $t('menu.log.pay') }}</router-link>
            </li>
            <li v-if="menuTree.log.lock" :class="{'active': $route.path.indexOf('/log/lock') >= 0}">
              <router-link to="/log/lock"><i class="fa fa-cubes"></i>{{ $t('menu.log.lock') }}</router-link>
            </li>
            <li v-if="menuTree.log.optlog" :class="{'active': $route.path.indexOf('/log/opt') >= 0}">
              <router-link to="/log/opt"><i class="fa fa-bug"></i>{{ $t('menu.log.optlog') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/log/opt') >= 0}">
                <li :class="{'active': $route.path.indexOf('/log/opt/upload') >= 0}">
                  <router-link to="/log/opt/upload"><i class="fa fa-list-ul"></i> {{ $t('menu.log.uploadloc') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/log/opt/put') >= 0}">
                  <router-link to="/log/opt/put"><i class="fa fa-list-ul"></i> {{ $t('menu.log.putbike') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/log/opt/maintain') >= 0}">
                  <router-link to="/log/opt/maintain"><i class="fa fa-list-ul"></i> {{ $t('menu.log.bikemaintain') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/log/opt/again') >= 0}">
                  <router-link to="/log/opt/again"><i class="fa fa-list-ul"></i> {{ $t('menu.log.putagain') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/log/opt/other') >= 0}">
                  <router-link to="/log/opt/other"><i class="fa fa-list-ul"></i> {{ $t('menu.log.other') }}</router-link>
                </li>
                <li :class="{'active': $route.path.indexOf('/log/opt/punchcard') >= 0}">
                  <router-link to="/log/opt/punchcard"><i class="fa fa-list-ul"></i> {{ $t('menu.log.punchcard') }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <!-- 消息推送 zhu 2017.05.08 -->
        <li v-if="menuTree.news" class="treeview" :class="{'active': $route.path.indexOf('/news') >= 0}">
          <a href="#">
            <i class="fa fa-envelope"></i> <span>{{ $t('menu.news.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/news') >= 0}">
            <li v-if="menuTree.news.func" :class="{'active': $route.path.indexOf('/news/func') >= 0}">
              <router-link to="/news/func"><i class="fa fa-archive"></i>{{ $t('menu.news.func') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/news/func/push') >= 0}">
                <li :class="{'active': $route.path.indexOf('/news/func/push') >= 0}">
                  <router-link to="/news/func/push"><i class="fa fa-users"></i> {{ $t('menu.news.funcpush') }}</router-link>
                </li>
              </ul>
            </li>
            <li v-if="menuTree.news.pushmessage" :class="{'active': $route.path.indexOf('/news/message') >= 0}">
              <router-link to="/news/message"><i class="fa fa-commenting"></i>{{ $t('menu.news.pushmessage') }}</router-link>
              <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/news/messageadd') >= 0}">
                <li :class="{'active': $route.path.indexOf('/news/messageadd') >= 0}">
                  <router-link to="/news/messageadd"><i class="fa fa-plus"></i> {{ $t('menu.news.pushmessageadd') }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li v-if="menuTree.admin" class="treeview" :class="{'active': $route.path.indexOf('/admin') >= 0}">
          <a href="#">
            <i class="icon icon-Account-management"></i> <span>{{ $t('menu.admin.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/admin') >= 0}">
            <li v-if="menuTree.admin.role" :class="{'active': $route.path.indexOf('/admin/role') >= 0}">
              <router-link to="/admin/role"><i class="fa fa-user-secret"></i>{{ $t('menu.admin.role') }}</router-link>
            </li>

            <li v-if="menuTree.admin.account" :class="{'active': $route.path.indexOf('/admin/account') >= 0}">
              <router-link to="/admin/account"><i class="fa fa-user-plus"></i>{{ $t('menu.admin.account') }}</router-link>
            </li>
          </ul>
        </li>

        <!-- 企业账号 -->
        <li v-if="menuTree.enterprise" class="treeview" :class="{'active': $route.path.indexOf('/enterprise') >= 0}">
          <a href="#">
            <i class="icon fa fa-building"></i> <span>{{ $t('menu.enterprise.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/enterprise') >= 0}">
            <li v-if="menuTree.enterprise.enterpriseaccount" :class="{'active': $route.path.indexOf('/enterprise/account/') >= 0}">
              <!-- 企业列表 -->
              <router-link to="/enterprise/account/"><i class="fa fa-archive"></i>{{ $t('menu.enterprise.enterpriseaccount') }}</router-link>
            </li>
            <!-- <li v-if="menuTree.enterprise.enterprisepackage" :class="{'active': $route.path.indexOf('/enterprise/package') >= 0}">
              套餐列表
              <router-link to="/enterprise/package"><i class="fa fa-archive"></i>{{ $t('menu.enterprise.enterprisepackage') }}</router-link>
            </li> -->
          </ul>
        </li>

        <!-- EVS -->
        <li v-if="menuTree.evs" class="treeview" :class="{'active': $route.path.indexOf('/evs/') >= 0}">
          <a href="#">
            <i class="icon fa fa-motorcycle"></i> <span>{{ $t('menu.evs.name') }}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" :class="{'menu-open': $route.path.indexOf('/evs/') >= 0}">
            <!-- evs用户列表 -->
            <li v-if="menuTree.evs.evsuser" :class="{'active': $route.path.indexOf('/evs/account') >= 0}">
              <router-link to="/evs/user"><i class="fa fa-users"></i>{{ $t('menu.evs.evsuser') }}</router-link>
            </li>
            <!-- evs订单管理 -->
            <li v-if="menuTree.evs.evsorder" :class="{'active': $route.path.indexOf('/evs/order') >= 0}">
              <router-link to="/evs/order"><i class="fa fa-list"></i>{{ $t('menu.evs.evsorder') }}</router-link>
            </li>
            <!-- evs支付方式管理 -->
            <li v-if="menuTree.evs.evspayway" :class="{'active': $route.path.indexOf('/evs/payway') >= 0}">
              <router-link to="/evs/payway"><i class="fa fa-cog"></i>{{ $t('menu.evs.evspayway') }}</router-link>
            </li>
          </ul>
        </li>

      </ul>
    </section>
    <!-- /.sidebar -->
    <!-- </scroll-bar> -->
  </aside>
</template>

<script>
import ScrollBar from '@/components/ScrollBar'

export default {
  props: {
    current: {
      type: Object,
      default: {}
    }
  },
  components: {
    ScrollBar
  },
  data() {
    return {
      modules: [],
    }
  },
  mounted() {

  },
  computed: {
    menuTree() {
      const modules = this.current.modules || [];
      let tree = {};
      modules.forEach(module => {
        // if(tree[module.parentUrl]) {
        //   tree[module.parentUrl][module.name] = module.name;
        // } else {
        //   tree[module.parentUrl] = {};
        //   tree[module.parentUrl][module.name] = module.name;
        // }
        if(module) {
          tree[module.parentUrl] = tree[module.parentUrl] || {};
          tree[module.parentUrl][module.name] = true;
        }
      });
      return tree;
    }
  },

  methods: {

  }
}
</script>
<style lang="scss">
@import "../assets/scss/variables.scss";

.nav-left-view {
  .logo-text {
    color: $tiffany-blue;
    font-size: 30px;
  }

}
</style>
