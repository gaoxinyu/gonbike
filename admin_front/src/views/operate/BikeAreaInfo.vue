<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('bikeareainfo.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBikeArea"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <div class="box">
            <div class="box-header">
              {{ $t('bikeareainfo.form.basic')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedViewBikeArea" border style="width: 100%">
                <el-table-column prop="countryName" :label="$t('bikeareainfo.table.country')"></el-table-column>
                <el-table-column prop="cityName" :label="$t('bikeareainfo.table.city')"></el-table-column>
                <el-table-column prop="usingFlagString" :label="$t('bikeareainfo.table.state')"></el-table-column>
                <el-table-column prop="stationNum" :label="$t('bikeareainfo.table.areaNum')"></el-table-column>
                <el-table-column prop="remark" :label="$t('bikeareainfo.table.remark')"></el-table-column>
              </el-table>
            </div>
          </div>

          <div class="box">
            <div class="box-header">
              {{ $t('bikeareainfo.form.operator')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedBikeAreaLog" border style="width: 100%">
                <el-table-column prop="operateTimeString" :label="$t('bikeareainfo.table.operateTime')"></el-table-column>
                <el-table-column prop="action" :label="$t('bikeareainfo.table.activity')"></el-table-column>
                <el-table-column prop="operater" :label="$t('bikeareainfo.table.operater')"></el-table-column>
                <el-table-column prop="remark" :label="$t('bikeareainfo.table.operate')"></el-table-column>
              </el-table>
            </div>
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
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api';
  import moment from "moment";

  export default {
    mounted() {
      const bikearea = sessionStorage.viewBikeArea;
      if(this.$route.name === 'bikeareainfo' && bikearea) {
        this.current = JSON.parse(bikearea);
        this.query.countryId = this.current.countryId;
        this.query.cityId = this.current.cityId;
        api.getBikeAreaLog(this, this.query);
      }
    },
    data() {
      return {
        loading: false,
        bikearea: [],
        current: {},
        query: {
          pageNum: 1
        },
        bikearealog: [],
        page: {
          count: 0
        }
      }
    },
    computed: {
      computedViewBikeArea() {
        this.bikearea = [this.current];
        return this.bikearea.map((item) => {
          return {
            ...item,
            usingFlagString: item.usingFlag === 1 ? '启用' : '禁用',
          }
        });
      },
      computedBikeAreaLog() {
        return this.bikearealog.map((item) => {
          return {
            operateTimeString: item.actionTime ? moment(item.actionTime).format("YYYY-MM-DD HH:mm:ss") : "",
            action: item.dealType === 1 ? "创建" : "编辑",
            operater: item.userName ? item.userName : "",
            remark: item.action ? item.action : ""
          }
        })
      }
    },
    methods: {
      goBikeArea() {
        this.$router.push({name: "bikearea"});
      },
      handleCurrentChange(val) {
        this.query.pageNum = val;
        api.getBikeAreaLog(this, this.query);
      }
    }
  }
</script>
