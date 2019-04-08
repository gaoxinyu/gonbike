<template>
<div>
  <h4>{{ $t('freeInfo.table.title') }}</h4>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('freeInfo.table.title1') }}
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-6">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.freeType') }}</td>
                  <td>{{ $t('freeInfo.table.typeName') }}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.status') }}</td>
                  <td>{{activity.statusString || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.country') }}</td>
                  <td>{{activity.countryName || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.city') }}</td>
                  <td>{{activity.cityName || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.startTime') }}</td>
                  <td>{{activity.startTimeString || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.endTime') }}</td>
                  <td>{{activity.endTimeString || "--"}}</td>
                </tr>
              </tbody>
            </table>

            <table class="table table-bordered" v-if="activity.title">
              <tbody>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.bannerUrl') }}</td>
                  <td style="word-break:break-all;">{{activity.bannerUrl || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.title') }}</td>
                  <td>{{activity.title || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.content') }}</td>
                  <td>{{activity.content || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('freeInfo.table.h5Url') }}</td>
                  <td style="word-break:break-all;">{{activity.h5Url || "--"}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-6">
            <iphone v-if="activity.title">
              <div class="mask iphone-notify center">
                <div>
                  <div class="box box-solid">
                    <div class="box-body">
                      <img v-show="activity.bannerUrl" :src="activity.bannerUrl" alt="">
                      <h5 class="text-center">{{ activity.title || $t('freeInfo.table.mTitle') }}</h5>
                      <p>{{ activity.content || $t('freeInfo.table.mContent') }}</p>
                    </div>
                  </div>
                  <div class="close-model text-center"><i class="fa fa-close"></i></div>
                </div>
              </div>
            </iphone>
          </div>
        </div>
        
      </div>
    </div>

  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('freeInfo.table.title2') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedActivityLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('freeInfo.table.createdAt')" width="130"></el-table-column>
        <el-table-column prop="typeString" :label="$t('freeInfo.table.type')" width="120"></el-table-column>
        <el-table-column prop="adminName" :label="$t('freeInfo.table.adminName')" width="120"></el-table-column>
        <el-table-column prop="remark" :label="$t('freeInfo.table.remark')"></el-table-column>
      </el-table>
    </div>

  </div>

</div>
</template>

<script>
import api from '../../api'
import moment from "moment"
import Iphone from '../../components/Iphone'

export default {
  mounted() {
    api.getActivityLogList(this, this.query);
  },
  data() {
    return {
      loading: false,
      bigPicVisible: false,
      activityLogs: [],
      activity: JSON.parse(sessionStorage.getItem('free')) || {}, 
      query: {
        activityId: this.$route.params.id,
        activityType: 1,
      }
    }
  },
  computed: {
    computedActivityLogs() {
      return this.activityLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('freeInfo.js.type1') : item.type === 2 ? this.$t('freeInfo.js.type2') : '',
          createdAtString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
        }
      })
    }
  },
  methods: {
    
  },
  components: {
    Iphone
  }
}

</script>