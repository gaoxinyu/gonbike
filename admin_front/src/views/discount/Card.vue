<template>
<div class="user-info-view">
  <div class="box box-info">
    <div class="box-header with-border">
      {{ $t('card.query.title') }}
      <div class="pull-right box-tools">
        <button type="button" class="btn btn-info btn-sm" @click="goAdd">{{ $t('card.query.goAdd') }}</button>
      </div>
    </div>
    <div class="box-body">
      <el-form label-position="left" label-width="90px">
        <div class="row">
          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('card.query.time')">
              <el-date-picker
                v-model="query.time"
                type="date"
                :placeholder="$t('card.query.chooseTime')"
                value-format="yyyy-MM-dd"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('card.query.countryId')">
              <el-select v-model="query.countryId">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-form-item :label="$t('card.query.status')">
              <el-select v-model="query.status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="col-md-3 col-xs-12">
            <el-button class="pull-right" type="primary" @click="handleQuery" :loading="loading">{{ $t('card.query.query') }}</el-button>
            <el-button class="pull-right magin-r-10" type="warning" @click="resetQuery" :loading="loading" :plain="true">{{ $t('common.resetQuery') }}</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <div class="box box-solid">
    <div class="box-body">
      <el-table v-loading="loading" :data="computedCards" border style="width: 100%">
        <el-table-column prop="id" :label="$t('card.table.id')" width="60"></el-table-column>
        <el-table-column prop="updateAtString" :label="$t('card.table.updateAt')" width="140"></el-table-column>
        <el-table-column prop="activityTypeString" :label="$t('card.table.activityType')" width="100"></el-table-column>
        <el-table-column prop="language" :label="$t('pushMessage.table.languages')" >
          <template slot-scope="scope">
            <a v-for="(lang, index) in scope.row.activityLanguages"
              :key="index"
              @click="scope.row.languageIndex = index"
              style="padding-right: 10px; display: inline-block;"
              :class="{'text-aqua': scope.row.languageIndex === index, 'text-muted': scope.row.languageIndex !== index}"
              href="javascript:void(0);"
              >{{ $t('common.languages.' + lang.language ) }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="title" :label="$t('pushMessage.table.notiTitle')" width="100">
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.activityLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="$t('pushMessage.table.notiContent')" width="200">
          <template slot-scope="scope">
            <span
              v-for="(lang, index) in scope.row.activityLanguages"
              :key="index"
              v-show="scope.row.languageIndex === index"
              >{{ lang.content }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="title" :label="$t('card.table.title')"></el-table-column>
        <el-table-column prop="content" :label="$t('card.table.content')"></el-table-column> -->
        <el-table-column prop="startTimeString" :label="$t('card.table.startTime')" width="140"></el-table-column>
        <el-table-column prop="endTimeString" :label="$t('card.table.endTime')" width="140"></el-table-column>
        <el-table-column prop="statusString" :label="$t('card.table.status')"></el-table-column>
        <el-table-column prop="countryName" :label="$t('card.table.countryName')"></el-table-column>
        <!--<el-table-column prop="cityName" :label="$t('card.table.cityName')"></el-table-column>-->
        <el-table-column prop="activityContentString" :label="$t('card.table.activityContent')" min-width="240"></el-table-column>
        <el-table-column prop="freecardString" :label="$t('card.table.freecard')"></el-table-column>

        <el-table-column fixed="right" :label="$t('card.table.operate')" width="70">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top" popper-class="no-min-with">
              <el-button slot="reference" type="text" size="small">{{ $t('card.table.operate') }}</el-button>
              <el-button type="text" size="small" @click="edit(scope.$index, scope.row)">{{ $t('card.table.edit') }}</el-button>
              <br>
              <el-button type="text" size="small" @click="detail(scope.$index, scope.row)">{{ $t('card.table.detail') }}</el-button>
              <br>
              <!--<el-button type="text" size="small" @click="goUser(scope.$index, scope.row)">{{ $t('card.table.goUser') }}</el-button>-->
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
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
</template>

<script>
import api from '../../api'
import Mixins from '../../mixins/index.js'
import moment from "moment"

export default {
  mixins: [Mixins.country, Mixins.query],
  mounted() {
    this.handleQuery();
  },
  data () {
    return {
      loading: true,
      cards: [],
      query: {
        pageNum: 1,
        time: null,
        countryId: null,
        activityType: 2,
        status: 1,
      },
      page: {
        count: 0
      },
      statusOptions: [
        {label: this.$t('card.js.all'), value: null},
        {label: this.$t('card.js.status0'), value: 0},
        {label: this.$t('card.js.status1'), value: 1},
        {label: this.$t('card.js.status2'), value: 2},
        {label: this.$t('card.js.status3'), value: 3}
      ],
      areaOptions: this.getAreaOptions(),
    }
  },
  computed: {
    computedCards() {
      return this.cards.map((item) => {
        return {
          ...item,
          languageIndex: 0,
          activityTypeString: this.$t('card.js.activityType'),
          updateAtString: item.updateAt ? moment(item.updateAt).format("YYYY-MM-DD HH:mm:ss") : "",
          startTimeString: item.startTime ? moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") : "",
          endTimeString: item.endTime ? moment(item.endTime).format("YYYY-MM-DD HH:mm:ss") : "",
          statusString: item.status === 0 ? this.$t('card.js.status0') : item.status === 1 ? this.$t('card.js.status1') : item.status === 2 ? this.$t('card.js.status2') : item.status === 3 ? this.$t('card.js.status3') : '',
          activityContentString: this.getActivityContent(item.activityContent, item.currencySymbol),
          freecardString: item.limited ? this.$t('card.js.freecard', {freeTimes: item.freeTimes, freeMinutes: item.freeMinutes}) : this.$t('card.js.nolimit'),
        }
      })
    }
  },
  methods: {
    goAdd() {
      window.open(location.href + "add");
    },
    handleCurrentChange(val) {
      if(!this.loading) {
        this.query.pageNum = val;
        api.getCards(this, this.query);
      }
    },
    handleQuery() {
      this.query.pageNum = 1;
      api.getCards(this, this.query);
    },
    edit(index, row) {
      sessionStorage.card = JSON.stringify(row);
      this.$router.push({name: "editcard"});
    },
    detail(index, row) {
      sessionStorage.card = JSON.stringify(row);
      window.open(location.href + "/" + row.id);
    },
    goUser(index, row) {

    },
    getActivityContent(content, currencySymbol) {
      let items = content.split('|') || [];
      let ret = '';
      items.forEach((item) => {
        let nums = item.split(',');
        console.log(nums);
        // [天数 -> 0, 正常价 -> 1, 是否开启自动续费 -> 2, 自动续费价 -> 3, 
        //  是否开启促销 -> 4, 促销体验价 -> 5, 是否开启折扣 -> 6, 
        //  折扣价 -> 7, 优先级 -> 8, 免押金 -> 9, 
        //  会员卡名称 -> 10, 押金一键购买 -> 11, oCoin金额 －> 12，superVip -> 13, superVip次数 -> 14,]
        if(!nums.every(this.checkEmpty)) {
          ret += (nums[10] !== 'null' ? this.$t('card.js.cardName') + nums[10] + ',' : '')
            + (nums[0] ? nums[0] + this.$t('card.js.dayCard') : '') 
            + (nums[1] ? (this.$t('card.js.priceCard') + (currencySymbol ? currencySymbol : '$') + (nums[1] ? nums[1] : '')) : '')
            + (nums[2] === 'true' ? (this.$t('card.js.priceAuto') + (currencySymbol ? currencySymbol : '$') + (nums[3] ? nums[3] : '')) : this.$t('card.js.priceDisAuto'))
            + (nums[4] === 'true' ? (this.$t('card.js.priceDis') + (currencySymbol ? currencySymbol : '$') + (nums[5] ? nums[5] : '')) : this.$t('card.js.priceDisDis'))
            + (nums[6] === 'true' ? (this.$t('card.js.priceDiscount') + (currencySymbol ? currencySymbol : '$') + (nums[7] ? nums[7] : '')) : this.$t('card.js.priceDiscountDis'))
            + (nums[9] === 'true' ? (this.$t('card.js.nodeposit')) : (this.$t('card.js.indeposit'))) + ', '
            + (nums[11] === 'true' ? this.$t('addCard.form.isKeyDeposit') + ', ' + this.$t('addCard.form.giftOCoin') + ' ' + nums[12] : '') + ', '
            + (nums[13] === 'true' ? this.$t('addCard.form.superVip') + ', ' + this.$t('addCard.form.authorizedTimes') + ' ' + nums[14] : this.$t('addCard.form.nonSuperVip')) + '; ';

        }
      });
      ret = ret.replace(/, ,/g, ",");
      return ret;
    },
    checkEmpty(val) {
      return val === '';
    }
  },
}
</script>

<style lang="scss">
// .user-info-view {
  .no-min-with {
    min-width: initial !important;
  }
// }
</style>
