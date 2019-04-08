<template>
  <div class="add-reward-coupon">
    <div class="box box-info">
      <div class="box-header width-border">
        {{ $t('rwinfocode.query.title') }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="backRwCode">
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
                {{ $t('rwinfocode.query.basic') }}
              </div>
              <div class="box-body">
                <el-form label-position="left" label-width="120px">
                  <div class="row">
                    <div class="col-md-6 col-xs-12">
                      <el-form-item :label="$t('rwinfocode.query.merchant')">
                        <label>{{ rwCode.merchantName }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocode.query.merchantCode')">
                        <label>{{ rwCode.merchantCode }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocode.query.codeName')">
                        <label>{{ rwCode.name }}</label>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocode.query.fileUrl')">
                        <el-button type="text" size="small" @click="exportCodeExcel()"> {{ $t('rwcode.table.fileUrl') }} </el-button>
                      </el-form-item>

                      <el-form-item :label="$t('rwinfocode.query.needPhone')" class="required">
                        {{ rwCode.needPhone ? $t('rwinfocode.query.yes') : $t('rwinfocode.query.no') }}
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <!-- logo配置 -->
            <div class="box">
              <div class="box-header with-border">
                {{ $t('rwinfocode.query.setting') }}
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-6 col-xs-12">
                    <div class="coupon-list">
                      <div class="item">
                        <h4><span>{{ $t('rwinfocode.query.set') }}</span></h4>
                        <div class="item-con">
                          <div class="left">
                            Logo
                            <img class="logo" :src="rwCode.logoUrl" />
                          </div>
                          <div class="right">
                            <h3>OBIKE2018(SAMPLE)</h3>
                            <p class="item-name">{{ rwCode.logoName || '--' }}</p>
                            <span class="detail" v-show="rwCode.h5Url">{{ $t('rwinfocode.query.detail') }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="link" v-if="rwCode.h5Url" style="margin-top: 20px;">
                      {{ $t('rwinfocode.query.link') + ': ' + rwCode.h5Url }}
                    </div>
                  </div>
                </div>
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
        <el-table v-loading="loading" :data="computedCodeLogs" border style="width: 100%">
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
  mixins: [Mixins.country, Mixins.pickerStartOption, Mixins.common, Mixins.query],
  mounted() {
    api.getRwLog(this, this.query);
  },
  data() {
    return {
      loading: false,
      rwlogs: [],
      rwCode: JSON.parse(sessionStorage.viewRwCode),
      query: {
        operand: 1,
        rewardId: this.$route.query.id,
        id: this.$route.query.id,
      },
      page: {
        count: 0
      }
    }
  },
  computed: {
    computedCodeLogs() {
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
    backRwCode() {
      this.$router.push({ name: 'rwcode' });
    },
    handleCurrentChange(val) {
      if (!this.loading) {
        this.query.pageNum = val;
        api.getRwLog(this, this.query);
      }
    },
    exportCodeExcel() {
      this.query.id = this.query.rewardId
      this.exportExcel(
        `/api/v1/reward/rewards/code/export/file`
      );
    }
  }
}
</script>
