<template>
  <div class="ad-info-info">
    <div class="box box-info">
      <div class="box-header with-border">
        {{ $t('adinfo.query.title' + $route.params.id) }}
        <div class="pull-right box-tools">
          <button type="button" class="btn btn-info btn-sm" @click="goBack"><i class="fa fa-mail-reply"></i></button>
        </div>
      </div>
      <div class="box-body">
        <div class="box with-border">
          <div class="box-header">
            {{ $t('adinfo.query.basic') }}
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td style="width: 120px">{{ $t('adinfo.table.type') }}</td>
                      <td>{{ $t('adinfo.query.type' + adinfo.type) }}</td>
                    </tr>
                    <tr>
                      <td style="width: 120px">{{ $t('adinfo.table.countryId') }}</td>
                      <td>{{ adinfo.countryName }}</td>
                    </tr>
                    <tr>
                      <td style="width: 120px">{{ $t('adinfo.table.name') }}</td>
                      <td>{{ $t('adinfo.query.name' + adinfo.name) }}</td>
                    </tr>
                    <tr>
                      <td style="width: 120px">{{ $t('adinfo.table.date') }}</td>
                      <td>{{ adinfo.dateString }}</td>
                    </tr>
                    <tr>
                      <td style="width: 120px">{{ $t('adinfo.table.status') }}</td>
                      <td>{{ adinfo.statusString }}</td>
                    </tr>
                    <tr v-if="adinfo.type == 1 || adinfo.type == 2">
                      <td style="width: 120px">{{ $t('adinfo.table.repeatTime') }}</td>
                      <td>{{ adinfo.repeatString }}</td>
                    </tr>
                    <tr v-if="adinfo.type == 1">
                      <td style="width: 120px">{{ $t('adinfo.table.template') }}</td>
                      <td>{{ $t('adinfo.query.template' + adinfo.subType) }}</td>
                    </tr>
                    <tr v-if="adinfo.type == 4">
                      <td style="width: 120px">{{ $t('adinfo.table.icon') }}</td>
                      <td><img :src="adinfo.icon" style="width: 120px;" /></td>
                    </tr>
                    <tr v-if="adinfo.type == 4">
                      <td style="width: 120px">{{ $t('adinfo.table.iconpos') }}</td>
                      <td>{{ $t('adinfo.table.longlat', {lat: adinfo.iconLatitude, long: adinfo.iconLongitude}) }}</td>
                    </tr>
                    <tr v-if="adinfo.type == 4">
                      <td style="width: 120px">{{ $t('adinfo.table.iconpop') }}</td>
                      <td>{{ adinfo.iconPop ? $t('adinfo.table.yes') : $t('adinfo.table.no') }}</td>
                    </tr>
                    <tr>
                      <td style="width: 120px">{{ $t('adinfo.table.pic') }}</td>
                      <td><img :src="adinfo.picture" style="width: 120px;" /></td>
                    </tr>
                    <tr v-if="((adinfo.iconPop && adinfo.type == 4) || (adinfo.type == 1 && adinfo.subType == 1) || adinfo.type == 2)">
                      <td style="width: 120px">{{ $t('adinfo.table.language') }}</td>
                      <td>
                        <a v-for="(lang, index) in adinfo.languages" 
                        :key = index
                        @click="getLangIndex(index)" 
                        style="padding-right: 10px; display: inline-block;" 
                        :class="{'text-aqua': index === currentIndex, 'text-muted': currentIndex !== index}" 
                        href="javascript:void(0);"
                        >{{ $t('common.languages.' + lang.language ) }}</a>
                      </td>
                    </tr>
                    <tr v-if="((adinfo.iconPop && adinfo.type == 4) || (adinfo.type == 1 && adinfo.subType == 1) || adinfo.type == 2)">
                      <td style="width: 120px">{{ $t('adinfo.table.title') }}</td>
                      <td>
                        <span 
                        v-for="(lang, index) in adinfo.languages" 
                        :key = index
                        v-show="currentIndex === index"
                        >{{ lang.title }}</span>
                      </td>
                    </tr>
                    <tr v-if="((adinfo.iconPop && adinfo.type == 4) || (adinfo.type == 1 && adinfo.subType == 1) || adinfo.type == 2)">
                      <td style="width: 120px">{{ $t('adinfo.table.content') }}</td>
                      <td>
                        <span 
                        v-for="(lang, index) in adinfo.languages" 
                        :key = index
                        v-show="currentIndex === index"
                        >{{ lang.content }}</span>
                      </td>
                    </tr>
                    <tr v-if="adinfo.jumpType">
                      <td style="width: 120px">{{ $t('adinfo.table.link') }}</td>
                      <td>{{ adinfo.linkString }}</td>
                    </tr>
                    <tr v-if="adinfo.jumpType">
                      <td style="width: 120px">{{ $t('adinfo.table.url') }}</td>
                      <td>
                        <span v-if="!(adinfo.jumpType == 3) && adinfo.jumpTo">{{ $t('adinfo.table.linkAddr') + adinfo.jumpType == 2 ? getNameById(jumpToOptions, adinfo.jumpTo) : adinfo.jumpTo }}</span>
                        <span v-if="(adinfo.jumpType == 3) && adinfo.appStoreAndroid">{{ $t('adinfo.table.AndroidAddr') + adinfo.appStoreAndroid }}</span>
                        <span v-if="(adinfo.jumpType == 3) && adinfo.appStoreIos">{{ $t('adinfo.table.iOSAddr') + adinfo.appStoreIos }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6 col-xs-12">
                <iphone>
                  <div class="mask iphone-notify center">
                    <div>
                      <div class="box box-solid">
                        <div class="box-body">
                          <img v-show="adinfo.picture" :src="adinfo.picture" alt="">
                          <h5 class="text-center" v-if="adinfo.type != 3">
                            <span 
                            v-for="(lang, index) in adinfo.languages" 
                            :key = index
                            v-show="currentIndex === index"
                            >{{ lang.title }}</span></h5>
                          <p v-if="adinfo.type != 3"><span 
                          v-for="(lang, index) in adinfo.languages" 
                          :key = index
                          v-show="currentIndex === index"
                          >{{ lang.content }}</span></p>
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
        <div class="box with-border">
          <div class="box-header">
            {{ $t('adinfo.query.operator') }}
          </div>
          <div class="box-body">
            <el-table v-loading="loading" :data="computedADLogs" border style="width: 100%">
              <el-table-column prop="operateTimeString" :label="$t('adinfo.table.operateTime')"></el-table-column>
              <el-table-column prop="action" :label="$t('adinfo.table.activity')"></el-table-column>
              <el-table-column prop="operater" :label="$t('adinfo.table.operater')"></el-table-column>
              <el-table-column prop="remark" :label="$t('adinfo.table.operate')"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<<script>
import api from '../../api'
import moment from "moment"
import Mixins from '../../mixins/index.js'
import Iphone from '../../components/Iphone'

export default {
  mixins: [Mixins.country, Mixins.query, Mixins.common],
  mounted() {
    api.getADAreaLog(this, {id: this.$route.query.id});
  },
  data() {
    return {
      loading: false,
      adinfo: JSON.parse(sessionStorage.getItem('adinfo')) || {}, 
      adlogs: [],
      currentIndex: 0,
      jumpToOptions: ['myInfo', 'editStudentCertification', 'successfulCertification',
                      'failedCertification', 'rechargeMember', 'memberInfo', 'myWallet',
                      'couponList', 'creditPoints', 'invitationReward', 'negativeRecord',
                      'transactionDetails', 'gainCredibility', 'myTrip'].map(page => { return {label: this.$t('adadd.js.' + page), value: page} }),
    }
  },
  computed: {
    computedADLogs() {
      return this.adlogs.map((item) => {
        return {
          ...item,
          operateTimeString: item.createdAt ? moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") : "",
          action: item.action === 1 ? this.$t('adinfo.js.add') : this.$t('adinfo.js.edit'),
          operater: item.adminName ? item.adminName : '',
          remark: item.remark ? item.remark : ''
        }
      })
    }
  },
  methods: {
    goBack() {
      this.$router.push({'name': 'adarea'});
    },
    getLangIndex(val) {
      this.currentIndex = val;
    }
  },
  components: {
    Iphone
  }
}
</script>
