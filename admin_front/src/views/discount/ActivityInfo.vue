<template>
<div>
  <h4>{{ $t('activityInfo.table.title0') }}</h4>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('activityInfo.table.title1') }}
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-6">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.type') }}</td>
                  <td>{{ $t('activityInfo.table.typeName') }}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.country') }}</td>
                  <td>{{activity.countryName || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.city') }}</td>
                  <td>{{activity.cityName || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.startTime') }}</td>
                  <td>{{activity.startTimeString || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.endTime') }}</td>
                  <td>{{activity.endTimeString || "--"}}</td>
                </tr>

                <!--<tr>
                  <th>{{ $t('activityInfo.table.comment') }}</th>
                  <th>{{ $t('activityInfo.table.bannerUrl') }}</th>
                  <th>{{ $t('activityInfo.table.content') }}</th>
                </tr>
                <tr>
                  <td>{{activity.comment || "--"}}</td>
                  <td>
                    <a href="javascript:void(0)" @click="handlePic">
                      <img :src="activity.bannerUrl" width="100px">
                    </a>
                  </td>
                  <td>{{activity.content || "--"}}</td>
                </tr>-->

              </tbody>
            </table>

            <table class="table table-bordered" v-if="activity.title">
              <tbody>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.bannerUrl') }}</td>
                  <td style="word-break:break-all;">{{activity.bannerUrl || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.title') }}</td>
                  <td>{{activity.title || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.content') }}</td>
                  <td>{{activity.content || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('activityInfo.table.h5Url') }}</td>
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
                      <h5 class="text-center">{{ activity.title || $t('activityInfo.table.mTitle') }}</h5>
                      <p>{{ activity.content || $t('activityInfo.table.mContent') }}</p>
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
      {{ $t('activityInfo.table.title2') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedActivityLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('activityInfo.table.createdAt')" width="130"></el-table-column>
        <el-table-column prop="typeString" :label="$t('activityInfo.table.typeString')" width="120"></el-table-column>
        <el-table-column prop="adminName" :label="$t('activityInfo.table.adminName')" width="120"></el-table-column>
        <el-table-column prop="remark" :label="$t('activityInfo.table.remark')"></el-table-column>
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
      activityLogs: [],
      activity: JSON.parse(sessionStorage.getItem('activity')) || {}, 
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
          typeString: item.type === 1 ? this.$t('activityInfo.js.type1') : item.type === 2 ? this.$t('activityInfo.js.type2') : '',
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