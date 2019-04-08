<template>
  <div>
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('depositinfo.form.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goDeposit"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12"></div>
          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="goUser">{{ $t('deposit.table.goUser') }}</el-button>
          </div>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body">
          <div class="box">
            <div class="box-header">
              {{ $t('depositinfo.form.basic')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedViewDeposit" border style="width: 100%">
                <el-table-column prop="activityTypeString" :label="$t('deposit.table.activityType')"></el-table-column>
                <el-table-column prop="countryName" :label="$t('deposit.table.countryId')"></el-table-column>
                <el-table-column prop="statusString" :label="$t('deposit.table.status')"></el-table-column>

                <el-table-column prop="countryDepositString" :label="$t('deposit.table.countryDeposit')"></el-table-column>
                <el-table-column prop="depositString" :label="$t('deposit.table.deposit')"></el-table-column>
                <el-table-column prop="countryStudentDepositString" :label="$t('deposit.table.countryStudentDeposit')"></el-table-column>
                <el-table-column prop="studentDepositString" :label="$t('deposit.table.studentDeposit')"></el-table-column>

                <el-table-column prop="startTimeString" :label="$t('deposit.table.startTime')"></el-table-column>
                <el-table-column prop="endTimeString" :label="$t('deposit.table.endTime')"></el-table-column>
              </el-table>
            </div>
          </div>

          <div class="box">
            <div class="box-header">
              {{ $t('depositinfo.form.operator')}}
            </div>
            <div class="box-body">
              <el-table v-loading="loading" :data="computedDepositLog" border style="width: 100%">
                <el-table-column prop="operateTimeString" :label="$t('depositinfo.table.operateTime')"></el-table-column>
                <el-table-column prop="action" :label="$t('depositinfo.table.activity')"></el-table-column>
                <el-table-column prop="operater" :label="$t('depositinfo.table.operater')"></el-table-column>
                <el-table-column prop="remark" :label="$t('depositinfo.table.operate')"></el-table-column>
              </el-table>
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
      const depositinfo = sessionStorage.depositinfo;
      if(this.$route.name === 'depositinfo' && depositinfo) {
        this.current = JSON.parse(depositinfo);
        api.getActivityLogList(this, { activityId: this.current.id, activityType: 1});
      }
    },
    data() {
      return {
        loading: false,
        activityLogs: [],
        current: {},
        thisdeposit: {},
        page: {
          count: 0
        },
        typeOptions: [
          { label: this.$t('bikelogo.js.all'), value: null },
          { label: this.$t('bikelogo.js.type0'), value: 0 },
          { label: this.$t('bikelogo.js.type1'), value: 1 },
          { label: this.$t('bikelogo.js.type2'), value: 2 }
        ],
      }
    },
    computed: {
      computedViewDeposit() {
        this.thisdeposit = [this.current];
        return this.thisdeposit.map((item) => {
          return {
            ...item,
            activityTypeString: item.activityType === 1 ? this.$t('deposit.js.activityType1') : item.activityType === 2 ? this.$t('deposit.js.activityType2') : item.activityType === 3 ? this.$t('deposit.js.activityType3') : item.activityType === 4 ? this.$t('deposit.js.activityType4') : '',
            updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
            startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
            endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
            statusString: item.status === 0 ? this.$t('deposit.js.status0') : item.status === 1 ? this.$t('deposit.js.status1') : item.status === 2 ? this.$t('deposit.js.status2') : '',
            countryDepositString: item.countryDeposit ? item.currencySymbol + item.countryDeposit : '',
            depositString: item.deposit ? item.currencySymbol + item.deposit : '',
            countryStudentDepositString: item.countryStudentDeposit ? item.currencySymbol + item.countryStudentDeposit : '',
            studentDepositString: item.studentDeposit ? item.currencySymbol + item.studentDeposit : '',
            areaString: item.countryName + (item.cityName ? ' - ' + item.cityName : ''),
          }
        });
      },
      computedDepositLog() {
        return this.activityLogs.map((item) => {
          return {
            operateTimeString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
            action: item.type === 1 ? "创建" : "编辑",
            operater: item.adminName ? item.adminName : "",
            remark: item.remark ? item.remark : ""
          }
        })
      }
    },
    methods: {
      goDeposit() {
        this.$router.push({name: "deposit"});
      },
      goUser() {
        this.$router.push({name: "depositusers", params: { id: this.current.id }});
      }
    }
  }
</script>
