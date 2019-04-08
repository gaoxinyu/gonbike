<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'admin-lte/dist/js/app.js';
// import 'admin-lte/plugins/pace/pace.min.js';
$.AdminLTE.options.enableBSToppltip = false;

export default {
}
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.css';
@import './assets/font/css/font-awesome.css';
@import './assets/scss/_Admin_LTE.css';
@import '~admin-lte/dist/css/skins/skin-blue.css';
@import './assets/font/css/style.css';

.el-select, .el-autocomplete {
  width: 100%;	
}
// .sidebar-menu .treeview-menu > li > a{
//   padding-left: 20px;
// }

.sidebar-menu .treeview-menu > li > a > .icon {
  display: inline-block;
  width: 20px;
}

// 左侧菜单hover的宽度
.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>.treeview-menu, 
.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>a>span:not(.pull-right) {
  width: 220px;
}

.el-table, 
.el-button,
.el-form-item__label, 
.el-input__inner, 
.el-select-dropdown__item, 
.el-picker-panel__shortcut,
.el-date-picker__header-labelk, {     // modify the default font size
  font-size: 12px;
}

.el-form-item__label {
  line-height: 1;
  padding: 14px 12px 14px 0;
}

.el-form-item {
  margin-bottom: 5px;
}

.box {
  margin-bottom: 10px;
}
.box-body {
  padding: 5px;
}
.el-table .cell {
  padding-left: 10px;
  padding-right: 5px;
}
.el-table td, .el-table th {
  padding: 0;
  height: 34px;
}

.magin-r-10 {
  margin-right: 10px;
}

.magin-t-10 {
  margin-top: 10px;
}

.no-min-with {
  min-width: initial !important;
}

.el-upload__input {
  display: none !important;
}

.el-input__inner {
  height: 36px;
  padding: 0 15px;
}

.el-input-number {
  line-height: 34px;
}

// 所有按钮
.el-button {
  padding: 10px 15px;
}

// 文字按钮
.el-button--text {
  padding: 7px 0;
}

// 时间范围选择框 右边的叉号
.el-date-editor .el-range__close-icon {
  width: 14px;
}
.el-input-group__append, .el-input-group__prepend {
  padding: 0 10px;
}
.el-icon-circle-close:before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.el-loading-mask {
  z-index: 9;
}

// iphone
.iphone-view {
  width: 312px;
  height: 628.5px;
  padding: 72px 18px 72px 19px;

  background-image: url(./assets/iphone_6_plus.png);
  background-size: 100% 100%;
  background-repeat:no-repeat;

  .iphone-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-size: 12px;

    img {
      width: 100%;
      &.bike-logo {
        position: absolute;
        width: 40px;
        height: 53px;
        top: 50%;
        left: 50%;
      }
    }
  }
}
.add-bike-logo .el-textarea__inner {
  font-size: 12px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
// .avatar-uploader .el-upload-list {
//   display: none;
// }
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 106px;
  line-height: 106px;
  text-align: center;
}
.avatar-uploader-icon::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar {
  width: 80px;
  height: 106px;
  display: block;
}
.add-activity-view {
  .el-upload {
    width: 100%;
  }
}
.bg-logo {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('./assets/img/bg_logo.jpg');
  background-size: contain;
}
.el-picker-panel__footer .el-button--text {
  display: none;
}
.add-bike-icon .image {
  width: 90%;
}
.add-bike-icon .el-dialog {
  right: 0;
  left: auto;
  transform: inherit;
}
.error {
  color: #f00;
}
.el-date-editor--daterange {
  .el-icon-date {
    display: none;
  }
}
.el-date-editor .el-range-input {
  width: 46%;
}
.coupon-list .item h4 {
  position: relative;
  text-align: center;
  &::before {
    content: '';
    width: 130px;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: #ddd;
  }
  &::after {
    content: '';
    width: 130px;
    height: 1px;
    position: absolute;
    top: 50%;
    right: 0;
    background-color: #ddd;
  }
}
.item-con {
  padding: 10px;
  display: flex;
  border: 1px solid #ddd;
  .left {
    position: relative;
    width: 110px;
    height: 110px;
    margin-right: 10px;
    font-size: 24px;
    text-align: center;
    color: #ddd;
    line-height: 110px;
    border: 50%;
    border: 1px solid #ddd;
    border-radius: 50%;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .right {
    position: relative;
    flex: 1;
    padding: 0 10px 0 20px;
    border-left: 1px dashed #ddd;
    h3 {
      padding: 0;
      margin: 0;
      color: #ff9c00;
      span {
        font-size: 32px;
      }
    }
    .item-name {
      color: #b3b3b3;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
    }
    .item-date {
      font-size: 12px;
      color: #aaa;
    }
    .detail {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #ff9c00;
    }
  }
}
</style>
