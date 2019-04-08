<template>
<div>
  <h4>{{ $t('cardInfo.table.title') }}</h4>

    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('cardInfo.table.title1') }}
      </div>
      <div class="box-body">
        <div class="row">
          <div class="col-md-6">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.freeType') }}</td>
                  <td>{{ $t('cardInfo.table.typeName') }}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.status') }}</td>
                  <td>{{activity.statusString || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.country') }}</td>
                  <td>{{activity.countryName || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.city') }}</td>
                  <td>{{activity.cityName || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.startTime') }}</td>
                  <td>{{activity.startTimeString || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.endTime') }}</td>
                  <td>{{activity.endTimeString || "--"}}</td>
                </tr>
              </tbody>
            </table>

            <table class="table table-bordered" v-if="activity.title">
              <tbody>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.bannerUrl') }}</td>
                  <td style="word-break:break-all;">{{activity.bannerUrl || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.title') }}</td>
                  <td>{{activity.title || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.content') }}</td>
                  <td>{{activity.content || "--"}}</td>
                </tr>
                <tr>
                  <td style="width:120px;">{{ $t('cardInfo.table.h5Url') }}</td>
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
                      <h5 class="text-center">{{ activity.title || $t('cardInfo.table.mTitle') }}</h5>
                      <p>{{ activity.content || $t('cardInfo.table.mContent') }}</p>
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
      {{ $t('cardInfo.table.title2') }}
    </div>
    <div class="box-body">
      <el-table v-loading="loading" :data="computedActivityLogs" border style="width: 100%">
        <el-table-column prop="createdAtString" :label="$t('cardInfo.table.createdAt')" width="130"></el-table-column>
        <el-table-column prop="typeString" :label="$t('cardInfo.table.type')" width="120"></el-table-column>
        <el-table-column prop="adminName" :label="$t('cardInfo.table.adminName')" width="120"></el-table-column>
        <el-table-column prop="remark" :label="$t('cardInfo.table.remark')"></el-table-column>
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
      activity: JSON.parse(sessionStorage.getItem('card')) || {}, 
      query: {
        activityId: this.$route.params.id,
        activityType: 2,
      }
    }
  },
  computed: {
    computedActivityLogs() {
      return this.activityLogs.map((item) => {
        return {
          ...item,
          typeString: item.type === 1 ? this.$t('cardInfo.js.type1') : item.type === 2 ? this.$t('cardInfo.js.type2') : '',
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