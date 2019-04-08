<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('bikelogoinfo.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBikeLogo"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <div class="box">
            <div class="box-header">
              {{ $t('bikelogoinfo.form.basic')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedViewBikeLogo" border style="width: 100%">
                <el-table-column prop="countryName" :label="$t('bikelogo.table.countryName')"></el-table-column>
                <el-table-column prop="cityName" :label="$t('bikelogo.table.cityName')"></el-table-column>
                <el-table-column prop="typeString" :label="$t('bikelogo.table.type')"></el-table-column>
                <el-table-column prop="iconUrl" :label="$t('bikelogo.table.iconUrl')">
                  <template slot-scope="scope">
                    <a href="javascript:void(0)">
                      <img class="icon-img" :src="scope.row.iconUrl">
                    </a>
                  </template>
                </el-table-column>
                <el-table-column prop="startTimeString" :label="$t('bikelogo.table.startTime')"></el-table-column>
                <el-table-column prop="endTimeString" :label="$t('bikelogo.table.endTime')"></el-table-column>
                <el-table-column prop="remark" :label="$t('bikelogo.table.remark')"></el-table-column>
              </el-table>
            </div>
          </div>

          <div class="box">
            <div class="box-header">
              {{ $t('bikelogoinfo.form.operator')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedBikeLogoLog" border style="width: 100%">
                <el-table-column prop="operateTimeString" :label="$t('bikelogoinfo.table.operateTime')"></el-table-column>
                <el-table-column prop="action" :label="$t('bikelogoinfo.table.activity')"></el-table-column>
                <el-table-column prop="operater" :label="$t('bikelogoinfo.table.operater')"></el-table-column>
                <el-table-column prop="remark" :label="$t('bikelogoinfo.table.operate')"></el-table-column>
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
      const bikeicon = sessionStorage.viewbikeicon;
      if(this.$route.name === 'bikelogoinfo' && bikeicon) {
        this.current = JSON.parse(bikeicon);
        this.query.bikeIconId = this.current.id;
        api.getBikeLogoLog(this, this.query);
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
        bikelogolog: [],
        pageNum: 1,
        page: {
          count: 0
        },
        typeOptions: [
          { label: this.$t('bikelogo.js.all'), value: null },
          { label: this.$t('bikelogo.js.type_1'), value: -1 },
          { label: this.$t('bikelogo.js.type0'), value: 0 },
          { label: this.$t('bikelogo.js.type1'), value: 1 },
          { label: this.$t('bikelogo.js.type2'), value: 2 }
        ],
      }
    },
    computed: {
      computedViewBikeLogo() {
        this.bikeicon = [this.current];
        return this.bikeicon.map((item) => {
          return {
            ...item,
            typeString: item.type === -1 ? this.typeOptions[1].label : item.type === 0 ? this.typeOptions[2].label : item.type === 1 ? this.typeOptions[3].label : item.type === 2 ? this.typeOptions[4].label : '',
            startTimeString: item.startDate ? moment(item.startDate).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.endDate ? moment(item.endDate).format("YYYY-MM-DD HH:mm:ss") : ""
          }
        });
      },
      computedBikeLogoLog() {
        return this.bikelogolog.map((item) => {
          return {
            operateTimeString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
            action: item.dealType === 1 ? "创建" : "编辑",
            operater: item.createdByName ? item.createdByName : "",
            remark: item.action ? item.action : ""
          }
        })
      }
    },
    methods: {
      goBikeLogo() {
        this.$router.push({name: "bikelogo"});
      },
      handleCurrentChange(val) {
        this.query.pageNum = val;
        api.getBikeAreaLog(this, this.query);
      }
    }
  }
</script>
