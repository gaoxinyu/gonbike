<template>
  <div class="add-reward-coupon">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ $t('rwinfocredit.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backRwCredit">
            <i class="fa fa-mail-reply"></i>
          </button>
        </div>
      </div>
      <div class="box box-solid">
        <div class="box-body row">
          <div class="col-md-8 col-xs-12">
            <!-- 基本信息 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('rwinfocredit.query.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rwinfocredit.query.creditName')">
                        <label>{{ rwCredit.name }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocredit.query.changeType')">
                        <label>{{ (rwCredit.changeType == 1 ? $t('rwinfocredit.query.plus') : $t('rwinfocredit.query.minus')) + ' ' + rwCredit.credit }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocredit.query.needPhone')" class="required">
                        {{ rwCredit.needPhone ? $t('rwinfocredit.query.yes') : $t('rwinfocredit.query.no') }}
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('cardInfo.table.title2') }}
      </div>
      <div class="box-body">
        <el-table v-loading="loading" :data="computedCreditLogs" border style="width: 100%">
          <el-table-column prop="createdAtString" :label="$t('cardInfo.table.createdAt')" width="130"></el-table-column>
          <el-table-column prop="typeString" :label="$t('cardInfo.table.type')" width="120"></el-table-column>
          <el-table-column prop="adminName" :label="$t('cardInfo.table.adminName')" width="120"></el-table-column>
          <el-table-column prop="remark" :label="$t('cardInfo.table.remark')"></el-table-column>
        </el-table>

        <div class="row text-center">
          <div class="col-md-12">
            <el-pagination 
              layout="total, prev, pager, next" 
              :total="page.count" 
              :page-size="page.per" 
              :current-page="page.current" 
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api';
import Iphone from '../../components/Iphone';
import Mixins from '../../mixins/index.js'
import { getStorage } from '../../services/auth';
import moment from "moment";
// import ElObikeUpload from 'element-upload'

export default {
  mixins: [Mixins.country, Mixins.pickerStartOption, Mixins.common],
  mounted() {
    api.getRwLog(this, this.query);
  },
  data() {
    return {
      loading: false,
      rwlogs: [],
      rwCredit: JSON.parse(sessionStorage.viewRwCredit),
      query: {
        rewardId: this.$route.query.id,
        operand: 1,
      },
      page: {
        count: 0
      }
    }
  },
  computed: {
    computedCreditLogs() {
      return this.rwlogs.map((item) => {
        return {
          ...item,
          typeString: item.operationType === 1 ? this.$t('cardInfo.js.type1') : item.operationType === 2 ? this.$t('cardInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    backRwCredit() {
      this.$router.push({ name: 'rwcredit' });
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwLog(this, this.query);
      }
    },
  }
}
</script>