<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('stateinfo.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goStateConfig"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <div class="box">
            <div class="box-header">
              {{ $t('stateinfo.form.basic')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedViewStateInfo" border style="width: 100%">
                <el-table-column prop="countryNameWithCode" :label="$t('stateinfo.table.countryName')"></el-table-column>
                <el-table-column prop="codeString" :label="$t('stateinfo.table.code')"></el-table-column>
              </el-table>
            </div>
          </div>

          <div class="box">
            <div class="box-header">
              {{ $t('stateinfo.form.operator')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedStateInfo" border style="width: 100%">
                <el-table-column prop="operateTimeString" :label="$t('versioninfo.table.operateTime')"></el-table-column>
                <el-table-column prop="action" :label="$t('versioninfo.table.activity')"></el-table-column>
                <el-table-column prop="operater" :label="$t('versioninfo.table.operater')"></el-table-column>
                <el-table-column prop="remark" :label="$t('versioninfo.table.operate')"></el-table-column>
              </el-table>
            </div>
          </div>

          <!-- <div class="row text-center">
            <div class="col-md-12">
              <el-pagination
                layout="total, prev, pager, next"
                :total="page.count"
                :page-size="page.per"
                :current-page="page.current"
                @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api';
  import moment from "moment";

  export default {
    mounted() {
      const stateinfo = sessionStorage.stconfInfo;
      if(this.$route.name === 'stateconfiginfo' && stateinfo) {
        this.current = JSON.parse(stateinfo);
        api.getStateConfigLog(this, {id: this.current.id});
      }
    },
    data() {
      return {
        loading: false,
        stateconfig: [],
        current: {},
        stconflog: [],
        page: {
          count: 0
        }
      }
    },
    computed: {
      computedViewStateInfo() {
        this.stateconfig = [this.current];
        return this.stateconfig.map((item) => {
          return {
            ...item,
            countryNameWithCode: item.countryName ? item.countryName  + (item.code ? (' ( ' + item.code + ' )') : '') : '',
            codeString: item.code ? item.code + ' xxx xxx' : ''
          }
        });
      },
      computedStateInfo() {
        return this.stconflog.map((item) => {
          return {
            ...item,
            operateTimeString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
            action: item.action === 1 ? "创建" : "编辑",
            operater: item.createdName ? item.createdName : "",
            remark: item.remark ? item.remark : ""
          }
        })
      }
    },
    methods: {
      goStateConfig() {
        this.$router.push({name: "stateconfig"});
      }
    }
  }
</script>
